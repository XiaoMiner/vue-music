<template>
  <div>
    <div id="net-cloud-header">
      <div id="header-top">
        <div id="header-top-wrap" class="clearFix">
          <div id="header-logo" class="fl">
            <i class="logo-icon"></i>
            <a @click="backIndex">Ann云音乐</a>
          </div>

          <ul class="fl clearFix">
            <li class="fl" v-bind:class="{navClickedBg: navIndex == 0}"><router-link class="router-link" to="/myMusicIndex" @click.native="toggleNetCloudNav(0)">我的首页</router-link><i v-bind:class="{redArrow: navIndex == 0}"></i></li>
            <li class="fl" v-bind:class="{navClickedBg: navIndex == 1}"><router-link class="router-link" to="/findMusic" @click.native="toggleNetCloudNav(1)">音乐库</router-link><i v-bind:class="{redArrow: navIndex == 1}"></i></li>
            <li class="fl" v-bind:class="{navClickedBg: navIndex == 2}"><router-link class="router-link" to="/myMusic" @click.native="toggleNetCloudNav(2)">我的音乐</router-link><i v-bind:class="{redArrow: navIndex == 2}"></i></li>
            <li class="fl" v-bind:class="{navClickedBg: navIndex == 3}"><router-link class="router-link" to="/musician" @click.native="toggleNetCloudNav(3)">音乐人</router-link><i v-bind:class="{redArrow: navIndex == 3}"></i></li>
            <li class="fl" v-bind:class="{navClickedBg: navIndex == 4}"><router-link class="router-link" to="/downloadClient" @click.native="toggleNetCloudNav(4)">下载客户端</router-link><i class="hot"></i><i v-bind:class="{redArrow: navIndex == 4}"></i></li>
          </ul>

        </div>
        <div class="quit-login" @click="quitLogin">
          退出
        </div>
      </div>

    </div>
    <IndexContent/>
    <fixedPlayer></fixedPlayer>
  </div>

</template>

<script>
import IndexContent from './IndexContent'
import store from '../../vuex/store'
import fixedPlayer from '../commons/fixedPlayer'
export default {
  name: 'IndexHeader',
  components: {
    IndexContent,
    fixedPlayer
  },
  data () {
    return {
      store,
      /*
      * 0-我的首页
      * 1-发现音乐
      * 2-我的音乐
      * 3-音乐人
      * 4-下载客户端
      * */
      navIndex: 0
    }
  },
  created(){

  },
  mounted(){
    /********************************************/
    //处理在刷新页面以后导航的默认选中的背景色处理逻辑
    let routeName = window.location.hash.slice(2);
    if(routeName == "myMusicIndex"){
      this.navIndex = 0;
    } else if(routeName == 'songSheet'){
      this.navIndex = 1;
    }else if(routeName == 'myMusic'){
      this.navIndex = 2;
    }else if(routeName == 'musician') {
      this.navIndex = 3;
    }else if(routeName == 'downloadClient'){
      this.navIndex = 4;
    }
    this.toggleNetCloudNav(this.navIndex);
    /*********************************************/
  },
  methods: {
    //退出登录
    quitLogin(){
      this.$router.push({
        path: '/login',
        name:'MyLogin'
      });
      // 退出登录之后, 是否登录的状态要改变。
      sessionStorage.setItem('isLogin', '0');
    },
    backIndex(){
      this.$router.push({
        path: '/myMusicIndex',
        name: 'myMusicIndex'
      })
      this.navIndex = 0;
    },
    toggleNetCloudNav (index) {
     this.navIndex = index;
    },
  },
}
</script>

<style scoped>
  #header-top-wrap #head {
    position: relative;
  }
  #header-top-wrap #head .user-personal-info {
    width: 158px;
    height: 204px;
    background: #2b2b2b;
    border: 1px solid #202020;
    z-index: 12;
    position: absolute;
    box-shadow: 0 8px 24px 0 rgba(0,0,0,0.50);
    border-radius: 4px;
    top: 40px;
    left: -60px;
  }
  #header-top-wrap #head .styleShow {
    display: block;
  }
  #header-top-wrap #head .styleHide {
    display: none;
  }
  #header-top-wrap #head .user-personal-info:before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #fff;
    transform: rotate(45deg);
    position: absolute;
    top: -4px;
    left: 50%;
    margin-left: -10px;
    background: #2b2b2b;
  }
  #header-top-wrap #head .user-personal-info ul li {
    width: 158px;
    height: 34px;
    position: relative;
    line-height: 34px;
  }
  #header-top-wrap #head .user-personal-info ul li:hover {
    background: #353535;
  }
  #header-top-wrap #head .user-personal-info ul li .user-mask {
    width: 158px;
    height: 34px;
    float: left;
    position: absolute;
    top: 0;
    left: 0;
  }
  .user-personal-info ul li .info-icon {
    display: block;
    width: 18px;
    height: 18px;
    float: left;
    margin: 7px 10px 0 20px;
  }
  .user-personal-info ul li .info-icon1 {
    background: url('../../assets/images/toplist.png') 0 -80px no-repeat;
  }
  .user-personal-info ul li .info-icon2 {
    background: url('../../assets/images/toplist.png') -21px -120px no-repeat;

  }
  .user-personal-info ul li .info-icon3 {
    background: url('../../assets/images/toplist.png') 0 -101px no-repeat;

  }
  .user-personal-info ul li .info-icon4 {
    background: url('../../assets/images/toplist.png') 0 -161px no-repeat;

  }
  .user-personal-info ul li .info-icon5 {
    background: url('../../assets/images/toplist.png') 0 -142px no-repeat;

  }
  .user-personal-info ul li .info-icon6 {
    background: url('../../assets/images/toplist.png') 0 -121px no-repeat;

  }
  .user-personal-info ul li .info-description{
    float: left;
    font-size: 12px;
    color: #ccc;
  }
  .user-personal-info ul li .user-mask:hover .info-description {
    color: #fff;
  }
  /*网易云音乐头部处理*/
  #net-cloud-header {
    width: 100%;
    color: #ccc;
  }

  #header-top {
    position: relative;
    height: 70px;
    background: #242424;
  }

  #header-top-wrap {
    width: 1100px;
    margin:0 auto;
  }
  /*logo部分处理*/
  #header-logo {
    width: 182px;
    height: 69px;
    margin-right: 30px;
    cursor: pointer;
  }
  #header-logo .logo-icon{
    display: inline-block;
    float: left;
    width: 48px;
    height: 48px;
    margin: 12px 0 0 4px;
    background: url('../../assets/images/Ann_cloud_one.png') no-repeat;
  }
  #header-logo a {
    display: inline-block;
    float: left;
    width: 130px;
    height: 100%;
    color: #fff;
    text-align: center;
    font-family: "Times New Roman", Times, serif;
    /*font: 14px/1.5 'Microsoft YaHei',arial,tahoma,\5b8b\4f53,sans-serif;*/
    font-size: 24px;
    line-height: 69px;
  }

  /*列表部分处理*/
  #header-top-wrap ul li {
    line-height: 70px;
    height: 70px;
    position: relative;
  }
  #header-top-wrap ul li:hover a {
    color: #fff;
  }
  /* 显示红色箭头 */
  #header-top-wrap ul li .redArrow{
    display: inline-block;
    width: 12px;
    height: 6px;
    background: url('../../assets/images/header.png') -226px 0 no-repeat;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -6px;
  }

  /* 选择网易云导航后背景色 */
 .navClickedBg {
    background-color: #000;
    color: #fff;
  }
  .navRecoveryDefault {
    background-color: #242424;
    color: #ccc;
  }
  #header-top-wrap ul li .router-link {
    display: inline-block;
    height: 70px;
    padding: 0 14px 0 14px;
    color: #ccc;
  }
  #header-top-wrap ul li:hover {
    background-color: #000;
    color: #fff;
  }

  #header-top-wrap ul .hot {
    display: inline-block;
    width: 26px;
    height: 13px;
    background: url('../../assets/images/header.png') -192px 0 no-repeat;
    position: relative;
    top: -4px;
    right: 7px;
  }


  /*退出登录*/
  #header-top .quit-login {
    position: absolute;
    top: 24px;
    right: 120px;
    font-size: 16px;
    cursor: pointer;
  }
  #header-top .quit-login:hover {
    text-decoration: underline;
  }
  /*搜索框处理部分*/
  #header-top-wrap .search {
    width: 158px;
    height: 32px;
    border-radius: 30px;
    background-color: #fff;
    margin-top: 19px;
    position: relative;
  }
  #header-top-wrap .search .magnifier{
    display: inline-block;
    width: 14px;
    height: 14px;
    background: url('../../assets/images/header.png') -9px -108px no-repeat;
    position: absolute;
    top: 8px;
    left: 10px;
  }
  #header-top-wrap .search input {
    width: 120px;
    line-height: 16px;
    font-size: 12px;
    outline: none;
    border: none;
    position: relative;
    top: 8px;
    right: 4px;
  }

  /*摄影机处理*/

  #header-top-wrap .video-submission {
    display: inline-block;
    width: 58px;
    height: 32px;
    color: #ccc;
    font-size: 12px;
    line-height: 32px;
    background: url('../../assets/images/header.png') 0px -140px no-repeat;
    margin: 19px 0 0 12px;
    padding-left: 32px;
  }
  #header-top-wrap .video-submission:hover{
    background: url('../../assets/images/header.png') -100px -140px no-repeat;
    color: #fff;
  }
  /*头像部分处理*/
  #header-top-wrap #head {
    margin: 19px 0 0 20px;
    height: 45px;
  }
  #header-top-wrap #head .head-portrait {
      padding-right: 12px;
  }
  #header-top-wrap #head .head-portrait img {
    border-radius: 30px;
  }
  #header-top-wrap #head .arrow {
    display: inline-block;
    width:12px;
    height: 7px;
    background: url('../../assets/images/header.png') right -60px no-repeat;
    position: relative;
    top: 12px;
  }
</style>
