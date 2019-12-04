<template>
    <div id="pie-chart" />
</template>

<script>

    import * as d3 from "d3";

    export default {
        name: "PieChart",
        props: {
            colors: {type: Array}
        },
        mounted() {
            this.draw();
        },
        methods: {
            draw () {
                let request = new XMLHttpRequest();
                request.open("GET", "../../datas/json/mortality.json", false);
                request.send(null);
                let data = JSON.parse(request.responseText);

                let width = 500,
                    height = 300,
                    radius = Math.min(width, height) / 2;

                let color = d3.scaleOrdinal()
                    .range(this.colors);

                let arc = d3.arc()
                    .outerRadius(radius - 10)
                    .innerRadius(0);

                let labelArc = d3.arc()
                    .outerRadius(radius - 40)
                    .innerRadius(radius - 40);

                let pie = d3.pie()
                    .sort(null)
                    .value(function(d) { return d; });

                let svg = d3.select("#pie-chart").append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

                let self = this
                let g = svg.selectAll(".arc")
                    .data(pie(data))
                    .enter().append("g")
                    .attr("class", "arc")
                    .on("mouseenter", (d) => {
                        self.$emit('update:hovered', d.index)
                    })
                    .on("mouseleave", () => {
                        self.$emit('update:hovered', null)
                    })
                ;

                g.append("path")
                    .attr("d", arc)
                    .style("fill", function(d) { return color(d.data); })
                    .on("mouseenter", () => {
                        d3.select(this).style("fill", "red");
                    })
                    .on("mouseleave", () => {
                        self.$emit('update:hovered', null)
                    })
                ;

                g.append("text")
                    .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
                    .style("font-size", "18px")
                    .style("font-weight", "bold")
                    .attr("dy", ".3em")
                    .attr("dx", "-10")
                    .text(function(d) { return d.data + '%'; })
                ;
            }
        }
    }
</script>

<style scoped>

</style>