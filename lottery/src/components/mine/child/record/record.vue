<template>
  <div class="record">
      <div id="mheader" >
           <MHeader :showRuleName='false' title="交易记录"> <p class="Daychi" @click="Daychi"><span class="recodeDay">今天</span><span class="recodeDay1"></span> </p></MHeader>
      </div>
       
        <div class="recordNav clearfix">
            <span  @click="accountD" :class="{'on1': on1}">金流类型</span>
            <span @click="recharge" :class="{'on2': on2}">体现记录</span>
            <span @click="drawList" :class="{'on3': on3}">充值记录</span>
        </div>
        
 <p style="height:0.2rem;" id="recordP"></p>
        <div class="recordMain" :style="{ height:heighted+'px'}" v-if="accountDetailList.length">
              
           <scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
            
            <ul >
                <li class="clearfix" v-for="(item,index) in accountDetailList" :key="index">
                    <div>
                        <p>{{item.type}}</p>
                        <p>{{item.addTime| dateFmt('YYYY-MM-DD HH:mm')}}</p>
                    </div>
                    <div :class="{'colorred': item.amount>0,'colorgre': item.amount<=0}">
                        {{(item.amount.toFixed(2))>0?("+"+item.amount.toFixed(2)): (item.amount.toFixed(2))}}
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
        <router-view/>
  </div>
</template>

<script>
import MHeader from "base/header/header"
import scroll from "components/flash/flash";
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
        ifrecodeBottom:false,
        type:"",
        localUser:"",
        pageSize:10,
        pageNumber:1,
        accountDetailList:[],
        on1:false,
        on2:false,
        on3:false,
        heighted:600,
        flashtype:1,
        more:""
    }
  },
 mounted(){
      this.localUser=JSON.parse(localStorage.getItem("currentUser"));
      this.getApi1(this.type)
      this.heighted=document.getElementsByTagName("body")[0].offsetHeight- document.getElementById('mheader').offsetHeight-document.getElementsByClassName("recordNav")[0].offsetHeight-document.getElementById('recordP').offsetHeight;
      console.log(document.getElementById('mheader').offsetHeight)
 },
 methods:{
    onRefresh(done) {
        if(this.flashtype==1){
             this.accountD()
        }else if(this.flashtype==2){
            this.recharge()
        }else if(this.flashtype==3){
            this.drawList()
        }
       
        done(); 
    },
    onInfinite(done) {
        this.more = this.$el.querySelector(".load-more");
        this.more.style.display='block'
        if(this.flashtype==1){
            this.getApi1s(this.type)
        }else if(this.flashtype==2){
            this.getApi2s(this.type)
        }else if(this.flashtype==3){
            this.getApi3s(this.type)
        }
                    
        if(this.accountDetailList.length){
           
        }
                   
        done();
     },    
     Daychi(){
         this.ifrecodeBottom=!this.ifrecodeBottom
     },
     descle(){
         this.ifrecodeBottom=false;
     },

     getApi1(type){
         this.on1=true;
         this.on2=false;
         this.on3=false;
         baseApi.accountDetailList(this.pageSize, this.pageNumber, this.localUser.id, type).then((res)=>{
                this.accountDetailList= res.data.accountDetailsList
            })
     },
     getApi2(type){
         this.on1=false;
         this.on2=true;
         this.on3=false;
         baseApi.rechargeList(this.pageSize, this.pageNumber, this.localUser.id, type).then((res)=>{
             console.log(res)
                this.accountDetailList= res.data.rechargeList
            })
     },
      getApi3(type){
         this.on1=false;
         this.on2=false;
         this.on3=true;
         baseApi.drawList(this.pageSize, this.pageNumber, this.localUser.id, type).then((res)=>{
             console.log(res)
                this.accountDetailList= res.data.drawList
            })
     },
     getApi1s(type){
         this.pageNumber++;
         baseApi.accountDetailList(this.pageSize, this.pageNumber, this.localUser.id, type).then((res)=>{
             if(!res.data.accountDetailsList.length){
                 Toast('已经加载全部信息');
                  this.more.style.display='none';
                 this.pageNumber--
             }else{
                 this.accountDetailList.push(res.data.accountDetailsList)
             }
           })
     },
     getApi2s(type){
         this.pageNumber++
         baseApi.rechargeList(this.pageSize, this.pageNumber, this.localUser.id, type).then((res)=>{
             if(!res.data.rechargeList.length){
                 Toast('已经加载全部信息');
                  this.more.style.display='none';
                  this.pageNumber--
             }else{
                this.accountDetailList.push( res.data.rechargeList)
             }
                
            })
     },
      getApi3s(type){
        this.pageNumber++
         baseApi.drawList(this.pageSize, this.pageNumber, this.localUser.id, type).then((res)=>{
              if(!res.data.drawList.length){
                 Toast('已经加载全部信息');
                  this.more.style.display='none';
                 this.pageNumber--
             }else{
                this.accountDetailList.push( res.data.drawList)
             }
            })
     },
     accountD(){
         this.flashtype=1;
         this.pageNumber=1;
         this.getApi1(this.type)
     },
     recharge(){
         this.flashtype=2;
         this.pageNumber=1;
         this.getApi2(this.type)
     },
     drawList(){
         this.flashtype=3;
         this.pageNumber=1;
         this.getApi3(this.type)
     },
 },
  components: {
      MHeader,
      scroll
  }
}
</script>

<style scoped lang='less'>
.colorred{
    color:#F04747;
}
.colorgre{
    color:#23A253;
}
.on1{
        color:#F14846;
        border-bottom:2px solid #F14846;
    }
.on2{
        color:#F14846;
        border-bottom:2px solid #F14846;
    }
.on3{
        color:#F14846;
        border-bottom:2px solid #F14846;
    }
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
    
.record{
    width:100%;
    height:100%;
    position:absolute;
    top: 0;
    background:#EEF1F3;
    z-index:1;
    overflow: hidden;
    .recordNav{
        width:100%;
        background: #fff;
        position: relative;
            z-index: 111;
        span{
            float:left;
            width:33.33%;
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
}


</style>
