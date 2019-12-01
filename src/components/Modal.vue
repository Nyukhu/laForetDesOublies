<template>
    <div
        v-if="properties"
        v-show="show"
        id="modal"
    >
        <h1> {{ properties.title }}</h1>
        <p> {{ properties.name }}</p>
    </div>
</template>

<script>
    export default {
        name: "Modal",
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
                    if (event.target.id !== 'modal' && !event.target.classList.contains('points')) {
                        if (self.show) {
                            self.$emit('update:show', false)
                        }
                    }
                });
            }
        }
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
        background-color: red;
        z-index: 5;
    }
</style>