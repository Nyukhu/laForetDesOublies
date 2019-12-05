<template>
    <div 
        id="about">
        <div id='wrap'>

            <!-- header --->
            <header>
                <div id='title'>
                    <h1>À PROPOS</h1>
                    <img class='brush' src='../../assets/images/about/brush.svg'>
                </div>
                <span id='go_back'><a href='http://adrienguedes.fr/laforetdesoublies/'>
                </a></span>
            </header>

            <!-- logo --->
            <section id='logo'>
                <div class='content image'>
        <span>
          <img src='../../assets/images/about/gobelins.png'>
          <img src='../../assets/images/about/logo_campus.png'>
          <img src='../../assets/images/about/survival.png'>
        </span>
                </div>
            </section>

            <!-- sources --->
            <section id='sources'>
                <h2>SOURCES</h2>
                <div class='content sources'>
        <span>
          <p><a href="https://terrasindigenas.org.br">terrasindigenas.org.br</a></p>
          <p><a href="http://terrabrasilis.dpi">terrabrasilis.dpi</a></p>
          <p><a href="https://journals.openedition.org">journals.openedition.org</a></p>
          <p><a href="https://cimi.org.br">cimi.org.br</a></p>
        </span>
                    <span>
          <p><a href="https://www.survivalinternational.fr">survivalinternational.fr</a></p>
          <p><a href="https://pib.socioambiental.org">pib.socioambiental.org</a></p>
          <p><a href="https://censo2010.ibge.gov.br">censo2010.ibge.gov.br</a></p>
          <p><a href="https://www.amazoniasocioambiental.org">amazoniasocioambiental.org</a></p>
        </span>
                </div>
            </section>

            <!-- étudiants --->
            <section id='students'>
                <h2>TRAVAIL ÉTUDIANT</h2>
                <div class='content'>
        <span>
          <p><strong>GRAPHISTES</strong></p>
          <p><a href="https://www.lea-pradel.com">Lea Pradel</a></p>
          <p>Jessica De cuyper</p>
          <p><a href="https://www.reygaurezcarla.fr">Carla Rey-Gaurez</a></p>
        </span>
                    <span>
          <p><strong>DÉVELOPPEURS</strong></p>
          <p>Florian Blandin</p>
          <p><a href="http://adrienguedes.fr/">Adrien Guedes</a></p>
        </span>
                </div>
            </section>

        </div>
    </div>
</template>

<script>
    import FirstPart from "../parts/FirstPart";

    export default {
        name: "About",
        components: {FirstPart},
        props: {
            properties: {type: Object},
        }
    }
</script>

<style
    scoped
    lang="scss">
    body{
        font-family: 'Ubuntu', sans-serif;
        background-color:#020500;
    }

    #wrap {
        margin : 50px 12vw 100px 12vw;
    }

    /************ TEXT *************/
    /*******************************/

    h1 {
        color: #F1EEDF;
        margin-bottom: 10px;
        z-index: 100;
        text-align: center;
        z-index: 2;
        position: relative;
    }

    h2 {
        color: #F1EEDF;
        margin-top: 100px;
        margin-bottom: -10px;
    }

    p {
        color: #F1EEDF;
        font-weight: 200;
        font-size: 16px;
    }

    a {
        color: #F1EEDF;
        margin-top: 30px;
        padding-top: 100px;
    }

    strong {
        opacity: 0.2;

    }

    #go_back{
        color: #F1EEDF;
    }

    /************ HEADER *************/
    /*******************************/

    header {
        width: 100%;}

    #title {
        text-align: center;
    }

    .brush {
        margin-top: -100px;
        padding-left: 20px;
        width: 210px;
    }

    #go_back {
        position: absolute;
        top : 50px;
        right: 150px;
        width: 20px;
    }

    /************ COLONE *************/
    /*******************************/

    .content{
        margin-top: 30px;
        display:flex;
    }

    .content span {
        padding-right: 100px;
    }

    /************ IMAGE *************/
    /*******************************/

    .image span img {
        width: 100px;
        margin-right: 80px;
        margin-top: 30px;
    }

    .image span {
        margin-top: 20px;
        align-items: center;
    }

</style>