<template>
    <div class="NumberBasket">
        <div class="betContent">
            <span class="iconfont icon-jiahao icon" v-show="betting" @click="joinBasket"></span>
            <div :class="{show:betting}">
                <h5>共{{betting}}注，{{mount.toFixed(2)}}元</h5>
                <p v-show="betting">
                    <span v-for="(item,index) in betNumber" :key="index">
                        <em v-for="(number,inde) in item" :key="inde">{{number}} </em>
                        <i v-if="betNumber.length === 1 || index===4"></i>
                        <i v-else>{{item.length?",":"-,"}}</i>
                    </span>
                </p> 
            </div>
        </div>
        <div class="betCart" :class="{show:betting}">
            <div>
                <!-- <i class="iconfont icon-lanzi"></i> -->
                <img src="./basket@2x.png" alt="">
                <span>号码篮</span>
                <div class="totalBets" v-show="totalBets">{{totalBets}}</div>
            </div>
        </div>
        <div class="multiple" v-show="betting">
            <span>投</span>
            <div class="multipleLeft">
                <em @click="reduceMultiple">-</em>
                <input type="text" v-model="multiple">
                <em class="noBorder" @click="addMultiple">+</em>
            </div>
            <span>倍</span>
            <div class="multipleRight" @click="chooseUnit">
                <span class="unit active">元</span>
                <span class="unit">角</span>
                <span class="unit">分</span>
            </div>
        </div>    
    </div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {   
    data(){
        return {
            unit:'元',
            multiple:1,
            totalBets:0,
            added:{}
        }
    },
    computed:{
        showBet(){
            if (this.betting){
                return true
            }else {
                return false
            }
        },
        mount(){
            var n;
            if (this.unit==="分"){
                n = 0.01
            }else if(this.unit ==="角") {
                n = 0.1
            } else {
                n = 1 
            }
            return this.betting * this.multiple * 2 * n 
        },
        ...mapGetters([
          'betting',
          'betNumber'
      ])
    },
    // updated(){
    //     var content = document.getElementById("gameContent");
    //         var activeBall = content.getElementsByClassName("active");
    //         console.log(activeBall)
    // },
    methods:{
        joinBasket(){
            this.totalBets++
            var content = document.getElementById("gameContent");
            var activeArr = Array.from(content.getElementsByClassName("active"));
            activeArr.forEach(el => {
                el.classList.remove('active')
            })
            this.added = {
                betting : this.$store.state.betting,
                betNumber : this.$store.state.betNumber,
                mount: this.mount,
                multiple:this.multiple,
                unit:2+this.unit,
            }
            this.$emit('clearBetNumber',this.added);
            this.$store.state.basketList.push(this.added);
            this.$store.state.betting = 0;
            this.$store.state.betNumber = [];
            this.multiple = 1;
            var unitAll = document.getElementsByClassName('unit')
            for (var i=0;i<unitAll.length;i++){
                unitAll[i].classList.remove('active');
            }
            unitAll[0].classList.add('active');
            this.unit = unitAll[0].innerText;
            this.$router.push({path:"/BuyLetteryConfirm"})
        },

        //选择单位
        chooseUnit(e){
            var event = e || window.event;
            var target = event.target || event.srcElement;
            var unit = document.getElementsByClassName('unit')
            for (var i=0;i<unit.length;i++){
                unit[i].classList.remove('active')
            }
            target.classList.add('active')
            this.unit = target.innerText
        },
        reduceMultiple(){
            if (this.multiple<=1){
                return
            }
            this.multiple--
        },
        addMultiple(){
            this.multiple++
        }
    }
}
</script>
<style scoped lang="less">
    @import "../../common/less/variable.less";

    .NumberBasket {
        position:fixed;
        bottom:0;
        left:0;
        width:100%;
        height:0.98rem;
        .betContent {
            width: 4.8rem;
            float: left;
            height: 100%;
            background: @color-background-betContent;
            position: relative;
            z-index: 7;
            transition: .1s;
            >span.icon {
                position: absolute;
                left: .16rem;
                top: .28rem;
                font-size: .4rem;
                width: .5rem;
                height:0.5rem;
                line-height: 0.5rem;
                text-align: center;
                color:#fff;
            }
            >div {
                height:1.05rem;
                padding:0.2rem 0.25rem;
                font-family:PingFang-SC-Medium;
                transition: .1s;
                >h5 {
                    text-align: left;
                    font-size:@font-size-30;
                    color:#fff;
                }
                >p {
                    color:#ffebdd;
                    font-size: .24rem;
                    line-height: .25rem;
                    padding-top: .1rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-align: left;
                    font-family:PingFang-SC-Medium;
                    >span {
                        font-size:0.26rem;
                        >i {
                            font-style: normal;
                            font-size:0.26rem;
                        }
                        >em {
                            font-style: normal;
                            font-size:0.26rem;
                        }
                    }
                }
            }
            >div.show {
                padding-left:0.86rem;
                background: @color-background-activeBottom;
            }
        }
        .betCart {
            float: left;
            width: 2.7rem;
            height: 0.98rem;
            color: #fff;
            position: relative;
            background:@color-background-betCart;
            >div {
                width: 100%;
                height: 100%;
                line-height:0.98rem;
                text-align: center;
                img {
                    position: relative;
                    top:0.05rem;
                    width:0.41rem;
                    height:0.35rem;
                }
                >span {
                    font-size:@font-size-32;
                    font-family:PingFang-SC-Medium;
                }
                .totalBets {
                    position: absolute;
                    top:.17rem;
                    left:.8rem;
                    width:.3rem;
                    height:.3rem;
                    line-height:.3rem;
                    border-radius: 50%;
                    background: #F04747;
                    font-size:@font-size-22;
                    color:#fff;
                }
            }
        }
        .betCart:before {
            content: "";
            position: absolute;
            transition: .1s;
            width: 0;
            height: 0;
            border-top: 0.49rem solid transparent;
            border-left: 0.25rem solid #252625;
            border-bottom: 0.49rem solid transparent;
            left: 0;
            top: 0;
        }
        .betCart.show:before {
            border-left: 0.2rem solid @color-background-activeBottom;
        }
        .multiple {
            position:absolute;
            left:0;
            top:-0.9rem;
            height:0.9rem;
            width:100%;
            padding:0.1rem 0.26rem;
            background: @color-background-multiple;
            text-align: left;
            font-size:0;
            >.multipleLeft {
                border: 0.02rem solid #d2d2d2;
                height: 0.7rem;
                display: inline-block;
                vertical-align: top;
                border-radius: .05rem;
                background: #fff;
                margin-right:0.1rem;
                >em {
                    float: left;
                    width: 0.7rem;
                    height: 100%;
                    line-height:0.6rem;
                    text-align: center;
                    vertical-align: top;
                    border-right: 0.01rem solid #CCCCCC;
                    font-family:PingFang-SC-Medium;
                    font-size:0.28rem;
                    color: #666666;
                    font-style: normal;
                }
                >em.noBorder {
                    border-right: none;
                }
                >input {
                    border-right: 0.01rem solid #CCCCCC;
                    width:1.2rem;
                    height: 100%;
                    text-align: center;
                    display: block;
                    float: left;
                    font-size:@font-size-30;
                    color:#1E1E1E;
                    font-family:PingFang-SC-Medium;
                }
            }
            >span {
                display: inline-block;
                color:#1E1E1E;
                font-size:@font-size-30;
                font-family:PingFang-SC-Medium;
                line-height:0.7rem;
                margin-right:0.1rem;
            }
            >.multipleRight{
                float:right;
                vertical-align: top;
                border: 1px solid #CCCCCC;
                border-radius: .05rem;
                height: 0.7rem;
                background: #fff;
                overflow: hidden;
                font-size:0;
                >span {
                    display: inline-block;
                    font-size:0.3rem;
                    height: 100%;
                    width: 0.7rem;
                    line-height: 0.7rem;
                    text-align: center;
                    color:rgba(64,64,64,1);
                    font-family:PingFang-SC-Medium;
                }
                >span.active {
                    background:@color-background-linear-gradient;
                    color: #fff;
                }
                >span:nth-child(3) {
                     border-right:none;
                }
            }
        }
    }
</style>
