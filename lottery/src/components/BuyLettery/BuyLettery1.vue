<template>
  <div class="lottery">
    <Header :firstRule="firstRule" :secondRule="secondRule" class="header"></Header>
    <Rules :list="rulesList"  @selectRule='selectRule' ></Rules>
    <div class="result clearfix">
        <div id="waitResult" v-show="roll" ref="waitResult">
          <span v-for="(item,index) in randomRoll" :key="index" class="resultNumber">{{item}}</span>
        </div>
        <div class="leftResult" v-if="websocket" @click="toggle">
          <p class="nowPeriod" >
           {{websocket.lotteryNo.toString().substring(4)}}期开奖号码
          </p>
          <div v-show="!roll">
            <div class="nowResult" v-if="websocket.result === '正在开奖'">
              <span v-for= "(item,index) in randomRoll" :key="index" class="resultNumber">{{item}}</span>
              <img src="./img/arrow-down-g@2x.png" ref="icon">
            </div>
            <div class="nowResult" v-if="websocket.result !== '正在开奖'">
              <span v-for= "(item,index) in websocket.result.split(',')" :key="index" class="resultNumber">{{item}}</span>
              <img src="./img/arrow-down-g@2x.png" ref="icon">
            </div>
          </div>
        </div>
        <div class="rightResult" v-if="websocket">
          <p class="nextPeriod">{{websocket.nextNo.toString().substring(4)}}期投注截止</p>
          <div class="nextTime">{{get(websocket.remainTime)}}</div>
          <!-- <div class="rightIcon"></div> -->
          <img src="./img/arrow-down-g1@2x.png" alt="">
        </div>
        <div class="historyResult" v-show="showHistory">
          <ul class="clearfix historyTitle">
            <li>期号</li>
            <li>开奖号码</li>
          </ul>
          <ul v-for="(item,index) in histortList.slice(0,10)" :key="index" class="clearfix">
            <li class="line">{{item.lotteryNo.toString().substring(4)}}</li>
            <li>
              <img src="./img/line2@2x.png" class="historyLine">
              <span v-for="(item,number) in item.result.split(',')" :key="number">{{item}}</span>
              <section v-if="item.result.split(',')[item.result.split(',').length-2]%2=='0'&&item.result.split(',')[item.result.split(',').length-2]<=4">小双</section>
              <section v-else-if="item.result.split(',')[item.result.split(',').length-2]%2!='0'&&item.result.split(',')[item.result.split(',').length-2]<=4">小单</section>
              <section v-else-if="item.result.split(',')[item.result.split(',').length-2]%2!='0'&&item.result.split(',')[item.result.split(',').length-2]>4">大单</section>
              <section v-else-if="item.result.split(',')[item.result.split(',').length-2]%2=='0'&&item.result.split(',')[item.result.split(',').length-2]>4">大双</section>
              <section v-if="item.result.split(',')[item.result.split(',').length-1]%2=='0'&&item.result.split(',')[item.result.split(',').length-1]<=4">小双</section>
              <section v-else-if="item.result.split(',')[item.result.split(',').length-1]%2!='0'&&item.result.split(',')[item.result.split(',').length-1]<=4">小单</section>
              <section v-else-if="item.result.split(',')[item.result.split(',').length-1]%2!='0'&&item.result.split(',')[item.result.split(',').length-1]>4">大单</section>
              <section v-else-if="item.result.split(',')[item.result.split(',').length-1]%2=='0'&&item.result.split(',')[item.result.split(',').length-1]>4">大双</section>
            </li>
          </ul>
          <div class="showMoreHistory">
            <!-- <i class="iconfont icon-fanhui icon"></i> -->
            <img src="./img/trend@2x.png" alt="">
            <span>查看更多走势</span>
          </div>
        </div>
      </div>
    <div class="wrap">
      <div class="playGame">
        <p><span></span>{{playExplain}}</p>
        <div class="gameContent" id="gameContent">
          <!-- <div class="gameItem">
            <div class="gameItemTitle">
              <span>万位</span>
            </div>
            <div class="gameItemText">
              <ul class="clearfix">
                <li><span>0</span></li>
                <li><span>1</span></li>
                <li><span>2</span></li>
                <li><span>3</span></li>
                <li><span>4</span></li>
                <li><span>5</span></li>
                <li><span>6</span></li>
                <li><span>7</span></li>
                <li><span>8</span></li>
                <li><span>9</span></li>
              </ul>
            </div>
          </div> -->
          <div class="gameItem" v-for="(item,index) in playList" :key="index">
            <div class="gameItemTitle" v-if="playList.length>1">
              <span>{{item.name}}</span>
            </div>
            <div class="gameItemText">
              <ul class="clearfix">
                <li v-for="(value,index) in item.playValueList" :key="index" @click.capture="chooseNumber"><span class="spe" :name="value.value" :class="{'add':value.value.length<2||value.value.match(/\d+/g)?0:1}" >{{value.value}}</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <BaseAttr v-show="baseAttr" ref="baseAttr" @selectBaseAttr="selectBaseAttr"></BaseAttr>
    <NumberBasket @clearBetNumber="clearBetNumber"></NumberBasket>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from "base/header/header"
  import Rules from "base/rules/rules"
  import NumberBasket from "base/numberBasket/numberBasket"
  import BaseAttr from "base/baseAttr/baseAttr"
  import {mapGetters} from 'vuex'
  import {MillisecondToDate,add8Hour,prefixStyle,addClass} from 'common/js/dom.js'


  const transform = prefixStyle('transform')

  export default {
    data() {
      return {
        lotteryId:'',
        rulesList:[],
        firstRule:'',
        secondRule:'',
        roll:true,
        randomRoll:[0,0,0,0,0],
        showHistory:false,
        playList:[],
        playExplain:'',
        isShowOdds:'',
        isOnly:'',
        formula:'',
        baseAttr:'',
        arr:[]
      }
    },
    computed:{
      websocket(){
        for(var i=0;i<this.$store.state.lotteryList.length;i++){
          if(this.$store.state.lotteryList[i].id==this.lotteryId){
            return this.$store.state.lotteryList[i].lotteryDraw
          }     
        }   
      },
      ...mapGetters([
          'lotteryList',
          'histortList',
          'betting',
          'listX'
      ])
    },
    created(){
      this.lotteryId = localStorage.getItem("lotteryId")
    },
    mounted(){
      this._getRules()
      this._getLotteryDraw()
      this.rollNumber()
      this.waitNumber()
      document.getElementsByClassName('wrap')[0].style.height = window.screen.availHeight - document.getElementsByClassName('header')[0].offsetHeight - document.getElementsByClassName('result')[0].offsetHeight + 'px';
    },
    methods:{
      _getLotteryDraw(){
        baseApi.getLotteryDraw(this.lotteryId).then((res)=>{
          if (res.code === 200){
            this.$store.state.histortList= res.data.lotteryDrawList
          }
        })
      },
      _getRules(){
        baseApi.getLotteryDetail(this.lotteryId).then((res)=>{
          if (res.code === 200){
            var basicData = res.data
            this.rulesList = basicData
            this.firstRule = basicData[0].name
            this.secondRule = basicData[0].erjiwanfa[0].name
            this.playList = basicData[0].erjiwanfa[0].sanjiwanfa
            this.playExplain = basicData[0].erjiwanfa[0].playExplain.playCue
            this.isOnly = basicData[0].erjiwanfa[0].isOnly
            this.isShowOdds = basicData[0].erjiwanfa[0].isShowOdds
            this.formula = basicData[0].erjiwanfa[0].formula
            this.baseAttr = basicData[0].erjiwanfa[0].baseAttr
            this.calType = basicData[0].erjiwanfa[0].calType
          }
        })
      },
      clearBetNumber(added){
        added['firstRule']=this.firstRule;
        added['secondRule'] = this.secondRule;
      },
      //选择购买号码
      chooseNumber(e){
        var event = e || window.event;

        //每行不能选择同样的一个号码
        if (this.isOnly === 1){
          var gameContent = document.getElementById("gameContent")
          var allSpan = gameContent.getElementsByClassName('active')
          for (var i=0;i<allSpan.length;i++){
            if (allSpan[i].getAttribute("name") === event.currentTarget.children[0].getAttribute("name") && allSpan[i] !==event.currentTarget.children[0]) {
              allSpan[i].classList.remove('active')
            }
          }
        }
        event.currentTarget.children[0].classList.toggle('active')

        // 获取选取的号码（二维数组）
        var num = document.getElementsByClassName('gameItem')
        this.arr = []
        for (var i=0;i<num.length;i++) {    
          var arr1 = []
          if (num[i].getElementsByClassName('active').length>=1) {
            var span = num[i].getElementsByClassName('active')  
            for(var j=0;j<span.length;j++){
              arr1.push(span[j].innerText)
            } 
          }
          this.arr.push(arr1)
        }
        this.$store.state.betNumber = this.arr
        this.changeBet()
      },

      selectBaseAttr(){
        this.changeBet()
      },
      // 总共3种算法，函数算法||对象算法||基本算法
      changeBet(){
        var baseAttrDom = document.getElementById("baseAttr")
        var localCheckNum = baseAttrDom.getElementsByClassName('active').length
        if (this.baseAttr) {
          var checkNum = this.baseAttr.split(",").length;
        }
        if (this.calType == 2){
          var listX = this.$store.state.listX
          var listN = this.arr[0]
          var listM = this.arr[1]
          console.log(listX.length,listN.length,listM.length)
          var fn = 'calNum(listX,listN,listM)'
          this.$store.state.betting = eval(this.formula + fn)
        } else if(this.calType == 3){
          var headNum = 1
          if (this.baseAttr){
            if (localCheckNum > checkNum) {
              var up = localCheckNum;
              var down = checkNum;
              for (var i = 0; i < checkNum - 1; i++) {
                up = up * (localCheckNum - (i + 1));
                down = down * (checkNum - (i + 1));
              }
              headNum = up / down;
            } else if (localCheckNum == checkNum) {
              headNum = 1;
            } else {
              headNum = 0;
            }
          }
          var formula = eval('(' + this.formula + ')')
          var activeNum = 0
          var bet = 0
          for (var i=0;i<this.arr[0].length;i++){
            for (var key in formula) {
              if (key == this.arr[0][i]){
                activeNum+=parseInt(formula[key])
              }
            }
          }
          // if (this.listX.length<2){
          //   return 
          // } else {
          //   for(var i=1;i<this.listX.length;i++) {           
          //     bet += activeNum*i
          //   }
          // }
          this.$store.state.betting = activeNum * headNum
        } else if (this.calType == 1) {
          var headNum = 0
          var formula = this.formula
          // 有底部
          if (this.baseAttr){
            if (localCheckNum > checkNum) {
              var up = localCheckNum;
              var down = checkNum;
              for (var i = 0; i < checkNum - 1; i++) {
                up = up * (localCheckNum - (i + 1));
                down = down * (checkNum - (i + 1));
              }
              headNum = up / down;
            } else if (localCheckNum == checkNum) {
              headNum = 1;
            }
          } else {headNum = 1} //没底部
          for (var i = 0; i < this.arr.length; i++) {
            var nums = 0;
            for (var j = 0; j < this.arr[i].length; j++) {
              if (this.arr[i][j] || this.arr[i][j] == "0") nums++;
            }
            var nNums = "n" + (this.arr.length - i)
            formula = formula.replace(new RegExp("(" + nNums + ")", "g"), nums);
          }
          this.$store.state.betting = eval(formula)* headNum
        }
        if (this.$store.state.betting){
          this.$refs.baseAttr.$el.style.bottom = '2.1rem'
        } else {
          this.$refs.baseAttr.$el.style.bottom = '1.05rem'
        }
      },
      rollNumber(){
        var timer = setInterval(()=>{
          var number =  this.randomNumber(10)
          this.randomRoll = [number,number,number,number,number]
          setTimeout(()=>{
            if (timer&&this.roll) {
              clearInterval(timer)
              this.roll = false
            }
          },2000)
        },50)
      },
      waitNumber(){
        if (timer){
          clearInterval(timer)
        }
        var timer = setInterval(()=>{
          var number =  this.randomNumber(10)
          this.randomRoll = [number,number,number,number,number]
        },50)
      },
      randomNumber(number){
        return Math.floor(Math.random()*number)
      },
      get(msd){
        return MillisecondToDate(msd)
      },
      addHour(msd){
        return MillisecondToDate(add8Hour(msd)) 
      },
      selectRule(first,second,item){
        console.log(this.$store.state.betNumber)
        this.firstRule = first;
        this.secondRule = second;
        this.playList = item.sanjiwanfa
        this.playExplain = item.playExplain.playCue
        this.isShowOdds = item.isShowOdds
        this.isOnly = item.isOnly
        this.formula = item.formula
        this.$store.state.betting = 0
        this.baseAttr = item.baseAttr
        this.calType = item.calType
        console.log(item)
        this.defaultActive()
        if (this.$store.state.betting){
          this.$refs.baseAttr.$el.style.bottom = '2.1rem'
        } else {
          this.$refs.baseAttr.$el.style.bottom = '1.05rem'
        }
      },
      defaultActive(){
        var baseAttr = document.getElementById("baseAttr")
        if (this.baseAttr){
          var arr = this.baseAttr.split(",")
          var spanList = baseAttr.getElementsByTagName('span')
          for (var i=0;i<spanList.length;i++){
            spanList[i].classList.remove('active')
          }
          for (var i=0;i<arr.length;i++){
            document.getElementById(arr[i]).classList.add('active')
          }
        }
      },
      toggle(){
        this.showHistory =!this.showHistory
        this.showHistory? this.$refs.icon.style[transform] ="rotate(180deg)" : this.$refs.icon.style[transform] =""
      }
    },
    watch:{
      playList(){
        var li = document.getElementsByClassName('spe');
        for (var i=0;i<li.length;i++){
          li[i].classList.remove('active')
        }
      }
    },
    components: {
      Header,
      Rules,
      NumberBasket,
      BaseAttr
    }
  }
</script>

<style scoped lang='less'>

  @import "../../common/less/variable.less";
  @import "../../common/icon/QuartzEF.css";

  .lottery {
    position: relative;
    top:0;
    left:0;
    width:100%;
    min-height:100vh;
    background-color: @color-background-main;
    z-index:1111;
    .result {
        position: relative;
        height:1.08rem;
        background-color: @color-background-result;
        z-index:9;
        >#waitResult {
          position:absolute;
          width:50%;
          left:0;
          top:.5rem;
          padding-right:0.3rem;
          font-size:0;
          >.resultNumber {
              display: inline-block;
              width:0.36rem;
              height:0.36rem;
              line-height:0.36rem;
              margin-right:0.1rem;
              background: @color-background-linear;
              border-radius: 50%;
              font-size:@font-size-24;
              text-align: center;
              color:#fff;
            }
        }
        >.leftResult {
          position: relative;
          float:left;
          box-sizing: border-box;
          width:50%;
          height:100%;
          padding-top:0.12rem;
          border-right:0.01rem solid #D8D8D8;
          >.nowPeriod {
            font-size:@font-size-24;
            font-family:PingFang-SC-Medium;
            color:rgba(51,51,51,1);
          }
          >div {
            >.nowResult {
              margin-top:0.14rem;
              .resultNumber {
                display: inline-block;
                width:0.36rem;
                height:0.36rem;
                line-height:0.36rem;
                margin-right:0.1rem;
                background: @color-background-linear;
                border-radius: 50%;
                font-size:@font-size-24;
                font-family:PingFang-SC-Bold;
                color:rgba(255,255,255,1);
              }
              >img {
                position: relative;
                top:-0.05rem;
                left:0.1rem;
                width:0.2rem;
                height:0.11rem;
                transition: all 0.5s;
              }
            }
          }
        }
        >.rightResult {
          position: relative;
          float:left;
          box-sizing: border-box;
          width:50%;
          height:100%;
          padding-top:0.12rem;
          >.nextPeriod {
            font-size:@font-size-24;
            font-family:PingFang-SC-Medium;
            color:rgba(51,51,51,1);
          }
          >.nextTime {
            margin-top:0.14rem;
            height:0.5rem;
            line-height:0.5rem;
            font-size:@font-size-46;
            font-family:'QuartzEF';
            color:#E74C3C;
          }
          >img {
            position: absolute;
            right:0;
            top:50%;
            width:0.17rem;
            height:0.3rem;
            margin-top:-0.15rem;
          }
          // .rightIcon {
          //   position: absolute;
          //   float: inherit!important;
          //   width: 1.2em!important;
          //   display: -ms-flexbox;
          //   display: flex;
          //   -ms-flex-align: center;
          //   align-items: center;
          //   right: 0;
          //   top: 0;
          //   height: 100%!important;
          //   border-right: 1px solid #beb58d;
          //   pointer-events: none;
          //   -ms-flex-pack: end;
          //   justify-content: flex-end;
          // }
          // .rightIcon:after {
          //   content:"";
          //   width:0.2rem;
          //   height:0.2rem;
          //   background-color:#beb58d;
          //   transform: rotate(45deg) translate(0.1rem,-0.05rem);
          // }
        }
        .historyResult {
          position:absolute;
          top:1.08rem;
          width:100%;
          transition: all 0.5s;
          font-size:0;
          >.historyTitle {
            height:0.52rem;
            background: @color-background-history;
            >li {
              height:0.52rem;
              line-height:0.52rem;
              font-size:@font-size-24;
              font-family:PingFang-SC-Medium;
              color:#333333;
            }
          }
          >ul {
            background:@color-background-result;
            li {
              position: relative;
              float:left;
              height:0.42rem;
              line-height: 0.42rem;
              font-size:@font-size-24;
              font-family:PingFang-SC-Medium;
              color:#606060;
              >section {
                display: inline-block;
                height:0.42rem;
                line-height: 0.42rem;
                font-size:@font-size-24;
                color:rgb(73,141,207);
                font-family:PingFang-SC-Bold;
                margin-left:0.05rem;
              }
              >section:nth-of-type(1):after{
                content: "";
                display: inline-block;
                width: .01rem;
                height: .21rem;
                background-color: rgb(73,141,207);
                margin-left: .1rem;
              }
              .historyLine {
                position:absolute;
                left:0;
                top:0;
                width:0.1rem;
                height:0.42rem;
              }
              span {
                display:inline-block;
                width: 0.25rem;
                height:0.42rem;
                line-height: 0.42rem;
                margin:0 0.05rem;
                color:#E24342;
                font-size:@font-size-24;
                font-family:PingFang-SC-Bold;
              }             
            }
            li:nth-child(1) {
              width:1.98rem;
            }
            li:nth-child(2) {
              width:5.52rem;
            }
            // li.line:after {
            //   content: "";
            //   position: absolute;
            //   right: -0.15rem;
            //   top: 0.30rem;
            //   width: 0.25rem;
            //   height: 1px;
            //   background-image: -webkit-linear-gradient(90deg, transparent, transparent 50%, #a7a182 0);
            // }
          }
          // ul:nth-child(1) {
          //   border-bottom:0.01rem solid #a7a182;
          // }
          .showMoreHistory {
            width:100%;
            background: @color-background-history;
            text-align: center;
            height:0.52rem;
            line-height: 0.52rem;
            >img {
              width:0.39rem;
              height:0.24rem;
              margin-right:0.08rem;
              vertical-align: middle;
              font-size:0;
            }
            >span {
              font-size:0.24rem;
              font-family:PingFang-SC-Medium;
              color:#5C5C5C;
            }       
            .icon {
              font-size: 0.2rem;
            }

          }
        }
      }
    >.wrap {
      position: relative;
      padding-bottom:2.1rem;
      width:100%;
      overflow-y: scroll;
      >.playGame {
        width:100%;
        background:@color-background-main;
        >p {
          line-height:0.34rem;
          padding:0.11rem 0.21rem 0.11rem 0.26rem;
          font-size:@font-size-24;
          text-align: left;
          font-family:PingFang-SC-Medium;
          color:rgba(51,51,51,1);
          background:@color-background-notice;
          >span {
            display: inline-block;
            width:0.1rem;
            height:0.1rem;
            background: #f00;
            margin-right:0.1rem;
          }
        }
        >.gameContent {
          margin-top:0.16rem;
          >.gameItem {
            display: flex;
            margin-bottom:0.16rem;
            justify-content:center;
            >.gameItemTitle {
              width:1.1rem;
              margin-top:0.27rem;
              text-align: left;
              >span {
                display: inline-block;
                width:1.04rem;
                height:0.42rem;
                line-height: 0.42rem;
                color: #999074;
                background: url("./img/label.png");
                font-size:@font-size-24;
                background-size:1.04rem 0.42rem;
                text-align: center;
              }
            }
            >.gameItemText {
              flex:1;
              >ul {
                text-align: center;
                padding-right:0.42rem;
                padding-left:0.16rem;
                >li {
                  float:left;
                  box-sizing: border-box;
                  width:20%;
                  height:0.9rem;
                  padding:0.07rem 0;
                  >span {
                    display: inline-block;
                    width:0.76rem;
                    height:0.76rem;
                    line-height: 0.72rem;
                    box-sizing: border-box;
                    background: #fff;
                    border-radius: 50%;
                    font-size:@font-size-34;
                    color:@color-text-number;
                    font-family:PingFang-SC-Bold;
                    border: 1px solid #C2C2C2;
                  }
                  >span.add {
                    width:1.2rem;
                    border-radius: 0.1rem;
                  }
                  >span.active {
                    background:@color-background-activeNumber;
                    color: #fff;
                    border: none;
                  }
                }
              }
            }
          }
        }
      }
    }
    >.footer {
      position:fixed;
      bottom:0;
      left:0;
      right:0;
      height:1rem;
      line-height: 1rem;
      background: #000;
      color:#fff;
      p {
        font-size:@font-size-30;
      }
      
    }
  }
</style>
