<template>
  <div class="root">
     <Header :showRuleName="showRuleName" title="今日盈亏"></Header>
     <div class="container">
         <div class="contentHint">
             <div class="amount">
                 盈利金额（元）
             </div>
             <div class="ploss">0.00</div>

             <div class="formula">
                <img src="./tips1@2x.png" alt="">
                 <span class="font26">盈亏计算公式：中奖-投注+活动+返点</span>
             </div>
         </div>
         <div class="eachAmount">
             <div>
                 <p>0.00</p>
                 <p>投注金额</p>
             </div>
             <div>
                 <p>0.00</p>
                 <p>中奖金额</p>
             </div>
             <div>
                 <p>0.00</p>
                 <p>活动礼金</p>
             </div>
         </div>
         <div class="eachAmount">
             <div>
                 <p>0.00</p>
                 <p>返点金额</p>
             </div>
             <div>
                 <p>0.00</p>
                 <p>充值金额</p>
             </div>
             <div>
                 <p>0.00</p>
                 <p>提现金额</p>
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
    };
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
.contentHint{
    height: 3rem;
    background: url('./bg@2x.png')   center no-repeat;
    color:@color-text-title;
    position: relative;
    font-size: @font-size-26;
    margin-bottom: 0.2rem;
}
.amount{
    font-size: @font-size-26;
    line-height: 0.25rem;
    text-align: center;
    padding: 0.61rem 0 0.25rem;
}
.ploss{
    font-size:@font-size-60;
    text-align: center;
}
.formula{
    position: absolute;
    bottom: 0rem;
    height: 0.69rem;
    line-height: 0.69rem;
    width: 100%;
    background:rgba(255,255,255,0.7);
    // opacity:0.7;
    img{
        width: 0.34rem;
        height: 0.34rem;
       vertical-align: middle;
       margin: 0 0.23rem;
    }
    .font26{
        font-size: @font-size-26;
    }
}
.eachAmount{
    display: flex;
    background: @color-text-lll;
    >div{
        flex:1;
        height: 1.93rem;
        border-right: 0.01rem solid @color-border;
        border-bottom: 0.01rem solid @color-border;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        >p{
            font-size: @font-size-28;
            line-height: .48rem;
        }
        >p:first-child{
            font-size: @font-size-34;
            color:@color-text-active;
           
        }
    }
}
.eachAmount:last-child{
    >div{
        border-bottom: none;
    }
}
</style>
