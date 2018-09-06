<template>
    <div class="wrap">
        <Header :showRuleName="false" class="header" :ifSoltin="true" title="投注明细">
            <div class="chooseDate" @click="chooseDate">
                <span>{{date}}</span>
                <i class="iconfont icon-xiala2 downIcon" ref="downIcon"></i>
            </div>
        </Header>
        <div class="betDetail">
            <div class="inputBox">
                <input type="text" placeholder="下级投注查询">
                <img src="./search@2x.png">
            </div>
            <p class="title" ref="title">
                <span class='on' @click="changeTab" name="1">全部</span>
                <span @click="changeTab" name="2">已中奖</span>
                <span @click="changeTab" name="3">未中奖</span>
                <span @click="changeTab" name="4">等待开奖</span>
            </p>
            <ul>
                <li v-for="(item,index) in dataList" :key="index">
                    <div class="left">
                        <p><b>{{item.user}}</b><span>{{item.mountA}}</span></p>
                        <p>{{item.time}}</p>
                    </div>
                    <div class="right">
                        <p class="award awardNumber" v-if="item.type == 1">{{item.mountB}}</p>
                        <p class="award" v-if="item.type == 1">已中奖</p>
                        <p class="waiting" v-else-if="item.type == 2">等待开奖</p>
                        <p v-else-if="item.type == 3">未开奖</p>
                        <p v-else>追号停止</p>
                    </div>
                </li>
            </ul>
            <p class="tips">已显示全部数据</p>
            <div class="popLayer" v-show="showDateList" @click.self="chooseDate">
                <div class="datePicker">
                    <ul>
                        <li v-for="(item,index) in dateList" :key="index" @click.stop="changeDate">{{item}}</li>
                    </ul>
                    <p class="reportCancle" @click.stop="chooseDate">取消</p>
                </div>
            </div>
        </div>

    </div>
</template>
<script>

import Header from 'base/header/header'
import {prefixStyle} from 'common/js/dom.js'

const transform = prefixStyle('transform')

export default {
    data(){
        return {
            date:'今天',
            dateList : ['今天','昨天','本月','上月'],
            showDateList:false,
            type:1,
            tableType:1,
            dataList:[
                {
                    user:'adsadas',
                    mountA:'20.00',
                    time:'2017-02-16 12:00:00',
                    type:1,
                    mountB:'156.00'
                },
                {
                    user:'fdsafsd',
                    mountA:'10.00',
                    time:'2017-01-16 12:00:00',
                    type:2,
                    mountB:'0'
                },
                {
                    user:'bbbbb4efds',
                    mountA:'100.00',
                    time:'2017-01-15 12:00:00',
                    type:3,
                    mountB:'0'
                },
                {
                    user:'124sfsf1aaa',
                    mountA:'81.00',
                    time:'2017-01-15 12:00:00',
                    type:4,
                    mountB:'0'
                },
            ]
        }
    },
    methods:{
        changeTab(e){
            var even = e || window.even;
            var dom = event.currentTarget;
            var tableList = Array.from(this.$refs.title.children);
            tableList.forEach(item => {
                item.classList.remove('on')
            })
            dom.classList.add('on')
            this.tableType = dom.getAttribute('name');
        },
        changeDate(e){
            var even = e || window.even;
            this.date = event.currentTarget.innerText;
            this.chooseDate();
        },
        chooseDate(){
            this.showDateList = !this.showDateList;
            this.showDateList?this.$refs.downIcon.style[transform] = "rotate(180deg)":this.$refs.downIcon.style[transform] ="";
        }
    },
    components:{
        Header
    }
}
</script>
<style lang="less" scoped>
    @import "../../../../common/less/variable.less";

    .wrap {
        .chooseDate {
            position:absolute;
            top:0;
            right:0;
            height:.88rem;
            line-height: .88rem;
            padding:0 0.61rem;
            font-size:@font-size-28;
            color:#fff;
            span {
                font-size:@font-size-28;
                color:#fff;
            }
            .downIcon {
                position: absolute;;
                right:0.2rem;
                bottom:0;
                transition: all 0.5s;
            }
        }
        .betDetail {
            background: @color-background-mine;
            font-family:PingFang-SC-Medium;
            .inputBox {
                width:100%;
                height:1.4rem;
                padding-top:.3rem;
                text-align: center;
                font-size:0;
                input {
                    width:6.1rem;
                    height:.8rem;
                    outline: none;
                    padding:.27rem .21rem;
                    font-size:@font-size-28;
                    color:#939393;
                }
                img {
                    width:.88rem;
                    height:.8rem;
                    vertical-align: top;
                }
            }
            .title {
                height:.8rem;
                line-height: .8rem;
                background: #fff;
                display: flex;
                margin-bottom:.2rem;
                span {
                    flex:1;
                    color:#333333;
                    font-size:@font-size-28;
                }
                span.on {
                    color:#F04747;
                    border-bottom:.04rem solid #F04747;
                }
            }
            >ul {
                width:100%;
                >li {
                    width:100%;
                    height:1.34rem;
                    line-height:1.34rem;
                    background: #fff;
                    display: flex;
                    justify-content: space-between;
                    .left {
                        flex:1;
                        margin-left:.27rem;
                        display: flex;
                        flex-direction:column;
                        text-align: left;
                        justify-content:center;
                        p {
                            line-height:.45rem;
                            color:#999999;
                            font-size:@font-size-24;
                            b {
                                color:#333333;
                                font-size:@font-size-28;
                            }
                            span {
                                color:#999999;
                                font-size:@font-size-24;
                                margin-left:.2rem;
                            }
                        }
                    }
                    .right {
                        flex:1;
                        margin-right:.27rem;
                        display: flex;
                        flex-direction:column;
                        text-align: right;
                        justify-content:center;
                        p.award {
                            line-height:.45rem;
                            color:#F04747;
                            font-size:@font-size-24;
                        }
                        p.awardNumber {
                            font-family: ArialMT;
                            font-size:@font-size-26;
                        }
                        p.waiting {
                            line-height:1.34rem;
                            color:#23A253;
                        }
                        p {
                            color:#333333;
                            font-size:@font-size-26;
                        }
                    }
                }
            }
            .tips {
                margin-top:.3rem;
                color:#939393;
                font-size:@font-size-26;
            }
            .popLayer {
                position: fixed;
                top:0;
                bottom:0;
                left:0;
                right:0;
                background:rgba(0,0,0,.3);
                .datePicker {
                    position:absolute;
                    bottom:0;
                    width:100%;
                    z-index:9;
                    background: @color-background-mine;
                    ul li {
                        height:.9rem;
                        line-height: .9rem;
                        border-bottom:1px solid #EEEEEE;
                        background: #fff;
                        color:#666666;
                        font-size:@font-size-28;
                    }
                    ul li:last-child {
                        border-bottom:none;
                    }
                    p.reportCancle {
                        height:.9rem;
                        line-height: .9rem;
                        margin-top:.2rem;
                        background: #fff;
                        font-size:@font-size-28;
                        color:#333333;
                    }
                }
                
            }
        }
    }
</style>
