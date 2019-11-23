<template>
    <div id="map">
        <Modal
            :show="show"
            :properties="properties"></Modal>
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
                    .scale(1600)
                    .translate([widthMap / 2.3, heightMap / 4]);
                path.projection(projection);

                const svg = d3.select('#map')
                    .append("svg")
                    .attr("id", "svg")
                    .attr("width", widthMap)
                    .attr("height", heightMap);

                const amazonia = svg.append("g");
                const points = svg.append("g");

                let self = this;
                Promise.all([
                    d3.json("/datas/amazonia.json"),
                    d3.json("/datas/points2.json")
                ]).then((datas) => {

                    amazonia.selectAll("path")
                        .data(datas[0].features)
                        .enter()
                        .append("path")
                        .attr('id', 'amazonia')
                        .attr("d", path);

                    points.selectAll("path")
                        .data(datas[1].features)
                        .enter()
                        .append("path")
                        .attr('class', 'points')
                        .attr("fill", "red")
                        .attr("style", "cursor: pointer")
                        .attr("d", path)
                        .on("click", (d) => {
                            self.show = true;
                            self.properties = d.properties;
                        })
                        // .on("mouseover", function(d) {
                        //     // eslint-disable-next-line no-console
                        //     console.log(d.properties.name)
                        // })
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

    #map {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>