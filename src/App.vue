<template>
  <div id="app">
    <router-view />
<!--    <service-worker-update-popup />-->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import ServiceWorkerUpdatePopup from '@/pwa/components/ServiceWorkerUpdatePopup.vue'

    @Component({
      name: 'App',
      components: {
        // ServiceWorkerUpdatePopup
      }
    })
export default class extends Vue {}
</script>

<style lang="scss">

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
    margin-top: 60px;
  }
  html,
  body,
  #app,
  .el-container {
    /*设置内部填充为0，几个布局元素之间没有间距*/
    padding: 0px;
    /*外部间距也是如此设置*/
    margin: 0px;
    /*统一设置高度为100%*/
    height: 100%;
  }

</style>
