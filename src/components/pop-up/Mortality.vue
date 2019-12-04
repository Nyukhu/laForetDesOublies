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
                    title: 'UNE VIE CONSTAMMENT <br> MENACÉE',
                    explications: {
                        quote: 'Les bûcherons peuvent entrer sur leur territoire à tout moment',
                        signature: '-  Veri Katukina,  Protecteur des Kawahiva',
                        description: 'La tribu Kawahiva est petit groupe d’Indiens isolés est sur le point de disparaître. Ils doivent fuir constamment pour échapper à la violence des étrangers qui envahisse leur forêt. Beaucoup ont été tué lors d’attaques ou des épidémies  '
                    },
                    chart: {
                        title: 'REPARTITION DES DIFFÉRENTES <br> TYPE DE VIOLENCES SUBITENT',
                        description: 'Tous les peuples indigènes brésiliens, soit 900 000 personnes, vivent sous la menace de violence et d’intrusion sur leur terre au quotidien. Leur forêt sacrée devient alors un milieu violent et hostile.'
                    }
                },
                second: {
                    title: 'EVOLUTION DU NOMBRE DE <br> MORT ENTRE 2017 ET 2018',
                    description: 'Si la quantité de suicide en chez les indigène  à légèrement diminuer, le bilan reste sévère. De même pour la mortalité enfantile. La quantité de meurtre quant à elle ne cesse d’augmenter'
                }
            },
        }),
    }
</script>

<style scoped>

</style>