<template>
    <div class="wrap">
        <Header :showRuleName="false" title="代理报表" class="header" :ifSoltin="true">
            <div class="chooseDate" @click="chooseDate">
                <span>{{date}}</span>
                <i class="iconfont icon-xiala2 downIcon" ref="downIcon"></i>
            </div>
        </Header>
        <div class="report">
            <div class="inputBox">
                <input type="text" placeholder="下级报表查询">
                <img src="./search@2x.png">
            </div>
            <ul class="reportList clearfix">
                <li class="reportItem">
                    <p class="reportMount">0.00</p>
                    <p class="reportTitle">投注金额</p>
                </li>   
                <li class="reportItem">
                    <p class="reportMount">0.00</p>
                    <p class="reportTitle">中奖金额</p>
                </li>   
                <li class="reportItem">
                    <p class="reportMount">0.00</p>
                    <p class="reportTitle">活动礼金</p>
                </li>   
                <li class="reportItem">
                    <p class="reportMount">0.00</p>
                    <p class="reportTitle">团队返点</p>
                </li>   
                <li class="reportItem">
                    <p class="reportMount">0.00</p>
                    <p class="reportTitle">团队盈利</p>
                </li>   
                <li class="reportItem">
                    <p class="reportMount">0.00</p>
                    <p class="reportTitle">充值金额</p>
                </li>   
                <li class="reportItem">
                    <p class="reportMount">0.00</p>
                    <p class="reportTitle">提现金额</p>
                </li>   
                <li class="reportItem">
                    <p class="reportMount">0</p>
                    <p class="reportTitle">首充人数</p>
                </li>   
                <li class="reportItem">
                    <p class="reportMount">0</p>
                    <p class="reportTitle">注册人数</p>
                </li>   
                <li class="reportItem">
                    <p class="reportMount">0</p>
                    <p class="reportTitle">投注人数</p>
                </li>
                <li class="reportItem">
                    <p class="reportMount">6</p>
                    <p class="reportTitle">下级人数</p>
                </li>   
                <li class="reportItem">
                    <p class="reportMount">30000395.00</p>
                    <p class="reportTitle">团队余额</p>
                </li>   
                <li class="reportItem">
                    <p class="reportMount">0.00</p>
                    <p class="reportTitle">代理返点</p>
                </li>   
                <li class="reportItem">
                    <p class="reportMount">0.00</p>
                    <p class="reportTitle">代理工资</p>
                </li>  
                <li class="reportItem">
                    <p class="reportMount">0.00</p>
                    <p class="reportTitle">代理分红</p>
                </li>     
            </ul>
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
import Header from "base/header/header" 
import {prefixStyle} from 'common/js/dom.js'
import moment from 'moment'
import { MessageBox } from 'mint-ui'

const transform = prefixStyle('transform')

export default {
    data(){
        return {
            dateList : ['今天','昨天','本月','上月'],
            showDateList:false,
            date:'今天',
            repostList:[]
        }
    },
    mounted(){
        var id = localStorage.getItem('userId');
        var uid = "";
        var date = moment(new Date()).format().split('T')[0];
        baseApi.teamReport(id,uid,date,date).then((res)=>{
            if (res.code === 200) {
                console.log(res)
                this.repostList = res.data
            } else {
                MessageBox.alert(res.message)
            }
        })
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
        }
    },
    components:{
        Header
    }
}
</script>

<style lang="less" scoped>
    @import "../../../../common/less/variable.less";

    .wrap{
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
        // .chooseDate:after {
        //     position: absolute;
        //     content:'';
        //     top:.28rem;
        //     right:0.25rem;
        //     border-top:1px solid transparent;
        //     border-bottom:1px solid #fff;
        //     border-right:1px solid #fff;
        //     border-left:1px solid transparent;
        //     width:.13rem;
        //     height:.13rem;
        //     transform: rotate(45deg);
        // }
        .report {
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
            .reportList {
                width:100%;
                .reportItem {
                    display: flex;
                    float:left;
                    width:33.33%;
                    height:1.92rem;
                    border-right:1px solid #E5E5E5;
                    border-bottom:1px solid #E5E5E5;
                    background: #fff;
                    flex-direction:column;
                    align-items:center;
                    justify-content:center;
                    .reportMount {
                        color:#F04747;
                        font-size:@font-size-34;
                    }
                    .reportTitle {
                        margin-top:.2rem;
                        font-size:@font-size-26;
                        color:#0E0E0E;
                    }
                }
                .reportItem:nth-of-type(3n) {
                    border-right:none;
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
        }
    }
</style>
