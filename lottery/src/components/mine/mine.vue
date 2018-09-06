<template>
  <div>
      <div class="mine-header">
          <div class="mine-user ">
             <ul class="clearfix">
                 <li><img src="./i-avatar.png" alt=""></li>
                 <li>
                     <p><span>账号：</span><span style="font-size:0.28rem;">&nbsp;{{this.currentUser.account}}</span></p>
                      <p><span>余额:</span><span>&nbsp;{{this.currentUser.balance.toFixed(2)}}</span></p>
                 </li>
                 <li>
                     <p><img src="./vip.png" alt=""></p>
                     <p><img src="./openeye.png" alt=""></p>
                 </li>
             </ul>
          </div>
          <div class="mine-recharge">
              <ul class="clearfix">
                  <li @click="recharge">
                      <p><img src="./i-recharge.png" alt=""></p>
                      <p>我要充值</p>
                  </li>
                  <li @click="withdrawal">
                      <p><img src="./i-withdrawal.png" alt=""></p>
                      <p>我要提现</p>
                  </li>
                  <li @click="trading">
                      <p><img src="./i-trading.png" alt=""></p>
                      <p>交易记录</p>
                  </li>
                  <li @click="bet">
                      <p><img src="./i-betting.png" alt=""></p>
                      <p>投注记录</p>
                  </li>
              </ul>
          </div>
          <div class="mine-list">
              <ul>
                  <li @click="safeSetting">
                      <p>
                          <span><img src="./i-set.png" alt=""></span>
                          <span>安全设置</span>
                      </p>
                  </li>
                   <li @click="daili">
                      <p>
                          <span><img src="./i-agent.png" alt=""></span>
                          <span>代理中心</span>
                      </p>
                  </li>
                   <li @click="ProfitLoss">
                      <p>
                          <span><img src="./i-profit.png" alt=""></span>
                          <span>今日盈亏</span>
                      </p>
                  </li>
                   <li @click="ShareMoney">
                      <p>
                          <span><img src="./i-share.png" alt=""></span>
                          <span>分享赚钱</span>
                      </p>
                  </li>
                   <li @click="Bulletin">
                        <p>
                            <span><img src="./i-notice.png" alt=""></span>
                            <span>信息公告</span>
                        </p>
                  </li>
                   <li @click="Online">
                      <p>
                          <span><img src="./i-customer.png" alt=""></span>
                          <span>在线客服</span>
                      </p>
                  </li>
              </ul>
          </div>
      </div>
     <transition name="slide">
          <router-view/>
     </transition>
  </div>
</template>

<script>

export default {
  data() {
    return {
        currentUser:""
    }
  },
  created () {
       this.currentUser= JSON.parse(localStorage.getItem("currentUser"))
  },
 mounted(){
     
 },
 methods:{
     bet(){
         this.$router.push("/bet")
     },
     recharge(){
         this.$router.push("/Recharge")
     },
     withdrawal(){
       if(!this.currentUser.userCardList.length){
           this.$router.push("/Withdraw")
       }else{

       }
          this.$router.push("/Withdraw")
     },
     trading(){
         this.$router.push("/record")
     },
     safeSetting(){
         this.$router.push("/safeSetting")
     },
     daili(){
         this.$router.push("/agent")
     },
     ProfitLoss(){
         this.$router.push("/ProfitLoss")
     },
     ShareMoney(){
        this.$router.push("/ShareMoney")
     },
     Bulletin(){
         this.$router.push("/Bulletin")
     },
     Online(){
         this.$router.push("/Online")
     }
 },
 components: {
 }
}
</script>

<style scoped lang='less'>
@import "../../common/less/variable.less";
.mine-header{
    height:2.3rem;
    width:100%;
   background: url(./bg-header.png) no-repeat left center;
   background-size: 100% 2.3rem;
    >.mine-user{
        >ul{
            height:2.3rem;
            >li{
                
                float: left;
                font-size: @font-size-30;
                 margin-top:0.56rem;
            }
            >li:nth-child(1){
                width:1.76rem;
                >img{
                    width:1.2rem;
                   
                }
            }
            li:nth-child(2){
                text-align: left;
                 margin-top:0.7rem;
                line-height: 0.5rem;
                color:@color-background-l;
                margin-right:0.1rem;
            }
            li:nth-child(3){
                margin-top:0.7rem;
                >p:nth-child(1){
                    >img{
                        width:0.96rem;
                        height:0.5rem;
                    }
                }
                >p:nth-child(2){
                     >img{
                        width:0.5rem;
                        height:0.3rem;
                    }
                }
            }
        }
    }
    >.mine-recharge{
        background: @color-background-l;
          height:1.7rem;
        >ul{
            >li{
                float: left;
              
                font-size: 0.26rem;
                width: 25%;
                margin-top: 0.3rem;
                
                >p{
                   
                    img{
                        width:0.72rem;
                    }
                }
                >p:nth-child(2){
                     line-height: 0.6rem;
                }
            }
        }
    }
    >.mine-list{
        margin-top:0.2rem;
        background: #fff;
        ul{
            li{
            font-size:0.28rem;
            height: 1rem;
            line-height: 1rem;
            margin-left:0.26rem;
            border-bottom: 1px solid #e5e5e5;
            margin-right:0.26rem;
            p{
                overflow: hidden;
                span{
                    float: left;
                        img{
                            width:0.4rem;
                            position: relative;
                            top:0.1rem;
                            margin-right:0.2rem;
                    }
                }
            }
                
        }
        li:last-child{
            border-bottom: none;
        }
        }
    }
}
</style>
