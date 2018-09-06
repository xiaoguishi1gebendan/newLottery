<template>
  <div style="background:#EEF1F3;height:100%;position:absolute;top:0;width:100%;z-index:1;">
      <Header :showRuleName="showRuleName" title="分享赚钱">
          <span class="howmade" @click="gohowmoney">如何赚钱</span>
      </Header>
      <div class="container">
          <div class="secTitle">
              <div  :class="isSMoney?'shareMoneyOn':''" @click="gotosMoney">分享赚钱</div>
              <div  :class="isSMoney?'':'shareMoneyOn'" @click="gotoCommission">我的佣金</div>
          </div>
          <div v-if="isSMoney">
              <SMoney></SMoney>
              <!-- <router-view></router-view> -->
          </div>
          <div v-else class="commission">
            <MyCommission></MyCommission>
          </div>
      </div>
  </div>
</template>

<script>
import Header from "base/header/header"
import SMoney from "./sMoney"
import MyCommission from "./myCommission"
export default {
  data() {
    return {
        showRuleName:false,
        isSMoney:true,
    };
  },
  created() {
      
  },
  mounted() {
      this.gotosMoney();
  },
  methods: {
      //跳转到分享赚钱页面
      gotosMoney(){
          this.isSMoney = true
      },
      //跳转到我的佣金页面
      gotoCommission(){
          this.isSMoney = false
      },
      //跳转到如何分享赚钱页面
      gohowmoney() {
      this.$router.push({ path: "/howmoney" });
    },
  },
  components: {
      Header,
      SMoney,
      MyCommission,
  }
};
</script>

<style scoped lang='less'>
@import "../../../../common/less/variable.less";
@import "../../../../common/less/info.less";
.howmade{
    position: fixed;
    top: 0;
    right: 0.2rem;
    height:0.88rem;
    line-height: 0.88rem;
    color:@color-text-title;
}
.secTitle{
    height: 0.9rem;
    line-height: 0.9rem;
    background: @color-background-result;
    display: flex;
    margin-bottom: 0.2rem;
    div{
        flex:1; 
        font-size: @font-size-28;
        text-align: center

    }
    
}
.commission{
    
}

</style>
