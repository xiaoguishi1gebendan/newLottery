<template>
  <div class="recodeDetal">
       <MHeader :showRuleName='false' title="注单详情"> </MHeader>
       <div class="recodeDetalNav">
           <ul class="clearfix recodeDetalNavin1">
               <li>
                   <img src="./i-recharge.png" alt="">
               </li>
               <li>
                   <p>纷纷二八</p>
                   <p>第201807070659期</p>
               </li>
               <li>
                   等待开奖
               </li>
           </ul>
           <ul class="recodeDetalNavin2">
               <li class="clearfix">
                   <span>投注时间</span>
                   <span>2018-07-06 17:46:13</span>
               </li>
                <li class="clearfix">
                   <span>投注单号</span>
                   <span>TZ07069455465464548</span>
               </li>
                <li class="clearfix">
                   <span>投注金额</span>
                   <span>￥86.00元</span>
               </li>
                <li class="clearfix">
                   <span>派送奖金</span>
                   <span>￥0.00元</span>
               </li>
           </ul>
           <div class="recodeDetalNavin3">
               <p>我的投注</p>
               <div>
                   <img src="./bgc.png" alt="">
                   <div>
                       <p>01 02 03 04 05 06 07 08 09 ,01 02 03...【详情】</p>
                       <p>定位胆，标准，定位胆</p>
                   </div>
                      
               </div>
           </div>
           <div class="recodeDetalNavin4">

           </div>
       </div>
  </div>
</template>

<script>
import MHeader from "base/header/header"
export default {
    data() {
      return {

      }
    },
    mounted(){
        
    },
    methods:{

    },
    components: {
        MHeader
    }
}
</script>

<style scoped lang='less'>
.recodeDetal{
    position: absolute;
    top: 0;
    width: 100%;
    height:100%;
    background: #f5f5f5;
    z-index: 111;
    .recodeDetalNav{
        >.recodeDetalNavin1{
             background: #fff;
            height: 1.6rem;
            padding: 0.3rem 0;
            border-bottom: 1px solid #f6f5f5;
            li{
                float: left;
                line-height: 1rem;
            }
            >li:nth-child(1){
                margin-left: 0.26rem;
                img{
                        width: 1rem;
                }
            }
            >li:nth-child(2){
                line-height: 0.5rem;
                text-align: left;
                margin-left: 0.2rem;
                >p:nth-child(1){
                    font-size: 0.32rem;
                }
                >p:nth-child(2){
                    font-size: 0.24rem;
                     color:#999;
                }
            }
            li:nth-child(3){
                float: right;
                margin-right: 0.2rem;
            }
        }
        >.recodeDetalNavin2{
             background: #fff;
            li{
               border-bottom: 1px solid #f6f5f5;
                span{
                    float: left;
                     line-height: 0.9rem;
                     margin-left: 0.26rem;
                     color:#333333;
                }
                span:last-child{
                    float: right;
                     margin-right: 0.26rem;
                     color:#6F6F6F;
                }
            }
        }
        .recodeDetalNavin3{
            >p{
                line-height: 0.86rem;
                color: #666666;
                font-size: 0.28rem;
                text-align: left;
            }
            >div{
                position: relative;
                width: 90%;
                margin-left: 5%;
                img{
                    position: absolute;
                    top: 0;
                    width: 100%;
                    left: 0;
                }
                div{
                    position: absolute;
                    top:  0.54rem;
                    width: 90%;
                    left:5%;
                    z-index:1;
                    p{
                        line-height: 0.45rem;
                    }
                }
            }
        }
    }
}
</style>
