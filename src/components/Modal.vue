<template>
    <div
        v-if="properties"
        v-show="show"
        id="modal"
    >
        <p>{{ properties.title }}</p>
    </div>
</template>

<script>

    import PieChart from "./charts/PieChart";
    import BarChart from "./charts/BarChart";
    import LineChart from "./charts/LineChart";

    export default {
        name: "Modal",
        components: {LineChart, PieChart, BarChart},
        props: {
            show: { type: Boolean },
            properties: { type: Object },
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
        height: 80vh;
        width: 80vw;
        background-color: grey;
        z-index: 5;
        #content {
            padding: 2rem 4rem;
        }
    }
</style>