import inter from './interface';
let interfaceName = inter;
function filterMusicTime(musicUrl, callback){
  let audio = document.createElement('audio');
  audio.src = interfaceName.musicFileServerUrl + musicUrl;
  audio.setAttribute('loop', 'loop');
  audio.setAttribute('autoplay', 'autoplay');

  audio.oncanplay = function(){
    let totalTime = Math.floor(audio.duration);
    let minute = Math.floor(totalTime / 60) >= 10 ? Math.floor(totalTime / 60) : '0' + Math.floor(totalTime / 60);
    let second = (totalTime - minute * 60) >= 10 ? (totalTime - minute * 60) : '0' + (totalTime - minute * 60);
    callback(minute +':'+ second);
  }


  $('body').append(audio);
  audio.remove();
}

export default filterMusicTime;
