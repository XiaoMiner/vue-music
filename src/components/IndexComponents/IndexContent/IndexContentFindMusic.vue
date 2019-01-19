<template>
  <div id="find-music">
     <div class="find-music-top">
       <div class="find-music-top-wrap">
         <ul>
           <li class="fl"><router-link to="/songSheet" @click.native="toggleMusicTopNav(songSheet)" v-bind:class="{musicTopNavBg: songIsShowBg, musicTopNavDefaultBg: songIsShowDefaultBg}">歌单</router-link></li>
           <li class="fl"><router-link to="/singer" @click.native="toggleMusicTopNav(singer)" v-bind:class="{musicTopNavBg: singerIsShowBg, musicTopNavDefaultBg: singerIsShowDefaultBg}">歌手</router-link></li>
         </ul>
       </div>
     </div>
    <FindMusic/>
  </div>
</template>

<script>
import FindMusic from './FindMusic'
import store from '../../../vuex/store'
export default {
  name: 'IndexContentFindMusic',
  data () {
    return {
      store,
      songSheet: '歌单',
      singer: '歌手',

      songIsShowBg: false,
      singerIsShowBg: false,

      songIsShowDefaultBg: true,
      singerIsShowDefaultBg: true,

      findMusicNavName: ''
    }
  },
  mounted(){
    /********************************************/
    //处理在刷新页面以后导航的默认选中的背景色处理逻辑
    let routeName = window.location.hash.slice(2);
   if(routeName == 'songSheet') {
      this.findMusicNavName = '歌单'
    }else if(routeName == 'singer'){
      this.findMusicNavName = '歌手'
    }
    this.isShowMusicNavBg(this.findMusicNavName, true, false);
    /*********************************************/
  },
  computed: {
    getValue(){
      console.log(this.$store.state.DLS_pageEnter);
      return this.$store.state.DLS_pageEnter;
    }
  },
  methods: {
    isShowMusicNavBg (musicNavTopNameFP, booleanBg, booleanDefaultBg) {
      /* 发现音乐子导航背景色处理 */
      this.songIsShowBg = false
      this.singerIsShowBg = false

      /* 发现音乐子导航背景色恢复默认处理 */
      this.songIsShowDefaultBg = true
      this.singerIsShowDefaultBg = true

      switch (musicNavTopNameFP) {
        case '歌单':
          this.songIsShowBg = booleanBg
          this.songIsShowDefaultBg = booleanDefaultBg
          break
        case '歌手':
          this.singerIsShowBg = booleanBg
          this.singerIsShowDefaultBg = booleanDefaultBg
          break
      }
    },
    toggleMusicTopNav (musicNavTopName) {
       if (musicNavTopName === '歌单') {
        this.isShowMusicNavBg(musicNavTopName, true, false)
      } else if (musicNavTopName === '歌手') {
        this.isShowMusicNavBg(musicNavTopName, true, false)
      }
    }
  },
  components: {
    FindMusic
  }
}
</script>

<style scoped>
  #find-music {
    height: 100%;
  }
  .find-music-top {
    height: 35px;
    background-color: #C20C0C;
  }
  .find-music-top .find-music-top-wrap{
    width: 1100px;
    margin: 0 auto;
  }
  .find-music-top-wrap ul {
    margin-left: 180px;
  }
  .find-music-top-wrap ul li {
    padding: 0 17px 0 17px;
    line-height: 35px;

  }
  .find-music-top-wrap ul li a {
    color: #fff;
    font-size: 12px;
    padding: 4px 13px 4px 13px;
  }
  .find-music-top-wrap ul li a:hover {
    border-radius: 13px;
    background-color: #9b0909;
  }
  .musicTopNavBg {
    border-radius: 13px;
    background-color: #9b0909;
  }
  .musicTopNavDefaultBg {
    background-color: #C20C0C;
  }
</style>
