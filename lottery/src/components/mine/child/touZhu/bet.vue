<template>
  <div class="bet">
      <div id="mheader">
        <MHeader :showRuleName='false' :iftitle="false" title="注单详情"><p class="headerslot">
            <span @click="chooseSpan1" :class="{'spanon':ifspan1}">投注记录</span><span @click="chooseSpan2"  :class="{'spanon':ifspan2}">追号记录</span>
            </p> 
            <p class="Daychi" @click="Daychi"><span class="recodeDay">今天</span><span class="recodeDay1"></span> </p>
       </MHeader>
      </div>
      
        <div class="recordNav clearfix">
            <span class="onpin">全部</span>
            <span>已中奖</span>
            <span >未中奖</span>
            <span>待开奖</span>
        </div>
        
  <p style="height:0.2rem;background:#f5f5f5" id="recordP"></p>
        <div class="recordMain" :style="{ height:heighted+'px'}" >
             
           <scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
            
            <ul >
                <li class="clearfix" @click="goRecodeDetal" v-for="(item,index) in accountDetailList" :key="index">
                    <div>
                        <p> <span>{{item.lotteryName}}</span> <span> ￥{{item.amount.toFixed(2)}}</span> </p>
                        <p>{{item.addTime| dateFmt('YYYY-MM-DD HH:mm')}}</p>
                    </div>
                    <div :class="{'colorred': item.amount>0,'colorgre': item.amount<=0}">
                      {{item.status}} 
                    </div>
                </li>
            </ul>
          </scroll>
        </div>
        <div class="recodeBottom" v-if="ifrecodeBottom">  
            <ul>
                <li>今天</li>
                <li>昨天</li>
                <li>本月</li>
                <li>上月</li>
            </ul>
            <div>取消</div>
            <p @click="descle"></p>
        </div>
        <transition name="slide">
          <router-view/>
     </transition>
  </div>
</template>

<script>
import MHeader from "base/header/header"
import scroll from "components/flash/flash";
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
        ifspan1:true,
        ifspan2:false,
        heighted:600,
        localUser:"",
        pageSize:10,
        pageNumber:1,
        type:"",
        accountDetailList:[],
        more:"",
        flashtype:1,
        ifrecodeBottom:false
    }
  },
 mounted(){
     this.localUser=JSON.parse(localStorage.getItem("currentUser"));
      this.getApi1(this.type)
      this.heighted=document.getElementsByTagName("body")[0].offsetHeight- document.getElementById('mheader').offsetHeight-document.getElementsByClassName("recordNav")[0].offsetHeight-document.getElementById('recordP').offsetHeight;
 },
 methods:{
     descle(){
         this.ifrecodeBottom=false;
     },
     Daychi(){
         this.ifrecodeBottom=!this.ifrecodeBottom
     },
     onRefresh(done) {
        if(this.flashtype==1){
            this.getApi1(this.type)
        }else if(this.flashtype==2){

        }
       
        done(); 
    },
    onInfinite(done) {
        this.more = this.$el.querySelector(".load-more");
        this.more.style.display='block'
        if(this.flashtype==1){
            this.getApi1s(this.type)
        }else if(this.flashtype==2){

        }
                
        done();
     },  
     chooseSpan1(){
         this.ifspan1=true;
         this.ifspan2=false;
         this.flashtype=1;
         this.getApi1(this.type)
     },
     chooseSpan2(){
         this.ifspan1=false;
         this.ifspan2=true;
         this.flashtype=2;
     },
      getApi1(type){
          this.pageNumber=1;
        baseApi.bettingList(this.pageSize, this.pageNumber, this.localUser.id, this.type).then((res)=>{
         if(res.code==200){
             this.accountDetailList=res.data.userBettingList;
         }else{
              Toast(res.message);
         }
       })
     },
     getApi1s(type){
         this.pageNumber++;
         baseApi.bettingList(this.pageSize, this.pageNumber, this.localUser.id, this.type).then((res)=>{
             if(!res.data.userBettingList.length){
                 Toast('已经加载全部信息');
                  this.more.style.display='none';
                 this.pageNumber--
             }else{
                 this.accountDetailList.push(res.data.userBettingList)
             }
           })
     },
     goRecodeDetal(){
         this.$router.push("/recodeDetal")
     },
 },
  components: {
      MHeader,
      scroll
  }
}
</script>

<style scoped lang='less'>
.Daychi{
    position: absolute;
    top: 0;
    right: 0rem;
    width: 1.6rem;
    .recodeDay{
        line-height: 0.88rem;
        color: #fff;
        font-size: 0.28rem;
    }
    .recodeDay1{
        position: absolute;
        top: 0.27rem;
        right: 0.2rem;
        width: 0.2rem;
        height: 0.2rem;
        transform: rotate(45deg);
        border-right: 1px solid #fff;
        border-bottom: 1px solid #fff;
    }
}
.onpin{
    color: #F04747;
    border-bottom:2px solid #F04747
}
 .recordNav{
        width:100%;
        background: #fff;
        position: relative;
            z-index: 111;
        span{
            float:left;
            width:25%;
            line-height:0.8rem;
            
        }
        
    }
    .recordMain{
        position: relative;
        ul{
            >li{
                height: 1.34rem;
                padding: 0.2rem 0;
                background: #fff;
                border-bottom: 1px solid #E5E5E5;
                >div{
                    float: left;
                    >p{
                      line-height: 0.47rem;
                      text-align: left;
                    }
                    p:nth-child(2){
                        color:#999999;
                    }
                }
                >div:first-child{
                    margin-left:0.28rem;
                }
                >div:last-child{
                    float: right;
                    margin-right: 0.2rem;
                     line-height:0.94rem;
                }
            }
        }
    }
    .recodeBottom{
       position: absolute;
       bottom: 0;
       width: 100%;
       z-index: 999;
        >ul{
            height: 3.6rem;
            background: #fff;
            position: relative;
            z-index: 1;
            >li{
                line-height: 0.9rem;
                box-sizing: border-box;
                border-bottom: 1px solid #e5e5e5;
                background: #fff;
            }
        }
        >div{
             background: #fff;
            margin-top: 0.2rem;
            line-height: 0.9rem;
            position: relative;
            z-index: 1;
        }
        p{
            position: fixed;
            top:0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5)
        }
    }
.bet{
    position: absolute;
    top: 0;
    width: 100%;
    height:100%;
    background: #f5f5f5;
    z-index: 1;
}
.headerslot{
       line-height: 0.88rem;
       >span{
           color:#fff;
            border: 2px solid #fff;
            line-height: 0.5rem;
            display: inline-block;
            width: 1.6rem;
            background: transparent;
       }
       >span:nth-child(1){
            border-radius: 0.1rem 0 0 0.1rem;
       }
       >span:nth-child(2){
            border-radius: 0 0.1rem 0.1rem 0;
       }
       .spanon{
            background: #fff;
            color:#F34C42;
       }
}
</style>
