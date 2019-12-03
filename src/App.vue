<template>
    <div id="app">
        <div id="container">
            <div id="header">
                <img
                    src="@/assets/images/brush.png"
                    alt="brush">
                <h1>LA FORÊT DES<br> OUBLIÉS.</h1>
                <a>À propos</a>
            </div>
            <div id="legend">
                <div
                    v-for="(threat, i) in threats"
                    :key="'threat'+ i"
                    class="items"
                    @click="openModal(threat)">
                    <div class="points">
                        <span>{{ threat.icon }}</span>
                    </div>
                    <p>{{ threat.label.toUpperCase() }}</p>
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
                    label: 'Déforestation',
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
                    label: 'Protection des terres',
                    name: 'areas',
                    chart: 'areas'
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
        background: url("assets/images/background.png") black no-repeat top right fixed;
        background-size: cover;
        font-family: Ubuntu;
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
        }
    }
</style>
