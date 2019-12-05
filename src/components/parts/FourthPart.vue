<template>
    <div id="fourth-part">
        <div id="content">
            <h2 v-html="payload.title"></h2>
            <img
                id="brush"
                src="../../assets/images/brush.png" />
            <div id="story">
                <div id="left-side">
                    <p id="year">{{ payload.year }}</p>
                    <img
                        width="300"
                        src="../../assets/images/parts/fourth/image2.png" />
                </div>
                <div id="right-side">
                    <h3>{{payload.subtitle}}</h3>
                    <p>{{payload.description}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FourthPart",
        props: {
            payload: {type: Object}
        }
    }
</script>

<style
    scoped
    lang="scss">

    #fourth-part {
        background-color: #090E0C;
        position: relative;
        z-index: 5;
        #content {
            z-index: 3;
            padding: 0 16rem;
            display: flex;
            flex-direction: column;
            color: #F1EEDF;
            h2 {
                font-size: 36px;
                position: relative;
                z-index: 2;
                padding-top: 3rem;;
            }
            #brush {
                width: 160px;
                position: absolute;
                top: 140px;
            }
            #story {
                display: flex;
                flex-direction: row;
                margin: auto;
                #left-side {
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 3rem;
                    #year {
                        font-size: 84px;
                        font-weight: bold;
                        margin-right: 6rem;
                        margin-left: auto;
                    }
                    img {
                        margin-top: 2rem;
                        margin-right: 5rem;
                    }
                }
                #right-side {
                    margin-top: 7rem;
                    width: 400px;
                    h3 {
                    }
                    p {
                        font-size: 14px;
                        line-height: 24px;
                    }
                }
            }
        }
    }
</style>