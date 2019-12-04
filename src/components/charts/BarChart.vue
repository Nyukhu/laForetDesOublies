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

                  var testDefs = svg.append("defs");

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

                  var defs = svg.append('svg:defs');
                  defs.append("svg:pattern")
                          .attr("id", "fond_card")
                          .attr("width", 1000)
                          .attr("height", 1000)
                          .attr("patternUnits", "userSpaceOnUse")
                          .append("svg:image")
                          .attr("xlink:href","datas/png/fond_arbre.jpg")
                          .attr("x", 0)
                          .attr("y", 0);

                  svg.append("g")
                          .attr("transform", "translate(0," + height + ")")
                          .call(d3.axisBottom(x).tickSize(0))
                          .selectAll("text")
                          .style("text-anchor", "end")
                          .attr("dx", "-.8em")
                          .attr("dy", ".15em")
                          .attr("transform", "rotate(-65)");

                  if (self.name === 'deforestation2') {
                     svg.append('text')
                             .attr('x', -300)
                             .attr('y', -360)
                             .attr('text-anchor', 'middle')
                             .style("fill", "white")
                             .text('Areas (km²)')
                             .attr("transform", "rotate(180)");
                  }


                  svg.append("g").call(d3.axisLeft(y).ticks(6));

                  svg.selectAll(".bar")
                          .data(data)
                          .enter().append("rect")
                          .attr("class", "bar")
                          .text(function(d) { return "test" })
                          .attr("x",(d) => { return x(d.axe1); })
                          .attr("width", () => {
                             if (self.name.includes('mortality')) {
                                return 125
                             } else {
                                if (self.name === 'deforestation') {
                                   return 40
                                } else {
                                   return 50
                                }
                             }
                          })
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
                          .style("fill", (d) => {
                             if (self.name.includes('mortality')) {
                                if (d.axe1 === 'Année 2018') {
                                   return "url(#svgGradient)"
                                }
                             }
                             return "white"
                          }).append("text")
                          .attr("class", "below")
                          .attr("x", 12)
                          .attr("dy", "1.2em")
                          .attr("text-anchor", "left")
                          .text(function(d) { return d.axe1; })
                          .style("fill", "black");
               });
            }
        }
    }
</script>

<style
    scoped
    lang="scss">

   .stop-left {
      stop-color: #3f51b5;  /* Indigo */
   }

   .stop-right {
      stop-color: #009688;  /* Teal */
   }
</style>