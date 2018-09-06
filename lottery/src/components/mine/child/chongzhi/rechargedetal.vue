<template>
  <div class="root">
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
            <p>请选择充值方式 ( 如有问题，请联系 <span @click="gotoService">在线客服</span>)</p>
        </div>
        <div >
            <div class="chooseBank" v-for="(item,i) in bankList" :key="i" :index='i'>
                <div><img src="./../../i-agent.png" alt=""></div>
                <div>
                    <h4>dddd</h4>
                    <p>ffff</p>
                </div>
            </div>
            
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
    // 绑定在线客服
    gotoService(){
        this.$router.push('/Online')
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
    padding:0.2rem;
    background: @color-background-result;
    >div:nth-child(1){
        flex:1;
        text-align: center;
    }
    >div:nth-child(2){
        flex:9;
        padding-left: 0.2rem;
        h3{
            height: 0.6rem;
            line-height: 0.6rem;
        }
    }
}
.hint{
    padding-left: 0.2rem;                                                                                          
    line-height: 0.8rem;
    
    span{
        color:@color-link;
    }
   
}


</style>
