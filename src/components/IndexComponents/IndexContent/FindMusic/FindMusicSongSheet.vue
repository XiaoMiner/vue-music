<template>
<div id="song-sheet">
  <div class="song-sheet-wrap clearFix">
    <!--歌手分类列表-->
    <div class="singer-sort-list">
        <div class="all-songs" @click="toggleAllSongs">{{'全部('+songPaginationInfoAll.totalNumber+')'}}</div>
        <div class="other-singer-song" @click="toggleArrow()">
          <span class="song-arrow" :class="{arrowRotateClose: arrowStatus == false, arrowRotateOpen: arrowStatus == true}">▲</span>
          <span class="other-sort">分类歌手</span>
        </div>
      <div class="singer-list" v-show="arrowStatus">
          <li class="singer-item" v-for="(singleSinger,index) in singerListData" :class="{selectedSingerActive: isSelectedSinger == index}" @click="toggleSinger(index, singleSinger)"><span>{{singleSinger.singerName}}</span></li>
      </div>
    </div>
    <div class="song-sheet-wrap-content">
      <div class="song-sheet-header">
        <i class="song-sheet-header-icon"></i>
        <span class="song-sheet-singer-name">{{singerTitle}}</span>
        <span class="have-song-number" v-if="isSelectedAll == 1">{{songPaginationInfoAll.totalNumber}}首歌</span>
        <span class="have-song-number" v-if="isSelectedAll == 0">{{songPaginationInfoSection.totalNumber}}首歌</span>
      </div>
      <div class="sswrap-content-ul">
        <table>
          <tr>
            <th>序号</th>
            <th>播放</th>
            <th>歌曲标题</th>
            <th>时长</th>
            <th>歌手</th>
          </tr>
          <tr v-for="(singleSong, index) in songListData" @mouseover="mouseOverTr(index)" @mouseout="mouseOutTr">
          <td>{{index + 1}}</td>
          <td><i class="operate-song-button" :class="{playButtonActive: playIndex == index}" @click="togglePlaySong(index, singleSong)"></i></td>
          <td>{{singleSong.songName}}</td>
          <td class="add-song-add">{{singleSong.duration}}
            <div class="operate-song" v-if="isShowAddCurrentArea == index">
              <i class="operate-song-add" @click="showOperateModal(singleSong)"></i>
            </div>
          </td>
          <td>{{singleSong.singerName}}</td>
          </tr>
        </table>
      </div>

      <div class="pagination-nav">
        <pagination v-if="isSelectedAll == 0" :page="songPaginationInfoSection.totalPage" :currentPage="songPaginationInfoSection.currentIndex"></pagination>
        <pagination v-if="isSelectedAll == 1" :page="songPaginationInfoAll.totalPage" :currentPage="songPaginationInfoAll.currentIndex"></pagination>
      </div>
    </div>
  </div>
  <!--底部-->
  <div class="net-cloud-music-footer">

  </div>
  <!--模态款-->
  <div class="confirm-modal" v-if="isShowOperateModal">
    <div class="confirm-modal-wrap">
      <div class="confirm-modal-header">
        <span class="operate-prompt">提示</span>
        <span class="close-modal" @click="closeModal">x</span>
      </div>
      <div class="operate-des-content">
        <div class="operate-song-des">
          是否将该歌曲添加到我的音乐中?
        </div>
        <div class="operate-song-button">
          <button class="operate-song-confirm" @click="confirmModal">确定</button>
          <button class="operate-song-cancel" @click="closeModal">取消</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import pagination from './../../../pagination/pagination'
import NetCloudMusicFooter from './../../../commons/NetCloudMusicFooter'
import filterMusicTime from './../../../../js/filterMusicTime';
export default {
  name: 'FindMusicSongSheet',
  data(){
    return {
      fileServer: this.$interface.musicFileServerUrl,
      page: 3,
      songListData: [], //获取到歌曲列表
      songPaginationInfoAll: {},//'全部' - 分页信息
      songPaginationInfoSection: {}, // '分类歌手' - 分页信息;
      arrowStatus: false,//箭头的状态,
      paginationPost:{
        index: 1,
        size: 13
      },// 分页参数
      recordNumber: 0, //记录歌曲时间是否都已经处理完毕
      playIndex: -1, //正在播放歌曲的索引
      selectedPlaySong: '',//正在播放的歌曲
      recordPlaySongPosition: {
        pageIndex: 1,
        songIndex: 0,
      },//记录播放歌曲的位置。

      singerListData: [],//歌手列表
      isSelectedSinger: -1, //是否选中歌手

      singerSongsPost: { // 获取到指定歌手的歌曲的参数
        index: 1,
        size: 13,
        singerId: ''
      },

      singerTitle: '全部', //切换全部、歌手时头部的处理。

      isSelectedAll: 1, // 1 -表示选中了'全部' 0选中分类的歌手

      isShowAddCurrentArea: -1,//是否显示当前歌曲的操作区域
      isShowOperateModal: 0,//是否显示操作模态框
      selectedSongInfo: {},//当对歌曲进行操作时,进行的保存歌曲信息。
    }
  },
  mounted(){
    this.getAllSongs();
    this.getAllSingers()

  },
  methods:{

    // 显示模态框
    showOperateModal(songInfo){
      console.log(songInfo);
      this.selectedSongInfo = songInfo;
      this.isShowOperateModal = 1;
    },
    //确定添加
    confirmModal(){
      this.addUserHaveSong(this.selectedSongInfo.id);
    },
    // 添加音乐到我的音乐中 xMusicAddUserHaveSongs
    addUserHaveSong(currentSongId){
      let _this = this;
      _this.$axios.post(_this.$interface.xMusicAddUserHaveSongs, {userId: 1, songId: currentSongId})
        .then(function(responseData){
          if(responseData.data.status == 1){
            _this.closeModal();
            alert(responseData.data.message)
          }else { //表示当前歌曲已经存在了
            _this.closeModal();
            alert('当前歌曲已在我的音乐中!')
          }
        })
        .catch(function (err) {
          console.log(err);
        })
    },
    // 鼠标放到tr上
    mouseOverTr(index){
      this.isShowAddCurrentArea = index;
    },

    mouseOutTr(){
      this.isShowAddCurrentArea = -1;
    },

    // 切换全部的歌曲
    toggleAllSongs(){
      this.singerTitle = '全部';

      this.isSelectedAll = 1;
      //初始化
      this.paginationPost.index = 1;
      this.playIndex = -1;
      this.isSelectedSinger = -1;

      this.getAllSongs();
    },
    // 切换歌手
    toggleSinger(index, singerInfo){
      //初始化
      this.isSelectedAll = 0;
      this.singerSongsPost.index = 1;

      this.isSelectedSinger = index;
      this.singerSongsPost.singerId = singerInfo.singerId;
      this.singerTitle = singerInfo.singerName;
      this.getCurrentSingerSongs();
    },
    // 获取到指定歌手
    getCurrentSingerSongs(){
      var _this = this;
      _this.$axios.get(_this.$interface.xMusicQueryHaveSongsToSinger+'?singerId='+_this.singerSongsPost.singerId+'&pageIndex='+_this.singerSongsPost.index+'&pageSize='+_this.singerSongsPost.size).then(function(responseData){
        console.log(responseData);
        _this.songListData = responseData.data.data;
        _this.songPaginationInfoSection = responseData.data;
        if(responseData.data.status == 1){
          let length = _this.songListData.length;
          for(let i = 0; i < length; i++){
            let singleSong = _this.songListData[i];
            filterMusicTime(singleSong.songUrl, function(time){
              let songIndex = i;
              _this.recordNumber +=1;
              _this.songListData[songIndex].duration = time;

              if(_this.recordNumber == length){ //保证切换页码时 歌曲时间能够刷新出来。
                _this.recordNumber = 0;
                _this.songListData = [..._this.songListData];
              }
            });
          }
        }else {
          console.log(responseData.data.message);
        }
      })
        .catch(function(err){
          console.log(err);
        })
    },
    // 切换播放的歌曲
    togglePlaySong(index, songInfo){
      this.playIndex = index;
      this.recordPlaySongPosition.pageIndex = this.paginationPost.index;
      this.recordPlaySongPosition.songIndex = index;
      this.$store.commit('updateSongInfo', songInfo);
    },
    // 获取到歌手
    getAllSingers(){
      let _this = this;
      _this.$axios.get(_this.$interface.xMusicQueryAllSingers+'?pageIndex=1&pageSize=100000').then(function(responseData){
        console.log(responseData);

        if(responseData.data.status == 1){
          _this.singerListData = responseData.data.data;
        }else {
          console.log(responseData.data.message);
        }
      })
        .catch(function (err) {
          console.log(err);
        })
    },
    // 获取到整个音乐库的歌曲
    getAllSongs(){
      let _this = this;
      _this.$axios.get(_this.$interface.xMusicQueryAllSongs+'?pageIndex='+_this.paginationPost.index+'&pageSize='+_this.paginationPost.size+'').then(function(responseData){
        console.log(responseData);
        _this.songPaginationInfoAll = responseData.data;
        _this.songListData = responseData.data.data;
        if(responseData.data.status == 1){
          let length = _this.songListData.length;
          for(let i = 0; i < length; i++){
            let singleSong = _this.songListData[i];
            filterMusicTime(singleSong.songUrl, function(time){
              let songIndex = i;
              _this.recordNumber +=1;
              _this.songListData[songIndex].duration = time;

              if(_this.recordNumber == length){ //保证切换页码时 歌曲时间能够刷新出来。
                _this.recordNumber = 0;
                _this.songListData = [..._this.songListData];
              }
            });
          }
        }else {
          console.log(responseData.data.message);
        }


      })
        .catch(function(err){
          console.log(err);
        })
    },
    // 切换箭头的状态
    toggleArrow(){
      this.arrowStatus = !this.arrowStatus;
      if(this.arrowStatus){
        $('.singer-list').show(500)
      }else {
        $('.singer-list').hide(500)
      }
    },
    // 分页处理。
    pagechange(pageNumber){
      if( this.isSelectedAll){
        this.paginationPost.index = pageNumber;
        this.getAllSongs();

      }else {
        this.singerSongsPost.index = pageNumber;
        this.getCurrentSingerSongs();
      }

      this.playIndex = -1;
    //  处理正在播放的音乐在切换页码之后的播放回显。
      if(pageNumber == this.recordPlaySongPosition.pageIndex){
        this.playIndex = this.recordPlaySongPosition.songIndex;
      }
    },
    closeModal(){
      this.isShowOperateModal = 0;
    },
  },
  components:{
    pagination,
    NetCloudMusicFooter
  }
}
</script>

<style scoped>
  /*通用性*/

.arrowRotateOpen {
  transition: all .5s linear;
  transform: rotate(180deg);
}
.arrowRotateClose {
  transition: all .5s linear;
  transform: rotate(90deg);
}
#song-sheet {
  background: #f5f5f5;
}
#song-sheet .song-sheet-wrap {
  width: 1164px;
  margin: 0 auto;
  background: #fff;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  position: relative;
}
/*歌手分类列表*/
.song-sheet-wrap .singer-sort-list {
  width: 240px;
  float: left;
  position: absolute;
  padding: 40px 0;
}

/*全部*/
.singer-sort-list .all-songs {
  height: 38px;
  font-size: 16px;
  color: #000;
  font-weight: 700;
  line-height: 38px;
  padding: 0 0 0 34px;
  cursor: pointer;
  border-top: 1px solid #ccc;
}
.singer-sort-list .all-songs:hover {
  background: #eee;
}

/*分类歌曲*/
.singer-sort-list .other-singer-song {
  height: 38px;
  font-size: 16px;
  color: #000;
  font-weight: 700;
  line-height: 38px;
  padding: 0 0 0 6px;
  cursor: pointer;
}
/*箭头*/
.other-singer-song .song-arrow {
  display: inline-block;
}

/*歌手列表*/
.singer-sort-list .singer-list {

}

/*指定歌手*/
.singer-list .singer-item {
  height: 34px;
  font-size: 14px;
  color: #000;
  line-height: 34px;
  cursor: pointer;
  padding: 0 0 0 34px;
}
.singer-list .singer-item:hover {
  background: #eee;
}
/*内容部分*/
.song-sheet-wrap .song-sheet-wrap-content {
  width: 924px;
  margin: 0 0 0 240px;
  padding: 40px 0 0 0;
  height: 100%;
  box-sizing: border-box;
  border-left:1px solid #d3d3d3;
  position: relative;
}

/*歌曲列表头部*/
.song-sheet-wrap-content .song-sheet-header {
  height: 33px;
  padding: 0 10px 0 7px;
  border-bottom: 2px solid #C10D0C;
  margin:0 0 10px 10px;
}
.song-sheet-header .song-sheet-header-icon {
  display: inline-block;
  height: 15px;
  width: 15px;
  background: url('../../../../assets/images/index.png') -235px -164px no-repeat;
}
/*头部-歌手名称*/
.song-sheet-header .song-sheet-singer-name {
  color: #000;
  font-size: 24px;
  font-weight: 700;
  margin:0 0 0 7px;
}
/*头部-歌曲数目*/
.song-sheet-header .have-song-number {
  color: #666;
  font-size: 14px;
  margin: 0 0 0 7px;
}
.song-sheet-wrap-content .sswrap-content-ul {
  height: 562px;
  padding: 0 10px 0 10px;
  border-bottom: 2px solid #d3d3d3;
}

/*操作音乐部分*/
  .sswrap-content-ul table tr .add-song-add {
    position: relative;
  }
  .sswrap-content-ul table tr .add-song-add .operate-song{
    width: 100%;
    height: 100%;
    background: #eee;
    position: absolute;
    top: 0;
    left: 0;
  }
  .sswrap-content-ul table tr .add-song-add .operate-song-add {
    display: inline-block;
    width: 17px;
    height: 14px;
    background: url('../../../../assets/images/table.png') 0 -174px no-repeat;
    margin: 13px 0 0 12px;
    cursor: pointer;
  }
  .sswrap-content-ul table tr .add-song-add .operate-song-add:hover {
    background: url('../../../../assets/images/table.png') -20px -174px no-repeat;
  }

.sswrap-content-ul table {
  width: 100%;
  table-layout:fixed;
  border-collapse: separate;
}

table tr {

}
.sswrap-content-ul table tr th{
  border: 1px solid #d3d3d3;
  color: #666;
  font-size: 14px;
}

.sswrap-content-ul table tr td .operate-song-button {
  display: inline-block;
  cursor: pointer;
  width: 17px;
  height: 17px;
  background: url('../../../../assets/images/table.png') 0 -103px no-repeat;
}
  .sswrap-content-ul table tr td .operate-song-button:hover {
    background: url('../../../../assets/images/table.png') 0 -128px no-repeat;
  }
/*表格头部的第一个和第二个单元格处理*/
table tr th:nth-child(1),
table tr th:nth-child(2){
  width: 42px;
  text-align: center;
}
/*其他行的第一个和第二个单元格处理*/
table tr td:nth-child(1),
table tr td:nth-child(2){
  width: 42px;
  text-align: center;
}
table tr th {
  padding: 10px 7px;
  text-align: left;
}
table tr td{
  padding: 10px 7px;
}

table tr:nth-child(2n) {
  background: #eee;
}
/* 第一行 第一个头部单元格*/
.sswrap-content-ul table tr:first-child th:first-child {
  /*左上*/
  border-top-left-radius: 12px;
}
/*第一行 最后一个头部单元格*/
.sswrap-content-ul table tr:first-child th:last-child{
  /*右上*/
  border-top-right-radius: 12px;
}
/*最后一行 第一个单元格*/
.sswrap-content-ul table tr:last-child td:first-child {
  /*左下*/
  border-bottom-left-radius: 12px;
}
/*最后一行 最后一个单元格*/
.sswrap-content-ul table tr:last-child td:last-child {
  border-bottom-right-radius: 12px;
}


/*分页插件*/
.song-sheet-wrap .pagination-nav {
  text-align: center;
}

  /*播放器部分*/
  .net-cloud-music-footer {
    height: 133px;
    background: #fff;
    border-top: 1px solid #d3d3d3;
  }

  /*模态框部分*/
  #song-sheet .confirm-modal {
    position: fixed;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    background: rgba(255, 255, 255, 0);

  }
  /*模态框包裹*/
  .confirm-modal .confirm-modal-wrap {
    width: 480px;
    height: 230px;
    background: #fff;
    margin: 260px auto 0;
    border-radius: 4px;
    box-shadow: 0px 0px 24px 1px #ccc;
  }
  /*头部*/
  .confirm-modal-wrap .confirm-modal-header {
    height: 38px;
    line-height: 38px;
    border-radius: 4px 4px 0 0;
    background: #2d2d2d;
    padding: 0 12px;
  }

  /*提示*/
  .confirm-modal-header .operate-prompt {
    float: left;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
  }
  .confirm-modal-header .close-modal {
    float: right;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
  }

  /*提示框内容*/
  .confirm-modal-wrap .operate-des-content {
    width: 380px;
    height: 150px;
    margin: 40px auto 0;
  }
  .operate-des-content .operate-song-des {
    text-align: center;
    font-size: 14px;
  }
  .operate-des-content .operate-song-button {
    width: 200px;
    margin: 54px auto 0;
  }
  .operate-song-button .operate-song-confirm {
    float: left;
    padding:5px 24px;
    outline: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background: #ccc;
  }
  .operate-song-button .operate-song-cancel {
    float: right;
    padding:5px 24px;
    outline: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background: #ccc;
  }
  .operate-song-button .operate-song-cancel:hover {
    background: #ddd;
  }
  .operate-song-button .operate-song-confirm:hover {
    background: #ddd;
  }

.sswrap-content-ul table tr td .playButtonActive {
  background: url('../../../../assets/images/table.png') 0 -128px no-repeat;
}
  .singer-list .selectedSingerActive {
    background: #eee;
  }
</style>
