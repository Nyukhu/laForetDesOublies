<template>
    <div id="app">
        <div id="container">
            <a
                id="about-link"
                @click="openAbout()">À propos</a>
            <Map
                :show.sync="show"
                :properties.sync="properties"
                :hovered="hovered"
                class="map"></Map>
            <Modal
                :show="show"
                :properties="properties"
            >
            </Modal>
        </div>
    </div>
</template>

<script>

    import Modal from "./components/Modal";
    import Map from "./components/Map";

    export default {
        name: 'app',
        components: {
            Modal,
            Map
        },
        data: () => ({
            hovered:"",
            show: false,
            properties: null,
        }),
        methods: {
            openAbout() {
                console.log("ok")
                this.properties = {
                    "title":"A propos",
                    "name":"about",
                    "component": "about"
                };
                this.show = true;
                setTimeout(() => {
                    window.scroll({
                        top: 950,
                        left: 0,
                        behavior: 'smooth'
                    });
                }, 300)
            },
            openModal (threat) {
                this.show = true;
                this.properties = threat;
            },
            onEnter (name) {
                this.hovered = name
            },
            onLeave () {
                this.hovered = "";
            }
        }
    }
</script>

<style>
  body {
    margin: 0;
  }
</style>

<style
  lang="scss"
  scoped>

    #app {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        background: url("assets/images/background.png") black no-repeat top right fixed;
        background-size: cover;
        font-family: Ubuntu;
        color: #D7E3D2;
        #container {
            height: 100vh;
            width: 100vw;
            justify-content: center;
            align-items: center;
            padding: 0 8rem 0 8rem;
            display: flex;
            flex-direction: row;
            #header {
                margin-top: 4rem;
                display: flex;
                justify-content: space-between;
                img {
                    position: absolute;
                    top: 170px;
                    left: 180px;
                    width: 240px;
                }
                h1 {
                    font-size: 50px;
                    z-index: 4;
                    margin-top: 0px;
                }
                a {
                    font-size: 24px;
                }
            }
            #legend {
                font-family: Ubuntu;
                font-style: italic;
                font-weight: 300;
                margin-top: 9rem;
                .items {
                    font-size: 24px;
                    display: flex;
                    flex-direction: row;
                    margin-bottom: 60px;
                    p {
                        font-size: 22px;
                    }
                    .points {
                        font-family: Merriweather;
                        border: 2px solid white;
                        width: 55px;
                        height: 55px;
                        border-radius: 50%;
                        display: flex;
                        margin-right: 30px;
                        margin-top: 6px;
                        span {
                            display: flex;
                            margin: auto;
                        }
                    }
                }
            }
            #about-link {
                z-index: 32;
                cursor: pointer;
                position: absolute;
                top: 60px;
                left: 80%;
                opacity: 0.7;
            }
        }
    }

    .menu{
        width: 30%;
    }
    .map{
        width: 70%;
        height: 70%;
        flex-grow: 1;
    }
</style>
