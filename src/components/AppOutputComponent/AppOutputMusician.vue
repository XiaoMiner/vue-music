<template>
    <div id="musician">
      <div class="musician-header">
        <div class="musician-header-wrap">
          <i class="musician-icon"></i>
          <router-link class="header-logo" to="/myMusicIndex">Ann云音乐</router-link>
          <span class="musician-name">音乐人</span>
        </div>
      </div>
      <FullPage/>
    </div>
</template>

<script>
  import FullPage from './../FullPage'
  export default {
    name: 'AppOutputMusician',
    components: {
      FullPage
    }
  }
</script>

<style scoped>
  #musician {}

  #musician .musician-header {
    /*height: 60px;*/
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    right: 0;
    background: #242424;
    /*background: rgba(36,36,36,0.7);*/
    /*transition: background 1s ease-in;*/
  }
  #musician .musician-header .musician-header-wrap {
    width: 1200px;
    height: 60px;
    margin: 0 auto;
    /*background: white;*/
  }
  .musician-header-wrap .musician-icon {
    display: inline-block;
    float: left;
    width: 32px;
    height: 32px;
    background: url('../../../static/icon/musician_icon.png') no-repeat;
    margin: 12px 4px 0 78px;
  }
  .musician-header-wrap .header-logo{
    display: block;
    float: left;
    text-align: center;
    overflow: hidden;
    color: #fff;
    font: 27px/1.5 'Microsoft YaHei',arial,tahoma,\5b8b\4f53,sans-serif;
    text-shadow: 0 0 2px #fff;
    margin: 8px 0 0 0;
  }
  .musician-header-wrap .musician-name {
    display: block;
    float: left;
    width: 600px;
    text-align: center;
    overflow: hidden;
    color: #fff;
    font: 27px/1.5 'Microsoft YaHei',arial,tahoma,\5b8b\4f53,sans-serif;
    text-shadow: 0 0 2px #fff;
    margin: 8px 0 0 0;
  }
</style>
