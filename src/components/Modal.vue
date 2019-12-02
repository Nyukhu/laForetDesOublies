<template>
    <div
        v-if="properties"
        v-show="show"
        id="modal"
    >
        <div id="content">
            <h1> {{ properties.label }}</h1>
            <div id="chart-container">
                <component :is="currentComponent" />
            </div>
        </div>
    </div>
</template>

<script>

    import Mortality from "./graphics/Mortality";
    import Deforestation from "./graphics/Deforestation";
    import Politic from "./graphics/Politic";

    export default {
        name: "Modal",
        components: {Politic, Deforestation, Mortality},
        props: {
            show: { type: Boolean },
            properties: { type: Object },
        },
        mounted () {
            this.clickOutside();
        },
        computed: {
            currentComponent () {
                return this.properties.name.charAt(0).toUpperCase() + this.properties.name.slice(1)
            }
        },
        methods: {
            clickOutside () {
                let app = document.querySelector('#app');
                let self = this;
                app.addEventListener('click', (event) => {
                    if (event.target.id !== 'modal' && !event.target.classList.contains('items') && !event.target.parentNode.classList.contains('items')) {
                        if (self.show) {
                            self.$emit('update:show', false)
                        }
                    }
                });
            }
        },
    }
</script>

<style
    scoped
    lang="scss">

    #modal {
        position: absolute;
        display: flex;
        flex-direction: column;
        margin: auto;
        height: 80vh;
        width: 80vw;
        background-color: grey;
        z-index: 5;
        #content {
            padding: 2rem 4rem;
        }
    }
</style>