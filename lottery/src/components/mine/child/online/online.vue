<template>
  <div class="root" ref="root">
     <iframe :src="onlineURL" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sysConfigMap:'',
      onlineURL:'',
    };
  },
  created() {
    this.sysConfigMap = JSON.parse(localStorage.getItem("sysConfigMap"));
    this.onlineURL = this.sysConfigMap.onlineCustomService.cvalue;
  
  },
  mounted() {
    this.$refs.root.style.height = window.screen.availHeight*2/100+'rem';
  },
  methods: {},
  components: {}
};
</script>

<style scoped lang='less'>
.root{
   position:absolute;
  top:0;
  bottom:0;
  width:100%;
  background:#EEF1F3;
  z-index:9;
   overflow: hidden;
   text-align: center;
   .header{
     background: red !important;
   }
}
iframe{
  height: 100%;
  width: 100%;
  text-align: center
}
</style>
