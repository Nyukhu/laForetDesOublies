<template>
    <div id="line-chart" />
</template>

<script>
    import * as d3 from "d3";

    export default {
        name: "LineChart",
        props: {
            name: {type: String}
        },
        mounted() {
            this.draw();
        },
        methods: {
            draw() {
                var margin = {top: 20, right: 20, bottom: 30, left: 50},
                    width = 960 - margin.left - margin.right,
                    height = 500 - margin.top - margin.bottom;

                var parseTime = d3.timeParse("%d-%b-%y");

                var x = d3.scaleTime().range([0, width]);
                var y = d3.scaleLinear().range([height, 0]);

                var valueline = d3.line()
                    .x(function(d) { return x(d.date); })
                    .y(function(d) { return y(d.close); });

                var svg = d3.select("#line-chart").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

                d3.csv("datas/json/politic.csv").then(function(data) {
                    data.forEach(function(d) {
                        d.date = parseTime(d.date);
                        d.close = +d.close;
                    });

                    x.domain(d3.extent(data, function(d) { return d.date; }));
                    y.domain([0, d3.max(data, function(d) { return d.close; })]);

                    svg.append("path")
                        .data([data])
                        .attr("class", "line")
                        .attr("d", valueline)
                        .attr('stroke', 'green')
                        .attr('stroke-width', 2)
                        .attr('fill', 'none');

                    svg.append("g")
                        .attr("transform", "translate(0," + height + ")")
                        .call(d3.axisBottom(x));

                    svg.append("g")
                        .call(d3.axisLeft(y));

                });
            }
        }
    }
</script>

<style
    scoped>
    .axisRed line {
        stroke: red;
    }

    .axisRed path {
        stroke: red;
    }

    .axisRed text {
        fill: red;
    }

    .axisSteelblue line {
        stroke: steelblue;
    }

    .axisSteelblue path {
        stroke: steelblue;
    }

    .axisSteelblue text {
        fill: steelblue;
    }
    
</style>