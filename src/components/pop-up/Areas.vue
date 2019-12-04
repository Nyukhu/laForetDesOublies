<template>
    <first-part
            :payload="payload.first"
            :properties="properties"
            :id="1"/>
<!--    <second-part-->
<!--            :payload="payload.second"-->
<!--            :properties="properties"-->
<!--            :id="2"/>-->
    <third-part :properties="properties"/>
</template>

<script>
    import FirstPart from "../parts/FirstPart";
    import SecondPart from "../parts/SecondPart";
    import ThirdPart from "../parts/ThirdPart";

    export default {
        name: "Areas",
        components: {SecondPart, FirstPart, ThirdPart},
        props: {
            properties: {type: Object}
        },
        data: () => ({
            payload: {
                first: {
                    tribu: {
                        name: 'YANOMAMI'
                    },
                    title: 'DES TERRES PROTÉGÉES MAIS <br> TOUJOURS MENACÉES',
                    explications: {
                        quote: 'Notre terre doit être respectée. <br> Elle est notre héritage : un <br> héritage qui nous protège.',
                        signature: '- Davi Kopenawa , un Yanomami',
                        description: 'Avec une superficie de six millions de kilomètres carrés, la forêt amazonienne est la plus grande zone de forêt ancienne tropicale de la planète. Véritable trésor de biodiversité, elle est pillée et ravagée de plus en plus chaque année.'
                    },
                    chart: {
                        title: 'ÉVOLUTION DE LA DÉFORESTATION <br> DES TERRES INDIGÈNES',
                        description: 'Les terres indigènes sont de plus en plus menacées par la déforestation. En 2019, plus de 386,9 km2 de ces terres ont été ravagées.'
                    }
                },
                second: {
                    title: 'LES TERRES INDIGÈNES LES PLUS TOUCHÉES <br> PAR LA DÉFORESTATION',
                    description: 'La tribu des Awà est la quatrième tribu la plus touchée par la déforestation sur la période 2008 à 2019..'
                }
            }
    }
</script>

<style scoped>

</style>