<template>
  	<div style="position:absolute;top:0;width:100%;height:100%;background:#EEF1F3;z-index:99;overflow:hidden;">
	 <headertop :title="title" :showRuleName='false'> </headertop>
	 <p style="height:0.2rem;"></p>
      	<div class="main" ref="firstone">
			<div class="pre-paid towaytop">
				<ul>
					<li v-for="(item ,index) in list" :key="index" @click="routerto" class="paidin">
						<img :src="domain+item.logo.fileurl" alt="" >
						<span>
							<span style="float:left">{{item.name}}</span>
							<img v-if="item.isHot" src="../../imgs/recomed.png" alt="">
						</span>						

						<i :name='item.id' class="icorig" ></i>
					</li>
				</ul>
			</div>
		</div>
	    <transition name="slide">
           <router-view></router-view>
        </transition>
		
  	</div>
	  
</template>

<script>
import headertop from "base/header/header"
import {config} from "api/config"
  export default{
    components: { 
        headertop,
    },
  data() {
        return {
			title:"选择充值方式",
			datal:"充值明细",
			list:[],
			// bodyheight:""
			name:"",
			amount:"",
			domain:config.domain,
			currentUser:""
        }
    },
    mounted(){
		this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
		
		this.getUser()

	
		
	},
    methods:{
        getUser(){
			if(!this.$store.state.rechage){
				  baseApi.newRechargeList(this.currentUser.id).then((res)=>{
					this.$store.state.rechage=res.data.payIncomeTypeGroup;
					this.list=this.$store.state.rechage;
				});
			}else{
				this.list=this.$store.state.rechage;
			}
		},
	  routerto(){
		for(var i=0;i<this.list.length;i++){
			console.log(event.currentTarget.children[2])
			console.log()
			if(event.currentTarget.children[2].getAttribute("name")==this.list[i].id){
			console.log("ddddddddddddddddd")
			console.log(this.list[i])	
				if(this.list[i].payIncomeType[0].payType.type==3){
					console.log(this.list[i].payIncomeType[0].payType.type)	
					this.$store.state.goNum=1;
					 this.$router.push({ path: `/banking` })
					 
				}else{
					this.$store.state.goNum=1;
					this.$store.state.rechargedetal=this.list[i].payIncomeType;
				console.log(this.$store.state.rechargedetal)
				  this.$router.push({ path: `/recharge/${this.list[i].id}` })
				}
				
			}
		}
		console.log()
	  }
	
    }
 }
</script>

<style scoped lang='less'>
.icorig{
	float: right;
    margin-top: 0.52rem;
    display: inline-block;
    width: 0.25rem;
    height: 0.25rem;
    border-top: 1px solid #ccc;
    border-right: 1px solid #ccc;
    transform: rotate(45deg);
    margin-right: 0.2rem;
}
.paidin{
	position: relative;
	
	>div{
		    position: absolute;
    top: -0.05rem;
	left: 1.24rem;
	display:none;
	}
}
    .returnAll{
        line-height: 0.45rem;
    }
    .returnAll i {
        font-size: 26px !important;
        position: absolute;
	}
	
	.main{
	background-color: white;
	font-size:0.14rem;
}
.user-message{
	display: flex;
	align-items: center;
	padding-left: 0.16rem;
	box-sizing: border-box;
	/*margin-top: 1rem;*/
}
.user-message img{
	width: 0.6rem;
}
.user-message .messageAll{
	display: flex;
	flex-direction: column;
	padding: 0.16rem 0 0.16rem 0.16rem;
	box-sizing: border-box;
}
.messageAll span{
	// font-size: 17px;
}
.messageAll span:last-child{
	margin-top: 0.08rem;
}
.typeAll{
	width: 100%;
	height: 0.4rem;
	background-color: #f5f5f5;
	line-height: 0.4rem;
	padding-left: 0.16rem;
	// margin-top: 0.4rem;
	text-align: left;
	box-sizing: border-box;
}
.pre-paid ul{
	padding-left: 0.16rem;
	box-sizing: border-box;
}
.pre-paid ul li{
   list-style-type: none;
    height: 1.3rem;
    border-bottom: 1px solid #f7f5f5;
    padding-right: 0.16rem;
}
.pre-paid ul li:last-child{
	border-bottom:none ;
}
.pre-paid ul li>img{
	    width: 0.66rem !important;
    height: 0.66rem !important;
    float: left;
    margin-top: 0.32rem;
    border-radius: 50%;
}
.pre-paid ul li >span{
	text-align: left;
    margin-left: 0.1rem;
    font-size: 0.15rem;
    line-height: 0.62rem;
    float: left;
    width: 73%;
}
.pre-paid ul li >span>img{
    width: 0.53rem;
    margin-top: 0.2rem;
}
.pre-paid ul li >span>span{
	    float: left;
    line-height: 1.3rem;
    font-size: 0.28rem;
    margin-left: 0.2rem;
}
.set .iconfont{
	// font-size: 22px;
}
.paidinn{
	display: none;
}
.topicImg::before{
	content: '';
    width: .15rem;
    height: .15rem;
    background-size: contain;
    display: inline-block;
    vertical-align: middle;
    margin-right: .05rem;
	// background-image: url('../../../assets/source/imgs/topic.png')
}
</style>
