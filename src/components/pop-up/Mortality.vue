<template>
    <div id="mortality">
        <first-part
            :payload="payload.first"
            :properties="properties"
            :id="1"/>
        <second-part
            :payload="payload.second"
            :properties="properties"
            :id="3"/>
        <third-part :properties="properties"/>
    </div>
</template>

<script>
    import FirstPart from "../parts/FirstPart";
    import SecondPart from "../parts/SecondPart";
    import ThirdPart from "../parts/ThirdPart";

    export default {
        name: "Mortality",
        components: {SecondPart, FirstPart, ThirdPart},
        props: {
            properties: {type: Object}
        },
        data: () => ({
            payload: {
                first : {
                    tribu: {
                        name: 'KAWAHIVA'
                    },
                    title: 'DES VIES CONSTAMMENT <br> MENACÉES',
                    explications: {
                        quote: '« Les bûcherons peuvent entrer sur leur territoire à tout moment. »',
                        signature: '-  Veri Katukina,  Protecteur des Kawahiva',
                        description: 'La tribu Kawahiva, un petit groupe d’Indiens isolés, est sur le point de disparaître. Ils doivent fuir constamment pour échapper à la violence des étrangers qui envahissent leur forêt. Beaucoup ont été tués lors d’attaques ou des épidémies  '
                    },
                    chart: {
                        title: 'RÉPARTITION DES<br> TYPES DE VIOLENCES SUBITES',
                        description: 'Tous les peuples indigènes brésiliens, soit 900 000 personnes, vivent sous la menace de violence et d’intrusion sur leur terre au quotidien. Leur forêt sacrée devient alors un milieu violent et hostile.'
                    }
                },
                second: {
                    title: 'ÉVOLUTION DU NOMBRE DE <br> MORTS ENTRE 2017 ET 2018',
                    description: 'Si la quantité de suicide chez les indigènes  a légèrement diminué, le bilan reste sévère. De même pour la mortalité infantile. La quantité de meurtre quant à elle ne cesse d’augmenter'
                }
            },
        }),
    }
</script>

<style scoped>

</style>
