<template>
  <div style="background:#EEF1F3;height:100%;position:absolute;top:0;width:100%;z-index:1;">
      <MHeader :showRuleName='false' title="添加银行卡"></MHeader>
      <div class="withdrawMian">
          <div class="content_zhuanzhang tianjiayinhangka">
			<div class="sk_xx" >请绑定持卡人本人银行卡 </div>
			<div class="first-one">
				<div class="sk_yh_1">持卡人 </div>
				<input type="text" placeholder="请输入持卡人姓名" class="sk_yh_2" id="peeInput" v-model="input1" :disabled="ifdisabled">
        <img @click="widAlert1" src="../../imgs/tips.png" alt="">
			</div>
			<div class="first-one" id="select" >
				<div class="sk_yh_1">银行名称 </div>
            <input  id="showBank" @click="chooseBank" class="sk_yh_2" style="text-align:left;color:#666" placeholder="请选择银行卡" v-model="input2">
				<div class="tx_right_1">
                    <!-- <img src="../../assets/images/right_1_05.png" alt=""> -->
                </div>

			</div>

			<div class="first-one" >
				<div class="sk_yh_1">银行卡号 </div>
				<input type="tel"  placeholder="请输入银行卡号"  pattern="[0-9*]" class="sk_yh_2" id="bankAccountInput" v-model="input3"> 
			</div>
			<div class="first-one">
				<div class="sk_yh_1">开户支行 </div>
				<input type="text" placeholder="请输入开户支行" class="sk_yh_2" id="openPointInput" maxlength="15" v-model="input4">
			</div>

			<div id="tradePwdDiv" class="first-one" v-if="ifpassword">
				<div class="sk_yh_1">交易密码 </div>
				<input v-model="paaword1"  type="tel" placeholder="—" maxlength="1" name="1" class="sk_yh_5" style="-webkit-text-security:disc" />
				<input v-model="paaword2" type="tel" placeholder="—" maxlength="1" name="2" class="sk_yh_5" style="-webkit-text-security:disc" />
				<input v-model="paaword3" type="tel" placeholder="—" maxlength="1" name="3" class="sk_yh_5" style="-webkit-text-security:disc" />
				<input v-model="paaword4" type="tel" placeholder="—" maxlength="1" name="4" class="sk_yh_5" style="-webkit-text-security:disc" />
        <img @click="widAlert2" src="../../imgs/tips.png" alt="">
			</div>
			<div class="btn" @click="addCard">
				<a id="confirmSubmitA"> <button class="btn_zf" id="btn_zf">完成</button></a>
			</div>
      <div class="widthTi">
        <p>温馨提示</p>
        <p>安全密码用于提现、绑定银行卡操作，可保障资金安全； </p>
      </div>
     </div>
       
      </div>
       <!-- picker --> 
        <div class="pickerr" v-if="ifPicker">
            <div class="pi"><p @click="Sure"><span>取消</span><span>完成</span></p></div>
            <div class="keer">
                <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
            </div>
        </div>
  </div>
</template>

<script>
import MHeader from "base/header/header"
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      slots: [
        {
          flex: 1,
          values: [
            "中国",
            "美国",
            1,2,3,4,5,6
          ],
          className: "slot1",
          textAlign: "center"
        }
      ],
      ifPicker:false,
      bankname:"请添加银行卡",
      input1:"",
      input2:"",
      input3:"",
      input4:"",
      paaword1:"",
      paaword2:"",
      paaword3:"",
      paaword4:"",
      localUser:"",
      ifpassword:1,
      bankListIndex:1,
      ifdisabled:false,
    }
  },
 mounted(){
   this.localUser=JSON.parse(localStorage.getItem("currentUser"));
   this.ifpassword=!this.localUser.userCardList.length;
   if(this.localUser.userCardList.length){
     this.input1=this.localUser.userCardList[0].name;
     this.ifdisabled=true
   }
 },
 methods:{
   widAlert1(){
     MessageBox({
        title: '持卡人说明',
        message: '为了您的账户安全，只能绑定持卡人本人的银行卡。获取帮助，请联系在线客服。',
        showCancelButton: true,
        showCancelButton:false,
      });
   },
   widAlert2(){
      MessageBox({
        title: '交易设置提醒',
        message: '交易密码用于余额提现，可以在账户安全中修改。',
        showCancelButton: true,
        showCancelButton:false,
      });
   },
   chooseBank(){
     this.ifPicker=!this.ifPicker;
   },
   onValuesChange(picker, val) {
      this.bankname = val[0];
    },
    Sure(){
      this.ifPicker=false;
    },
    addCard(){
      if (!this.input1) {
        Toast('请填写持卡人');
        return;
      } else if (!this.input2) {
         Toast("请选择银行");
        return;
      } else if (this.input3 && toString(this.input1).length < 6||toString(this.input3).length >30) {
        Toast("请输入6-30位银行卡号");
        return;
      } else if (!this.input4) {
         Toast("请填写开户银行");
         return;
      } 
      
      if (!this.localUser.userCardList.length) {
        if (!(this.paaword1&&this.paaword2&&this.paaword3&&this.paaword4) ) {
          Toast("请填写完整交易密码");
           return;
        }
        // 第一次添加银行卡
        let paaword=Number(this.paaword1+this.paaword2+this.paaword3+this.paaword4) ;
        
        
        baseApi.tiedCard(this.localUser.id,this.bankListIndex,this.input1,this.input3,this.input4,paaword).then((res)=>{
           
          if (res && res.code == 200) {
              baseApi.userInfo(this.localUser.id).then((res)=>{
                if(res.code==200){
                  this.currentUser= res.data.user;
                  localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
                }else{
                  Toast(res.message);
                }
              });
              this.$router.go(-1);
           }else{
             Toast(res.message);
           }
        });
        
      } else {
        // 多次添加银行卡
        baseApi.tiedCard(this.localUser.id,this.bankListIndex,this.input1,this.input3,this.input4,"").then((res)=>{
          if (res && res.code == 200) {
              baseApi.userInfo(this.localUser.id).then((res)=>{
                if(res.code==200){
                  this.currentUser= res.data.user;
                  localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
                  this.$router.go(-1);
                }else{
                  Toast(res.message);
                }
              });
               this.$router.go(-2);
           }else{
             Toast(res.message);
           }
        });
      }
    }
   },
  components: {
      MHeader
  }
}
</script>

<style scoped lang='less'>

.withdrawMian{
    font-size: 0.28rem;
    width:100%;
    .widthTi{
      margin-top: 0.2rem;
      margin-left:0.3rem;
      text-align: left;
      p{
        line-height: 0.3rem;
        padding-left:0.1rem;
        border-left:2px solid #F14846;
      }
       p:nth-child(2){
        margin-top: 0.2rem;
        border-left:none;
        color: #939393;
      }
    }
}
.wrap_header {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 200;
}
.index_header {
  width: 100%;
  height: 0.45rem;
  display: flex;
  color: #fff;
  margin: 0 auto;
}
.index_header h3 {
  height: 0.45rem;
  line-height: 0.45rem;
  flex: 1;
  text-align: center;
}
.index_header .mycollect {
  height: 0.45rem;
  line-height: 0.45rem;
  width: 0.72rem;
  text-align: center;
}

#select {
  input::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #000;
  }
}

i.back-icon {
  width: 11px;
  height: 20px;
  background-position: 0 0;
}

i.icon {
  display: inline-block;
  vertical-align: middle;
  background-size: 200px auto;
}

.tx_right_1 {
  top: 85%;
  right: 4%;
  transform: translateY(-50%);
  position: absolute;
  > img {
    width: 0.12rem;
  }
}

.tixing {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  display: none;
  > div:nth-child(2) {
    width: 100%;
    height: 100%;
    position: absolute;
    background: #000;
    opacity: 0.3;
    top: 0;
  }
  > div:nth-child(1) {
    position: absolute;
    z-index: 1;
    background: #fff;
    width: 70%;
    left: 15%;
    border-radius: 10px;
    top: 40%;
    span {
      display: inline-block;
      // background: #fff;
      line-height: 26px;
      // width: 270px;
      padding: 0 15px;
    }
    span:nth-child(2) {
      color: gray;
    }
    span:nth-child(1) {
      border-radius: 6px 6px 0 0;
      line-height: 50px;
      font-weight: 700;
    }
    span:last-child {
      border-radius: 0 0 6px 6px;
      line-height: 40px;
      color: red;
      width: 90%;
     border-top: 1px solid #f5f5f5;
    }
  }
}

.pi {
      position: absolute;
    z-index: 1;
    background: white;
    line-height: 0.7rem;
    width: 100%;
    color: #26a2ff;
  > p {
    overflow: hidden;
    > span:nth-child(1) {
      float: left;
      padding: 0 0.2rem;
    }
    > span:nth-child(2) {
      float: right;
      padding: 0 0.2rem;
    }
  }
}

.picker-center-highlight:after {
  background: #000 !important;
}
.pickerr {
     position: absolute;
    width: 100%;
    height: 3.5rem;
    overflow: hidden;
    bottom: 0;
}
.keer {
  height: 2rem;
  width: 100%;
}

#sk_fz_1 {
  width: 28px;
  height: 28px;
  border: none;
  margin-right: 3%;
}

.sk_fz_1 {
  width: 0.28rem;
  height: 0.28rem;
  margin-right: 3%;
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 0;
}
#btn_zf {
    width: 6.98rem;
    margin-top: 10%;
    height: 0.8rem;
    outline: none;
    border: none;
    color: #fff;
    border-radius: 5px;
    background: linear-gradient(0deg,rgba(240,71,71,1),rgba(254,95,49,1));
}
.tianjiayinhangka {
  > .sk_xx {
    text-align: left;
    
    color: #666;
    padding-left:0.3rem;
    color:#888888;
    line-height: 0.87rem;
  }
  .first-one {
    width: 100%;
    background: #fff;
    border-bottom: 1px solid whitesmoke;
    line-height: 0.9rem;
    height: 0.9rem;
    position: relative;
    box-sizing: content-box;
    color: #333333;
    .sk_yh_2 {
          outline: none;
    border: none;
    float: left;
    height: 0.9rem;
    line-height: 0.9rem;
    box-sizing: border-box;
    }
    img{
      width: 0.34rem;
      float: right;
      margin: 0.28rem;
    }
  }
  .sk_yh_5 {
    width: 0.8rem;
    height: 0.5rem;
    margin-left: 0.2rem;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #f5f5f5;
    vertical-align: middle;
    float: left;
    margin-top: 0.2rem;
  }
  .sk_yh_5:nth-child(1) {
    margin-left:0rem;
  }
}


.oheader {
  width: 100%;
  height: 0.45rem;
  /*background: #2f9336;*/
  position: relative;
}

.set {
  height: 0.45rem;
  position: absolute;
  // left: 5%;
  line-height: 0.45rem;
}

.oheader h2 {
  height: 0.45rem;
  line-height: 0.45rem;
  text-align: center;
  color: #fff;
  font-weight: 600;
}

input {
  -webkit-appearance: none;
}
input:disabled {
  background-color: #fff;
  color: #000;
  opacity: 1;
}
.sk_yh_5 {
  text-align: center;
}
.sk_yh_1 {
  width: 1.5rem;
  text-align: left;
  padding-left: 0.3rem;
      float: left;
          margin-right: 0.1rem;
}
#showBank {
  border: 0;
}
.selclip {
  background: none;
}
.weui-picker-modal {
  background-color: #d3d6dc;
}
.first-one #sk_fz_1 {
  border-radius: 50%;
}

#sk_fz_2 {
  border-radius: 50%;
}
.weui-picker-modal .picker-item.picker-selected {
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
}
.tx_right_1 img {
  width: 62%;
}
</style>
