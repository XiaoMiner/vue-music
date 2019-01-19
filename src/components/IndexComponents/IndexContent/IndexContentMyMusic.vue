<template>
<div id="my-music">
  <div class="my-music-top"></div>
  <div class="my-music-header">
    <div class="my-music-header-content">
      <div class="my-music-header-des">
        <span class="header-des-song">我的歌曲列表</span>
        <span class="header-des-number">{{userHaveSongsInfo.totalNumber}}首歌</span>
      </div>
    </div>

  </div>
  <div class="my-music-content">
      <div class="my-music-wrap">
        <div class="my-music-song-list-content">
          <div class="my-music-song-list">
            <table>
              <tr>
                <th>序号</th>
                <th>播放</th>
                <th>歌曲标题</th>
                <th>时长</th>
                <th>歌手</th>
              </tr>
              <tr v-for="(singleSongInfo, index) in songListData" @mouseover="mouseOverTr(index)" @mouseout="mouseOutTr">
                <td>{{index+1}}</td>
                <td><i class="operate-song-button" :class="{playButtonActive: playIndex == index}" @click="togglePlaySong(index, singleSongInfo)"></i></td>
                <td>{{singleSongInfo.songName}}</td>
                <td class="add-song-add">{{singleSongInfo.duration}}
                <div class="operate-song" v-if="isShowAddCurrentArea == index">
                    <i class="operate-song-add" @click="showOperateModal(singleSongInfo)"></i>
                </div>
                 </td>
                <td>{{singleSongInfo.singerName}}</td>
              </tr>
            </table>
          </div>
          <div class="pagination-nav">
            <pagination :page="userHaveSongsInfo.totalPage" :currentPage="userHaveSongsInfo.currentIndex"></pagination>
          </div>
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
            是否删除该歌曲?
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
import pagination from '../../pagination/pagination'
import NetCloudMusicFooter from '../../commons/NetCloudMusicFooter'
import filterMusicTime from './../../../js/filterMusicTime';
export default {
  name: 'IndexContentMyMusic',
  components: {
    pagination,
    NetCloudMusicFooter
  },
  data(){
    return {
      fileServer:this.$interface.musicFileServerUrl,
      userHaveSongsPost: { // 我的歌曲列表参数
        userId: 1,
        index: 1,
        size: 13
      },
      recordNumber: 0, //记录处理的所有的歌曲总时长。
      songListData: [],//数据列表
      userHaveSongsInfo: {},// 歌曲数据列表信息。
      playIndex: -1,//正在播放的音乐的索引
      recordPlaySongPosition: {
        pageIndex: 1,
        songIndex: 0,
      },//记录播放歌曲的位置。
      selectedPlaySong: {},//选中歌曲的信息。
      isShowAddCurrentArea: -1,//是否显示当前歌曲的操作区域
      selectedSongInfo: {},//当对歌曲进行操作时,进行的保存歌曲信息。
      isShowOperateModal: 0,//是否显示操作模态框
    }
  },
  created(){
    this.getMySongList();
  },
  methods: {
    // 显示模态框
    showOperateModal(songInfo){
      this.selectedSongInfo = songInfo;
      this.isShowOperateModal = 1;
    },

    //确定删除
    confirmModal(){
      this.deleteUserCurrentSong(this.selectedSongInfo.songId);
    },

    // 删除当前用户所拥有的歌曲 /AnnMusic/userHaveSong/delete
    deleteUserCurrentSong(songId){
      console.log(songId)
      console.log(JSON.stringify({songId: songId}));
      let _this = this;
      _this.$axios.delete(_this.$interface.xMusicDeleteUserHaveSong, {
        data: JSON.stringify({songId: songId}),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(responseData){
        console.log(responseData);
        if(responseData.data.status == 1){
          _this.closeModal();
          _this.getMySongList();//删除成功之后对用户拥有的歌曲进行更新。
          console.log(responseData.data.message);
        }else {
          console.log(responseData.data.message);
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

    // 切换播放的歌曲
    togglePlaySong(index, songInfo){
      this.playIndex = index;
      this.recordPlaySongPosition.pageIndex = this.userHaveSongsPost.index;
      this.recordPlaySongPosition.songIndex = index;
      this.$store.commit('updateSongInfo', songInfo);
    },

    // 我的歌曲列表 :userId?pageIndex=1&pageSize=10
    getMySongList(){
      let _this = this;
      _this.$axios.get(_this.$interface.xMusicQueryUserHaveSongs+'/'+_this.userHaveSongsPost.userId+'?pageIndex='+_this.userHaveSongsPost.index+'&pageSize='+_this.userHaveSongsPost.size)
        .then(function(responseData){
          _this.userHaveSongsInfo = responseData.data;
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

    // 分页处理
    pagechange(pageNumber){
      this.userHaveSongsPost.index = pageNumber;
      this.playIndex = this.recordPlaySongPosition.songIndex;
      this.getAllSongs();
    },
    closeModal(){
      this.isShowOperateModal = 0;
    },
  }
}
</script>

<style scoped>
  #my-music {
    background: #f5f5f5;
    position: relative;
  }
  #my-music .my-music-top {
    height: 5px;
    background-color: #C20C0C;
  }
  /*头部背景色*/
  #my-music .my-music-header {
    height:132px;
    background: url('../../../assets/images/Ann_bg_profile.jpg') no-repeat;
    background-size: 100% 100%;
  }

  .my-music-header .my-music-header-content {
    width: 800px;
    margin: 0 auto;
    height: 100%;
    position: relative;
  }

  #my-music .my-music-content {
    padding: 2px 0 0 0;
  }
  .my-music-content .my-music-wrap {
    height: 100%;
    width: 980px;
    margin: 0 auto;
    background: #fff;
  }

  /*头部处理*/
  .my-music-header .my-music-header-des {
    height: 40px;
    line-height: 40px;
    position: absolute;
    bottom: 12px;
    left: 34%;
  }

 /*歌曲列表*/
  .my-music-header-des .header-des-song {
    font-size: 24px;
    font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
    color: #fff;
  }
  /*歌曲数量*/
  .my-music-header-des .header-des-number {
    font-size: 14px;
    color: #ccc;
    margin: 0 0 0 10px;
  }
  .my-music-song-list-content {
    border-left: 1px solid #d3d3d3;
    border-right: 1px solid #d3d3d3;
  }
  /*表格列表*/
  .my-music-song-list-content  .my-music-song-list {
    height: 542px;
    border-bottom: 2px solid #d3d3d3;
  }

  .my-music-song-list table tr td .operate-song-button {
    display: inline-block;
    cursor: pointer;
    width: 17px;
    height: 17px;
    background: url('../../../assets/images/table.png') 0 -103px no-repeat;
  }
  .my-music-song-list table tr td .operate-song-button:hover {
    background: url('../../../assets/images/table.png') 0 -128px no-repeat;
  }

  .my-music-song-list table tr .add-song-add {
    position: relative;
  }

  .my-music-song-list table tr .add-song-add .operate-song{
    width: 100%;
    height: 100%;
    background: #eee;
    position: absolute;
    top: 0;
    left: 0;
  }

  .my-music-song-list table tr .add-song-add .operate-song-add {
    display: inline-block;
    width: 16px;
    height: 14px;
    background: url('../../../assets/images/table.png') 0 -217px no-repeat;
    margin: 13px 0 0 12px;
    cursor: pointer;
  }

  .my-music-song-list table tr .add-song-add .operate-song-add:hover {
    background: url('../../../assets/images/table.png') -20px -217px no-repeat;
  }

  /*表格部分*/
  .my-music-song-list table {
    width: 100%;
    border-collapse: separate;
    table-layout:fixed;
  }
  table tr th{
    border: 1px solid #d3d3d3;
    color: #666;
    font-size: 14px;
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
table tr:first-child th:first-child {
    /*左上*/
    border-top-left-radius: 12px;
  }
  /*第一行 最后一个头部单元格*/
  table tr:first-child th:last-child{
    /*右上*/
    border-top-right-radius: 12px;
  }
  /*分页插件*/
  .my-music-song-list-content .pagination-nav {
    text-align: center;
  }
  /*歌曲播放器*/
  .net-cloud-music-footer {
    height: 133px;
    background: #fff;
    border-top: 1px solid #d3d3d3;
  }

  /*模态框部分*/
  #my-music .confirm-modal {
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
  /*删除*/
  .my-music-song-list table tr td .playButtonActive {
    background: url('../../../assets/images/table.png') 0 -128px no-repeat;
  }
</style>
