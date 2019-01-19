<template>
  <div class="root-element">
    <!--内容部分-->
    <div class="my-music-index-top">
    </div>
    <div class="find-music-content">
      <!--内容-上部分-->
      <div class="find-music-content-top">
        <div class="find-music-wrap">
          <SowingMap @sowingPrevAndNext="toggleMusicContentBg"></SowingMap>
        </div>
      </div>
      <!--内容-中间部分-->
      <div class="find-music-content-middle">

      </div>
    </div>
    <!--尾部-->
    <a href="javascript: void(0)" v-back-top class="callback-top" :class="{scrollButton: isShowScrollButton}" @click="callbackTop()"></a>
    <NetCloudMusicFooter/>
  </div>

</template>

<script>
  import SowingMap from '../../SowingMap'
  import NetCloudMusicFooter from '../../commons/NetCloudMusicFooter'
  import store from '../../../vuex/store'
  export default {
    name: "MyMusicIndex",
    data() {
      return {
        store,
        hotRecommendationData:[],
        individualizationRecommendData: [],
        billboardListData: [],
        liveSingerData: [],
        popularAnchorData: [],
        newPlateData: [],
        sowingNextTwo: false,
        sowingNextThree: false,
        sowingPrevTwo: false,
        sowingPrevOne: false,
        sowingIndex: 1,
        isShowScrollButton: false,
        week: this.currentWeek(),
        day: this.currentDay()
      }
    },
    components: {
      SowingMap,
      NetCloudMusicFooter
    },
    created() {

    },
    mounted() {

    },
    methods: {
      toggleMusicContentBg(uploadValue) {
        console.log(uploadValue)
      },
      currentWeek(){
        let date = new Date();
        let week = date.getDay();
        let weekString = '';
        switch (week) {
          case 1: weekString = '星期一'
            break;
          case 2: weekString = '星期二'
            break;
          case 3: weekString = '星期三'
            break;
          case 4: weekString = '星期四'
            break;
          case 5: weekString = '星期五'
            break;
          case 6: weekString = '星期六'
            break;
          case 0: weekString = '星期天'
            break;
          default : weekString = ''
            break;
        }
        return weekString
      },
      currentDay() {
        let date = new Date();
        let day = date.getDate();
        return day;
      },
      callbackTop() {
        this.$store.commit('update', 0)
        this.isShowScrollButton = false
      }
    },
    computed: {
      getValue(){
        // console.log(this.$store.state.callBack)
        return this.$store.state.callBack
      }
    },
    watch: {
      getValue(newValue, oldValue){
        if(newValue == 0){
          this.isShowScrollButton = false
        }else if(newValue == 1){
          this.isShowScrollButton = true
        }else {
          console.log('监听$store.state.callback的值出错')
        }
      }
    }
  }
</script>

<style scoped>
  .my-music-index-top {
    height: 5px;
    background-color: #C20C0C;
  }
  .callback-top {
    display: block;
    width: 49px;
    height: 44px;
    background: url("../../../assets/images/sprite.png") -265px -47px no-repeat;
    position: fixed;
    bottom: 160px;
    left: 50%;
    margin-left: 510px;
    display: none;
  }
  .callback-top:hover {
    background: url("../../../assets/images/sprite.png") -325px -47px no-repeat;
  }
  .scrollButton {
    display: block;
  }
  /*========================*/
  .find-music-content {

  }

  /* 头部 */
  .find-music-content-top {
    background: url('../../../assets/images/sowing_imgbg5.png') 0px 0 repeat;
  }
  .find-music-content-top .find-music-wrap {
    width: 984px;
    height: 336px;
    margin: 0 auto;
  }
  .find-music-content-top .find-music-download {
    float: left;
    width: 254px;
    height: 336px;
    background: url('../../../assets/images/download.png') 0 0 no-repeat;
  }
  .find-music-download a {
    display: inline-block;
    width: 215px;
    height: 56px;
    margin: 212px 0 0 19px;
    text-indent: -9999px;
  }
  .find-music-download a:hover {
    background: url('../../../assets/images/download.png') 0px -340px no-repeat;
  }
  .find-music-download p {
    font-size: 12px;
    color: #8d8d8d;
    margin: 10px auto;
    text-align: center;
  }

  /* 中间部分 */
  .find-music-content .find-music-content-middle {
    height: 1674px;
  }
  .find-music-content-middle .find-music-wrap {
    width: 984px;
    height: 100%;
    /*background: blue;*/
    margin: 0 auto;
    border-left: 1px solid #d3d3d3;
    border-bottom: 1px solid #d3d3d3;
    border-right: 1px solid #d3d3d3;

  }

</style>
