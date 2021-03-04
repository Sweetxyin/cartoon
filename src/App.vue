<template>
  <div id="app">
    <!-- <index/> -->
    <!-- <img src="./assets/logo.png"> -->
              <!-- 这里的router-link 就是将组件渲染到这里，实际是一个a标签，to写的是path路径，和index.js中是一致的。 -->
              <!-- <router-link to="/duanzi"> duanzi</router-link> -->

    <router-view/>
  </div>
</template>

<script>
// import index from './components/index'
export default {
  name: 'App',
  components:{
    // index
  }
}
</script>

<style>
  #app {
    height: 100%;
  }
/*#app {*/
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*  height: 100%;*/
/*}*/
*{
  padding: 0;
  margin: 0;
}
html,body{
  width: 100%;
  height: 100%;
}

</style>
