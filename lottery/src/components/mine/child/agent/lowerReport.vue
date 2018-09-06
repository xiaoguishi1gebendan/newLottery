<template>
    <div class="wrap">
        <Header :showRuleName="false" title="下级报表" class="header">
            <div class="chooseDate" @click="chooseDate">
                <span>{{date}}</span>
                <i class="iconfont icon-xiala2 downIcon" ref="downIcon"></i>
            </div>
        </Header>
        <div class="lowerReport">
            <div class="lowerReportTitle">
                <span class="count">账号</span>
                <span>类型</span>
                <span>报表人数</span>
                <span>盈利</span>
            </div>
            <div class="lowerList">
                <ul>
                    <li v-for="(item,index) in lowerList" :key="index" @click="clickItem(item.count)">
                        <span>{{item.count}}</span>
                        <span>{{item.type}}</span>
                        <span>{{item.number}}</span>
                        <span>{{item.win}}</span>
                    </li>
                </ul>
                <p>已显示全部数据</p>
            </div>
            <div class="popLayer" v-show="showDateList" @click.self="chooseDate">
                <div class="datePicker">
                    <ul>
                        <li v-for="(item,index) in dateList" :key="index" @click.stop="changeDate">{{item}}</li>
                    </ul>
                    <p class="reportCancle" @click.stop="chooseDate">取消</p>
                </div>
            </div>
            <div class="popItem" v-show="showLower" @click.self="clickItem">
                <div class="lowerItem">
                    <div class="lowerName">
                        <img src="./user@2x.png">
                        <span>{{lowerItem}}</span>
                    </div>
                    <p class="checkReport">查看报表</p>
                    <p class="checkLower">查看下级</p>
                    <p class="reportCancle" @click.stop="clickItem">取消</p>
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
            showDateList:false,
            showLower:false,
            dateList : ['今天','昨天','本月','上月'],
            lowerList:[{
                count:'aaaaaaa',
                type:'1级代理',
                number:1,
                win:4.4
            },{
                count:'hahahahaah',
                type:'2级代理',
                number:5,
                win:1005
            },
            {
                count:'fsdfasd',
                type:'1级代理',
                number:2,
                win:100
            }],
            lowerItem:'aaaaa'
        }
    },
    methods:{
        changeDate(e){
            var even = e || window.even;
            this.date = event.currentTarget.innerText;
            this.chooseDate();
        },
        chooseDate(){
            this.showDateList = !this.showDateList;
            this.showDateList?this.$refs.downIcon.style[transform] = "rotate(180deg)":this.$refs.downIcon.style[transform] ="";
        },
        clickItem(count){
            if(count){
                this.lowerItem = count;
            }
            this.showLower =!this.showLower;
        }
    },
    components:{
        Header
    }
}
</script>

<style lang="less" scoped>
    @import "../../../../common/less/variable.less";

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
    .lowerReport {
        background:@color-background-mine;
        font-family: PingFang-SC-Medium;
        .lowerReportTitle {
            width:100%;
            display: flex;
            height:.8rem;
            line-height: .8rem;
            span {
                flex:1;
                display: inline-block;
                background: #fff;
                font-size:@font-size-28;
                color:#333;
            }
        }
        .lowerList {
            margin-top:.2rem;
            ul {
                width:100%;
                margin-bottom:.35rem;
                li {
                    display: flex;
                    height:.9rem;
                    line-height: .9rem;
                    background: #fff;
                    border-bottom:1px solid #F7F7F7;
                    span {
                        flex:1;
                        color:#888888;
                        font-size:@font-size-28;
                    }
                    span:first-child {
                        color:#4891FF;
                    }
                    span:last-child {
                        color:#F04747;
                    }
                }
            }
            p {
                width:100%;
                text-align: center;
                color:#939393;
                font-size:@font-size-26;
            }
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
        .popItem {
            position: fixed;
            top:0;
            bottom:0;
            left:0;
            right:0;
            background:rgba(0,0,0,.3);
            .lowerItem {
                position:absolute;
                bottom:0;
                width:100%;
                z-index:9;
                background: @color-background-mine;
                text-align: center;
                p {
                    height:.9rem;
                    line-height: .9rem;
                    background: #fff;
                    font-size:@font-size-28;
                }
                div.lowerName {
                    height:.9rem;
                    line-height: .9rem;
                    border-bottom:1px solid #EEE;
                    background: #FFF;
                    img {
                        width:.44rem;
                        height:.42rem;
                        vertical-align: middle;
                        margin-right:.21rem;
                    }
                    span {
                        display: inline-block;
                        color:#4891FF;
                        font-size:@font-size-28;
                    }
                }
                p.checkReport {
                    border-bottom:1px solid #EEE;
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
</style>
