<template>
  <div>
      <Header :showRuleName="showRuleName" :title="title"></Header>
      <div class="word">
         <div>用户名</div>
         <div>投注金额</div>
         <div>佣金</div>
      </div>
      <div v-if="list && list.length>0">
        <div class="del" v-for="(item,index) in list" :key="index" >
          <div>{{item.account}}</div>
          <div>{{item.bettingAmount.toFixed(2)}}</div>
          <div>{{item.brokerage.toFixed(2)}}</div>
        </div>
      </div>
      <div v-else class="noDATA">
          <img src="./lack1.png" alt="">
          <h4>暂无记录</h4>
      </div>
  </div>
</template>

<script>
import Header from "base/header/header";
export default {
  data() {
    return {
      showRuleName: false,
      title: "",
      time: "",
      localUser: "",
      list:[],
    };
  },
  created() {
    this.time = this.$store.state.qishu;
    this.title = this.$store.state.qishu + "期";
    this.localUser = JSON.parse(localStorage.getItem("currentUser"));
  },
  mounted() {
      this.getData();
  },
  methods: {
    getData() {
      if(!this.time){
        this.$router.go(-1);
        return
      }
      baseApi.ploxyStatisticsDetail(this.localUser.id, this.time)
        .then(result => {
          if (result.code == 200) {
            if (result.data && result.data.length > 0) {
              this.list = result.data;
            } else {
              this.list=[];
            }
          }
        });
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
.word,
.del {
  display: flex;

  line-height: 0.8rem;
  div {
    flex: 1;
  }
}
.word {
  background: @color-background-main;
}
.del {
  background: @color-background-multiple;
}
.noDATA {
  text-align: center;
  padding-top: 0.4rem;
  img {
    width: 3.9rem;
  }
}
</style>
