<template>
    <div>
        <div id="dark-bg" />
        <div
            id="first-part"
            :style="{ backgroundImage: 'url(' + require('../../assets/images/parts/first/' + this.properties.name + '/background.jpg') + ')' }"
            style="background-size: cover;">
            <div id="content">
                <div id="tribu">
                    <p>TRIBU {{ payload.tribu.name }}</p>
                    <img
                        id="brush"
                        src="../../assets/images/brush.png" />
                </div>
                <h1 v-html="payload.title"></h1>
                <div id="explications">
                    <img :src="pathImage" />
                    <div>
                        <div id="explications-quote">
                            <span
                                style="margin: auto"
                                v-html="payload.explications.quote"></span>
                            <p id="signature">{{ payload.explications.signature }}</p>
                        </div>
                        <p id="explications-description">{{ payload.explications.description }}</p>
                    </div>
                </div>
                <div id="chart">
                    <div id="chart-description">
                        <h2 v-html="payload.chart.title"></h2>
                        <img
                            id="brush2"
                            src="../../assets/images/brush.png" />
                        <p>{{ payload.chart.description }}</p>
                    </div>
                    <template v-if="properties.name === 'deforestation'">
                        <bar-chart
                            :number="id"
                            :name="properties.chart"
                            class="charts"></bar-chart>
                    </template>
                    <div
                        v-else
                        id="chart-legend">
                        <div id="legend">
                            <ul>
                                <li
                                    class="legend-line"
                                    v-for="(legend, i) of pieLegend"
                                    :key="'legend' + i">
                                    <div
                                        id="block-color"
                                        :style="'background-color:' + legend.color "></div>
                                    <span style="font-weight: bold">{{ legend.legend }}</span>
                                </li>
                            </ul>
                        </div>
                        <pie-chart
                            :name="properties.chart"
                            :colors="getColors('pie')"
                            class="charts"
                            ></pie-chart>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BarChart from "../charts/BarChart";
    import PieChart from "../charts/PieChart";

    export default {
        name: "FirstPart",
        components: {
            BarChart,
            PieChart
        },
        props: {
            payload: {type: Object},
            properties: {type: Object},
            id: {type: Number},
        },
        data: () => ({
            charts: [
                {
                    type: 'pie',
                    colors: ["#EC6B05", "#FFFFFF", "#C0CCBC", "#92A590", "#3F493E"],
                    legends: ["Abus de pouvoir et Discrimination", "Tentatives de meurtres", "Menaces", "Lésions corporels volontaire et violences sexuelles", "Homicides involontaires"]
                }
            ],
        }),
        computed: {
            pathImage () {
                return require("../../assets/images/parts/first/" + this.properties.name +  "/image.jpg");
            },

            pieLegend () {
                let colors = this.getColors('pie');
                let legends = this.getLegends('pie');
                let finalLegend = [];

                for (let i=0; i<colors.length; i++) {
                    let obj = {
                        color: colors[i],
                        legend: legends[i],
                    };
                    finalLegend.push(obj)
                }

                return finalLegend
            },
        },
        methods: {
            getColors (type) {
                return this.charts.filter(chart => chart.type === type)[0].colors
            },

            getLegends (type) {
                return this.charts.filter(chart => chart.type === type)[0].legends
            },


        }
    }
</script>

<style
    scoped
    lang="scss">
    #dark-bg {
        background-color: black;
        opacity: 0.8;
        z-index: 1;
        height: 100%;
        width: 100%;
        position: absolute;
    }
    #first-part {
        display: flex;
        flex-direction: column;
        #content {
            z-index: 3;
            padding: 0 16rem;
            display: flex;
            flex-direction: column;
            #tribu {
                position: relative;
                display: flex;
                justify-content: center;
                p {
                    font-style: italic;
                    font-weight: bold;
                    font-size: 28px;
                    text-align: center;
                    z-index: 2;
                    position: relative;
                    padding: 2rem;
                    margin-bottom: 0;
                }
                #brush {
                    width: 220px;
                    height: 100px;
                    position: absolute;
                    transform: rotate(5deg);
                    top: 30px;
                }
            }
            h1 {
                font-size: 60px;
                text-align: center;
                z-index: 2;
                position: relative;
                padding-bottom: 3rem;
            }
            #explications {
                display: flex;
                flex-direction: row;
                margin: 2rem auto 0 auto;
                img {
                    height: 300px;
                    margin-right: -40px;
                    margin-top: 120px;
                    z-index: 5;
                }
                #explications-quote {
                    font-family: Merriweather;
                    font-size: 30px;
                    width: 400px;
                    background-color: #090E0C;
                    color: #F1EEDF;
                    padding: 65px 90px 85px 90px;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 6px 6px black;
                    #signature {
                        font-size: 24px;
                        text-align: right;
                        margin: 5px 2px 0 0;
                    }
                }
                #explications-description {
                    width: 400px;
                    line-height: 30px;
                    font-size: 20px;
                    margin: 55px 0 0 100px;
                }
            }
            #chart {
                margin-top: 8rem;
                #chart-description {
                    position: relative;
                    h2 {
                        font-size: 36px;
                        position: relative;
                        z-index: 2;
                    }
                    p {
                        width: 380px;
                        line-height: 30px;
                        font-size: 20px;
                    }
                    #brush2 {
                        width: 160px;
                        position: absolute;
                        top: 65px;
                    }
                }
                #chart-legend {
                    display: flex;
                    flex-direction: row;
                    #legend {
                        .legend-line {
                            display: flex;
                            flex-direction: row;
                        }
                        li {
                            list-style-type: none;
                            margin-bottom: 25px;
                        }
                        #block-color {
                            height: 15px;
                            width: 15px;
                            margin-right: 15px;
                        }
                    }
                }
                .charts {
                    display: flex;
                    justify-content: flex-end;
                    margin: 4rem 0;
                }

            }
        }
    }
</style>