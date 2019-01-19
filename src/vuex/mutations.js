const mutations = {
  update (state, data) {
    state.callBack = data;
  },
  test (state, data){
    state.testData = data;
    // mutations混合异步调用会导致你的程序很难调试, 无法追踪回调的顺序。所以mutations处理的必须同步事务。
    setTimeout(function(){
      state.testData = 'mutationsUpdateToken';
    }, 1000)
  },
  /*更新播放音乐信息*/
  updateSongInfo(state, data){
    state.playSongInfo = data;
  }
};

export default mutations;
