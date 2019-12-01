<template>
  <div id="app">
    <div class="background-img"></div>
    <div class="black-bg">
      <Map></Map>
    </div> 
  </div>
</template>

<script>

import Map from "./components/Map";
export default {
  name: 'app',
  components: {
    Map
  },
}
</script>

<style>
  body {
    margin: 0;
    overflow: hidden;
  }
  .black-bg{
    background: linear-gradient(to right, rgba(2, 5, 0,0.9) ,#020500 );
  }
  .background-img{
    width: 100vw;
    height: 100vh;
    background-image: url('~@/assets/images/indigenous.jpg');
    background-position-x: 0vw;
    transform: scaleX(-1);
    position: absolute;
    z-index: -1;
  }
</style>
