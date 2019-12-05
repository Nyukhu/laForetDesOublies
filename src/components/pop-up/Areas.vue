<template>
    <div id="areas">
        <first-part
            :payload="payload.first"
            :properties="properties"
            :id="1"/>
        <fourth-part :payload="payload.fourth"/>
        <fifth-part :payload="payload.fifth"/>
        <second-part
            :payload="payload.second[0]"
            :properties="properties"
            :id="1"/>
        <second-part
            :payload="payload.second[1]"
            :properties="properties"
            :id="2"
            colored
        />
        <third-part :properties="properties"/>
    </div>
</template>

<script>
    import FirstPart from "../parts/FirstPart";
    import SecondPart from "../parts/SecondPart";
    import ThirdPart from "../parts/ThirdPart";
    import FourthPart from "../parts/FourthPart";
    import FifthPart from "../parts/FifthPart";

    export default {
        name: "Areas",
        components: {FirstPart, SecondPart, ThirdPart, FourthPart, FifthPart},
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
                        quote: '« Notre terre doit être respectée. <br> Elle est notre héritage : un <br> héritage qui nous protège. »',
                        signature: '- Davi Kopenawa, un Yanomami',
                        description : 'Les Yanomami constituent le plus grand peuple relativement isolée en Amérique du Sud. Ils vivent dans la forêt tropicale et les montagnes situées au nord du Brésil. Aujourd’hui, les Yanomami peinent à survivre car le gouvernement ne les protège pas des éleveurs  qui envahissent et rasent les forêts de leur territoire.'
                    },
                },
                second: [
                    {
                        title: 'TERRES INDIGÈNES PROTÉGÉES EN AMAZONIE <br> LÉGALES EN KM² PAR ANNÉE'
                    },
                    {
                        title: 'NOMBRE DE TERRITOIRES PROTÉGÉS <br> PAR PRÉSIDENCE',
                    },
                ],
                fourth: {
                    title: 'LES DROITS INDIGÈNES, DES LOIS <br> RÉCENTES',
                    year: 1988,
                    subtitle: 'LES DROITS DES INDIGÈNES ONT ÉTÉ RECONNUS ET INSCRITS DANS LA CONSTITUTION.',
                    description: 'Ils ont le droit de disposer de leurs terres à titre naturel et traditionnel. Cela leur offre un usage exclusif des terres, du sol et de l\'eau présente sur ces territoires. Le gouvernement s\'est engagé à protéger et respecter les indigènes ainsi que leurs traditions et leur cultures en entamant une grande démarcation des terres autochtones.'
                },
                fifth: [
                    {
                        number: 13,
                        description: "DES TERRES BRÉSILIENNES SONT DES TERRES INDIGÈNES PROTÉGÉES"
                    },
                    {
                        number: 305,
                        description: "TRIBUS RECONNUES EN 2019 PAR L'ASSOCIATION SURVIVAL"
                    },
                    {
                        number: 154,
                        description: "DIALECTES SONT PARLÉS À TRAVERS LES DIFFÉRENTES TRIBUS INDIGÈNES"
                    },
                ]
            }
        }),
    }
</script>

<style scoped>

</style>
