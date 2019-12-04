<template>
    <div id="map">
        <div class="preshow"></div>
    </div>
</template>

<script>
    import * as d3 from "d3";
    export default {
        name: "Map",
        mounted() {
            // this.drawMap();
        },
        methods: {
            drawMap() {
                const widthMap = innerWidth;
                const heightMap = innerHeight;
                const path = d3.geoPath();
                const projection = d3.geoConicConformal()
                    .center([-40, 10])
                    .scale(1300)
                    .translate([widthMap, heightMap /2.5]);
                path.projection(projection);
                const svg = d3.select('#map')
                    .append("svg")
                    .attr("id", "svg")
                    .attr("width", widthMap)
                    .attr("height", heightMap)
                    .attr("fill", "none")
                    .attr("stroke", "white")
                    .attr("stroke-width", 1)
                    .attr("style", "transform: rotate(-35deg);")
                    .attr("style", "position: absolute; top: 0; left:0")
                    .style("fill", "url(#fond_card)")
                    .style("stroke", "white");
                const amazonia = svg.append("g");
                const points = svg.append("g");
                var defs = svg.append('svg:defs');
                defs.append("svg:pattern")
                    .attr("id", "fond_card")
                    .attr("width", 1000)
                    .attr("height", 1000)
                    .attr("patternUnits", "userSpaceOnUse")
                    .append("svg:image")
                    //.attr("xlink:href","datas/png/fond_arbre.jpg")
                    .attr("x", 0)
                    .attr("y", 0);
                Promise.all([
                    d3.json("/datas/json/amazonia.json"),
                    d3.json("/datas/json/points.json"),
                ]).then((datas) => {
                    amazonia.selectAll("path")
                        .data(datas[0].features)
                        .enter()
                        .append("path")
                        .attr('id', 'amazonia')
                        .attr("d", path)
                        .attr("stroke", "white");
                        
                    let self = this
                    points.selectAll("path")
                        .data(datas[1].features)
                        .enter()
                        .append("circle")
                        .attr('class', 'points')
                        .attr('id',function (d) { return d.properties.name.split(' ').join('+')})
                        .attr("cx", function (d) { console.log(projection(d.geometry.coordinates)); return projection(d.geometry.coordinates)[0]; })
                        .attr("cy", function (d) { return projection(d.geometry.coordinates)[1]; })
                        .attr("r", function(d){
                            if(d.properties.title == "danger")
                                return "10px"
                            else
                                return "3px"
                          })
                        .attr("fill", function(d){
                            if(d.properties.title == "danger")
                                return "#e08422"
                            else
                                return "#9c764c"
                          })
                        .attr("stroke", "none")
                        .on("mouseenter", (d) => {
                            let thisEl = document.getElementById(d.properties.name.split(' ').join('+'))
                            thisEl.style.fill = "white"
                            let preshow = document.querySelector('.preshow');
                            preshow.style.display = "block";

                            let y = thisEl.getBoundingClientRect().y;
                            let x = thisEl.getBoundingClientRect().x;

                            preshow.style.top = thisEl.getBoundingClientRect().y - 50 + "px";
                            preshow.style.left = thisEl.getBoundingClientRect().x - 100 +"px";
                            preshow.innerHTML = d.properties.name
                            


                        })
                        .on("mouseleave", (d) => {
                            let thisEl = document.getElementById(d.properties.name.split(' ').join('+'))
                            console.log("exited",thisEl)
                             if(d.properties.title == "danger")
                                thisEl.style.fill = "#e08422"
                            else
                                 thisEl.style.fill = "#9c764c"
                            let preshow = document.querySelector('.preshow');
                            preshow.style.display = "none";
                            
                        })
                        .on("click", (d) => {
                            console.log()
                            self.$emit('update:show', true);
                            self.$emit('update:properties', d.properties);
                        });
                });
            },

           /* keepPointsInMap(points, amazonia) 
            {
                var pointsInPolygon = [];
                    
                points.forEach(function(point) {
                    var inPolygon = false;
                    for (var i = 0; !inPolygon && i < frPolygons.length; i++) {
                        if (d3.polygonContains(frPolygons[i], [point.x, point.y])) {
                            inPolygon = true;
                        }
                    }
                            
                    if (inPolygon) {
                        pointsInPolygon.push(point);
                    }
                });
                return pointsInPolygon;
            }*/
        }
    }
</script>

<style
        scoped
        lang="scss">
    #map {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        overflow: hidden;
    }
    .preshow{
        display: none;
        background-color: white;
        height: 50px;
        width: 100px;
        position: absolute;
        z-index: 80;
        color: black;
    }
    .danger :hover{
       fill: red;
    }
</style>