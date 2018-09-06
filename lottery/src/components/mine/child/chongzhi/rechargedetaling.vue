<template>
  <div>
      <Header :showRuleName="showRuleName" :title="title"> </Header>
      <div class="container">
        <div class="rowStyle">
            <div>
                <img src="./../../rechange.png" alt="">
            </div>
            <div>
                <div>
                    <p>恭喜您，您的充值申请已经提交成功</p>
                    <p style="color:#929292">充值金额<span style="color:#fa3956">{{chamount}}</span> 元</p>
                </div>
                <div style="margin-top:0.5rem">
                    <p>正在排队，等待客服进行确认。</p>
                </div>
                <div style="margin-top:1rem">
                    <p >充值成功</p>
                    <p style="color:#929292;font-size:0.12rem;">充值成功后，您的余额将会在1分钟内更新，请稍后查看，若届时未能更新，请联系在线客服。</p>
                </div>
            </div>
        </div>
          
        <div class="confirm" @click="buttonclick">
            确定
        </div>
          
      </div>
  </div>
</template>

<script>
import Header from "base/header/header";
export default {
  data() {
    return {
      showRuleName: false,
      title: "充值进度",
      chamount: ""
    };
  },
  mounted() {
    //   this.chamount =
  },
  methods: {
      buttonclick(){
          this.$router.push('/Mine')
      },
  },
  components: { Header }
};
</script>

<style scoped lang='less'>
@import "../../../../common/less/variable.less";
@import "../../../../common/less/info.less";
.rowStyle {
  display: flex;
  padding: 0.4rem 0.2rem;
  > div:first-child {
    flex: 2;
    text-align: center;
  }
  img {
    width: 0.72rem;
    text-align: center;
  }
  > div:last-child {
    flex: 8;
    div {
      p {
        height: 0.6rem;
        line-height: 0.6rem;
      }
    }
  }
}
.confirm {
  width: 80%;
  margin: 1rem auto;
  color: @color-text-lll;
  background: @color-background-linear-gradient;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  border-radius: @border-radius;
}
</style>
