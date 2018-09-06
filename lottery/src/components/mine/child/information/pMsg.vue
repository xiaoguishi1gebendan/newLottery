<template>
  <div class="root">
     <Header :showRuleName="showRuleName" title="个人信息"></Header>
     <div class="container">
         <div>
            <div class="title">{{messageAll.title}}</div>
            <div class="timess">{{messageAll.addTime| dateFmt('YYYY-MM-DD HH:mm')}}</div>
            <div class="content">
                {{messageAll.details}}
            </div>
         </div>
     </div>
  </div>
</template>

<script>
import Header from "base/header/header"
export default {
  data() {
    return {
        showRuleName:false,
        messageAll:'',
    };
  },
  created() {
      this.messageAll = this.$store.state.messageAll;
      
  },
  mounted() {},
  methods: {},
  components: {
      Header,
  }
};
</script>

<style scoped lang='less'>
@import "../../../../common/less/variable.less";
@import "../../../../common/less/info.less";
.container{
    padding:0.12rem;
   
}
.title{
    color:@color-background-activeNumber;
    font-size: @font-size-title;
    height: 0.6rem;
    line-height: 0.6rem;
}
.timess{
    color:@color-text-notice;
}
.content{
    margin-top: 0.16rem;
 font-size: @font-size-28;
}

</style>
