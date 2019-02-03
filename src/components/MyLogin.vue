<template>
  <div id="my-login">
      <div class="login-validate-part">
        <div class="login-validate-login">
          <h3 class="login-validate-h3">Ann音乐登录</h3>
          <div class="login-validate-content">
            <form @submit.prevent="submit" autocomplete="off">
              <div class="clearFix">
                <label for="email" class="login-validate-content-label">用户帐号:</label>
                <input class="login-validate-content-input" id="email" placeholder="请输入用户帐号 . . ." v-model="userName" name="email" type="text">
              </div>
              <br/>
              <div class="user-password clearFix">
                <label for="password" class="login-validate-content-label">用户密码:</label>
                <input type="password" class="login-validate-content-input" placeholder="请输入用户密码 . . ." v-model="userPassword" id="password" name="password">
              </div>
              <p :class="{ShowStyle: isShow, hideStyle: isHide}" style="height: 20px; color:red; font-size: 18px;text-align: center;margin: 14px 0 0 0">{{detectionInfo}}</p>
              <button type="submit" class="login-validate-content-button pointer" value="登录">登录</button>
            </form>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'MyLogin',
  data(){
    return {
      userName: '',
      userPassword: '',
     /* userNameInfo: this.$md5('admin'),
      userPasswordInfo: this.$md5('123456'),*/
      isShow: false, // 验证信息样式显示
      isHide: true, // 验证信息样式隐藏
      detectionInfo:'', // 验证信息
      isDown: false,//该状态表示是否按下鼠标
      mousePositionBoxX: 0,
      mousePositionBoxY: 0,
      isLeaveEle: 0,//该状态表示鼠标是否离开元素。
    }
  },
  mounted(){
    // console.dir(this.$md5)
  },
  methods: {
    submit(){
      if(this.userName == '' && this.userPassword == ''){
        this.isShow = true;
        this.isHide = false;
        this.detectionInfo = '用户名称不能为空！'
        return ;
      }else if(this.userName != '' && this.userPassword == ''){
        this.isShow = true;
        this.isHide = false;
        this.detectionInfo = '用户密码不能为空！'
        return ;
      }else if(this.userName == '' && this.userPassword != ''){
        this.isShow = true;
        this.isHide = false;
        this.detectionInfo = '用户名称不能为空!'
        return ;
      }
      var _this = this;
      _this.$axios.get(_this.$interface.xMusicLoginValid+'/?userName='+_this.userName+'&userPassword='+_this.userPassword)
        .then(function(responseData){
          if(responseData.data.status == 1){
            // 帐号 密码 都不为空。
            _this.isShow = false;
            _this.isHide = true;
            _this.detectionInfo = responseData.data.message;
            window.location = window.location.origin+'/#/myMusicIndex'; // 登录成功之后跳转到首页
            sessionStorage.setItem("isLogin", '1')
          }else {
            _this.isShow = true;
            _this.isHide = false;
            _this.detectionInfo = '帐号和密码不匹配!';
          }
        })
        .catch(function(err){
          console.log(err);
        })

    },
  },
  watch:{
    userName(newValue, oldValue){
      if(newValue != ''){
        this.isShow = false;
        this.isHide = true;
      }
    },
    userPassword(newValue, oldValue){
      if(newValue != ''){
        this.isShow = false;
        this.isHide = true;
      }

    }
  }
}
</script>

<style scoped>
  #my-login:before{
    display: table;
    content: "";
  }
#my-login {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
  position: relative;

}
#my-login .login-validate-part {
  width: 600px;
  height: 324px;
  background: #B5A476;
  border-radius: 4px;
  margin: 12% auto 0;
}

#my-login .login-validate-login {
  margin: 0 24px;
}
#my-login .login-validate-h3 {
  padding: 10px 0px;
  text-align: center;
  color: #6c5b4c;
  font-size: 32px;
}
.login-validate-part .login-validate-content {
  width: 360px;
  margin: 24px auto;
  position: relative;
}
/*用户密码*/
.login-validate-content .user-password {
  margin: 14px 0 0 0;
}
.login-validate-content .login-validate-content-label {
  float: left;
  color: rgba(0, 0, 0, .5);
  font-size: 18px;
  margin: 4px 0 0 0;
}
.login-validate-content .login-validate-content-input {
  height: 32px;
  width: 240px;
  float: left;
  margin-left: 24px;
  color: rgba(0, 0, 0, .5);
  background: #fff;
  border-radius: 4px;
  outline: none;
  border: none;
  padding: 0 0 0 7px;
  /*background: rgba(0, 0, 0, .3);*/
}
.login-validate-content .login-validate-content-button {
  position: absolute;
  outline: none;
  border: none;
  width: 175px;
  height: 42px;
  border-radius: 4px;
  left: 50%;
  margin-left: -87px;
  bottom: -74px;
  font-size: 18px;
  background: rgba(0, 0, 0, .3);
}

.ShowStyle {
    visibility: visible;
}
.hideStyle {
  visibility: hidden;
}
</style>
