<template>
  <div class="root" ref="root">
     <Header :showRuleName="showRuleName" title="转账资料">
     </Header>
     <div class="container">
         <h4 class="title">
             收款账号信息
         </h4>
         <div class="rowStyle">
             <div><span>收款银行</span><span>{{result.bankName}}</span></div>
             <div> <span @click="copyArticle" class="copy">复制</span> </div>
         </div>
         <div class="rowStyle">
             <div><span>充值码</span><span>{{result.payee}}</span></div>
             <div ><span @click="copyArticle" class="copy">复制</span></div>
         </div>
         <div class="rowStyle">
             <div><span>收款支行</span><span>{{result.openPoint}}</span></div>
             <div ><span @click="copyArticle" class="copy">复制</span></div>
         </div>
         <div class="rowStyle">
             <div><span>收款账号</span><span>{{result.account}}</span></div>
             <div ><span @click="copyArticle" class="copy">复制</span></div>
         </div>
         <div class="rowStyle">
             <div><span>充值码</span><span>{{code}}</span></div>
             <div ><span @click="copyArticle" class="copy">复制</span></div>
         </div>
         <div style="margin:0.2rem 0">
             <div class="rowStyle">
                <div><span>存入时间</span><input type="text" v-model="inTime"/></div>
                <div><img src="./../../timeK.png" alt=""></div>
             </div>
             <div class="rowStyle">
                <div><span>存入金额</span><input type="text" v-model="inDeposited"/></div>
                <div><img src="./../../dele.png" alt=""></div>
             </div>
             <div class="rowStyle">
                <div><span>存款人姓名</span><input type="text" v-model="accountName" placeholder="请输入存款人姓名"/></div>
                <div></div>
             </div>
         </div>
         <div class="chooseWay clearfiex" @click.stop="choosedWay($event)">
          <div id="1">
             <img src="./confirm.png" alt="" v-if="isConfirm==1" class="confirm">
             <img src="./ring.png" alt="" v-else class="ring"> 
             网银转账
           </div>
           <div id="4">
             <img src="./confirm.png" alt="" v-if="isConfirm==4" class="confirm">
             <img src="./ring.png" alt="" v-else class="ring"> 
             ATM自动柜员机
           </div>
           <div id="2">
             <img src="./confirm.png" alt="" v-if="isConfirm==2" class="confirm">
             <img src="./ring.png" alt="" v-else class="ring"> 
             ATM现金入款
           </div>
           <div id="5">
             <img src="./confirm.png" alt="" v-if="isConfirm==5" class="confirm">
             <img src="./ring.png" alt="" v-else class="ring"> 
             银行柜台转账
           </div>
           <div  id="3">
             <img src="./confirm.png" alt="" v-if="isConfirm==3" class="confirm">
             <img src="./ring.png" alt="" v-else class="ring"> 
             手机银行转账
           </div>
           <div id="6">
             <img src="./confirm.png" alt="" v-if="isConfirm==6" class="confirm">
             <img src="./ring.png" alt="" v-else class="ring"> 
             其他
           </div>
         </div>
         <div class="stopWrapper">
           <div class="proStap">上一步</div>
           <div class="payed" @click="payed">我已支付</div>
         </div>
     </div>
  </div>
</template>

<script>
import Header from "base/header/header";
import { getData } from "@/api/timeUtil";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      showRuleName: false,
      result: "",
      code: "",
      inDeposited: "",
      accountName: "",
      inTime: "",
      isConfirm: null,
      account: ""
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      this.inTime = getData();
      this.result = this.$store.state.bankdetal;
      this.inDeposited = this.$store.state.chamount;
      this.code = Math.random()
        .toString(36)
        .substr(2, 4)
        .toUpperCase();
      this.$store.state.bankid = this.$store.state.bankdetal.id;
    },
    //  复制
    copyArticle(event) {
      var range = document.createRange();
      range.selectNode(
        event.currentTarget.parentNode.parentNode.children[0].children[1]
      );

      var selection = window.getSelection();
      if (selection.rangeCount > 0) selection.removeAllRanges();
      selection.addRange(range);

      document.execCommand("copy");
      Toast("复制成功");
    },
    //绑定转账方式
    choosedWay(e) {
      if (e.target.nodeName == "DIV") {
        this.isConfirm = e.target.getAttribute("id");
      }
      if (e.target.className == "ring") {
        this.isConfirm = e.target.parentNode.getAttribute("id");
      }
    },
    // 绑定支付按钮
    payed(){
      this.$router.push('/rechargedetaling')
    },
  },
  components: { Header }
};
</script>

<style scoped lang='less'>
@import "../../../../common/less/variable.less";
@import "../../../../common/less/info.less";
.title {
  height: 0.8rem;
  line-height: 0.8rem;
  padding-left: 0.2rem;
}
.rowStyle {
  display: flex;
  justify-content: space-between;
  height: 0.84rem;
  padding: 0 0.2rem;
  align-items: center;
  background: @color-background-result;
  border-bottom: 0.01rem solid @color-border-e4;
  div {
    span:nth-child(1) {
      width: 2rem;
      display: inline-block;
    }
  }
  div:last-child {
    text-align: right;
    .copy {
      width: 1rem;
      text-align: center;

      padding: 0.1rem 0.2rem;
      color: @color-text-active;
      border: 0.01rem solid @color-border-active;
      border-radius: 0.1rem;
    }
    img {
      width: 24px;
      text-align: center;
    }
  }
}
.chooseWay {
  // display: flex;
  // align-items: center;
  background: @color-background-result;
  div {
    float: left;
    width: 50%;
    height: 0.8rem;
    line-height: 0.8rem;
    padding-left: 0.3rem;
    img {
      vertical-align: middle;
    }
  }
}
.stopWrapper {
  margin: 0.4rem auto;
  display: flex;
  justify-content: space-around;
  div {
    width: 2rem;
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: center;
    color:@color-text-lll;
    border-radius: 0.1rem;
    background:@color-background-linear-gradient; 
  }
}
</style>
