<template>
    <div class="wrap">
        <Header :showRuleName="showRuleName" :title="title">
            <div class="kefu">
                <img src="./land-customer@2x.png" alt="">
                <span>客服</span>
            </div>
        </Header>
        <div class="content">
            <div class="user-img">
                <img src="./touxiang@2x.png" alt="">
            </div>
            <div class="user-info">
                <div class="id">
                    <img src="./account@2x.png"  class="id-img">
                    <input type="text" placeholder="请输入账号" maxlength="20" class="id-input" v-model="userName" ref="input1">
                    <img src="./arrow-down@2x.png"  class="id-down" @click="toggleBtm" ref="down">
                </div>
                <div class="psd">
                    <img src="./aassword@2x.png"  class="psd-img">
                    <input :type="psdType" placeholder="请输入密码" maxlength="20" class="psd-input" v-model="passWord" ref="input2">
                    <img v-if="eyes" src="./eyes-open@2x.png" class="psd-open" @click="eyes = !eyes">
                    <img v-else src="./eyes-off@2x.png" class="psd-close" @click="eyes = !eyes">
                </div>
            </div>
            <div class="logBtn">
                <button ref="login" @click="currentLogin">登录</button>
                <div class="operation">
                    <span class="register">注册</span>
                    <span class="forgetPsd">忘记密码</span>
                </div>
            </div>
            <div class="userList" v-if="showList" @click.self="toggleBtm">
                <div class="popBtm">
                    <p class="btmTitle" v-if="userList.length">请选择让登录账号</p>
                    <p v-else class="btmTitle">您还未曾登录过</p>
                    <ul>
                        <li v-for="(item,index) in userList" :key="index" @click.stop="changeUser">
                            <span>{{item}}</span><img src="./Shut_down@2x.png" class="delete" :name="index" @click.stop="deleteUser">
                        </li>
                    </ul>
                    <p class="cancle" @click.stop="toggleBtm">取消</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import Header from 'base/header/header'
import { MessageBox } from 'mint-ui'
import {prefixStyle} from 'common/js/dom.js'

const transform = prefixStyle('transform')

export default {
    data(){
        return {
            showRuleName:false,
            title:"用户登录",
            eyes:false,
            userList:[],
            showList:false,
            userName:'',
            passWord:'',
            currentUser:''
        }
    },
    computed:{
        psdType:function (){
            return this.eyes?"text":"password"
        }
    },
    mounted(){
        if (localStorage.getItem("userList")){
            this.userList = localStorage.getItem("userList").split(',')
        }
    },
    methods:{
        currentLogin(){
            var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
            if (!uPattern.test(this.userName)){
                MessageBox.alert("用户名格式不正确");
                return
            }
            this.$store.state.username = this.$refs.input1.value;
            this.$store.state.password = this.$refs.input2.value;
            for (var i=0;i<this.userList.length;i++){
                if (this.userList[i] == this.$refs.input1.value){
                    this.userList.splice(i,1)
                }
            }
            this.userList.unshift(this.$refs.input1.value)
            if (this.userList.length>5){
                this.userList.pop()
            }
            localStorage.setItem("userList",this.userList)
            if(!this.$refs.input1.value){MessageBox.alert("请填写用户名");return};
            if(!this.$refs.input2.value){MessageBox.alert("请填写密码");return};
            baseApi.login(this.$refs.input1.value,this.$refs.input2.value).then((res)=>{
                if (res.code === 200) {
                    this.currentUser = res.data
                    this.logged(this.currentUser)
                } else {
                    MessageBox.alert(res.message)
                }
            })
        },
        logged(data){
            localStorage.setItem("token",data.token)
            localStorage.setItem("currentUser",JSON.stringify(data.user))
            localStorage.setItem("userId",JSON.stringify(data.user.id))
            this.$router.push({ path: 'Mine' })
        },
        toggleBtm(){
            this.showList = !this.showList;
            this.showList? this.$refs.down.style[transform] = "rotate(180deg)": this.$refs.down.style[transform] = "";
            
        },
        changeUser(e){
            var event = e || window.event;
            this.userName = event.currentTarget.innerText
            this.toggleBtm()
        },
        deleteUser(e){
            var event = e || window.event;
            this.userList.splice(e.currentTarget.name,1)
        }
    },
    components:{
        Header
    },
    watch:{
        userName: function (val){
            if (val && this.passWord){
                this.$refs.login.classList.add('confirm')
            }else {
                this.$refs.login.classList.remove('confirm')
            }
        },
        passWord: function(val){
            if (this.userName && val){
                this.$refs.login.classList.add('confirm')
            }else {
                this.$refs.login.classList.remove('confirm')
            }
        }
    }
}
</script>
<style lang="less" scoped>
    @import "../../common/less/variable.less";
    @import "../../common/less/base.less";
    .wrap {
        .kefu {
        position:absolute;
        top:0;
        right:0;
        height:.88rem;
        line-height:.88rem;
        padding:0 .26rem;
        color:@color-text-title;
            >img {
                position: relative;
                top:-0.04rem;
                vertical-align: middle;
                width:.42rem;
                height:.37rem;
            }
            >span {
                font-size: @font-size-28;
                font-family:PingFang-SC-Medium;
            }
        }
        .content {
                position:absolute;
                top:.88rem;
                bottom:0;
                width: 100%;
                background-color:@color-background-l;
                .user-img {
                    width:1.98rem;
                    height:1.98rem;
                    margin:.75rem auto .46rem;
                    text-align: center;
                    border-radius: 50%;
                    border:1px solid #ccc;
                    >img {
                        width:1.98rem;
                        height:1.98rem;
                        vertical-align: middle;
                    }
                }
                .user-info {
                    width:100%;
                    border-bottom:1px solid #ccc;
                    .id {
                        position:relative;
                        width:100%;
                        height:.9rem;
                        border-top:1px solid #EEF1F3;
                        .id-img {
                            position:absolute;
                            top:.24rem;
                            left:.41rem;
                            width:.28rem;
                            height:.44rem;
                        }
                        input {
                            width:100%;
                            padding-left:1rem;
                            padding-right:0.7rem;
                            height:.9rem;
                            line-height:.9rem;
                            outline: none;
                            font-size:@font-size-28;
                        }
                        .id-down {
                            position: absolute;
                            top:.3rem;
                            right:.15rem;
                            width:.21rem;
                            height:.13rem;
                            padding:0.1rem;
                            box-sizing: content-box;
                            transition: all 0.5s;
                        }
                    }
                    .psd {
                        position:relative;
                        width:100%;
                        height:.9rem;
                        border-top:1px solid #EEF1F3;
                        .psd-img {
                            position:absolute;
                            top:.24rem;
                            left:.4rem;
                            width:.3rem;
                            height:.4rem;
                        }
                        .psd-open {
                            position: absolute;
                            top:.37rem;
                            right:.25rem;
                            width:.3rem;
                            height:.15rem;
                        }
                        input {
                            width:100%;
                            padding-left:1rem;
                            padding-right:0.7rem;
                            height:.9rem;
                            line-height:.9rem;
                            outline: none;
                            font-size:@font-size-28;
                        }
                        .psd-close {
                            position: absolute;
                            top:.34rem;
                            right:.25rem;
                            width:.35rem;
                            height:.21rem;
                        }
                    }
                }
                .logBtn {
                    width:100%;
                    padding-top:.5rem;
                    button {
                        width:6.98rem;
                        height:.8rem;
                        line-height:.8rem;
                        outline: none;
                        border:none;
                        text-align: center;
                        background: #dcdcdc;
                        color:@color-text-lll;
                        font-size:@font-size-28;
                    }
                    button.confirm{
                        background:@color-background-linear-gradient;
                    }
                    .operation {
                        margin-top:.3rem;
                        color:#666;
                        font-size:@font-size-26;
                        span.register {
                            float:left;
                            padding:0.2rem;
                            margin-left:.16rem;
                        }
                        span.forgetPsd {
                            float:right;
                            padding:0.2rem;
                            margin-right:.15rem;
                        }
                    }
                }
                .userList {
                    position:fixed;
                    top:0;
                    left:0;
                    right:0;
                    bottom:0;
                    background:rgba(0,0,0,.3);
                    .popBtm {
                        position:absolute;
                        left:0;
                        bottom:0;
                        width:100%;
                        text-align: center;
                        p.btmTitle {
                            height:.9rem;
                            line-height:.9rem;
                            color:#0E0E0E;
                            font-size:@font-size-28;
                            background:#fff;
                        }
                        p.cancle {
                            height:.9rem;
                            line-height:.9rem;
                            margin-top:.2rem;
                            font-size:@font-size-28;
                            background:#F04747;
                            color:#fff;
                        }
                        ul li {
                            position:relative;
                            height:.9rem;
                            line-height:.9rem;
                            border-top:1px solid #EEE;
                            background:#fff;
                            span {
                                font-size:@font-size-28;
                                color:#666; 
                            }
                            .delete {
                                position:absolute;
                                right:.16rem;
                                top:.16rem;
                                width:.36rem;
                                height:.36rem;
                                padding:.1rem;
                                box-sizing: content-box;
                            }
                        }
                    }
                }   
            }
    }
    
</style>
