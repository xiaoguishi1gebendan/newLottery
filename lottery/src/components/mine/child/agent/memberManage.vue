<template>
    <div class="wrap">
        <Header :showRuleName="false" class="header" title="会员管理"></Header>
        <div class="memberManage">
            <p class="title">
                <span>账号</span>
                <span>类型</span>
                <span>登录时间</span>
                <span>下级人数</span>
            </p>
            <ul>
                <li v-for="(item,index) in lowerList" :key="index" @click="chooseItem(item.user,item.rebate)">
                    <span>{{item.user}}</span>
                    <span>{{item.type}}</span>
                    <span>{{item.time}}</span>
                    <span>{{item.number}}</span>
                </li>
            </ul>
            <p class="tips">已显示全部数据</p>
            <div class="pop" v-show="showPop" @click.self="showPop = false">
                <div class="popMain">
                    <p class="popTitle">
                        <span><img src="./user@2x.png" alt="">{{user}}</span>
                        <span>彩票返点：{{rebate}}</span>
                    </p>
                    <p class="next" v-show="next">查看下级</p>
                    <p class="pre" v-show="pre">返回上级</p>
                    <p class="cancel" @click.stop="showPop = false">取消</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import Header from 'base/header/header'

export default {
    data(){
        return {
            lowerList:[
                {user:'fsafd',type:'1级代理',time:'2018-06-21',number:'1',rebate:'1960'},
                {user:'qqqsss',type:'2级代理',time:'2018-06-11',number:'3',rebate:'1950'},
                {user:'aaaaasd',type:'1级代理',time:'2018-06-05',number:'2',rebate:'1948'}
            ],
            user:'asdadas',
            rebate:'',
            showPop:false,
            pre:false,
            next:true
        }
    },
    methods:{
        chooseItem(user,rebate){
            this.user = user;
            this.rebate = rebate;
            this.showPop = true;
        }
    },
    components:{
        Header
    }
}
</script>
<style lang="less" scoped>
    @import "../../../../common/less/variable.less";

    .memberManage {
        font-family: PingFang-SC-Medium;
        .title {
            display: flex;
            height:.8rem;
            line-height: .8rem;
            background: #FFF;
            margin-bottom:.2rem;
            span {
                flex:1;
                font-size:@font-size-28;
                color:#333;
            }
        }
        ul {
            margin-bottom:.36rem;
            li {
                display: flex;
                width:100%;
                height:.9rem;
                line-height: .9rem;
                background: #FFF;
                border-bottom:1px solid #F7F7F7;
                span {
                    flex:1;
                    font-size:@font-size-28;
                    color:#888888;
                    font-family:ArialMT;
                }
                span:first-child {
                    color:#4891FF;
                }
                span:last-child {
                    color:#F04747;
                }
            }
            li:last-child {
                border-bottom:none;
            }
        }
        .tips {
            color:#939393;
            font-size:@font-size-26;
        }
        .pop {
            position: fixed;
            top:0;
            bottom:0;
            left:0;
            right:0;
            background:rgba(0,0,0,.3);
            .popMain {
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
                    height:.9rem;
                    line-height: .9rem;
                    background: #fff;
                    border-bottom:1px solid #EEE;
                    font-size:@font-size-28;
                    color:#333;
                }
                p.cancel {
                    height:.9rem;
                    line-height: .9rem;
                    margin-top:.2rem;
                }
            }
        }
    }
</style>

