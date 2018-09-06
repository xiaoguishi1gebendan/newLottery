<template>
  <div class="root">
    <div id="mheader">
      <Header :showRuleName="showRuleName" title="信息公告"></Header>
    </div>
      
      <div class="container">
          <div class="infoClass">
            <!-- <div><span class="alls infoOn" @click="chooseClass('')" ref="alls">全部</span></div> -->
            <div><span class="alls infoOn" @click="accountD()" ref="alls">全部</span></div>
            <!-- <div v-for="(inte,index) in arrAll" :key="index" :id="inte.split('-')[0]" @click="chooseClass(inte.split('-')[0])"> -->
            <div v-for="(inte,index) in arrAll" :key="index" :id="inte.split('-')[0]" @click="recharge(inte.split('-')[0])">
              <span :class="id==inte.split('-')[0] ? 'infoOn' :''  ">{{inte.split('-')[1]}}</span>
            </div>
          </div>
        <div style="height:0.2rem;" id="recordP">
          
          <div v-if="messageAll&&messageAll.length" ref="srollTOP" :style="{ height:heighted+'px'}" class="recordMain">
            <scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
                <ul >
                  <li class="lieach" v-for="(item,index) in messageAll" :key="index" @click="readMsg(item.isView)" :id="item.id" >
                      <router-link :to="'/PMsg/'+item.id">
                          <div class="liWrapper">
                            <div class="details">
                                <div :class="(item.isView == 1) ? 'message-read' : 'UNread'">{{item.title}}</div>
                                <div >{{item.addTime| dateFmt('YYYY-MM-DD HH:mm')}}</div>
                            </div>
                            <div><img src="./arrowR.png" alt=""></div>
                          </div>
                      </router-link>
                  </li>
              </ul>
            </scroll>
          </div>
          <div v-else class="noData">
              <img src="./../../lack1.png" alt="">
              <h3>暂无消息记录</h3>
              <h5>大奖不等待，速去购彩去吧~</h5>
          </div>
        </div>
      </div>    
     <transition name="slide">
          <router-view/>
     </transition>
  </div>
</template>

<script>
import Header from "base/header/header";
import scroll from "components/flash/flash";
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      showRuleName: false,
      arrAll: [],
      id: "",
      userid: "",
      pageSize: 10,
      pageNumber:1,
      messageAll: [],
      heighted:'',
      flashtype:1,
      flagID:'',
    };
  },
  created() {
    this.initTab();
    this.chooseClass("");
  },
  mounted() {
    this.heighted=window.screen.availHeight-document.getElementById('mheader').offsetHeight-document.getElementsByClassName("infoClass")[0].offsetHeight-document.getElementById('recordP').offsetHeight;
  },
  methods: {
    onRefresh(done) {
      if(this.flashtype==1){
             this.accountD('');
        }else if(this.flashtype==2){
            this.recharge()
        }
        
        done(); 
    },
    onInfinite(done){
      this.more = this.$el.querySelector(".load-more");
      this.more.style.display='block'
      if(this.flashtype==1){
            this.id = '';
         this.chooseClass1()
        }else if(this.flashtype==2){
            this.id = this.flagID;
            this.chooseClass1()
        }
      done();
    },
    accountD(){
        this.flashtype=1;
         this.pageNumber=1;
         this.id = '';
         this.chooseClass()
     },
     recharge(id){
         this.flashtype=2;
         this.id = id;
         this.flagID = this.id
         this.pageNumber=1;
         this.chooseClass()
     },
    //初始化tab
    initTab() {
      let dict = JSON.parse(localStorage.getItem("dictList"));
      this.arrAll = dict["message-type"];
      this.userid = JSON.parse(localStorage.getItem("currentUser")).id;
    },
    //选择信息公告类型
    chooseClass() {
      // this.id = id;
      if (this.userid) {
        baseApi.messageList(this.pageSize, this.pageNumber, this.userid, this.id).then(res => {
          if(res.code==200){
            this.messageAll = res.data.messageList;
          }else{
             this.messageAll =[];
          }
          
        });
      }
      // if(this.id){
      //   document.getElementsByClassName('alls')[0].classList.remove("infoOn")
      // }else{
      //   document.getElementsByClassName('alls')[0].classList.add("infoOn")
      // }
      
    },
    chooseClass1() {
      if (this.userid) {
        this.pageNumber++;
        baseApi.messageList(this.pageSize, this.pageNumber, this.userid, this.id).then(res => {
          if(res.code==200){
            if(!res.data.messageList.length){
                 Toast('已经加载全部信息');
                 this.more.style.display='none';
                 this.pageNumber--
             }else{
                 this.messageAll.push(res.data.messageList)
             }
            
          }
          
        });
      }
      // if(this.id){
      //   document.getElementsByClassName('alls')[0].classList.remove("infoOn")
      // }else{
      //   document.getElementsByClassName('alls')[0].classList.add("infoOn")
      // }
      
    },
    //   是否已读
    readMsg(a) {
      console.log(a);
      var userMsgDetailsId = event.currentTarget.id;
      console.log(this.$route.params);
      if (a == 0) {
        baseApi.viewMessage(this.userid, userMsgDetailsId).then(
            (res)=>{
                
            }
        );
      }
      for (var i = 0; i < this.messageAll.length; i++) {
        if (userMsgDetailsId == this.messageAll[i].id) {
          this.$store.state.messageAll = this.messageAll[i];
          console.log(this.$store.state.messageAll);
        }
      }
      console.log(this.$store.state.messageAll);
    }
  },
  components: {
    Header,
    scroll
  }
};
</script>

<style scoped lang='less'>
@import "../../../../common/less/variable.less";
@import "../../../../common/less/info.less";

.infoClass {
  display: flex;
  height: 0.8rem;
  line-height: 0.8rem;
  position: relative;
  z-index: 1000;
  background: #fff;
  > div {
    flex: 1;
    > span {
      padding: 0.06rem;
    }
    > span:hover {
      // border-bottom: 0.06rem solid red;
    }
  }
}
.container .message-read{
  color:@color-text-d;
  font-size: @font-size-32;
}
.noData{
  text-align: center;
  margin-top: 0.4rem;
  img{
    width: 52%;
  }
  h5{
    margin-top: 0.2rem;
    color:@color-text-l;
  }
}
.recordMain{
  position: relative;
}
</style>
