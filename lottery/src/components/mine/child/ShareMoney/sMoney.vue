<template>
  <div>
     <div class="randomCode">
        <div>邀请码</div>
        <div>
            <input type="text" v-model="inviteCode" placeholder="6位数字的组合">
        </div>
        
        <div class="madeCode"><span @click="MathRand">随机选码</span></div>
    </div>
    <div class="robateAbout">
        <div class="backNet" @click="chooseRabate">
            <div>彩票返点</div>
            <div> {{localRebate}}</div>
            <div class="imgR"><img src="./arrowR.png" alt=""></div>
        </div>
        <div class="robateStyle" v-if="isRobate">
            <ul>
                <li :id="index" :name="item.rebateValue" @click="select" v-for="(item,index) in result" :key="index">
                    {{item.rebateText}}
                </li>
            </ul>
        </div>
    </div>
    
    <div class="">
        <div class="codeLink" @click="sharelink">生成邀请链接分享</div>
        <div class="lookCode" @click="checkma">查看已有邀请码</div>
        <!-- <input type="text" v-model="url" ref="nuim" hidden> -->
        <p ref="nuim" style="margin-bottom: 0.2rem; opacity:0" >{{url}}</p>
    </div>
    <div>
        
    </div>
  </div>
</template>

<script>
// import {MathRand6} from '@/common/js/dom'
import { MessageBox, Toast } from "mint-ui";
export default {
  data() {
    return {
      inviteCode: "",
      userid: "",
      result: "",
      isRobate: false,
      val: "",
      localRebate: "",
      url: ""
    };
  },
  created() {
    this.userid = JSON.parse(localStorage.getItem("currentUser")).id;
  },
  mounted() {
    this.chRabate();
  },
  methods: {
    //   随机选码
    MathRand() {
      baseApi.randomCode(this.userid).then(res => {
        this.inviteCode = res.data;
      });
    },
    chooseRabate() {
      this.isRobate = !this.isRobate;
    },
    chRabate() {
      baseApi.rebateList(this.userid).then(res => {
        this.result = res.data;
        console.log(res);
      });
    },
    //选择赔率
    select() {
      this.isRobate = !this.isRobate;
      this.val = event.currentTarget.innerText.split("(")[0];
      this.localRebate = event.currentTarget.getAttribute("name");
    },
    //   生成链接
    sharelink() {
      var reg = /^[0-9]{6}$/;
      if (this.inviteCode && reg.test(this.inviteCode)) {
        if (this.localRebate) {
          baseApi
            .buildCode(this.userid, this.inviteCode, 1, this.localRebate)
            .then(res => {
              if (res.code == 200) {
                var that = this;
                that.url =
                  JSON.parse(localStorage.getItem("sysConfigMap")).webLink
                    .cvalue +
                  "?code=" +
                  this.inviteCode;
                MessageBox({
                  title: "复制链接分享:",
                  message: this.url,
                  confirmButtonText: "复制"
                }).then(action => {
                  that.copyArticle();
                });
              }
            });
        } else {
          Toast("请选择彩票返点");
        }
      }else{
        Toast("请生产邀请码");
      }
    },
    // 复制生成的链接
    copyArticle() {
      var range = document.createRange();
      var nuim = this.$refs.nuim;
      range.selectNode(nuim);
      var selection = window.getSelection();
      if (selection.rangeCount > 0) selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      let instance = Toast("复制成功");
      setTimeout(() => {
        instance.close();
      }, 600);
    },
    // 查看已有邀请码  todo
    checkma() {
      //   this.$store.state.daiLiType = 2;
      //   this.$router.push({ path: "/daili/dailitwo" });
    }
  },
  components: {}
};
</script>

<style scoped lang='less'>
@import "../../../../common/less/variable.less";
@import "../../../../common/less/info.less";
.randomCode {
  display: flex;
  padding: 0 0.3rem;
  height: 1rem;
  background: @color-background-l;
  line-height: 1rem;
  border-bottom: 0.01rem solid @color-border;
  > div {
    flex: 1;
    font-size: @font-size-32;
    color: @color-text-ll;
  }
  .madeCode {
    text-align: right;
    span {
      color: @color-text-active;
      padding: 0.1rem 0.16rem;
      border: 0.01rem solid @color-text-active;
      border-radius: 0.05rem;
    }
  }
}
.backNet {
  display: flex;
  height: 1rem;
  padding: 0 0.3rem;
  background: @color-background-l;
  line-height: 1rem;
  // justify-content: space-between;
  > div {
    flex: 1;
    font-size: @font-size-32;
    color: @color-text-ll;
    img {
      vertical-align: middle;
      transform: rotate(90deg);
      -ms-transform: rotate(90deg); /* IE 9 */
      -moz-transform: rotate(90deg); /* Firefox */
      -webkit-transform: rotate(90deg); /* Safari 和 Chrome */
      -o-transform: rotate(90deg);
    }
  }
  .imgR {
    text-align: right;
  }
}
.codeLink {
  width: 70%;
  line-height: 1rem;
  margin: 0 auto;
  background: @color-background-linear-gradient;
  border-radius: 0.05rem;
  margin-top: 55%;
  text-align: center;
  color: @color-text-title;
  margin-bottom: 0.2rem;
}
.lookCode {
  width: 70%;
  line-height: 1rem;
  margin: 0 auto;
  border-radius: 0.05rem;
  text-align: center;
  color: @color-text-active;
  border: 0.01rem solid @color-text-active;
}
.robateAbout {
  position: relative;
}
.robateStyle {
  position: absolute;
  height: 6.6rem;
  overflow-y: auto;
  width: 100%;
  background: @color-background-main;
  ul {
    text-align: center;
    li {
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: @font-size-32;
    }
  }
}
</style>
