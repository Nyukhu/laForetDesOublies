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
            this.drawMap();
        },
        data: () => ({
            clicked: [],
        }),
        methods: {
            drawMap() {
                const widthMap = innerWidth;
                const heightMap = innerHeight;
                const path = d3.geoPath();
                const projection = d3.geoConicConformal()
                    .center([-45, 10])
                    .scale(1500)
                    .translate([innerWidth/1.25, innerHeight /3.75]);
                path.projection(projection);
                const svg = d3.select('#map')
                    .append("svg")
                    .attr("id", "svg")
                    .attr("width", widthMap)
                    .attr("height", heightMap)
                    .attr("fill", "none")
                    .attr("stroke", "white")
                    .attr("stroke-width", 0.7)
                    //.attr("style", "transform: rotate(-35deg);")
                    .attr("style", "position: absolute; top: 0; left:0")
                    .style("fill", "url(#fond_carte)")
                    .style("stroke", "white");
                const amazonia = svg.append("g");
                const terres = svg.append("g");
                const points = svg.append("g");

                var defs = svg.append('svg:defs');

                var gradient = defs.append("linearGradient")
                        .attr("id", "svgPointGradient")
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

                var filter = defs.append("filter")
                    .attr("id","glow");

                filter.append("feGaussianBlur")
                    .attr("stdDeviation","3.5")
                    .attr("result","coloredBlur");

                var feMerge = filter.append("feMerge");
                feMerge.append("feMergeNode")
                    .attr("in","coloredBlur");

                feMerge.append("feMergeNode")
                    .attr("in","SourceGraphic");

                defs.append("svg:pattern")
                    .attr("id", "fond_card")
                    .attr("width", 1000)
                    .attr("height", 1000)
                    .attr("patternUnits", "userSpaceOnUse")
                    .append("svg:image")
                    .attr("xlink:href","datas/png/fond_arbre.jpg")
                    .attr("x", 0)
                    .attr("y", 0);
                let self = this
                Promise.all([
                    d3.json("datas/json/amazonia.json"),
                    d3.json("datas/json/indigeneous_territories.json"),
                    d3.json("datas/json/points.json"),
                ]).then((datas) => {
                    amazonia.selectAll("path")
                        .data(datas[0].features)
                        .enter()
                        .append("path")
                        .attr('id', 'amazonia')
                        .attr("d", path)
                        .attr("stroke", function(d){
                        if(d.properties.name == "Amazônia"){
                            return "white"
                        }
                        else{
                            return "#ffffff40"
                        }
                    })
                    terres.selectAll("path")
                        .data(datas[1].features)
                        .enter()
                        .append("path")
                        .attr('class', 'terres')
                        .attr("d", path)
                        .attr("fill", "#00000000")
                        .attr("stroke", "none")
                        
                    
                    points.selectAll("path")
                        .data(datas[2].features)
                        .enter()
                        .append("circle")
                        .attr('class', function (d) { 
                            if(d.properties.title == "danger"){
                                return "points danger"
                            }
                            else{
                                return "points" 
                            }
                        })
                        .attr('id',function (d) { return d.properties.name.split(' ').join('+')})
                        .attr("cx", function (d) { console.log(projection(d.geometry.coordinates)); return projection(d.geometry.coordinates)[0]; })
                        .attr("cy", function (d) { return projection(d.geometry.coordinates)[1]; })
                        .attr("r", function(d){
                            if(d.properties.title == "danger")
                                return "10px"
                            else
                                return "3px"
                          })
                        .style("fill", function(d){
                            if(d.properties.title == "danger")
                                return "url(#svgPointGradient)"
                            else
                                return "#00000000"
                          })
                        .style("filter", "url(#glow)")
                        .attr("stroke", "none")
                        .on("mouseenter", (d) => {
                            let thisEl = document.getElementById(d.properties.name.split(' ').join('+'))
                            thisEl.style.fill = "white"
                            let preshow = document.querySelector('.preshow');

                            console.log(d.properties.name)
                            let points = document.querySelectorAll('.points')
                            if (thisEl.classList.contains("danger")) {
                                points.forEach((point) => {
                                if(!point.classList.contains('danger') && d.properties.name == "Kawahiva do Rio Pardo"){
                                    d3.select(point).transition()
                                        .duration(200)
                                        .style("fill", "#cd482f")
                                        .style("filter", "url(#glow)");
                                }
                            })

                            
                        
                            }
                            
                            
                            let terres = document.querySelectorAll('.terres');
                            if (d.properties.name == "Yanomami") {
                                terres.forEach((terre) => {
                                     d3.select(terre).transition()
                                        .duration(200)
                                        .style("fill", "#edebd850")
                                        .style("filter", "none");
                                })
                            }

                            //console.log(points)


                            let y = thisEl.getBoundingClientRect().y;
                            let x = thisEl.getBoundingClientRect().x;

                            if (thisEl.classList.contains("danger") || this.clicked.includes("tribes")) {
                                preshow.style.top = thisEl.getBoundingClientRect().y - 45 + "px";
                                preshow.style.left = thisEl.getBoundingClientRect().x - 100 +"px";
                                preshow.style.opacity = 0.1
                                preshow.style.display = "flex";
                                preshow.style.opacity = 1.0
                                preshow.style.top = thisEl.getBoundingClientRect().y - 50 + "px";
                                preshow.style.left = thisEl.getBoundingClientRect().x - 100 +"px";
                                preshow.innerHTML = d.properties.name + "<br>"+ d.properties.theme
                                
                            }

                        })
                        .on("mouseleave", (d) => {
                            let thisEl = document.getElementById(d.properties.name.split(' ').join('+'))
                            console.log("exited",thisEl)
                             if(d.properties.title == "danger")
                                thisEl.style.fill = "url(#svgPointGradient)"
                            else
                                 thisEl.style.fill = "#cd482f"
                            let preshow = document.querySelector('.preshow');

                            if (1) {
                                preshow.style.display = "none";
                            }

                            

                            let points = document.querySelectorAll('.points')
                            points.forEach((point) => {
                                    if(!point.classList.contains('danger') && !self.clicked.includes("tribes")){
                                        d3.select(point).transition()
                                        .duration(200)
                                        .style("fill", "#00000000")
                                        .style("filter", "none");
                                    }
                                })
                            
                            let terres = document.querySelectorAll('.terres');
                            if (d.properties.name == "Yanomami" && !self.clicked.includes("terres")) {
                                terres.forEach((terre) => {
                                    d3.select(terre).transition()
                                        .duration(200)
                                        .style("fill", "#00000000")
                                        .style("filter", "none");
                                })
                            }
                        })
                        .on("click", (d) => {
                            self.$emit('update:show', true);
                            self.$emit('update:properties', d.properties);

                            if (d.properties.name == "Kawahiva do Rio Pardo") {
                                this.clicked.push("tribes")
                            }
                            if (d.properties.name == "Yanomami") {
                                this.clicked.push("terres")
                            }

                            if (d.properties.hasOwnProperty('component')) {
                                setTimeout(() => {
                                    window.scroll({
                                        top: 950,
                                        left: 0,
                                        behavior: 'smooth'
                                    });
                                }, 300)
                            }
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
        padding: 2px;
        justify-content: center;
        align-items: center;
        background-color: black;
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        width: 100px;
        position: absolute;
        z-index: 80;
        color: white;
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    }
    
    

</style>