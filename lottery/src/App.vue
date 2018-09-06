<template>
  <div id="app">
    <router-view/>
    <Footer v-show="showFooter"></Footer>
  </div>
</template>

<script>
import Footer from 'components/footer/footer'

export default {
  name: 'App',
  data (){
    return {
      showFooter:true
    }
  },
  components: {
    Footer
  },
  created() {
  },
  methods: {
    isShowOrHide(path){
      if(path=="/Home" || path == "/Mine" || path == "/Discover") {
        this.showFooter = true
      } else {
        this.showFooter = false
      }
    }
  },
  watch:{
    $route: function(newValue, oldValue) {
      this.isShowOrHide(newValue.path);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
    height: 100%;
      width:100%;
}
* {
  margin: 0;
  padding: 0;
}
html {
  height: 100%;
}
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background-color: #f5f5f5 !important;
}
</style>
