<template>
    <div id="second-part">
        <div id="content">
            <div id="chart">
                <div id="chart-description">
                    <h2>LES TERRES INDIGÈNES LES PLUS TOUCHÉES <br> PAR LA DÉFORESTATION</h2>
                    <img
                        id="brush"
                        src="../../assets/images/brush.png" />
                    <p>La tribu des Awà est la quatrième tribu la plus touchée par la déforestation sur la période 2008 à 2019.. </p>
                </div>
                <div id="horizontal-chart">
                    <bar-chart
                        :id="'bar-chart' + id"
                        :number="id"
                        :name="'deforestation2'"></bar-chart>
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
            properties: {type: Object},
            id: {type: Number}
        }
    }
</script>

<style
        scoped
        lang="scss">
    #second-part {
        display: flex;
        flex-direction: column;
        background: url("../../assets/images/parts/second/background.png") top center no-repeat;
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