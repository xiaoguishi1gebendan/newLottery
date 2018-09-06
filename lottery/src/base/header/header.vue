<template>
  <div class="header">
    <div class="iconfont icon-fanhui icon" @click="goBack">
    </div>
    <p class="playRule" v-if="showRuleName">
      <span class="ruleText">玩法</span>
      <span class="ruleName" @click="changeRule">
        <span>{{firstRule}}-{{secondRule}}</span> 
        <img src="./arrow-down-y@2x.png" ref="iconRule" :class="{iconRule:ruleTurn}">
        <!-- <i ref="iconRule" class="iconfont icon-xiala" :class="{iconRule:ruleTurn}"></i> -->
      </span>
    </p>
    <p v-if="iftitle&&!showRuleName" class="title">
      {{title}}
    </p>
    <slot v-if="ifSoltin"></slot>
    <div class="changeGame" @click="changeGame" v-show="showRuleName">
      <span class="gameName">{{gameName}}</span>
      <img src="./arrow-down-w@2x.png" ref="iconGame">
    </div>
  </div>
</template>

<script>
    import {prefixStyle} from 'common/js/dom.js'
    import {mapGetters} from 'vuex'

    const transform = prefixStyle('transform')

    export default {
      props:{
        firstRule:{
          type:String,
          default:"一星玩法"
        },
        secondRule:{
          type:String,
          default:"一星玩法"
        },
        showRuleName:{
          type:Boolean,
          default:true
        },
        ifSoltin:{
          type:Boolean,
          default:false
        },
        iftitle:{
          type:Boolean,
          default:true
        },
        title:{
          type:String,
          default:''
        }
      },
      
      data(){
        return {
          gameTrun: true,
          gameName:''
        }
      },
      mounted(){
        this.gameName = localStorage.getItem('gameName')
      },
      computed:{
        ...mapGetters([
          'ruleTurn'
        ])
      },
      methods:{
        goBack(){
          this.$router.back()
          this.$store.state.ruleTurn = false
        },
        
        changeRule() {
          
          this.ruleTurn? this.$store.state.ruleTurn = false : this.$store.state.ruleTurn= true
        },
        changeGame() {
          this.$emit('selectGame')
          if (this.gameTrun){
            this.$refs.iconGame.style[transform] = "rotate(180deg)";
            this.gameTrun = false;
          } else {
            this.$refs.iconGame.style[transform] = "";
            this.gameTrun = true;
          }
        }
      }
    }
</script>

<style scoped lang="less">
  @import "../../common/less/variable.less";
  @import "../../common/less/base.less";
 

  .header {
    position:relative;
    width:100%;
    height:0.88rem;
    background:@color-background-header;
    font-size:0.14rem;
    >.icon {
      position: absolute;
      top:0.27rem;
      left:0.26rem;
      font-size:0.32rem;
      color:@color-text-lll;
    }
    >.playRule {
      position:relative;
      box-sizing: border-box;
      display:inline-block;
      height:0.88rem;
      padding:0.1rem;
      color:@color-text-lll;
      font-size:0.14rem;
      >span {
        display: inline-block;
      }
      >.ruleText {
          position: absolute;
          left: -0.3rem;
          top:0.2rem;
          width: 0.2rem;
          font-size: 0.2rem;
          line-height: 0.26rem;
          font-family:PingFang-SC-Regular;
      }
      >.ruleName {
        position: relative;
        box-sizing: border-box;
        max-width:2.53rem;
        height:0.52rem;
        line-height:0.52rem;
        padding:0 0.48rem 0 0.2rem;
        border-radius:0.03rem;
        border:1px solid #ccc;
        font-size:0.14rem;
        margin-top:0.1rem;
        text-align: left;
        text-overflow:ellipsis;
        white-space:nowrap;
        overflow:hidden;
        span {
          font-size:.28rem;
          font-family:PingFang-SC-Medium;
        }
        img {
          position: absolute;
          right:0.2rem;
          top:0.2rem;
          display: inline-block;
          transition: all .5s;
          width:0.2rem;
          height:0.11rem;
        }
        img.iconRule {
          transform: rotate(180deg)
        }
      }
    }
    >.title {
      height:0.88rem;
      line-height: 0.88rem;
      font-size:@font-size-title;
      color:@color-text-title;
      font-family:PingFang-SC-Medium;
    }
    >.changeGame {
      position:absolute;
      top:0;
      right:0;
      height:0.88rem;
      line-height:0.88rem;
      padding:0 0.26rem;
      color:@color-text-lll;
      >span {
        font-size:0.28rem;
        font-family:PingFang-SC-Medium;
        color:rgba(255,255,255,1);
      } 
      >img {
        display: inline-block;
        width:0.2rem;
        height:0.11rem;
        transition: all .5s;
        position: relative;
        top: -0.03rem;
      }
    }
  }

</style>
