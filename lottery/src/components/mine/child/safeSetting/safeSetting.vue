<template>
    <div class="wrap">
        <Header :showRuleName="false" title="安全设置"></Header>
        <div class="mainBody">
            <p class="tit">账户安全设置</p>
            <div class="changePsd icon" @click="changePsd">
                <span>修改交易密码</span>
                <span class="unset">未设置</span>
            </div>
            <div class="changeLogPsd icon">
                <span>修改登录密码</span>
            </div>
            <p class="tit">通用</p>
            <div class="speed icon" @click="netpersecclick">
                <span>网速检测</span>
                <span class="unset">{{time}}</span>
                <i class="iconfont icon-xunhuanjiantou-" ref="iconSpeed"></i>
            </div>
            <div class="version icon">
                <span>当前版本号</span>
                <span class="unset">{{version}}</span>
            </div>
            <div class="icon" @click="removeItem">
                <span>清空缓存</span>
                <span class="unset">{{huancunsize}}</span>
                <i class="iconfont icon-xunhuanjiantou-" ref="iconClear"></i>
            </div>
            <div class="button" @click="logOff">退出登录</div>
        </div>

    </div>
</template>
<script>
import Header from "base/header/header" 
import {prefixStyle,debounce} from 'common/js/dom.js'

const transform = prefixStyle('transform')

export default {
    data(){
        return {
            st:'',
            imgrote:'',
            time:'',
            version:'',
            huancunsize:'',
            timer:null,
            timerr:null
        }
    },
    mounted(){
        this.st = new Date();
        this.version = localStorage.getItem("time-version").split("-")[1];
        this.localitem()
    },
    methods:{
        changePsd(){
            this.$router.push("/changePsd")
        },
        showspeed() {
            var st = new Date();
            var fs = 1.46 * 1024;
            var l = 2;
            var et = new Date();
            var alltime = fs * 1000 / (et - this.st);
            var Lnum = Math.pow(10, l);
            var calcspeed = Math.round(alltime * Lnum) / Lnum;
            var time = Math.round(calcspeed / 128 * Lnum) / Lnum + "M/秒";
            localStorage.setItem("time", time);
            this.time = time
        },
        netpersecclick() {
            if(this.timer) {
                clearInterval(this.timer)
            }
            this.$refs.iconSpeed.style.display = "block";
            var deg = 1
            this.timer = setInterval(()=>{
                this.$refs.iconSpeed.style[transform] = `rotate(${deg}deg)`
                deg+=4
            },1)
            setTimeout(()=>{
                this.showspeed();
                clearInterval(this.timer)
                console.log(this.timer)
                this.$refs.iconSpeed.style.display = "none";
            }, 1500);
        },
        removeItem(){
            if(this.timerr) {
                clearInterval(this.timerr)
            }
            this.$refs.iconClear.style.display = "block";
            var deg = 1
            this.timerr = setInterval(()=>{
                this.$refs.iconClear.style[transform] = `rotate(${deg}deg)`
                deg+=4
            },1)
            setTimeout( () => {
                this.huancunsize = "0.00M";
                clearInterval(this.timerr)
                this.$refs.iconClear.style.display = "none";
                baseApi.getAnimalsCollections().then((res)=>{
                    console.log(res)
                    var animalsCollections = res
                    localStorage.setItem('isdonwu',JSON.stringify(animalsCollections))
                })
                localStorage.clear();
                baseApi.loadTimestamp(); 
                // this.$store.state.homeData = "";
                if (!localStorage.getItem("token")) {
                    // $(".logout").hide();
                    // $(".notlog").hide();
                }
            },1500);
        },
        localitem() {
            var size = 0;
            for (var item in window.localStorage) {
                if (window.localStorage.hasOwnProperty(item)) {
                size += window.localStorage.getItem(item).length;
                }
            }
            console.log(
                "当前localStorage剩余容量为" + (size / 1024 / 1024).toFixed(2) + "M"
            );
            this.huancunsize = (size / 1024 / 1024).toFixed(2) + "M";
            console.log(this.huancunsize);
        },
        logOff(){
            localStorage.removeItem('currentUser');
            localStorage.removeItem('token');
            this.$router.push({ path: 'login' })
        },
        
    },
    components:{
        Header
    }
}
</script>
<style lang="less" scoped>
    @import "../../../../common/less/variable.less";

    .wrap {
        position:absolute;
        top:0;
        bottom:0;
        width:100%;
        background:#EEF1F3;
        z-index:9;
        .mainBody {
            width:100%;
            font-family:PingFang-SC-Medium;
            p.tit {
                width:100%;
                height:.86rem;
                line-height: .86rem;
                text-align: left;
                text-indent:.26rem;
                font-size:@font-size-28;
                color:#666666;
            }
            .changePsd {
                border-bottom:1px solid #F7F7F7;
            }
            .speed {
                border-bottom:1px solid #F7F7F7;
            }
            .version {
                border-bottom:1px solid #F7F7F7;
            }
            .icon {
                position: relative;
                height:.9rem;
                line-height: .9rem;
                background: #fff;
                padding-left:.29rem;
                text-align: left;
                font-size:@font-size-28;
                .unset {
                    float:right;
                    margin-right:.57rem;
                    color:#6F6F6F;
                    font-size:@font-size-26;
                }
                i {
                    display: none;
                    position: absolute;
                    left:50%;
                    top:50%;
                    margin-top:-0.43rem;
                    font-size: 0.32rem;
                    color: #6F6F6F;
                }
            }
            .icon:after {
                position: absolute;
                right:.25rem;
                top:.37rem;
                content:'';
                border-top:1px solid #B1B1B1;
                border-bottom:1px solid transparent;
                border-right:1px solid #B1B1B1;
                border-left:1px solid transparent;
                width:.12rem;
                height:.12rem;
                transform: rotate(45deg);
            }
            .button {
                width:100%;
                background: #fff;
                text-align: center;
                height:.9rem;
                line-height:.9rem;
                margin-top:.2rem;
                color:#F14747;
                font-size:@font-size-28;
            }
        }
    }
</style>

