<template>
  <div id="singer-list">
    <div class="singer-list-wrap">
      <ul class="clearFix">
        <li>
          <img src="../../../../assets/singer/chenyixun.jpg" alt="图片">
          <p class="singer-name">陈奕迅</p>
        </li>
        <li>
          <img src="../../../../assets/singer/zhoujielun.jpg" alt="图片">
          <p class="singer-name">周杰伦</p>
        </li>
      </ul>
    </div>
    <!--底部-->
    <div class="net-cloud-music-footer">

    </div>
  </div>
</template>

<script>
export default {
  name: 'FindMusicSinger'
}
</script>

<style scoped>
  #singer-list {
    background: #f5f5f5;
  }
  #singer-list .singer-list-wrap {
    width: 1164px;
    height: 698px;
    margin: 0 auto;
    background: #fff;
    border-left: 1px solid #d3d3d3;
    border-right: 1px solid #d3d3d3;
    position: relative;
  }
  .singer-list-wrap ul {
    padding: 10px 0 0 0;
  }
  .singer-list-wrap ul li {
    width: 180px;
    float: left;
  }
  .singer-list-wrap ul li img {
    display: block;
    margin: 0 auto;
  }
  .singer-list-wrap ul li p {
    text-align: center;
  }

  /*播放器部分*/
  .net-cloud-music-footer {
    height: 133px;
    background: #fff;
    border-top: 1px solid #d3d3d3;
  }
</style>
