<template>
  <div class="footer">
    <ul>
      <li>
        <router-link to="/Home">
          <dl>
            <dt class="dtbg"></dt>
            <dd>首页</dd>
          </dl>
        </router-link>
      </li>
      <li>
        <router-link to="/buy">
          <dl>
            <dt class="dtbg"></dt>
            <dd>活动</dd>
          </dl>
        </router-link>
      </li>
      <li>
        <router-link to="/Discover">
          <dl>
            <dt class="dtbg"></dt>
            <dd>发现</dd>
          </dl>
        </router-link>
      </li>
      <li>
        <router-link to="/Mine">
          <dl>
            <dt class="dtbg"></dt>
            <dd>我的</dd>
          </dl>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>

    export default {
      data () {
        return {
          iffooter:true
        }
      },
      components: {

      },
      mounted(){
        console.log(this.$route.path)
        if(this.$route.path!="/Home"){
          this.iffooter=false;
        }
      },
      methods:{
          
      }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "../../common/less/variable.less";

  .footer {
    width: 100%;
    background: #f9f9f9;
    height: .89rem;
    position: fixed;
    bottom: 0;
    text-align: center;
    z-index: 0;
  }
  .footer ul {
    width: 100%;
    display: flex;
  }
  .footer ul li {
    height: .89rem;
    width: 25%;
    padding-top:.08rem;
    list-style: none;
  }
  .footer ul li a {
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-decoration: none;
  }

  .footer ul li dl dt {
    height: .25rem;
    margin-top: 0.02rem;
  }
  .footer ul li dl dt.dtbg {
    width: .41rem;
    height: .4rem;
    margin: 0 auto;
  }
  .footer ul li:nth-of-type(1) dl dt.dtbg {
    background: url('./home-s.png') no-repeat;
    background-size: .41rem .4rem;
  }
  .footer ul li:nth-of-type(2) dl dt.dtbg {
    background: url('./activities.png') no-repeat;
    background-size: .41rem .4rem;
  }
  .footer ul li:nth-of-type(3) dl dt.dtbg {
    background: url('./found.png') no-repeat;
    background-size: .41rem .4rem;
  }
  .footer ul li:nth-of-type(4) dl dt.dtbg {
    background: url('./i.png') no-repeat;
    background-size: .41rem .4rem;
  }
  .footer ul li dl dd {
    color: #000;
    font-size: @font-size-22;
    margin-top:.05rem;
  }



 .footer ul li:nth-of-type(1) a.router-link-active dl dt.dtbg{
        background: url('./home.png') no-repeat;
        background-size: .41rem .4rem;
    }
  .footer ul li:nth-of-type(2) a.router-link-active dl dt.dtbg{
        background: url('./home.png') no-repeat;
        background-size: .41rem .4rem;
    }
  .footer ul li:nth-of-type(3) a.router-link-active dl dt.dtbg{
        background: url('./foundActive.png') no-repeat;
        background-size: .41rem .4rem;
    }
  .footer ul li:nth-of-type(4) a.router-link-active  dl dt.dtbg{
        background: url('./i-acrive.png') no-repeat;
        background-size: .41rem .4rem;
    }
</style>
