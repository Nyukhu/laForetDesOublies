<template>
   <div :id="'bar-chart' + number">
   </div>
</template>

<script>
    import * as d3 from "d3";

    export default {
        name: "BarChart",
       props: {
           name: {type: String},
           number: {type: Number}
       },
        mounted() {
            this.draw();
        },
       watch: {
           name () {
              let barChart = document.querySelector('#bar-chart3');
              barChart.innerHTML = '';
              this.draw();
           }
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

                const svg = d3.select("#bar-chart" + this.number).append("svg")
                    .attr("id", "svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

               let self = this;
               d3.json("datas/json/" + this.name +".json").then(function(data) {
                  x.domain(data.map(function(d) { return d.axe1; }));
                  y.domain([0, d3.max(data, function(d) {
                     let axe;
                     self.name !== 'deforestation2' ? axe = d.axe2 : axe = d.axe1;
                     return axe;
                  })]);


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
                          .attr("x",(d) => { return x(d.axe1); })
                          .attr("width", x.bandwidth())
                          .attr("y", (d) => {
                             let axe;
                             self.name !== 'deforestation2' ? axe = d.axe2 : axe = d.axe1;
                             return y(axe);
                          })
                          .attr("height", (d) => {
                             let axe;
                             self.name !== 'deforestation2' ? axe = d.axe2 : axe = d.axe1;
                             return height - y(axe)
                          })
                          .style("fill", "white")
                         ;
               });
            }
        }
    }
</script>

<style
    scoped
    lang="scss">

</style>