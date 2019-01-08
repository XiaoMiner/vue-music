<template>
  <div class="net-cloud-music-footer">
    <div class="music-footer-wrap">
      <div class="net-cloud-basic-info">
        <div class="net-cloud-address">Ann版权所有©2018-2019</div>
        <div class="net-cloud-communication-mode">
          <span>联系邮箱:</span>
          <a href="javascript:void(0)">2424197234@qq.com</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NetCloudMusicFooter'
  }
</script>

<style scoped>
  /* 结尾部分 */
  .net-cloud-music-footer {
    height: 133px;
    background: #f2f2f2;
    border-top: 1px solid #d3d3d3;
  }

  .net-cloud-music-footer .music-footer-wrap {
    width: 984px;
    margin: 0 auto;
  }
  .net-cloud-basic-info {
    margin: 52px 0 0 0;
  }
  .net-cloud-basic-info .net-cloud-address {
    float: left;
    color: #666;
    font-size: 24px;
    text-align: center;
    margin:0 12px 0 52px;
  }

  .net-cloud-basic-info .net-cloud-communication-mode {
    color: #666;
    font-size: 24px;
    float: left;
  }

  .net-cloud-basic-info .net-cloud-communication-mode a {
    color: #666;
  }

  .net-cloud-basic-info .net-cloud-communication-mode a:hover {
    text-decoration: underline;
  }
</style>
