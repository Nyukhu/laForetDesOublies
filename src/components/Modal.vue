<template>
    <div
        v-if="properties"
        v-show="show"
        id="modal"
    >
        <div id="content">
            <component
                :is="currentComponent"
                :properties="properties"></component>
        </div>
    </div>
</template>

<script>

    import Deforestation from "./pop-up/Deforestation";
    import Mortality from "./pop-up/Mortality";

    export default {
        name: "Modal",
        components: {
            Deforestation,
            Mortality
        },
        props: {
            show: { type: Boolean },
            properties: { type: Object },
        },
        computed: {
            currentComponent () {
                return this.properties.name.charAt(0).toUpperCase() + this.properties.name.slice(1)
            },
        },
        mounted () {
            this.clickOutside();
        },
        methods: {
            clickOutside () {
                let app = document.querySelector('#app');
                let self = this;
                app.addEventListener('click', (event) => {
                    if (event.target.id !== 'modal' && !event.target.classList.contains('items') && !event.target.classList.contains('points') &&  !event.target.parentNode.classList.contains('items')) {
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
        width: 100vw;
        background-color: grey;
        z-index: 5;
        top: 40px;
    }
</style>