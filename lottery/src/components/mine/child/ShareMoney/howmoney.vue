<template>
  <div class="root">
      <Header :showRuleName="showRuleName" title="如何分享赚钱" ref='header'></Header>
      <div class="wrap" ref="imgg">
            <img style="width:100%;" :src="domain+'upload/img/popUp/other/share.png'" alt="">
        
      </div>
      
  </div>  
</template>

<script>
import Header from "base/header/header";
import { config } from "api/config";
import { Loadmore } from "mint-ui";
export default {
  data() {
    return {
      showRuleName: false,
      domain: config.domain
    };
  },
  created() {},
  mounted() {
      //滚动盒子
      this.scrollBox();
  },
  methods: {
    //滚动盒子
    scrollBox() {
      let mobileH = window.screen.availHeight;
      let wrapH = mobileH * 2 / 100 - 0.88 + "rem";
      //   let wrapH = mobileH * 2 / 100 - this.$refs.header.style.height() + "rem";
      //   let wrapBox = document.getElementsByClassName('wrap')[0]
      //   wrapBox.style.height = wrapH
      this.$refs.imgg.style.height = wrapH;
    }
  },
  components: {
    Header
  }
};
</script>

<style scoped lang='less'>
@import "../../../../common/less/info.less";
.wrap {
  overflow: auto;
  
}
::-webkit-scrollbar {/*隐藏滚轮*/
    display: none;
    }
</style>
