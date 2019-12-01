<template>
    <div id="map">
    </div>
</template>

<script>
    import * as d3 from "d3";

    export default {
        name: "Map",
        mounted() {
            this.drawMap();
        },
        methods: {

            drawMap() {
                const widthMap = innerWidth;
                const heightMap = innerHeight;
                const path = d3.geoPath();

                const projection = d3.geoConicConformal()
                    .center([-48, 10])
                    .scale(1400)
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

                    let self = this
                    points.selectAll("path")
                        .data(datas[1].features)
                        .enter()
                        .append("path")
                        .attr('class', 'points')
                        .attr("fill", "#D57B00")
                        .attr("stroke", "none")
                        .style("cursor", "pointer")
                        .style("z-index", 10)
                        .attr("d", path)
                        .on("click", (d) => {
                            self.$emit('update:show', true);
                            self.$emit('update:properties', d.properties);
                        });
                });
            },
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

</style>