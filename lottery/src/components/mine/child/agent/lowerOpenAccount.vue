<template>
    <div class="wrap">
        <Header :showRuleName="false" class="header" :iftitle="false" :ifSoltin="true">
           <p class="table">
               <span class="tableLeft" :class="{on:table}" @click="table=true">下级开户</span>
               <span class="tableRight" :class="{on:!table}" @click="getCodeList">邀请码</span>
           </p>
        </Header>
        <div class="lowerOpenAccount">
            <div class="type">
                <span>开户类型</span>
                <span @click="chooseType" name="3">
                    <img src="./selected@2x.png" class="typeImg" ref="agent">
                    <i>代理类型</i>
                </span>
                <span @click="chooseType" name="1" >
                    <img src="./not_selected@2x.png" class="typeImg" ref="player">
                    <i>玩家类型</i>
                </span>
            </div>
            <div v-if="table">
                <p class="tips">请先为下级设置返点</p>
                <div class="robate">
                    <p class="robateTitle" @click="toggleList"><span>彩票返点</span><img src="./arrow-down@2x.png" ref="downImg"></p>
                    <ul v-show="showRobate">
                        <li v-for="(item, index) in robateList" :key="index" @click="chooseRobate(item.rebateValue)">
                            {{item.rebateText}}
                        </li>
                    </ul>
                </div>
                <div class="button" @click="createCode">生成邀请码</div>
            </div>
            <div v-else>
                <p class="codeTitle">
                    <span>邀请码</span>
                    <span>生成时间</span>
                    <span>状态</span>
                </p>
                <ul class="codeList">
                    <li v-for="(item,index) in codeList" :key="index" @click="clickCode(item.code,item.rebate)">
                        <span>{{item.code}}</span>
                        <span>{{item.addTime|dateFmt()}}</span>
                        <span>注册（1）</span>
                    </li>
                </ul>
                <p class="codeTips">已显示全部数据</p>
            </div>
            <div class="codePop" v-show="showcode" @click.self  ="showcode = false">
                <div class="popWin">
                    <p class="popTitle"><span><img src="./user@2x.png" alt="">{{popCode}}</span><span>彩票返点：{{popRebate}}</span></p>
                    <p class="deleteCode">删除邀请码</p>
                    <p class="copyCode" @click="copyCode">复制邀请码</p>
                    <p class="cancel" @click.stop="showcode = false">取消</p>
                </div>  
                <p ref="nuim" style="margin-bottom: 0.2rem; opacity:0" >{{url}}</p>
            </div>
        </div>
    </div>
    
</template>
<script>

import Header from 'base/header/header'
import {prefixStyle} from 'common/js/dom.js'
import { MessageBox,Toast } from 'mint-ui'

const transform = prefixStyle('transform')

export default {
    data(){
        return {
            robateList:[],
            showRobate:false,
            rebate:'',
            type:3,
            code:'',
            userId:'',
            table:true,
            codeList:[],
            popCode:'',
            popRebate:'',
            showcode:false,
            url:''
        }
    },
    mounted(){
        this._intRebateList()
    },
    methods:{ 
        _intRebateList(){
            this.userId = localStorage.getItem("userId");
            baseApi.rebateList(this.userId).then((res) => {
                if (res.code === 200) {
                    this.robateList = res.data
                } else {
                    MessageBox.alert(res.message)
                }
            })
        },
        toggleList(){
            this.showRobate = !this.showRobate;
            this.showRobate?this.$refs.downImg.style[transform] = "rotate(180deg)":this.$refs.downImg.style[transform] = "";
        },
        chooseRobate(rebate){
            this.rebate = rebate
            this.toggleList()
        },
        chooseType(e){
            var even = e || window.even;
            var dom = even.currentTarget;
            this.type = even.currentTarget.getAttribute('name');
            var img = Array.from(document.getElementsByClassName('typeImg'));
            img.forEach(item => {
                item.src=require("./not_selected@2x.png")
            })
            dom.children[0].src= require("./selected@2x.png");
        },
        createCode(){
            baseApi.randomCode(this.userId).then((res)=>{
                if (res.code ===200) {
                    this.code  = res.data
                    if (!this.rebate) {
                        MessageBox.alert("请选择彩票返点！");
                        return
                    }
                    baseApi.buildCode(this.userId,this.code,this.type,this.rebate).then((res)=>{
                        if (res.code ===200){
                            console.log(res)
                            MessageBox.alert("已产生新的邀请码："+this.code)
                        } else {
                            MessageBox.alert(res.message)
                        }
                    })
                } else {
                    MessageBox.alert(res.message)
                }
            })
        },
        getCodeList(){
            this.table = false;
            baseApi.codeList(1,10,this.userId).then((res)=>{
                if(res.code === 200){
                    console.log(res)
                    this.codeList = res.data
                } else {
                    MessageBox.alert(res.message)
                }
            })
        },
        clickCode(code,rebate){
            this.showcode = true;
            this.popCode = code;
            this.popRebate = rebate;
        },
        copyCode(){
            this.url = JSON.parse(localStorage.getItem("sysConfigMap")).webLink.cvalue + "?code=" +this.popCode;
            MessageBox({
                title: "复制链接分享:",
                message: this.url,
                confirmButtonText: "复制"
            }).then(action => {
                this.copyArticle();
            });
            
        },
        copyArticle(){
            var range = document.createRange();
            var nuim = this.$refs.nuim;
            range.selectNode(nuim);
            var selection = window.getSelection();
            if (selection.rangeCount > 0) selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand("copy");
            let instance = Toast('复制成功');
            this.showcode = false;
            setTimeout(() => {
                instance.close();
            }, 600);
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
        .header {
            text-align: center;
            p.table {
                position: relative;
                top:.17rem;
                width:3.28rem;
                height:.54rem;
                line-height:.54rem;
                margin:0 auto;
                border-radius: 0.07rem;
                border: 0.01rem solid #fff;
                background: #fff;
                span {
                    display: inline-block;
                    line-height:.49rem;
                    width:1.53rem;
                    background: @color-background-linear-gradient;
                    text-align:center;
                    color:#fff;
                }
                span.tableLeft {
                   border-radius:0.07rem 0 0 0.07rem;
                }
                span.tableRight {
                    border-radius:0 0.07rem 0.07rem 0;
                }
                span.on {
                    background:#fff;
                    color:#F34C42;
                }
            }
        }
        .lowerOpenAccount {
            width:100%;
            background: @color-background-mine;
            font-family: PingFang-SC-Medium;
            .type {
                width:100%;
                height:1.38rem;
                line-height: 1.38rem;
                text-align: left;
                span {
                    color:#333333;
                    font-size:@font-size-28;
                    img {
                        width:.37rem;
                        height:.37rem;
                        vertical-align: middle;
                    }
                    i {
                        font-style:normal;
                        font-size:@font-size-28;
                    }
                }
                span:first-child {
                    margin-left:.25rem;
                    margin-right:.49rem;
                }
                span:last-child {
                    margin-left:.41rem;
                }
            }
            .tips {
                font-size:@font-size-24;
                color:#999999;
                text-indent: .27rem;
                text-align: left;
                margin-bottom:.19rem;
            }
            .robate {
                min-height:5.4rem;
                .robateTitle {
                    position: relative;
                    height:.9rem;
                    line-height:.9rem;
                    background: #fff;
                    text-align: left;
                    text-indent: .29rem;
                    
                    span {
                        color:#333333;
                        font-size:@font-size-28;
                    }
                    img {
                        float:right;
                        margin-top:.39rem;
                        margin-right:.31rem;
                        width:.22rem;
                        height:.12rem;
                        transition: all 0.5s;
                    }
                }
                ul {
                    height:4.5rem;
                    background: #E9E9E9;
                    overflow: scroll;
                    li {
                        height:.9rem;
                        line-height: .9rem;
                        color:#000000;
                        font-size:@font-size-28;
                    }
                }
            }
            .button {
                margin:.53rem auto 0;
                width:6.98rem;
                height:.8rem;
                line-height: .8rem;
                text-align: center;
                background: @color-background-linear-gradient;
                color:#FFF;
            }
            .codeTitle {
                display:flex;
                height:.8rem;
                line-height:.8rem;
                background: #fff;
                border-bottom:1px solid @color-background-mine;
                span {
                    width:2rem;
                    color:#333333;
                    font-size:@font-size-28;
                }
                span:nth-of-type(2) {
                    flex:1;
                }
            }
            ul.codeList {
                li {
                    display: flex;
                    height:.91rem;
                    line-height: .91rem;
                    background: #FFF;
                    text-align: center;
                    span {
                        display: inline-block;
                        width:2rem;
                        font-size:@font-size-28;
                        color:#888;
                    }
                    span:nth-of-type(1) {
                        color:#4891FF;
                    }
                    span:nth-of-type(2) {
                        flex:1;
                    }
                }
            }
            p.codeTips {
                margin-top:.3rem;
                font-size:@font-size-26;
                color:#939393;
            }
            .codePop {
                position: fixed;
                top:0;
                bottom:0;
                left:0;
                right:0;
                background:rgba(0,0,0,.3);
                .popWin {
                    position:absolute;
                    bottom:0;
                    width:100%;
                    z-index:9;
                    background: @color-background-mine;
                    .popTitle {
                        width:100%;
                        height:.95rem;
                        line-height: .95rem;
                        background: #fff;
                        display: flex;
                        justify-content:space-between;
                        border-bottom:1px solid #EEE;
                        span {
                            font-size:@font-size-28;
                            color:#666;
                            img {
                                width:.44rem;
                                height:.42rem;
                                margin-right:.21rem;
                                vertical-align: middle;
                            }
                        }
                        span:nth-of-type(1) {
                            color:#4891FF;
                            margin-left:.27rem;
                        }
                        span:nth-of-type(2) {
                            margin-right:.27rem;
                        }
                    }
                    p {
                        width:100%;
                        height:.95rem;
                        line-height: .95rem;
                        background: #fff;
                        color:#333333;
                        font-size:@font-size-28;
                    }
                    p.deleteCode {
                        border-bottom:1px solid #EEE;
                    }
                    p.cancel {
                        height:.9rem;
                        line-height: .9rem;
                        margin-top:.2rem;
                    }
                }
            }
        }
    }
</style>

