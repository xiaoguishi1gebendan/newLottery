<template>
  <div>
     <div class="discover-header">
         <ul class="clearfix">
             <li ref="mesgs"  :class="{'active' : ifactive}" @click="winMessage">中奖信息</li>
             <li  ref="mesgs" :class="{'active' : !ifactive}" @click="MessageBan">昨日盈利榜</li>
         </ul>
     </div>

     <div class="discover-main" v-if="ifShow">
         <ul class="clearfix">
             <li class="clearfix discover-main-lis">
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
             <li class="clearfix discover-main-lis" >
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
              <li class="clearfix discover-main-lis">
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
             <li class="clearfix discover-main-lis" >
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
              <li class="clearfix discover-main-lis">
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
             <li class="clearfix discover-main-lis" >
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
              <li class="clearfix discover-main-lis">
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
             <li class="clearfix discover-main-lis" >
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
              <li class="clearfix discover-main-lis">
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
             <li class="clearfix discover-main-lis" >
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
              <li class="clearfix discover-main-lis">
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
             <li class="clearfix discover-main-lis" >
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
              <li class="clearfix discover-main-lis">
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
             <li class="clearfix discover-main-lis" >
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
              <li class="clearfix discover-main-lis">
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
             <li class="clearfix discover-main-lis" >
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
              <li class="clearfix discover-main-lis">
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
             <li class="clearfix discover-main-lis" >
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
              <li class="clearfix discover-main-lis">
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
             <li class="clearfix discover-main-lis" >
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
              <li class="clearfix discover-main-lis">
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
             <li class="clearfix discover-main-lis" >
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li> <li class="clearfix discover-main-lis">
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
             <li class="clearfix discover-main-lis" >
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
              <li class="clearfix discover-main-lis">
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
             <li class="clearfix discover-main-lis" >
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
              <li class="clearfix discover-main-lis">
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
             <li class="clearfix discover-main-lis" >
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
              <li class="clearfix discover-main-lis">
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
             <li class="clearfix discover-main-lis" >
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
              <li class="clearfix discover-main-lis">
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
             <li class="clearfix discover-main-lis" >
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
              <li class="clearfix discover-main-lis">
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
             <li class="clearfix discover-main-lis" >
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
         </ul>
          <ul class="clearfix uls">
             <li class="clearfix">
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
             <li class="clearfix" >
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
             <li class="clearfix">
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
             <li class="clearfix" >
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
             <li class="clearfix">
                 <span><img src="./i-avatar.png" alt=""></span>
                 <span>zhh******7896785</span>
                 <span>在</span>
                 <span>分分28</span>
                 <span>喜中320.00元</span>
             </li>
             
           
           
         </ul>
     </div>
    
     <div class="discover-mained" v-else>
         <ul class="clearfix">
             <li>
                 <div><img src="./i-avatar.png" alt=""></div>
                 <div><span>账号昵称：</span><span>***54855</span>
                     <p><span> 昨日盈利:</span><span> 332.00元</span></p>
                 </div>
                 <div><img src="./i-avatar.png" alt=""></div>
             </li>
              <li>
                 <div><img src="./i-avatar.png" alt=""></div>
                 <div><span>账号昵称：</span><span>***54855</span>
                     <p><span> 昨日盈利:</span><span> 332.00元</span></p>
                 </div>
                 <div><img src="./i-avatar.png" alt=""></div>
             </li>
         </ul>
     </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
        ifShow:true,
        ifactive:true,
    }
  },
 mounted(){
       let lis= document.getElementsByClassName("discover-main-lis");
    //    for (let index = 0; index < lis.length; index++) {
    //        setTimeout(() => {
    //            lis[index].classList.add("animation");
    //        }, 1000);
           
    //    }
    var index=lis.length-1;
    let timeInterval=setInterval(()=>{
        if (lis[index]) {
            lis[index].classList.add("animation");
            index--;
        }
        // lis[index].classList.add("animation");
        // index--;
        if(index<0){
            clearInterval(timeInterval)
        }
    },2700)
 },
 methods:{
     winMessage(){
         this.ifShow=true;
         this.ifactive=true;
     },
     MessageBan(){
         this.ifShow=false;
         this.ifactive=false;
     }
 },
  components: {
      
  }
}
</script>


<style scoped lang='less'>
    // 动画
    .animation{
        overflow: hidden;
        animation:mymove 2.5s ease-in-out  1 alternate forwards;
        -webkit-animation:mymove 2.5s ease-in-out  1 alternate forwards; /*Safari and Chrome*/
    }

    @keyframes mymove{
        from {height:0px;}
        to {height:1.2rem;}
    }

    @-webkit-keyframes mymove {/*Safari and Chrome*/
         from {height:0px;}
        to {height:1.2rem;}
    }

    .discover-header{
         background: linear-gradient(90deg,#fa3956,#ff6b52);
         height:1rem;
        >ul{
            margin: 0 auto;
            width:3.2rem;
            border: 2px solid #fff;
            position: relative;
            top: 0.23rem;
            border-radius: 0.1rem;
            >li{
                float: left;
                width:1.6rem;
                height:0.5rem;
                line-height: 0.5rem;
                font-size:0.24rem;
                color:#fff;
            }
        }
    }
    .discover-header .active{
        background: #fff;
        color:red;
    }
    .discover-main{
        >ul{
            background: #fff;
            >li{
                text-align: left;
                font-size: 0.28rem;
                border-bottom: 1px solid #E5E5E5;
                height: 0rem;
                overflow: hidden;
                >span{
                    float: left;
                    line-height: 1.2rem;
                    img{
                        width:0.88rem;
                        margin-top:0.17rem;
                    }
                }
                >span:nth-child(1){
                    line-height: 0rem;
                }
                >span:nth-child(1){
                    margin-left:0.26rem;
                }
                >span:nth-child(2){
                    margin-left:0.2rem;
                    color: #4891FF;
                }
                >span:nth-child(3){
                    margin-left:0.1rem;
                }
                >span:last-child{
                    float: right;
                    margin-right:0.25rem;
                    color:#F04747;
                }
            }
        }
        >.uls{
            >li{
                height:1.2rem;
            }
        }
    }
    .discover-mained{
        background: #fff;
        >ul{
            >li{
                font-size: 0.28rem;
                height: 1.2rem;
                  border-bottom: 1px solid #E5E5E5;
                >div{
                    float: left;
                     line-height: 0.6rem;
                    img{
                        width:0.88rem;
                          margin-top:0.17rem;
                    }
                }
                >div:nth-child(1){
                     margin-left:0.26rem;
                      line-height:0 ;
                }
                >div:nth-child(2){
                     margin-left:0.2rem;
                      margin-top:0.1rem;
                     >p{
                         line-height:0.4rem;
                         span:nth-child(1){
                             color:#3A78F7;
                         }
                        span:nth-child(2){
                             color:#F04747;
                         }
                     }
                }
                >div:nth-child(3){
                    float:right;
                    margin-right:0.27rem;
                     line-height:0;
                }
            }
        }
    }
</style>
