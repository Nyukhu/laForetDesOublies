<template>
    <div
        id="second-part"
        :style="[ !this.colored ? { backgroundImage: 'url(' + require('../../assets/images/parts/second/' + this.properties.component + '/background.jpg') + ')' } : { backgroundColor: '#090E0C'}]"
        style="background-size: cover;">
        <div id="content">
            <div id="chart">
                <div id="chart-description">
                    <h2 v-html="payload.title"></h2>
                    <img
                        id="brush"
                        src="../../assets/images/brush.png"/>
                    <p v-if="payload.description">{{ payload.description }}</p>
                </div>
                <div
                    v-if="properties.component === 'deforestation'"
                    id="horizontal-chart">
                    <bar-chart
                        :id="'bar-chart' + id"
                        :number="id"
                        :name="'deforestation2'"></bar-chart>
                </div>
                <div
                    v-else-if="properties.component === 'mortality'"
                    class="chart-legend">
                    <bar-chart
                        :id="'bar-chart' + id"
                        :number="id"
                        :name="selectedLegend.data"></bar-chart>
                    <div class="legend">
                        <ul>
                            <li
                                class="legend-line"
                                v-for="(legend, i) of legends"
                                :key="'legend' + i"
                                @click="selectedLegend = legend">
                                <span
                                    :id="'line'+ i"
                                    class="BarLegendlines"
                                    style="font-weight: bold">{{ legend.title }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div v-else-if="properties.component === 'areas' && id === 1">
                    <div class="chart-legend">
                        <square-chart :cursor="cursor" />
                        <p style="font-size: 62px; font-weight: bold">{{ total }} km²</p>
                    </div>
                    <range
                        id="range"
                        :cursor.sync="cursor"/>
                </div>
                <div v-else>
                   <div class="chart-legend">
                        <div class="legend">

                        </div>
                        <line-chart />
                   </div>
                    <div id="presidents-legend">
                        <ul style="cursor: pointer">
                            <li
                                v-for="(president, i) of presidents"
                                :key="'president' + i">
                                <img :src="getImage(president.number)" />
                                <p style="margin-bottom: 0">{{ president.startDate }}</p>
                                <p style="margin-top: 3px">{{ president.endDate }}</p>
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
    import SquareChart from "../charts/SquareChart";
    import Range from "../utils/Range";
    import LineChart from "../charts/LineChart";

    export default {
        name: "SecondPart",
        components: {LineChart, BarChart, SquareChart, Range},
        props: {
            payload: {type: Object},
            properties: {type: Object},
            id: {type: Number},
            colored: {
                type: Boolean,
                default: false
            }
        },
        data: () => ({
            legends: [
                {
                    id: 0,
                    title: "Meurtres",
                    data: "mortality2"
                },
                {
                    id: 1,
                    title: "Suicides",
                    data: "mortality3"
                },
                {
                    id: 2,
                    title: "Mortalité infantile",
                    data: "mortality4"
                },
            ],
            selectedLegend: {
                id: 0,
                title: "Meurtres",
                data: "mortality2"
            },
            cursor: 2020,
            presidents: [
                {
                    number: 1,
                    startDate: "Avril 1985",
                    endDate: "Mars 1990",
                },
                {
                    number: 2,
                    startDate: "Mars 1990",
                    endDate: "Sept 1992",
                },
                {
                    number: 3,
                    startDate: "Août 1992",
                    endDate: "Dec 1994",
                },
                {
                    number: 4,
                    startDate: "Janv 1995",
                    endDate: "Dec 1998",
                },
                {
                    number: 4,
                    startDate: "Jan 1999",
                    endDate: "Dec 2002",
                },
                {
                    number: 5,
                    startDate: "Jan 2003",
                    endDate: "Dec 2006",
                },
                {
                    number: 5,
                    startDate: "Jan 2007",
                    endDate: "Dec 2010",
                },
                {
                    number: 6,
                    startDate: "Jan 2011",
                    endDate: "Dec 2014",
                },
                {
                    number: 6,
                    startDate: "Jan 2015",
                    endDate: "Mai 2016",
                },
                {
                    number: 7,
                    startDate: "Mai 2016",
                    endDate: "Avril 2018",
                },
            ],
            totals: [
                {
                    year: 1980,
                    total: 410173
                },
                {
                    year: 1990,
                    total: 410173 + 793505
                },
                {
                    year: 2000,
                    total: 410173 + 793505 + 1084555
                },
                {
                    year: 2010,
                    total: 410173 + 793505 + 1084555 + 1100000
                },
                {
                    year: 2020,
                    total: 410173 + 793505 + 1084555 + 1100000 + 1150000
                },
            ],
        }),
        watch: {
            selectedLegend(val) {
                let lines = document.querySelectorAll('.BarLegendlines')
                let line = document.querySelector('#line' + val.id)
                for (let l of lines) {
                    if (l !== line) {
                        l.style.opacity = 0.3
                    }
                }
                line.style.opacity = 1
            }
        },
        computed: {
            total () {
                return this.totals.filter(item => parseInt(item.year) === parseInt(this.cursor))[0].total;
            }
        },
        mounted() {
            let line = document.querySelector('#line' + this.selectedLegend.id)
            let lines = document.querySelectorAll('.BarLegendlines')
            for (let l of lines) {
                if (l !== line) {
                    l.style.opacity = 0.3
                }
            }
        },
        methods: {
            getImage (number) {
                return require('../../assets/images/presidents/president' + number + '.png');
            }
        }
    }
</script>

<style
        scoped
        lang="scss">
    #second-part {
        display: flex;
        flex-direction: column;
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

                .chart-legend {
                    display: flex;
                    flex-direction: row;
                    margin-top: 120px;
                    .legend {
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
                #range {
                    margin-left: 50px;
                }
                #presidents-legend {
                    ul {
                        display: flex;
                        flex-direction: row;
                        width: 80vw;
                        li {
                            text-align: center;
                            list-style-type: none;
                            margin-right: 28px;
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