<template>
  <div class="rules" v-show="ruleTurn" @click="hideRule">
    <div class="rulesDetail" v-on:click.stop>
        <div class="firstTitle title" v-show="firstRule">
          <div class="leftLine line"></div>
          {{firstRule}}
          <div class="rightLine line"></div>
        </div>
        <ul class="firstRule clearfix" id="ul">
            <li v-for="(item,index) in list" :key="index" ref="firstLi" @click="selectFirstRule(item,index)" class="firstLi">{{item.name}}</li>
        </ul>
        <div class="secondTitle title">
          <div class="leftLine line"></div>
          {{secondRule}}
          <div class="rightLine line"></div>
        </div>
        <ul class="secondRule clearfix">
            <li v-for="(item,index) in secondList" :key="item.name" ref="secondLi" @click="selectSecondRule(item,index)" class="secondLi">{{item.name}}</li>
        </ul>
       
    </div>
  </div>
</template>

<script>
  import {addClass,removeClass} from 'common/js/dom'
  import {mapGetters} from 'vuex'
  
  export default {
    props:['list'],
    data(){
      return {
        secondList:[],
        firstRule:'',
        secondRule:'',
      }
    },
    mounted(){
      setTimeout(function(){
        if(document.getElementsByClassName('firstLi')){
          addClass(document.getElementsByClassName('firstLi')[0], 'on')
        }
        if (document.getElementsByClassName('secondLi')){
          addClass(document.getElementsByClassName('secondLi')[0], 'on')
        }
      },500)
    },
    computed:{
      // turn(){
      //   return this.$store.state.ruleTurn
      // }
      ...mapGetters([
          'ruleTurn'
      ])
    },
    methods:{
      hideRule(){
        this.$store.state.ruleTurn = false
      },
      selectFirstRule(item,index){
        this.secondList = item.erjiwanfa
        for (var i=0;i<this.$refs.firstLi.length;i++){
          removeClass(this.$refs.firstLi[i],'on')
        }
        addClass(this.$refs.firstLi[index], 'on')
        this.$nextTick(function(){
          for (var i=0;i<this.$refs.secondLi.length;i++){
            removeClass(this.$refs.secondLi[i],'on')
          }
          addClass(this.$refs.secondLi[0], 'on')
          this.secondRule = this.secondList[0].name
          this.firstRule = item.name
          this.$emit('selectRule',this.firstRule,this.secondRule,item.erjiwanfa[0])
        })
        if (item.erjiwanfa.length === 1) {
          this.$store.state.ruleTurn = false
        }
      },
      selectSecondRule(item,index){
        for (var i=0;i<this.$refs.secondLi.length;i++){
          removeClass(this.$refs.secondLi[i],'on')
        }
        addClass(document.getElementsByClassName('secondLi')[index], 'on')
        this.firstRule = document.getElementsByClassName("firstRule ")[0].getElementsByClassName('on')[0].innerText
        this.secondRule = item.name
        this.$store.state.ruleTurn = false
        this.$emit('selectRule',this.firstRule,this.secondRule,item)
      }
    },
    watch:{
      list:function(val,oldVal){
        this.secondList = val[0].erjiwanfa
        this.$nextTick(function(){
          this.firstRule = document.getElementsByClassName('firstLi')[0].innerText
          addClass(document.getElementsByClassName('firstLi')[0], 'on')
          for (var i=0; i<val.length;i++) {
            if (val[i].name.length > 4) {
              addClass(this.$refs.firstLi[i], 'long')
            }  
          }
        })
      },
      secondList:function(val,oldVal){
        this.$nextTick(function(){
          this.secondRule = document.getElementsByClassName('secondLi')[0].innerText
          for (var i=0; i<val.length;i++) {
            if (val[i].name.length > 4) {
              addClass(this.$refs.secondLi[i], 'long')
            }  
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">

  @import "../../common/less/variable.less";

  .rules {
    position: absolute;
    top:0.88rem;
    left:0;
    right:0;
    bottom:0;
    background:rgba(0,0,0,.4);
    font-size:@font-size-24;
    z-index:999;
    >.rulesDetail {
      display: block;
      width:100%;
      padding:0.2rem 0 0.1rem;
      background:@color-background-l;
      >.title {
        position: relative;
        margin-bottom:0.29rem;
        font-size:0.33rem;
        font-family:PingFang-SC-Medium;
        color:#404040;
        .line {
          display: block;
          position: absolute;
          top:0.16rem;
          width:2.4rem;
          height:0.02rem;
          background:#D6D6D6;
        }
        .leftLine {
          left:0.26rem;
        }
        .rightLine {
          right:0.26rem;
        }
      }
      >ul {
        box-sizing: border-box;
        width:100%;
        padding-bottom:0.04rem;
        padding-left:0.15rem;
        >li {
            float:left;
            box-sizing: border-box;
            width:2.09rem;
            height:.6rem;
            line-height:.4rem;
            margin:0 0.15rem 0.16rem;
            padding:0.1rem;
            text-align: center;
            background:@color-background-l;
            border-radius:0.05rem;
            border:1px solid #D8D8D8;
            color:#404040;
            font-size:@font-size-30;
            font-family:PingFang-SC-Medium;
        }
        >li.on {
            background:@color-background-linear-gradient;
            color:@color-text-lll;
        }
        >li.long {
            width:28%;
        }
      }
    }
  }
</style>
