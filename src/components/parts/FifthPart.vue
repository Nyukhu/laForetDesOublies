<template>
    <div id="fifth-part">
        <div id="content">
            <div id="right-side">
                <p class="number">{{ payload[1].number }}</p>
                <h3 class="description">{{ payload[1].description }}</h3>
            </div>
            <div id="left-side">
                <div style="display:flex; flex-direction: column">
                    <p class="number">{{ payload[0].number }} %</p>
                    <h3 class="description">{{ payload[0].description }}</h3>
                </div>
                <div style="display:flex; flex-direction: column">
                    <p class="number">{{ payload[2].number }}</p>
                    <h3 class="description">{{ payload[2].description }}</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FifthPart",
        props: {
            payload: {type: Object}
        }
    }
</script>

<style
    scoped
    lang="scss">
    #fifth-part {
        position: relative;
        background: url('../../assets/images/parts/fifth/background.png');
        background-size: cover;
        display: flex;
        #content {
            z-index: 3;
            position: relative;
            padding: 0 16rem;
            display: flex;
            flex-direction: row;
            color: #F1EEDF;
            margin: auto;
            margin-bottom: 4rem;
            #left-side {
                margin-left: 8rem;
                display: flex;
                flex-direction: column;
                .number {
                    margin-left: auto;
                }
                .description {
                    text-align: right;
                    margin-right: 8rem;
                }
            }
            #right-side {
                display: flex;
                flex-direction: column;
                margin: auto;
                .description {
                    text-align: left;
                    margin-left: 8rem;
                }
            }
            .number {
                font-size: 84px;
                font-weight: bold;
                margin-bottom: 2rem;
            }
            .description {
                width: 220px;
                font-size: 16px;
            }
        }
    }
</style>