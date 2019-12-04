<template>
    <div
        id="second-part"
        :style="{ backgroundImage: 'url(' + require('../../assets/images/parts/second/' + this.properties.name + '/background.jpg') + ')' }"
        style="background-size: cover;">
        <div id="content">
            <div id="chart">
                <div id="chart-description">
                    <h2 v-html="payload.title"></h2>
                    <img
                        id="brush"
                        src="../../assets/images/brush.png" />
                    <p>{{ payload.description }}</p>
                </div>
                <div
                    v-if="properties.name === 'deforestation'"
                    id="horizontal-chart">
                    <bar-chart
                        :id="'bar-chart' + id"
                        :number="id"
                        :name="'deforestation2'"></bar-chart>
                </div>
                <div
                    v-else
                    id="chart-legend">
                    <bar-chart
                        :id="'bar-chart' + id"
                        :number="id"
                        :name="selectedLegend.data"></bar-chart>
                    <div id="legend">
                        <ul>
                            <li
                                class="legend-line"
                                v-for="(legend, i) of legends"
                                :key="'legend' + i"
                                @click="selectedLegend = legend">
                                <span style="font-weight: bold">{{ legend.title }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BarChart from "../charts/BarChart";

    export default {
        name: "SecondPart",
        components: {BarChart},
        props: {
            payload: {type: Object},
            properties: {type: Object},
            id: {type: Number}
        },
        data: () => ({
            legends: [
                {
                    title: "Meurtres",
                    data: "mortality2"
                },
                {
                    title: "Suicides",
                    data: "mortality3"
                },
                {
                    title: "Mortalité infantile",
                    data: "mortality4"
                },
            ],
            selectedLegend: {
                title: "Meurtres",
                data: "mortality2"
            },
        }),
    }
</script>

<style
        scoped
        lang="scss">
    #second-part {
        display: flex;
        flex-direction: column;
        background: url("../../assets/images/parts/second/deforestation/background.jpg") top center no-repeat;
        background-size: cover;
        object-fit: cover;
        height: 1400px;
        #content {
            z-index: 3;
            padding: 0 16rem;
            display: flex;
            flex-direction: column;
            #chart {
                margin-top: 8rem;
                #chart-description {
                    position: relative;
                    text-align: right;
                    h2 {
                        font-size: 36px;
                        position: relative;
                        z-index: 2;
                    }
                    p {
                        width: 380px;
                        line-height: 30px;
                        font-size: 20px;
                        margin-left: auto;
                    }
                    #brush {
                        width: 160px;
                        position: absolute;
                        top: 65px;
                        right: 0px;
                    }
                }
                #horizontal-chart {
                    display: flex;
                    margin-top: 7rem;
                    #bar-chart2 {
                        transform: rotate(90deg);
                        display: flex;
                        justify-content: flex-end;
                        margin-top: 4rem;
                        margin-left: -160px;
                    }
                }
                #chart-legend {
                    display: flex;
                    flex-direction: row;
                    margin-top: 120px;
                    #legend {
                        .legend-line {
                            display: flex;
                            flex-direction: row;
                        }
                        li {
                            margin-bottom: 25px;
                        }
                        #block-color {
                            height: 15px;
                            width: 15px;
                            margin-right: 15px;
                        }
                    }
                }
            }
        }
    }

    /*#second-part::after {
        content: '';
        transform: skewY(3.11rad);
        width: 100%;
        height: 200px;
        margin-top: -120px;
        position: absolute;
        background-color: white;
    }*/
</style>