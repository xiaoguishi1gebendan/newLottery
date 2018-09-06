<template>
    <div class="baseAttr" id="baseAttr">
        <ul class="clearfix">
            <li @click="selectBaseAttr">
                <section>
                    <span class="spanbg" id="W"></span>
                    <em>万位</em>
                </section>
            </li>
            <li @click="selectBaseAttr">
                <section>
                    <span class="spanbg" id="Q"></span>
                    <em>千位</em>
                </section>
            </li>
            <li @click="selectBaseAttr">
                <section>
                    <span class="spanbg" id="B"></span>
                    <em>百位</em>
                </section>
            </li>
            <li @click="selectBaseAttr">
                <section >
                    <span class="spanbg" id="S"></span>
                    <em>十位</em>
                </section>
            </li>
            <li @click="selectBaseAttr">
                <section>
                    <span class="spanbg" id="G"></span>
                    <em>个位</em>
                </section>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        data(){
            return{
            }
        },
        mounted(){
            var baseAttr = document.getElementById("baseAttr")
            this.$store.state.listX = baseAttr.getElementsByClassName('active')
        },
        methods:{
            selectBaseAttr(e){
                var event = e || window.event;
                event.currentTarget.children[0].children[0].classList.toggle('active')
                var baseAttr = document.getElementById("baseAttr")
                this.$store.state.listX = baseAttr.getElementsByClassName('active')
                console.log(this.$store.state.listX)
                this.$emit("selectBaseAttr")
            }
        }

    }
</script>
<style scoped lang="less">
    @import "../../common/less/variable.less";

    .baseAttr {
        position:fixed;
        bottom:1.05rem;
        left:0;
        right:0;
        padding:0.3rem 0.43rem;
        background:@color-background-main;
        ul {
            li {
                float:left;
                position: relative;
                height: .36rem;
                line-height: .36rem;
                margin-right:0.27rem;
                text-indent: .51rem;
                span {
                    display: block;
                    width: .36rem;
                    height: .36rem;
                    position: absolute;
                    background: url("./notselected@2x.png") no-repeat;
                    background-size: .36rem .36rem;
                }
                span.active {
                    background: url("./selected@2x.png") no-repeat;
                    background-size: .36rem .36rem;
                }
                em {
                    font-size:0.3rem;
                    color:#1E1E1E;
                    font-style: normal;
                }
            }
            li:last-child {
                margin-right:0;
            }
        }
    }

</style>

