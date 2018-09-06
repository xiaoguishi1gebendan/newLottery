<template>
    <div  style="width:100%;height:100%;background:#f5f5f5; position: absolute;top: 0;z-index:1000;">
        <!-- 顶部 -->
        <headertop :title="title" > </headertop>
        <!-- 主内容区 -->
        <div class="content">
            <div class="password-wrap">
                <div class="oldpassword" id="oldpassword">
                    <span class="mima"> 旧密码：</span>
                    <div class="inputtt">
                         <input type="tel" placeholder="—" maxlength="1" name="oldPassInput" style="-webkit-text-security:disc;  margin-left: 0rem;">
                         <input type="tel" placeholder="—" maxlength="1" name="oldPassInput" style="-webkit-text-security:disc">
                         <input type="tel" placeholder="—" maxlength="1" name="oldPassInput" style="-webkit-text-security:disc">
                         <input  type="tel" placeholder="—" maxlength="1" name="oldPassInput" style="-webkit-text-security:disc">
                    </div>
                           
                </div>
                <div class="newpassword" id="newpassword">
                  <span class="mima"> 新密码：</span> 
                  <div class="inputtt">
                      <input  type="tel" placeholder="—" maxlength="1" name="newPassInput" style="-webkit-text-security:disc; margin-left: 0rem;">
                      <input  type="tel" placeholder="—" maxlength="1" name="newPassInput" style="-webkit-text-security:disc">
                      <input  type="tel" placeholder="—" maxlength="1" name="newPassInput" style="-webkit-text-security:disc">
                      <input  type="tel" placeholder="—" maxlength="1" name="newPassInput" style="-webkit-text-security:disc">
                  </div>
                     
                </div>
                <p>
                    如果旧密码输错3次，将冻结您的账号，如果忘记交易密码，请点击重置按钮。
                </p>
                <div class="btn">
                    <input type="button" value="立即修改" id="resetTradePwd" @click="resetTradePwd">
                    <input type="button" value="重置交易密码" class="opentxtbox"  @click="opentxtbox">
                </div>
            </div>
        </div>
        <div>
        </div>
        <div>

        </div>
    <div class="chongzhi"  ref="chongzhi">
      <div></div>
      <div >
        <ul>
          <li>重置交易密码</li>
          <li><input type="password" placeholder="请输入登录密码" ref="pass" :value="value"></li>
          <li><span>取消</span><span @click="queding">确定</span></li>
        </ul>
     </div>
    </div>
    
     

      
    </div>
</template>

<script>

</script>

<style scoped lang="less" >
input{
  -webkit-appearance: none;
}
.chongzhi {
  
  display: none;
  position: fixed;
  top: 40%;
  width: 100%;
  font-size: 0.14rem;
  > div:nth-child(1) {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.3;
    z-index: 3;
  }
  > div:nth-child(2) {
    position: absolute;
    width: 100%;
    z-index: 999;
  }
  ul {
    margin: 0 auto;
    width: 76%;
    background: #fff;
    border-radius: 6px;
    > li:nth-child(1) {
      line-height: 0.45rem;
      font-size: 0.18rem;
    }
    > li:nth-child(2) {
      padding-bottom: 0.2rem;
      border-bottom: 1px solid #eee;

      > input {
        margin: 0rem 0;
        outline: none;
        border: none;
        line-height: 0.35rem;
        width: 80%;
        border-radius: 4px;
        background: #eee;
        font-size: 0.16rem;
      }
    }
    > li:nth-child(3) {
      line-height: 0.5rem;
      span {
        display: inline-block;
        width: 50%;
        line-height: 0.5rem;
      }
      > span:nth-child(1) {
        box-sizing: border-box;
        border-right: 1px solid #eee;
      }
    }
  }
}
/*主内容区*/
/*content*/

.password-wrap {
  width: 94%;
  margin: 0 auto;
  padding-top: 0.01rem;
}
.oldpassword {
  width: 100%;
  height: 0.45rem;
  line-height: 0.45rem;
  background: #fff;
  border: 0.01rem solid #eee;
  border-radius: 0.04rem;
  margin-top: 0.1rem;
  text-indent: 0.12rem;
  font-size: 0.16rem;
  color: #666;
}
.newpassword {
  width: 100%;
  height: 0.45rem;
  line-height: 0.45rem;
  background: #fff;
  border: 0.01rem solid #eee;
  border-radius: 0.04rem;
  margin-top: 0.1rem;
  text-indent: 0.12rem;
  font-size: 0.16rem;
  color: #666;
}
.password-wrap input {
  width: 20%;
  height: 0.3rem;
  line-height: 0.3rem;
  text-align: center;
  border: 0.01rem solid #e4e4e4;
  // background: #f5f5f5;
  // margin-left: 0.1rem;
  border-radius: 0;
  font-size: 0.16rem;
  float: left;
  margin-top: 0.07rem;
  margin-left: 0.1rem;
}
// .password-wrap input:nth-child(1){
//    margin-left: 0rem;
// }
.password-wrap p {
  margin-top: 0.18rem;
  font-size: 0.12rem;
  color: #999;
  text-align: left;
}
.btn input {
  display: block;
  height: 0.48rem;
  border-radius: 0.06rem;
  color: #fff;
  font-size: 0.16rem;
  line-height: 0.48rem;
  text-align: center;
  width: 74%;
  // background: linear-gradient(90deg, #fa3956, #ff6b52);
  margin: 0.2rem auto 0;
  outline: none;
  margin-left: 13%;
}
.mima {
  float: left;
  // width: 24%;
  // text-align: right;
}
.inputtt {
  float: right;
  width:calc(100% - 0.8rem)
  // width: 73%;
}
</style>