<template>
    <div id="app">
        <div id="container">
            <div id="header">
                <img
                    src="@/assets/images/brush.png"
                    alt="brush">
                <h1>Amazon tribes<br> matters.</h1>
                <a>About us.</a>
            </div>
            <div id="content">
                <p id="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <div id="legend">
                    <div
                        v-for="(threat, i) in threats"
                        :key="'threat'+ i"
                        class="items"
                        @click="openModal(threat)">
                        <div class="points">
                            <span>{{ threat.icon }}</span>
                        </div>
                        <p>{{ threat.label }}</p>
                    </div>
                </div>
            </div>
        </div>
        <Modal
            :show.sync="show"
            :properties="properties"
        >
        </Modal>
    </div>
</template>

<script>

    import Modal from "./components/Modal";

    export default {
        name: 'app',
        components: {
            Modal
        },
        data: () => ({
            threats: [
                {
                    icon: 1,
                    label: 'Deforestation',
                    name: 'deforestation',
                    chart: 'deforestation'
                },
                {
                    icon: 2,
                    label: 'Mortalité',
                    name: 'mortality',
                    charts: ['deforestation', 'mortality']
                },
                {
                    icon: 3,
                    label: 'Politique',
                    name: 'politic',
                    chart: 'politic'
                },
            ],
            show: false,
            properties: null,
        }),
        methods: {
            openModal (threat) {
                this.show = true;
                this.properties = threat;
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
        background: url("assets/images/background.png") no-repeat top right fixed;
        background-size: cover;
        font-family: cunia;
        color: #D7E3D2;
        #container {
            height: 100vh;
            width: 100vw;
            padding: 0 8rem 0 8rem;
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
            #content {
                margin-left: 30px;
                #description {
                    font-family: Merriweather;
                    font-size: 13px;
                    width: 420px;
                    margin-top: 30px;
                    line-height: 28px;
                }
                #legend {
                    margin-top: 6rem;
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
            }
        }
    }
</style>
