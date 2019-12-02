<template>
   <div id="bar-chart" />
</template>

<script>
    import * as d3 from "d3";

    export default {
        name: "BarChart",
       props: {
           name: {type: String}
       },
        mounted() {
            this.draw();
        },
        methods: {
            draw () {
                const margin = {top: 20, right: 20, bottom: 90, left: 120};
                const width = 800 - margin.left - margin.right;
                const height = 400 - margin.top - margin.bottom;

                const x = d3.scaleBand()
                    .range([0, width])
                    .padding(0.1);

                const y = d3.scaleLinear()
                    .range([height, 0]);

                const svg = d3.select("#bar-chart").append("svg")
                    .attr("id", "svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                const div = d3.select("body").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);

               d3.json("datas/json/" + this.name +".json").then(function(data){
                  data.forEach(function(d) {
                     d.population = +d.population;
                  });

                  x.domain(data.map(function(d) { return d.country; }));
                  y.domain([0, d3.max(data, function(d) { return d.population; })]);

                  svg.append("g")
                          .attr("transform", "translate(0," + height + ")")
                          .call(d3.axisBottom(x).tickSize(0))
                          .selectAll("text")
                          .style("text-anchor", "end")
                          .attr("dx", "-.8em")
                          .attr("dy", ".15em")
                          .attr("transform", "rotate(-65)");

                  svg.append("g").call(d3.axisLeft(y).ticks(6));

                  svg.selectAll(".bar")
                          .data(data)
                          .enter().append("rect")
                          .attr("class", "bar")
                          .attr("x", function(d) { return x(d.country); })
                          .attr("width", x.bandwidth())
                          .attr("y", function(d) { return y(d.population); })
                          .attr("height", function(d) { return height - y(d.population); })
                          .on("mouseover", function(d) {
                             div.transition()
                                     .duration(200)
                                     .style("opacity", .9);
                             div.html("Population : " + d.population)
                                     .style("left", (d3.event.pageX + 10) + "px")
                                     .style("top", (d3.event.pageY - 50) + "px");
                          })
               });
            }
        }
    }
</script>

<style
    scoped
    lang="scss">

</style>