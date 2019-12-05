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
    import Areas from "./pop-up/Areas";
    import About from "./pop-up/About";

    export default {
        name: "Modal",
        components: {
            Deforestation,
            Mortality,
            Areas,
            About
        },
        props: {
            show: { type: Boolean },
            properties: { type: Object },
        },
        computed: {
            currentComponent () {
                return this.properties.component.charAt(0).toUpperCase() + this.properties.component.slice(1)
            },
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
        background-color: black;
        z-index: 5;
        top: 100vh;
    }
</style>