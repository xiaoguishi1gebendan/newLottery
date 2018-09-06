<template>
  <div>
     <div class="timeChoose" @click="chooseData">
                <div>{{startDate}}</div>
                <div>至</div>
                <div>{{endDate}}</div>
                <div>
                    选择日期<img src="./arrowR.png" alt="">
                </div>
            </div>
            <div class="states">
                统计
            </div>
            <div class="comAndBet">
                <div class=commission>
                    <div><img src="./count1.png" alt=""></div>
                    <div>
                        <p>佣金</p>
                        <p v-if="ploxy.totalBrokerage">{{ploxy.totalBrokerage.toFixed(2)}}</p>
                        <p v-else>0.00</p>
                    </div>
                </div>
                <div>
                    <div><img src="./count2.png" alt=""></div>
                    <div>
                        <p>投注金额</p>
                        <p v-if="ploxy.totalBettingAmount">{{ploxy.totalBettingAmount.toFixed(2)}}</p>
                        <p v-else>0.00</p>
                    </div>
                </div>
            </div>
            <div class="comminssionDetail">
                <div>期数</div>
                <div>投注金额</div>
                <div>佣金</div>
                <div>投注人数</div>
                <div>状态</div>
            </div>
            <div  style="overflow:scroll" ref="ploxyScroll">
                <div v-if="ploxyStatistics && ploxyStatistics.length>0" >
                  <div class="comminssionDetail" v-for="(item,index) in ploxyStatistics" :key="index"  @click="gtCommissionDtl">
                      <div>{{item.time}}</div>
                      <div>{{item.bettingAmount.toFixed(2)}}</div>
                      <div>{{item.brokerage.toFixed(2)}}</div>
                      <div>{{item.registerCount}}</div>
                      <div><img src="./arrowR.png" alt=""></div>
                  </div>
                </div>
                <div v-else class="noDATA">
                    <img src="./lack1.png" alt="">
                    <h4>暂无佣金记录</h4>
                </div>
            </div>
            
            
            <mt-popup
                v-model="popupVisible"
                position="bottom">
                <div @click="chooseToday">今天</div>
                <div @click="chooseYestoday">昨天</div>
                <div @click="chooseWeek">一周</div>
                <div @click="halfMound" style="border-bottom:0.01rem solid #f5f5f5">半月</div>
                <div @click="cancel">取消</div>
            </mt-popup>

           
  </div>
</template>

<script>
import { Popup } from "mint-ui";
export default {
  data() {
    return {
      startDate: "",
      endDate: "",
      pageNumber: 1,
      pageSize: 10,
      localUserId: "",
      ploxy: {},
    //   totalBettingAmount: "",
    //   totalBrokerage: "",
      popupVisible: false,
      ploxyStatistics: []
    };
  },
  created() {
    this.localUserId = JSON.parse(localStorage.getItem("currentUser")).id;
    this.startDate = this.getNowFormatDate(0);
    this.endDate = this.getNowFormatDate(0);
    this.getData(this.startDate);
  },
  mounted() {
      this.scrollBox();
  },
  methods: {
    scrollBox() {
      let mobileH = window.screen.availHeight;
      let topH = this.$refs.ploxyScroll.offsetTop;
      // let wrapH = (mobileH -topH)*2/100+"rem";
      let wrapH = (mobileH -topH)+"px";
      this.$refs.ploxyScroll.style.height = wrapH;
      
    },
    getData(startDate) {
      baseApi
        .ploxyStatistics(
          this.pageNumber,
          this.pageSize,
          this.localUserId,
          startDate,
          this.endDate
        )
        .then(res => {
          this.ploxy = res.data;
          this.ploxyStatistics = res.data.ploxyStatistics;
        
        });
    },
    // 时间函数
    getNowFormatDate(n) {
      var dd = new Date();
      dd.setDate(dd.getDate() + n); //获取AddDayCount天后的日期
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1; //获取当前月份的日期
      var d = dd.getDate();
      m = m < 10 ? "0" + m : m;
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
    // 选择时间
    chooseData() {
      this.popupVisible = true;
    },
    chooseToday() {
      this.startDate = this.getNowFormatDate(0);
      this.getData(this.startDate);
      this.popupVisible = false;
    },
    chooseYestoday() {
      this.startDate = this.getNowFormatDate(-1);
      this.getData(this.startDate);
      this.popupVisible = false;
    },
    chooseWeek() {
      this.startDate = this.getNowFormatDate(-7);
      this.getData(this.startDate);
      this.popupVisible = false;
    },
    halfMound() {
      this.startDate = this.getNowFormatDate(-15);
      this.getData(this.startDate);
      this.popupVisible = false;
    },
    cancel() {
      this.popupVisible = false;
    },
    gtCommissionDtl() {
        var node = event.currentTarget;
      let qishu = node.childNodes[0].innerHTML;
      this.$store.state.qishu = qishu;
      this.$router.push({
        path: "/commissionDtl",
        params: {}
      });
    }
  },
  components: {}
};
</script>

<style scoped lang='less'>
@import "../../../../common/less/variable.less";
@import "../../../../common/less/info.less";
.timeChoose {
  display: flex;
  height: 0.9rem;
  line-height: 0.9rem;
  padding: 0.1rem 0.2rem;
  background: @color-background-multiple;
  // align-items: center;
  div {
    flex: 1;
    img {
      vertical-align: middle;
    }
  }
}
.states {
  height: 0.9rem;
  line-height: 0.9rem;
  padding: 0.1rem 0.2rem;
}
.comAndBet {
  height: 1.56rem;
  display: flex;
  padding: 0rem 0.2rem;
  margin-bottom: 0.2rem;
  background: @color-background-multiple;
  align-items: center;
  > div {
    flex: 1;
    display: flex;
    p {
      line-height: 0.32rem;
    }
  }
  img {
    height: 0.66rem;
    margin-right: 0.2rem;
  }
}
.comminssionDetail {
  display: flex;
  height: 0.8rem;
  line-height: 0.8rem;
  background: @color-background-multiple;
  > div {
    flex: 1;
    text-align: center;
    font-size: @font-size-28;
  }
}
.noDATA {
  text-align: center;
  padding-top: 0.4rem;
  img {
    width: 3.9rem;
  }
}
.mint-popup.mint-popup-bottom {
  width: 100%;
  text-align: center;
  div {
    width: 100%;
    height: 0.6rem;
    line-height: 0.6rem;
  }
}

</style>
