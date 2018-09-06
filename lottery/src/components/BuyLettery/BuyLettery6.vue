<template>
  <div class="BuyLettery6">
     <MHeader :firstRule="firstRule" :secondRule="secondRule" @selectTitle='selectTitle'></MHeader>
     <Rules :list="rulesList" @selectRule='selectRule' v-show="!turn"></Rules>
     <!-- 点击的下拉开奖号 -->
     <a href="javascript:" class="de" @click="ifslide" >
                <i class="i"></i>
                <i class="ie"></i>
     </a>
    <!-- 开奖栏 -->
     <div class="BuyLettery6-nav" >
       <ul class="clearfix "  v-if="websocket">
          <li v-if="ifrotate1" style="position: absolute;top: 0.38rem;height: 0.7rem;">
             <p id="rotate1">
              <span></span>
              <span></span>
              <span></span>
             
            </p>
          </li>
         <li>
           <p>{{websocket.lotteryNo.toString().substring(4)}}期开奖号码</p>
            <p v-if="websocket.result!='正在开奖'">
              <img  :src="require('./img/a'+websocket.result.substr(0,1)+'.png')" alt="">
              <img  :src="require('./img/a'+websocket.result.substr(2,1)+'.png')" alt="">
              <img  :src="require('./img/a'+websocket.result.substr(4,1)+'.png')" alt="">
              
           </p>
            <p id="rotate"  v-if="websocket.result=='正在开奖'">
              <span ></span>
              <span ></span>
              <span></span>
              
            </p>
         </li>
         <li  v-if="websocket">
           <p>{{websocket.nextNo.toString().substring(4)}}期投注截止</p>
           <p class="font">{{get(websocket.remainTime)}}</p>
         </li>
       </ul>
     </div>
     <!-- 近期开奖号 -->
     <div class="BuyLettery6-owi" :class="{'animation' : !slide,'noanimation' : !noslide,}" v-if="showslid">
       <div>
            <ul class="BuyLettery6-owinav clearfix">
              <li style="width:25%;">期号</li>
              <li style="width:25%;">开奖号码</li>
              <li style="width:16.6%;">和值</li>
              <li style="width:16.6%;">大小</li>
              <li style="width:16.6%;">单双</li>
            </ul>
       </div>
       
        <div>
           <ul class="BuyLettery6-owimain clearfix" v-for="(item,index) in histortList" :key="index" v-if="index<=20">
              <li style="width:25%;">{{item.lotteryNo.toString().substring(4)}}</li>
              <li style="width:25%;">
                  <img v-if="item.result" :src="require('./img/a'+item.result.substr(0,1)+'.png')" alt="">
                  <img v-if="item.result" :src="require('./img/a'+item.result.substr(2,1)+'.png')" alt="">
                  <img v-if="item.result" :src="require('./img/a'+item.result.substr(4,1)+'.png')" alt="">
              </li>
              <li  style="width:16.6%;">{{parseInt(item.result.substr(0,1))+parseInt(item.result.substr(2,1))+parseInt(item.result.substr(4,1))}}</li>
              <li style="width:16.6%;">{{(parseInt(item.result.substr(0,1))+parseInt(item.result.substr(2,1))+parseInt(item.result.substr(4,1)))>(27/2)?"大":"小"}}</li>
              <li style="width:16.6%;">{{(parseInt(item.result.substr(0,1))+parseInt(item.result.substr(2,1))+parseInt(item.result.substr(4,1)))%2?"单":"双"}}</li>
            </ul>
        </div>
        
        <p><img src="./img/zs.png" alt="">查看更多趋势</p>
     </div>
    <!-- 具体玩法 -->
    <div class="BuyLettery6-play">
      <p>{{playExplain.playCue}}</p>
      <div  class="BuyLettery6-playmain">
        <ul>
          <li v-for="(item,inde) in playGame" :key="inde" class="buylis" >
            <ul  class="clearfix">
              <li class="chooseOnespan" :name="inde"  v-for="(itemx,index) in  item.playValueList" :key="index" :id="itemx.value"  @click="chooseNum"  :class="{'OnespanHeight' : OnespanHeight}">
                <p>{{itemx.value}}</p>
                <p v-if="isShowOdds">赔率{{itemx.odds}}</p>
              </li>
            </ul>
          </li>
        </ul>
        <div v-if="isDaxiaodanshuang">
          <p class="BuyLettery6-playNum">快速选号</p>
          <p class="BuyLettery6-playChoose">
            <span class="spanplayChoose" @click="chooseOne" :id="item" v-for="(item,index) in xuanNum" :key="index">{{item}}</span>
          </p>
        </div>
        
      </div>
    </div>

    <div class="BuyLettery6-bottom" >
      <p v-if="numKai.length" class="p1"><span>当前选号</span>&nbsp;&nbsp;
      <span v-for="(item,index) in numKai" :key="index">
         <span v-for="(itemm,inde) in item" :key="inde" class="span" >{{itemm}}&nbsp;&nbsp;</span>
      </span>
      </p>
      <p v-if="numKai.length" class="p1 p2"><span >每注金额</span><input class="span spanyuan" v-model="eachYuan" @keyup="jumpYuan"><span>可最高中</span><span class="span">123</span><span>元</span></p>
      <p class="p1 p3"><span class="p3cle">清空</span><span class="p3cle_zhu">共{{zhuNum}}注</span><span class="span">{{gongYuan}}元</span> <span class="touZhu">马上投注</span></p>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import { MillisecondToDate} from 'common/js/dom.js'
  import { hasClass} from 'common/js/dom.js'
  import MHeader from "base/header/header"
  import Rules from "base/rules/rules"
  export default {
    data() {
      return {
        lotteryId:"",
        rulesList:"",
        firstRule:"",
        secondRule:"",
        turn:true,
        ifrotate1:true,
        slide:true,
        noslide:false,
        showslid:false,
        playGame:"",
        playExplain:"",
        isShowOdds:"",
        isDaxiaodanshuang:true,
        OnespanHeight:false,
        BuyLettery6playSha:"",
        chooseOnespan:"",
        ifttery6bottom:false,
        lisonly:[],
        isOnly:"",
        xuanNum:["大","小","单","双"],
        numKai:[],
        n1:"",
        n2:"",
        zhuNum:0,
        zhuYuan:"",
        eachYuan:2,
        gongYuan:0,
        formula:""
      }
    },
    computed:{
      websocket(){
        for(var i=0;i<this.lotteryList.length;i++){
          if(this.lotteryList[i].id==this.lotteryId){
            return this.lotteryList[i].lotteryDraw
          }     
        }   
      },

      ...mapGetters([
          'lotteryList',
          'histortList'
        ])
    },
    created() {
       this._getApi();
    },
  mounted(){
  
     this.rote()
     this.rote1()
     this.getLotteryDraw()
  },
  watch: {
    playGame: function (val, oldVal) {
      this.$nextTick(()=>{
           this.BuyLettery6playSha=document.getElementsByClassName("spanplayChoose");
           this.chooseOnespan=document.getElementsByClassName("chooseOnespan");
           this.numKai=[]
           this.gongYuan=0
           this.n1=""
           this.n2=""
           this.zhuNum=0
           this.kuaiSanshed()
      })
    },
  },
  methods:{
    jumpYuan(){
     this.zhusu1()
    },
    // 快三高亮问题
      kuaiSanshed(){
          for (let index = 0; index < this.BuyLettery6playSha.length; index++) {
                this.BuyLettery6playSha[index].classList.remove("bgcYellow")
          }
          for (let index = 0; index < this.chooseOnespan.length; index++) {
                this.chooseOnespan[index].classList.remove("yellowSha")
          }
      },
      chooseOne(){
        // console.log(this.numKai)
        // if(this.numKai.length==3&&this.numKai[0].length==0){
          
        //   this.numKai=[]
        // }
        let bgcYellow= hasClass(event.currentTarget,"bgcYellow");
        let chooseOnespan= this.chooseOnespan;
        for (let index = 0; index < this.BuyLettery6playSha.length; index++) {
        this.BuyLettery6playSha[index].classList.remove("bgcYellow")
        }
        if(bgcYellow){
          //点击大小单双颜色未选中状态时
          event.currentTarget.classList.remove("bgcYellow")
          for (let i = 0; i < chooseOnespan.length; i++) {
                chooseOnespan[i].classList.remove("yellowSha")
            }
        }else{
          //点击大小单双颜色选中状态时
          event.currentTarget.classList.add("bgcYellow")
          if(event.currentTarget.id=="大"){
            for (let i = 0; i < chooseOnespan.length; i++) {
              if(i>=chooseOnespan.length/2){
                  chooseOnespan[i].classList.add("yellowSha")
              }else{
                  chooseOnespan[i].classList.remove("yellowSha")
              }
            }
          }else if(event.currentTarget.id=="小"){
            for (let i = 0; i < chooseOnespan.length; i++) {
              if(i<chooseOnespan.length/2){
                  chooseOnespan[i].classList.add("yellowSha")
              }else{
                  chooseOnespan[i].classList.remove("yellowSha")
              }
            }
          }else if(event.currentTarget.id=="单"){
            for (let i = 0; i < chooseOnespan.length; i++) {
              if(chooseOnespan[i].id%2){
                  chooseOnespan[i].classList.add("yellowSha")
              }else{
                  chooseOnespan[i].classList.remove("yellowSha")
              }
            }
          }else if(event.currentTarget.id=="双"){
            for (let i = 0; i < chooseOnespan.length; i++) {
                console.log(chooseOnespan[i].id%2)
              if(chooseOnespan[i].id%2){
                chooseOnespan[i].classList.remove("yellowSha")
              }else{
                  chooseOnespan[i].classList.add("yellowSha")
              }
            }
          }
        }
        
        this.zhusu1()

      },
      chooseNum(){
        // 点击去除大小单双的高亮
        for (let i = 0; i < this.BuyLettery6playSha.length; i++) {
            this.BuyLettery6playSha[i].classList.remove("bgcYellow")
        }
        console.log(this.numKai)
        if(this.numKai.length==3&&this.numKai[0].length==0){
          this.numKai=[]
        }
      // 根据only判断是否是否能选同值
        if(this.isOnly){
          let yellowSha= hasClass(event.currentTarget,"yellowSha");
          if(yellowSha){
            event.currentTarget.classList.remove("yellowSha");
           
          }else{
            for(var i=0;i<this.lisonly.length;i++){
              if(this.lisonly[i].id==event.currentTarget.id){
                this.lisonly[i].classList.remove("yellowSha");
              }
            }
             event.currentTarget.classList.add("yellowSha");
            this.lisonly.push(event.currentTarget);

          }
          console.log(this.lisonly)
        }else{
           this.numshine()
        }
         this.zhusu1()
      },
      numshine(){
        let yellowSha= hasClass(event.currentTarget,"yellowSha");
        if(yellowSha){
          event.currentTarget.classList.remove("yellowSha");
        }else{
          event.currentTarget.classList.add("yellowSha");
        }
      },
      zhusu1(){
         // 改变注数
         var num=document.getElementsByClassName("yellowSha");
          this.numKai=[];
          var arr=[];
          var arr2=[];
          var n1,n2;
         for(var i=0;i<num.length;i++){
           if(num[i].getAttribute("name")==0){
               arr.push(num[i].id)
           }else{
              arr2.push(num[i].id)
           }
         }
           this.numKai.push(arr);
           if(this.isOnly){
             this.numKai.push(["|"])
              this.numKai.push(arr2);
               n2=arr2.length;
           }
           n1=arr.length;
           if( n2==0&&n1==0){
             this.numKai=[]
           }
          //  计算注数
           this.zhuNum=eval(this.formula)
           this.gongYuan=this.eachYuan* this.zhuNum
      },
      ifslide(){
        this.showslid=true;
        this.slide=!this.slide;
        this.noslide=!this.noslide;
      },
      getLotteryDraw(){
        baseApi.getLotteryDraw(this.lotteryId).then((res)=>{
          if (res.code === 200){
               this.$store.state.histortList= res.data.lotteryDrawList;
              this.$store.state.histortList.splice(20, this.$store.state.histortList.length-20)
          }
        })
      },
      get(msd){
        return MillisecondToDate(msd)
      },
      _getApi(){
        this.lotteryId=localStorage.getItem("lotteryId");
        baseApi.getLotteryDetail(this.lotteryId).then((res)=>{
            if (res.code === 200){
                this.rulesList = res.data;
                this.firstRule = res.data[0].name;
                this.erjiwanfa=res.data[0].erjiwanfa[0];
                this.secondRule = res.data[0].erjiwanfa[0].name;
                this.playGame=res.data[0].erjiwanfa[0].sanjiwanfa;
                this.isShowOdds=res.data[0].erjiwanfa[0].isShowOdds;
                this.playExplain=res.data[0].erjiwanfa[0].playExplain;
                this.isOnly=this.erjiwanfa.isOnly;
                this.formula=this.erjiwanfa.formula
                this.OnespanHeightfunc()
                // 判断是否显示大小单双
                this.isShowDa()
          }
        })
      },
       // 判断是否显示大小单双
      isShowDa(){
        var reg=/^[0-9]+$/
        if (this.erjiwanfa.isOnly == 1) {
             this.isDaxiaodanshuang=false;
        } else if (this.playGame[0].maxNum) {
            this.isDaxiaodanshuang=false;
        } else if (this.playGame[0].valueType == 2) {
           this.isDaxiaodanshuang=false;
        } else if ( this.playGame[0].valueType == 1 &&!reg.test(this.playGame[0].playValueList[0].value) ) {
            this.isDaxiaodanshuang=false;
        } else {
            this.isDaxiaodanshuang = true;
        }   
      },
      selectTitle(turn){
        this.$nextTick(function(){
          this.turn = turn
        })
      },
      // 判断是否增加line-height
      OnespanHeightfunc(){
        if(!this.isShowOdds){
            this.OnespanHeight=true;
        }else{
            this.OnespanHeight=false;
        }
      },
       selectRule(first,second,erjiwanfa){
        this.firstRule = first;
        this.secondRule = second;
        this.erjiwanfa=erjiwanfa;
        this.playGame = erjiwanfa.sanjiwanfa;
        this.isShowOdds=erjiwanfa.isShowOdds;
        this.playExplain=erjiwanfa.playExplain;
        console.log(this.erjiwanfa);
        this.isOnly=this.erjiwanfa.isOnly;
        this.formula=this.erjiwanfa.formula
        this.OnespanHeightfunc()
        // 判断是否显示大小单双
         this.isShowDa()
      },
      // 旋转开奖号
      rote(){
       clearInterval(inter)
        let time=0;
         let i=1;
        var inter=setInterval(()=>{
           var roteP=document.getElementById("rotate");
          if(roteP){
            time++;
            i++
            roteP.classList.remove('rotat1','rotat2','rotat3','rotat4');
            let className=`rotat${i}`
            roteP.classList.add(className)
            i=(i==4?1:i);
          }
        },50)
      },
      rote1(){
        clearInterval(inter)
         let time=0;
         let i=1;
         var inter=setInterval(()=>{
            var roteP=document.getElementById("rotate1");
            if(roteP){
              time++;
              i++
              roteP.classList.remove('rotat1','rotat2','rotat3','rotat4');
              let className=`rotat${i}`
              roteP.classList.add(className)
              i=(i==4?1:i);
              if(time==15){
                clearInterval(inter);
                this.ifrotate1=false;
              }
            }
         
        },50)
      }
  },
  components: {
      MHeader,
      Rules
    }
  }
</script>

<style scoped lang='less'>
@import "../../common/icon/QuartzEF.css";
@import "../../common/less/variable.less";
.BuyLettery6-bottom{
  position: fixed;
  width:100%;
  bottom: 0;
  text-align: left;
  .p1{
    line-height: 0.74rem;
    background:@color-1D5F40;
    color:#fff;
    padding-left: 0.25rem;
    span{
      font-size: 0.3rem;
    }
    .span{
      color:@color-F0C930;
    }
    .spanyuan{
      display: inline-block;
      width:1.65rem;
      height: 0.6rem;
      line-height: 0.6rem;
      background: @color-B1DDCB;
      text-align:center;
      color: @color-154D34;
      border-radius: 0.08rem;
      margin:0 0.1rem;
      font-size:0.32rem;
      color:@color-154D34;
    }
  }
  .p2{
    border-top: 1px solid @color-0E4229;
    line-height: 0.74rem;
    background:@color-1D5F40;
    color:#fff;
    padding-left: 0.25rem;
  }
  .p3{
    line-height:0.9rem;
    background:rgba(30,30,30,1);
    padding-left: 0.25rem;
    position: relative;
    .p3cle{
      display: inline-block;
      width:1.05rem;
      height:0.6rem;
      line-height: 0.6rem;
      text-align: center;
      background:rgba(55,57,59,1);
      border-radius:0.08rem;
      color: @color-C3C3C3;
      font-size: 0.32rem;
    }
    .p3cle_zhu{
      margin-left: 0.1rem;
    }
    .touZhu{
      position: absolute;
      width:1.62rem;
      height:0.6rem;
      line-height: 0.6rem;
      border-radius: 0.08rem;
      background: @color-FFBA00;
      color:#1E1E1E;
      margin-top: 0.15rem;
      right: 0.25rem;
      text-align: center;
    }
  }
}
// 改变高度和line-height
.OnespanHeight{
  height: 0.8rem !important;
  >p{
    line-height: 0.8rem !important;
  }
  
}
// 点击高亮
.yellowSha{
  border:2px solid @color-F0C930 !important;
  >p{
    color:@color-F0C930
  }
}
.bgcYellow{
  background: @color-F0C930;
  color:@color-1F603D !important;
}
.BuyLettery6{
  background: @color-287B57;
  height:100%;
  .BuyLettery6-playNum{
    margin-top: 0.3rem;
    line-height: 0.5rem;
    font-size: 0.28rem;
    color:#fff;
  }
  .BuyLettery6-playChoose{
    
    span{
      display: inline-block;
      width:1.68rem;
      height:0.58rem;
      border: 2px solid @color-639C83;
      border-right:none;
     
      color:0.36rem;
      line-height: 0.58rem;
      font-size: 0.36rem;
      color:#fff;
    }
    span:last-child{
       border: 2px solid @color-639C83;
       border-radius:0 0.1rem 0.1rem 0 ;
    }
    span:first-child{
      border-radius: 0.1rem 0 0 0.1rem;
    }
  }
}
.BuyLettery6-play{
  >p{
    line-height: 0.52rem;
    text-align: left;
    padding-left: 0.3rem;
    background: @color-13432A;
    color: #fff;
  }
  >.BuyLettery6-playmain{
    >ul{
      >li{
        >ul{
          margin-top: 0.25rem;
          >li{
            float: left;
            width:1.5rem;
            height: 0.8rem;
            border: 2px solid @color-639C83;
            border-radius: 0.1rem;
            margin-top: 0.25rem;
            margin-left: 0.3rem;
            color:#fff;
            background: @color-337B4E;
            >p:nth-child(1){
              font-size: 0.36rem;
              line-height: 0.45rem;
            }
            >p:nth-child(2){
              font-size: 0.18rem;
            }
          }
        }
      }
    }
  }
}
    .animation{
        overflow: hidden;
        animation:mymove 1s ease-in-out  1 alternate forwards;
        -webkit-animation:mymove 1s ease-in-out  1 alternate forwards; /*Safari and Chrome*/
    }

    @keyframes mymove{
        from {height:0px;}
        to {height:5.24rem;}
    }

    @-webkit-keyframes mymove {/*Safari and Chrome*/
         from {height:0px;}
        to {height:5.24rem;}
    }
    .noanimation{
        overflow: hidden;
        animation:nomymove 1s ease-in-out  1 alternate forwards;
        -webkit-animation:nomymove 1s ease-in-out  1 alternate forwards; /*Safari and Chrome*/
    }

    @keyframes nomymove{
        from {height:5.24rem;}
        to {height:0rem;}
    }

    @-webkit-keyframes nomymove {/*Safari and Chrome*/
         from {height:5.24rem;}
        to {height:0rem;}
    }
.BuyLettery6-owi{
  background: @color-216F4E;
  height:0;
  overflow: hidden;
  position: absolute;
  width: 100%;
  >div{
     >ul{
        >li{
          font-size: 0.24rem;
          color: #A1BDA6;
          float: left;
          line-height: 0.52rem;
          height:0.52rem;
        }
        
      }
      .BuyLettery6-owimain{
        height:0.52rem;
        >li:nth-child(2){
          border-right: 1px dashed @color-063D27;
        }
      }

  }
        >p{
        border-top: 1px solid @color-2d5042;
        line-height: 0.52rem;
        background: @color-1E5F41;
        color:@color-A1BDA6;
        img{
          width:0.39rem;
          margin-right:0.1rem;
        }
      }
  >div:nth-child(1){
     ul{
        border-bottom: 1px solid @color-2d5042;
        
      }
  }
  >div:nth-child(2){
        height:4.2rem;
        overflow-y: scroll;
        >ul{
          >li:nth-child(2){
              font-size: 0.24rem;
              color: #A1BDA6;
              float: left;
              height:0.52rem;
              padding-top: 0.08rem;
              >img{
                width:0.34rem;
              
              }
            }
        }
  }
 
}
.BuyLettery6-nav{
  
  margin-top: 0.88rem;
  border-bottom: 1px solid @color-063D27;
  >ul{
    position: relative;
    z-index: 9;
    >li{
      float: left;
      width:50%;
      height: 1.08rem;
      background: @color-216F4E;
      color:#fff;
      p{
        margin-top:0.12rem;
        font-size: 0.24rem;
        img{
          width:0.52rem;
        }
      }
    }
    >li:nth-child(1){
      border-right:1px solid @color-063D27;
      box-sizing: border-box;
     
      
    }
    #rotate{
      width:1.65rem;
      margin:0 auto;
      overflow: hidden;
      
      span{
        float: left;
        width:0.55rem;
        height:0.55rem;
        background-size: 0.55rem 0.55rem;
      }
     
    }
     #rotate1{
      width:1.65rem;
      margin:0 auto;
      overflow: hidden;
    
      span{
        float: left;
        width:0.55rem;
        height:0.55rem;
        background-size: 0.55rem 0.55rem;
      }
     
    }
  }
}
.i{
    display: inline-block;
    width: 0.25rem;
    height:0.26rem;
    background: #6AAC91;
    transform:rotate(45deg);
  }
  .ie{
    position: absolute;
    left: -0.1rem;
    display: inline-block;
    width: 0.5rem;
    height: 0.25rem;
    top:-0.1rem;
    background:@color-216F4E;
  }
  .de{
    position: absolute;
    left:50%;
    margin-left:-0.8rem;
    top:1.35rem;
    z-index: 99;
    //  transform:rotate(45deg);
  }
 
.font{
  font-family:'QuartzEF';
  font-size:0.36rem !important;
}
.rotat1{
  >span:nth-child(1){
    background: url('./img/c1.png') no-repeat left center;
  }
  >span:nth-child(2){
    background: url('./img/c2.png') no-repeat left center;
  }
  >span:nth-child(3){
    background: url('./img/c4.png') no-repeat left center;
  }
}
.rotat2{
  >span:nth-child(1){
    background: url('./img/c2.png') no-repeat left center;
  }
  >span:nth-child(2){
    background: url('./img/c1.png') no-repeat left center;
  }
  >span:nth-child(3){
    background: url('./img/c3.png') no-repeat left center;
  }
}
.rotat3{
  >span:nth-child(1){
    background: url('./img/c3.png') no-repeat left center;
  }
  >span:nth-child(2){
    background: url('./img/c4.png') no-repeat left center;
  }
  >span:nth-child(3){
    background: url('./img/c1.png') no-repeat left center;
  }
}


.rotat4{
  >span:nth-child(1){
    background: url('./img/c4.png') no-repeat left center;
  }
  >span:nth-child(2){
    background: url('./img/c3.png') no-repeat left center;
  }
  >span:nth-child(3){
    background: url('./img/c2.png') no-repeat left center;
  }
}
</style>
