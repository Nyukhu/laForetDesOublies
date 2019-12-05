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
               let self = this;
                const margin = {top: 40, right: 20, bottom: 90, left: 120};
                let height = 400 - margin.top - margin.bottom;

                let width = 800 - margin.left - margin.right;
                if (self.name.includes('mortality')) {
                   width = 550 - margin.left - margin.right
                }

                const x = d3.scaleBand()
                    .range([0, width])
                    .padding(0.1);

                const y = d3.scaleLinear()
                    .range([height, 0]);

                const svg = d3.select("#bar-chart" + this.number).append("svg")
                    .attr("id", "svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", () => {
                       let customHeight = height + margin.top + margin.bottom
                       if (this.name === 'deforestation2') {
                          customHeight = customHeight + 200
                       }
                       return customHeight
                    })
                    .append("g")
                    .attr("transform", () => {
                       if (this.name === 'deforestation2') {
                          return "translate(60,200)"
                       } else {
                          return "translate(" + margin.left + "," + margin.top + ")";
                        }
                    });

               d3.json("datas/json/" + this.name +".json").then(function(data) {
                  x.domain(data.map(function(d) { return d.axe1; }));
                  y.domain([0, d3.max(data, function(d) {
                     let axe;
                     self.name !== 'deforestation2' ? axe = d.axe2 : axe = d.axe1;
                     return axe;
                  })]);

                  var testDefs = svg.append("defs");

                  var gradient = testDefs.append("linearGradient")
                          .attr("id", "svgGradient2")
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
                          .attr("transform", function(){
                             if (self.name !== 'deforestation2') {
                                return "translate(0,15)"
                             }
                             else{
                                return "rotate(-90)"
                             }
                          });

                  if (self.name === 'deforestation2') {
                     svg.append('text')
                             .attr('x', -150)
                             .attr('y', -40)
                             .attr('text-anchor', 'middle')
                             .style("fill", "white")
                             .text('surface (km²)')
                             .attr("transform", "rotate(-90)");
                  }
                  if (self.name.includes('mortality')) {
                     svg.append('text')
                             .attr('x', 0)
                             .attr('y', -10)
                             .attr('text-anchor', 'middle')
                             .style("fill", "white")
                             .text('surface (km²)')
                  }


                  svg.append("g").call(d3.axisLeft(y).ticks(6)).selectAll("text")
                          .style("text-anchor", "middle")
                          .attr("dx", "-.8em")
                          .attr("dy", ".15em")
                          .attr("transform", function(){
                             if (self.name !== 'deforestation2') {
                                return ""
                             }
                             else{
                                return "rotate(-90) translate(20,-20)"
                             }
                          });;

                 let barGroups = svg
                           .append("g")
                          .attr("class", "barGroups")
                          

                  barGroups.selectAll('.barGroups')
                           .data(data)
                           .enter()
                           .append("rect")
                           .attr("class", "bar")
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
                                    return "url(#svgGradient2)"
                                 }
                              }
                              return "white"
                           })

                  barGroups.selectAll('.barGroups')
                  .data(data)
                  .enter()
                  .append("text")
                  .text((d) => { let axe;
                             self.name !== 'deforestation2' ? axe = d.axe2 : axe = d.name;
                             return axe; })
                  .attr('text-anchor', 'left')
                  .style('font-weight', "bold")
                  .style("fill", "white")
                  .attr("font-family", "sans-serif")
                  .attr("transform", (d) =>{
                     let transfo = ""
                     self.name !== 'deforestation2' ? transfo = "" : transfo = "rotate(-90)";
                     return transfo
                  })
                  .attr("font-size", "14px")
                  .attr("x",(d) => { 
                     let center = 20
                     if (self.name.includes('mortality')) {
                        center = 62.5
                        return x(d.axe1) + 50;
                     } else {
                        if (self.name === 'deforestation') {
                           center = 20
                           return x(d.axe1) + 2.5;
                        } else {
                           center = 25
                           return d.axe1 - 270;
                        }
                     }
                     return x(d.axe1); 
                     })
                  .attr("y", (d) => {
                       let axe;
                        if(self.name !== 'deforestation2') {
                           return y(d.axe2) - 5;
                        }
                        else {
                           return x(d.axe1) + 20;
                        };
                     })
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