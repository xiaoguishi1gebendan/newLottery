<template>
  <div class="wrap">
        <div class="wrap_content">
          <ul class="clearfix">
            <li v-for="(item,index) in lotteryList" :key=index :name="item.type" @click="selectItem(item,index)">
              <div class="item-img" v-if="item.logo"><img  v-lazy="domain+item.logo.fileurl"></div>
              <p class="item-title">{{item.name}}</p>
              <div class="item-time">{{item.remark}}</div>
            </li>
            <li>
              <div class="item-img item-more"><img src="../../common/images/default.jpg"></div>
              <p class="item-title">更多</p>
            </li>
          </ul>
        </div>
      </div>
</template>

<script>
import {config} from 'api/config'

export default {
  props:{
    lotteryList:{
      type:Array,
      default:[]
    }
  },
  data() {
    return {
        domain:config.domain
    }
  },
  methods: {
    selectItem(item,index){
      var gameName = item.name.substr(0,2)
      localStorage.setItem('gameName',gameName)
      this.$emit('select', item, index)
    }
  },
}
</script>

<style scoped lang='less'>

  @import "../../common/less/variable.less";

  .wrap {
      background-color: @color-background-d;
      width:100%;
      box-sizing: border-box;
      padding:.18rem 0 .2rem;
      >.wrap_content {

        >ul {
          width:100%;
          >li {
            float:left;
            box-sizing: border-box;
            width:33.33%;
            height:2.1rem;
            border:1px solid @color-border;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #fff;
            font-size:@font-size-26;
            >.item-img {
              width:1rem;
              height:1rem;
              margin-top:.2rem;
              background-size: 3.95rem, 6.41rem;
              >img {
                width:100%;
                height:100%;
              }
            }
            >.item-more {
              width:1.2rem;
              height:1.16rem;
            }
            >.item-title {
              height:.48rem;
              line-height:.48rem;
            }
            >.item-text{
              color:@color-text-l;
              font-size:@font-size-20;
            }
            >.item-time {
              width:1.88rem;
              height:.3rem;
              line-height:.33rem;
              background: url(./bgColor.png) no-repeat;
              background-size: 1.88rem, .3rem;
              color:@color-text-lll;
              font-size:@font-size-20;
            }
          }
        }
      }
  }
</style>
