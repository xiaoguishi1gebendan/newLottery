<template>
    <div class="wrap">
        <Header :showRuleName="false" title="代理中心"></Header>
        <div class="mainBody">
            <img src="./agent@2x.png" class="bgImg">
            <ul class="list">
                <li @click="$router.push({path:'agentExplain'})">代理说明</li>
                <li @click="$router.push({path:'agentReport'})">代理报表</li>
                <li @click="$router.push({path:'lowerReport'})">下级报表</li>
                <li @click="$router.push({path:'lowerOpenAccount'})">下级开户</li>
                <li @click="$router.push({path:'memberManage'})">会员管理</li>
                <li @click="$router.push({path:'betDetail'})">投注明细</li>
                <li @click="$router.push({path:'exchangeDetail'})">交易明细</li>
            </ul>
        </div>
        <transition name="slide">
            <router-view/>
        </transition>     
    </div>
</template>
<script>
import Header from "base/header/header" 

export default {
    data(){
        return {

        }
    },
    methods:{
        // agentExplain(){
        //     this.$router.push({path:'agentExplain'})
        // },
        // agentReport(){
        //     this.$router.push({path:'agentReport'})
        // },
        // lowerReport(){
        //     this.$router.push({path:'lowerReport'})
        // },
        // lowerOpenAccount(){
        //     this.$router.push({path:"lowerOpenAccount"})
        // }
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
        background: @color-background-mine;
        z-index:9;
        .mainBody {
            width:100%;
            .bgImg {
                display: block;
                width:100%;
                height:3.5rem;
                margin-bottom:.2rem;
            }
            ul {
                width:100%;
                padding-left:.25rem;
                font-family:PingFang-SC-Medium;
                background: #fff;
                li {
                    position: relative;

                    height:.95rem;
                    line-height: .95rem;
                    background: #fff;
                    font-size:@font-size-28;
                    color:#333;
                    border-bottom:1px solid #E5E5E5;
                    text-align: left;
                }
                li:after{
                    position: absolute;
                    right:.28rem;
                    top:.38rem;
                    content:'';
                    border-top:1px solid #999999;
                    border-bottom:1px solid transparent;
                    border-right:1px solid #999999;
                    border-left:1px solid transparent;
                    width:.13rem;
                    height:.13rem;
                    transform: rotate(45deg);
                }
                li:nth-last-child(1) {
                    border-bottom:none;
                }
            
            }
        }
    }
</style>
