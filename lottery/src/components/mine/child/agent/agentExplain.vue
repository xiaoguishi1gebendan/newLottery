<template>
    <div class="wrap">
        <Header :showRuleName="false" title="代理说明" ref="header" class="header"></Header>
        <div style="overflow:scroll;" ref="body">
            <img style="width: 100%;" :src="url" alt="">
            <div v-html="result" style="font-size:0.3rem;text-align:left;margin:0 0.2rem;line-height:0.32rem;padding-bottom:0.45rem;" class="getHtml"></div>
        </div>
    </div>
</template>
<script>
import Header from "base/header/header" 
import { MessageBox } from 'mint-ui'
import {config} from 'api/config'

export default {
    data(){
        return{
            result:'',
            url:''
        }
    },
    mounted(){
        this._ploxyContent()
        this.$refs.body.style.height = window.screen.availHeight -document.getElementsByClassName('header')[0].offsetHeight + 'px';
    },
    methods:{
        _ploxyContent(){
            baseApi.ploxyContent(localStorage.getItem("userId")).then((res)=>{
                if (res.code === 200){
                    this.result = res.data.activityDesc
                    this.url = config.domain+res.data.logo.fileurl
                } else {
                    MessageBox.alert(res.message)
                }
            })
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
        position:absolute;
        top:0;
        bottom:0;
        width:100%;
        background: @color-background-mine;
        z-index:9;
    }
</style>

