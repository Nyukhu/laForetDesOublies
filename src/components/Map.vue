<template>
    <div id="map">
       
        <Modal
            :show="show"
            :properties="properties"
            
            >
        </Modal>
            
    </div>
</template>

<script>
    import * as d3 from "d3";
    import Modal from "./Modal";

    export default {
        name: "Map",
        components: {
            Modal
        },
        data: () => ({
            show: false,
            properties: null,
        }),
        mounted() {
            this.drawMap();
            this.modalClickOutside();
        },
        methods: {

            drawMap() {
                const widthMap = innerWidth;
                const heightMap = innerHeight;
                const path = d3.geoPath();

                //center map
                const projection = d3.geoConicConformal()
                    .center([-70, -1])
                    .scale(1200)
                    .translate([widthMap / 1.75, heightMap / 2]);
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
                            
                    .style("fill", "url(#fond_card)")
                    .style("filter", "grayscale(30%) brightness(0.2)")        
                    .style("stroke", "white");                   

                
                const amazonia = svg.append("g");
                const points = svg.append("g");
                var defs = svg.append('svg:defs');

                defs.append("svg:pattern")
                    .attr("id", "fond_card")
                    .attr("width", "100%")
                    .attr("height", "100%")
                    .attr("patternUnits", "userSpaceOnUse")
                    .append("svg:image")
                    .attr("xlink:href","datas/png/fond_arbre.jpg")
                    .attr("width", "100%")
                    .attr("height", "100%")
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

                    points.selectAll("path")
                        .data(datas[1].features)
                        .enter()
                        .append("path")
                        .attr('class', 'points')
                        .attr("fill", "red")
                        .attr("style", "cursor: pointer; z-index: 10; filter: unset;")
                        .attr("d", path)
                        .on("click", (d) => {
                            self.show = true;
                            self.properties = d.properties;
                            console.log("test");
                        });
                        

                });
            },

            modalClickOutside () {
                let app = document.querySelector('#app');
                let self = this;
                app.addEventListener('click', (event) => {
                    if (event.target.id !== 'modal' && !event.target.classList.contains('points')) {
                        if (self.show) {
                            self.show = false;
                        }
                    }
                });
            }
        }
    }
</script>

<style
    scoped
    lang="scss">
    #svg{
    }
    #map {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        overflow: hidden;

        #indigenous-image {
            position: absolute;
            pointer-events: none;
            z-index: 5;
            width: 20vh;
            height: 33vw;
            left: 50px;
            top: -30px;
        }
    }
    .map{

        background-image: url("~@/assets/images/fond_arbre.jpg")
    }
</style>