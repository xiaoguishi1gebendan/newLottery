<template>
  <div class="root" ref="root" style="background:#EEF1F3;height:100%;position:absolute;top:0;width:100%;z-index:1;">
    <Header :showRuleName="showRuleName" title="充值" :ifSoltin="ifSoltin">
        <span class="helper">助手</span>
    </Header>
    <div class="container">
        <div class="howmoney">
            <div>请输入充值金额</div>
            <div><input type="text" v-model="choosedVal" ref="choosedVal"></div>
            <div>元</div>
        </div>
        <div class="chooseWrapper" @click.stop="fn($event)">
            <div class="chooseMoney" >
            <div><span mark="50">50元</span></div>
            <div><span mark="100">100元</span></div>
            <div><span mark="300">300元</span></div>
            <div><span mark="500">500元</span></div>
            </div>
            <div class="chooseMoney">
                <div><span mark="1000">1000元</span></div>
                <div><span mark="2000">2000元</span></div>
                <div><span mark="3000">3000元</span></div>
                <div><span mark="5000">5000元</span></div>
            </div>
        </div>
        <div class="hint">
            <p>请选择充值方式 ( 如有问题，请联系 <span>在线客服</span>)</p>
        </div>
        <div class="chooseBank" v-for="(item,i) in bankList" :key="i" :index='i'>
            <div >
                <p><i>收款银行</i><span>{{item.bankName}}</span></p>
                <p><i>收款账号</i><span>{{item.account}}</span></p>
                <p><i>收款人</i><span>{{item.payee}}</span></p>   
                <p><i>收款支行</i><span>{{item.openPoint}}</span></p>
            </div>
            <div  :name="item.account" @click.stop="isChoose($event)">
                <img src="./confirm.png" alt="" v-if="isConfirm==item.account" class="confirm">
                <img src="./ring.png" alt="" v-else class="ring">
            </div>
        </div>
        <div class="nextWrapper">
            <p class="nextStop" @click="chongzhiin">下一步</p>
        </div>
    </div>  
  </div>
</template>

<script>
import Header from "base/header/header"
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
     showRuleName:false,
     ifSoltin:true,
     choosedVal:'',
     currentUser:'',
     bankList:'',
     isConfirm:'',
    //  isConfirm:false,

    };
  },
  created() {
      this.init();
      this.getData();
  
  },
  mounted() {
   
  },
  methods: {
      init(){
         this.currentUser =  JSON.parse(localStorage.getItem('currentUser'));
      },
      getData(){
          //获取银行卡信息
          baseApi.rechargeBankList(this.currentUser.id,"").then(
              (res)=>{
                  this.bankList=res.data.listB
                  console.log(this.bankList);
              }
          );
      },
      fn(e){
          if(e.target.nodeName=='SPAN'||e.target.nodeName=='span'){
            this.choosedVal = (e.target).getAttribute("mark");
            this.$store.state.chamount=Number(this.choosedVal).toFixed(2);
          }
          
      },
    //   绑定下一步按钮
    chongzhiin(){
        if(!this.choosedVal){
            let instance = Toast('请输入金额');
            setTimeout(() => {
            instance.close();
            }, 2000);
            return
        }
        if(!this.isConfirm){
            Toast('请选择银行卡');
            return
        }else{
            this.$router.push("/bankdetal")
        }
        
    },
    isChoose(e){
        if(e.target.nodeName=='IMG'){
            this.isConfirm = e.target.parentNode.getAttribute('name');
            let index  = e.target.parentNode.parentNode.getAttribute('index');
            this.$store.state.bankdetal=this.bankList[index];
        }
    }
  },
  components: {
      Header
  }
};
</script>

<style scoped lang='less'>
@import "../../../../common/less/variable.less";
@import "../../../../common/less/info.less";
.helper{
    position: absolute;
    right: 0.2rem;
    top: 0.3rem;
    color:@color-background-l;
}
.howmoney{
    display: flex;
    padding:0 0.2rem;
    height: 0.8rem;
    line-height: 0.8rem;
    border:0.01rem solid @color-border-e4;
    background: @color-background-result;
    div:nth-child(1){
        flex: 4;
        text-align: left;
    }
    div:nth-child(2){
        flex: 4
    }
    input{
        outline: none;
        border: none;
        color:@color-text-number;
        font-size: @font-size-36;
        text-align: center
    }
    div:last-child{
        flex: 1
    }
}
.chooseWrapper{
    background: @color-background-result;
    text-align: center;
    padding-bottom:0.3rem;
    .chooseMoney{
    display: flex;
    padding-top: 0.2rem;
    div{
        flex:1;
        height: 0.8rem;
        line-height: 0.8rem;
        span{
            width: 1.5rem;
            display: inline-block;
            border: 1px solid @color-border;
        }
    }
    }
}
.chooseBank{
    display: flex;
    align-items: center;
    margin-bottom: 0.2rem;
    background: @color-background-result;
    div:nth-child(1){
        flex:8;
        padding-left:0.3rem;
        p{
            height: 0.6rem;
            line-height: 0.6rem;
            
            
            i{
                width: 1.2rem;
                font-style: normal;
                display: inline-block;
            }
        }
    }
    div:nth-child(2){
        flex:2;
        text-align: center;
        
    }
    
}
.hint{
    padding-left: 0.2rem;
    line-height: 0.8rem;
    
    span{
        color:@color-link;
    }
   
}
.nextWrapper{
    margin-top: 0.6rem;
}
.nextStop{
    width: 60%;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    border-radius:0.1rem;
    color:@color-text-lll;
    background: @color-background-linear-gradient;
    margin: 0 auto;
}
</style>
