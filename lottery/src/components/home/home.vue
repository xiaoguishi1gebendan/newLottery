<template>
  <div class="home">
    <div class="header">
      <div class="title"></div>
      <div class="header-img" @click="downApp">
        <img src="./app.png">
      </div>
    </div>
    <div class="container">
      <div class="banner">
        <mt-swipe class="homeswipe" :auto="3000" id="homebanner">
          <mt-swipe-item v-for="(item,index) in bannerList" :key="index" >
            <!-- <router-link  :to="'/detailsnotice'+item.activityId"> -->
            <img  src="./banner.png"  alt="">
            <!-- </router-link> -->
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="notice">
        <div class="notice-img"></div>
        <div class="notice-text">
          {{noticeText}}
        </div>
      </div>
      <BuyLetteryAll :lotteryList="lotteryList" @select="selectItem"></BuyLetteryAll>
      <!-- <div class="wrap">
        <div class="wrap_content">
          <ul class="clearfix" v-if=lotteryList>
            <li v-for="(item,index) in lotteryList" :key=index :name="item.type" @click="goLottery(item)">
              <div class="item-img"><img v-lazy="domain+item.logo.fileurl"></div>
              <p class="item-title">{{item.name}}</p>
              <div class="item-time">{{item.remark}}</div>
            </li>
            <li>
              <div class="item-img item-more"><img src="../../common/images/default.jpg"></div>
              <p class="item-title">更多</p>
            </li>
          </ul>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>

  import BuyLetteryAll from 'components/BuyLettery/BuyLetteryAll'
  import {config} from 'api/config'
  import {mapGetters} from 'vuex'

  export default {
    data (){
      return {
        noticeText:"恭喜【0447652】6月15日分分28中奖5152.54元",
        bannerList:[{},{}],
        // lotteryList:[]
      }
    },
     created (){
      //  setTimeout(() => {
      //      this._getLottery()
      //  }, 1000);
     
    },
    computed: {
      lotteryList(){
        return this.$store.state.lotteryList
      }
    },
    methods: {
      _getLottery(){
       this.lotteryList=this.$store.state.lotteryList
      },
      selectItem(item,index){
        localStorage.setItem("lotteryId",item.id);
        this.$router.push({
          path: `/BuyLettery/${item.type}`
        })
      },
      downApp(){
        console.log("will go down page")
      }
    },
    components:{
      BuyLetteryAll
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">

  @import "../../common/less/variable.less";

  .home {
    position:relative;
    width:100%;
    background: @color-background-l;
    >.header {
      position:fixed;
      top:0;
      left:0;
      width:100%;
      height:.88rem;
      line-height:.88rem;
      background:@color-background-o;
      z-index:99;
      >.title {
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -.2rem 0 0 -.835rem;
        width: 1.7rem;
        height: .4rem;
        background: url('./title.png') no-repeat;
        background-size: 1.7rem, .4rem;
      }
      >.header-img {
        float: right;
        padding: 0 .24rem;
        height: 100%;
        img {
          width: .98rem;
          height: .38rem;
          margin-top: 0.25rem
        }
      }
    }
    >.container{
      width:100%;
      padding:.88rem 0 .89rem 0;
      >.banner {
        width:100%;
        height:3.05rem;
        >.homeswipe {
          height:3.05rem;
          img {
            width: 100%;
          }
        }
      }
      >.notice {
        display: flex;
        width:100%;
        height:.7rem;
        align-items:center;
        justify-content:center;
        background: @color-background-l;
        >.notice-img {
          z-index:2;
          margin-left:.26rem;
          width:.56rem;
          height:.32rem;
          background: url('./notice.png') no-repeat;
          background-size: .56rem, .32rem;
        }
        >.notice-text {
          flex:1;
          padding:0 .4rem 0 .2rem;
          font-size:@font-size-24;
          color:@color-text-notice;
          text-align:left;
        }
      }
    }
  }

</style>
