<template>
    <div>
        <bar-chart :name="properties.charts[0]" />
        <pie-chart :name="properties.charts[1]" />
    </div>

</template>

<script>
    import BarChart from "../charts/BarChart";
    import PieChart from "../charts/PieChart";

    export default {
        name: "Mortality",
        components: {PieChart, BarChart},
        props: {
            properties: {type: Object}
        }
    }
</script>

<style scoped>

</style>