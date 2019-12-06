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
                request.open("GET", "datas/json/mortality.json", false);
                request.send(null);
                let data = JSON.parse(request.responseText);
                let augmentation = 10
                let width = 600,
                    height = 400,
                    radius = Math.min(width, height) / 2.5;

                function getArc(augmentation,inner){
                    if (!inner) {
                        inner = 0;
                    }

                    return d3.arc()
                    .innerRadius(inner)
                    .outerRadius(radius + augmentation)
                }

                let color = d3.scaleOrdinal()
                    .range(this.colors);

                let pie = d3.pie()
                    .sort(null)
                    .value(function(d) { return d; });

                let svg = d3.select("#pie-chart").append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

                let self = this

                var testDefs = svg.append("defs");

                var filter = testDefs.append("filter")
                    .attr("id","glow");

                filter.append("feGaussianBlur")
                    .attr("stdDeviation","3.5")
                    .attr("result","coloredBlur");

                var feMerge = filter.append("feMerge");
                feMerge.append("feMergeNode")
                    .attr("in","coloredBlur");

                feMerge.append("feMergeNode")
                    .attr("in","SourceGraphic");

                var gradient = testDefs.append("linearGradient")
                        .attr("id", "svgGradient")
                        .attr("x1", "0%")
                        .attr("x2", "100%")
                        .attr("y1", "0%")
                        .attr("y2", "100%");

                         gradient.append("stop")
                          .attr('class', 'start')
                          .attr("offset", "0%")
                          .attr("stop-color", "#EC6B05")
                          .attr("stop-opacity", 1);

                        gradient.append("stop")
                                .attr('class', 'end')
                                .attr("offset", "100%")
                                .attr("stop-color", "#BD2C1A")
                                .attr("stop-opacity", 1);

                
                var filter = testDefs.append("filter")
                    .attr("id", "dropshadow")

                filter.append("feGaussianBlur")
                    .attr("in", "SourceAlpha")
                    .attr("stdDeviation", 10)
                    .attr("result", "blur");
                filter.append("feOffset")
                    .attr("in", "blur")
                    .attr("dx", 0)
                    .attr("dy", 0)
                    .attr("result", "offsetBlur");

                var feMerge = filter.append("feMerge");

                feMerge.append("feMergeNode")
                    .attr("in", "offsetBlur")
                feMerge.append("feMergeNode")
                    .attr("in", "SourceGraphic");

                let g = svg.selectAll(".arc")
                    .data(pie(data))
                    .enter().append("g")
                    .attr("class", "arc")
                    .attr("id", function(d){ return "arc" + d.index})
                    .on("mouseenter", (d) => {
                        self.$emit('update:hovered', d.index)
                        let thisEl = document.querySelector("#arc" + d.index + " path")
                        d3.select(thisEl).transition()
                            .duration(200)
                            .attr("d", getArc(10))
                            .attr("fill", "url(#svgGradient)")
                            .style("filter", "url(#dropshadow)");
                       
                       let thisElTxt = document.querySelector("#arc" + d.index + " text")
                        d3.select(thisElTxt).transition()
                            .duration(200)
                            .attr("transform", function(d) { return "translate(" + getArc(10,10).centroid(d) + ")"; })
                            

                    })
                    .on("mouseleave", (d) => {
                        self.$emit('update:hovered', null)
                        let thisEl = document.querySelector("#arc" + d.index + " path")
                        d3.select(thisEl).transition()
                            .duration(200)
                            .attr("d", getArc(-10))
                            .attr("fill", function(d) { return color(d.data); })
                            .style("filter", "none");

                        let thisElTxt = document.querySelector("#arc" + d.index + " text")
                            d3.select(thisElTxt).transition()
                            .duration(200)
                            .attr("transform", function(d) { return "translate(" + getArc(-10).centroid(d) + ")"; })

                    })
                ;

                g.append("path")
                    .attr("d", getArc(-10))
                    .attr("fill", function(d) { return color(d.data); })
                    .on("mouseenter", (d) => {
                    
                            //.attr("fill", function(d) { return color(d.data); });   
                       
  
                    })
                    .on("mouseleave", (d) => {
                   
                        
                    })
                ;

                g.append("text")
                    .attr("transform", function(d) { return "translate(" + getArc(-10).centroid(d) + ")"; })
                    .style("font-size", "18px")
                    .style("font-weight", "bold")
                    .style("fill",function(d){
                        if (d.value == 26) {
                            return "#ffffff"
                        }
                        else{
                            return "black"
                        }
                    })
                    .attr("dy", ".3em")
                    .attr("dx", "-10")
                    .text(function(d) { return d.data + '%'; })
                ;

                
            }
            
        }
    }
</script>

<style scoped>
    .selectedArc{
        transition: cubic-bezier(0.075, 0.82, 0.165, 1);
         animation: loading-spinner 1s linear
    }
    @keyframes loading-spinner{
        from{
            transform:scale(1)
        }
        to{
            transform: scale(1.2)
        }
    }
    
</style>