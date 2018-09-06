// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './common/css/base.css'
import 'common/css/iconfont.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from "./store";
import moment from 'moment';
Vue.config.productionTip = false
Vue.use(MintUI)


// 接口文件
import   'api/base'
// websocket
import  'api/websocket';
// 事件转化函数


router.beforeEach((to, from, next)=>{
  let token = localStorage.getItem('token');
  const toPath = ['Mine','safeSetting']
  if (toPath.indexOf(to.name)>=0){
    if (!token) {
      router.push({path:"/login"})
    } else {
      next()
    }
  }
  next()
})

window.vm=new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created:function(){
    this.onlosd(),
    this._getLottery()
    
  },
  methods: {
    onlosd() {
      var oHtml = document.getElementsByTagName('html')[0];
      var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
      oHtml.style.fontSize = oWidth / 750 * 100 + 'px';
    },
    webch(){
      for (var i = 0; i < this.$store.state.lotteryList.length; i++) {
        if (this.$store.state.lotteryList[i].lotteryDraw.remainTime >= 0) {
          if (this.$store.state.lotteryList[i].lotteryDraw.remainTime < 1000) {
            this.$store.state.lotteryList[i].lotteryDraw.lotteryNo = parseInt(this.$store.state.lotteryList[i].lotteryDraw.lotteryNo) + 1;
            this.$store.state.lotteryList[i].lotteryDraw.nextNo = parseInt(this.$store.state.lotteryList[i].lotteryDraw.nextNo) + 1;
            this.$store.state.lotteryList[i].lotteryDraw.result = "正在开奖"
            this.$store.state.lotteryList[i].lotteryDraw.remainTime = parseInt(this.$store.state.lotteryList[i].lotteryDraw.nextTime) - parseInt(this.$store.state.lotteryList[i].lotteryDraw.addTime) - 1000
          } else {
            this.$store.state.lotteryList[i].lotteryDraw.remainTime = this.$store.state.lotteryList[i].lotteryDraw.remainTime - 1000;
          }
        } else {
          this.$store.state.lotteryList[i].lotteryDraw.remainTime = parseInt(this.$store.state.lotteryList[i].lotteryDraw.nextTime) - parseInt(this.$store.state.lotteryList[i].lotteryDraw.addTime) + this.$store.state.lotteryList[i].lotteryDraw.remainTime - 1000
        }
      }
    },
    _getLottery() {
      baseApi.lottery().then((res) => {
        if (res.code === 200) {
          this.$store.state.lotteryList = res.data.lotteryList;
          this.webch();

          setInterval(() => {
            this.webch()
          }, 1000)
        }
      })
    },
  },

})
