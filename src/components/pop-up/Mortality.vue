<template>
    <div id="mortality">
        <first-part
                :payload="payload"
                :properties="properties"
                :id="1"/>
        <second-part
                :properties="properties"
                :id="2"/>
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
            }
        }),
    }
</script>

<style scoped>

</style>