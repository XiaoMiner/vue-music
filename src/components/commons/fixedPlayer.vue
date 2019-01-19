<template>
    <div id="music-player">
      <div class="music-player-wrap">
        <audio id="music-player-audio" controlsList="nodownload" controls autoplay :src="fileServer+playSongInfo.songUrl"></audio>
        <span v-if="playSongInfo.singerName || playSongInfo.songName" class="playing-song-name">{{playSongInfo.singerName+' / '+playSongInfo.songName}}</span>
        <i class="operate-player-button">
          <span class="operate-lock" @click="operateLock"></span>
        </i>
      </div>
    </div>
</template>

<script>
  export default {
    name: "fixedPlayer",
    data(){
      return {
        fileServer: this.$interface.musicFileServerUrl,
        lockStatus: true,
        playSongInfo: {}
      }
    },
    methods:{
      operateLock(){
        this.lockStatus = !this.lockStatus;
        if(!this.lockStatus){
          $('.operate-lock').css({
            transform: 'rotate(-180deg)'
          })
          $('#music-player').css({
            height: '2px'
          })
        }else {
          $('.operate-lock').css({
            transform: 'rotate(0deg)'
          })
          $('#music-player').css({
            height: '135px'
          })
        }

      }
    },
    computed:{
      getPlaySongInfo(){
        return this.$store.state.playSongInfo
      }
    },
    watch:{
      getPlaySongInfo(newValue, old){
        if(newValue){
          this.playSongInfo = newValue;
        }
      }
    }
  }
</script>

<style scoped>
  #music-player {
    width: 100%;
    height: 135px;
    background: #222222;
    position: fixed;
    left:0;
    bottom: 0;
    transition: all .5s linear;
    z-index: 150;
  }
  .music-player-wrap {
    width: 1100px;
    height: 54px;
    margin: 45px auto 0;
    text-align: center;
    position: relative;
  }
  .music-player-wrap #music-player-audio {
    width: 100%;
    height: 100%;
  }
  .music-player-wrap .playing-song-name {
    position: absolute;
    top: -24px;
    left: 45%;
    font-size: 15px;
    font-weight: 700;
    color: #fff;
  }
  .music-player-wrap .operate-player-button{
    display: block;
    width: 65px;
    height: 67px;
    background: url('../../assets/images/playbar.png') 0 -383px no-repeat;
    position: absolute;
    right: -120px;
    top: -60px;
    text-align: center;
  }
  .operate-player-button .operate-lock {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url('../../assets/images/arrow_down.png') no-repeat;
    position: absolute;
    top: 4px;
    left: 17px;
    cursor: pointer;
  }
</style>
