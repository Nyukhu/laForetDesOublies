<template>
    <div id="third-part">
        <div id="card">
            <p id="title">COMMENT AGIR ?</p>
            <p id="description">L'un des meilleurs moyens pour obtenir des changements dans la situation actuelle des indigènes c'est d'écrire à ceux qui détiennent le pouvoir. L'association <a href="https://www.survivalinternational.fr/">Survival International</a>vous aide dans cette démarche. Vous pouvez aussi faire un don à l'association.</p>
            <div id="buttons-container">
                <a
                    id="act"
                    class="buttons"
                    href="https://www.survivalinternational.fr/agir/lettres">ÉCRIVEZ UNE LETTRE</a>
                <a
                    id="donate"
                    class="buttons"
                    href="https://www.survivalinternational.fr/donner">FAITES UN DON</a>
                <img
                    id="brush"
                    src="../../assets/images/brush.png" />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ThirdPart"
    }
</script>

<style
    scoped
    lang="scss">
    #third-part {
        font-family: Ubuntu;
        background-color: white;
        height: 500px;
        display: flex;
        color: #F1EEDF;
        z-index: 5;
        position: relative;
        background-color: #090E0C;
        #card {
            padding: 1rem 5rem 6rem 5rem;
            background-color: #090E0C;
            margin: auto;
            width: 400px;
            box-shadow: 0 6px 6px black;
            display: flex;
            flex-direction: column;
            margin-top: -120px;
            #title {
                font-size: 32px;
                font-weight: bold;
                margin-bottom: 0;
            }
            #description {
                font-size: 16px;
                line-height: 22px;
            }
            #buttons-container {
                margin: 3rem auto 0 auto;
                position: relative;
                z-index: 2;
                .buttons {
                    padding: 14px 32px;
                    text-decoration: none;
                }
                #act {
                    background-color: black;
                    color: white;
                    border: 1px solid white;
                    margin-right: 40px;
                }
                #donate {
                    background-color: white;
                    border: 1px solid white;
                    color: black;
                }
                #brush {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 400px;
                    z-index: -1;
                }
            }
        }
    }
</style>
