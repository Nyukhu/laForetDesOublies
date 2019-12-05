<template>
    <div id="square-chart" />
</template>

<script>
    import * as d3 from "d3";

    export default {
        name: "SquareChart",
        props: {
            cursor: [Number, String]
        },
        mounted() {
            this.draw();
        },
        watch: {
            cursor (val) {
                let squareChart = document.querySelector('#square-chart')
                squareChart.innerHTML = ''
                this.draw();
            }
        },
        methods: {
            draw () {
                let request = new XMLHttpRequest();
                request.open("GET", "datas/json/areas.json", false);
                request.send(null);
                let datas = JSON.parse(request.responseText);

                const width = 700;
                const height = 700;

                const svg = d3.select("#square-chart")
                    .append("svg")
                    .attr("id", "svg")
                    .attr("width", width)
                    .attr("height", height)
                    .style("margin-top", "-120px")
                    .append("g");

                svg.selectAll(".square")
                    .data(datas)
                    .enter().append("rect")
                    .attr("class", "square")
                    .style("display", (d) => {
                        if (d.year <= this.cursor) {
                            return "inline-block"
                        } else {
                            return "none"
                        }
                    })
                    .attr("width", (d) => d.km2 / 2500)
                    .attr("height", (d) => d.km2 / 2500)
                    .attr("x", 100)
                    .attr("y", 200)
                    .style("fill", (d) => {
                        return d.color
                    })
                    .append("text")
                    .attr("x", (d) => (d.km2 / 2500) / 2)
                    .attr("y", (d) => (d.km2 / 2500) / 2)
                    .style("fill", "red")
                    .style("text-anchor", "middle")
                    .attr("dy", ".35em")
                    .text("ooogerkokerogg")
                ;
            }
        }
    }
</script>

<style scoped>

</style>