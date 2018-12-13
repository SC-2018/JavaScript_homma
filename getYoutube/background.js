// popup.jsから各値の取得
chrome.runtime.onMessage.addListener(
  function (request) {
    if (request.musicId)
      bgSetMusic(request.musicId);
    else if (request.volume)
      bgSetVolume(request.volume);
    else
      bgSetTime(request.time);
  }
);

// youtubeを埋め込む
var music;
function bgSetMusic(musicId) {
  music = musicId;
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// playerの設定
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('musicPlayer', {
    height: '360',
    width: '640',
    videoId: music,
  });
}

// 音楽の再生
function bgPlayMusic() {
  player.playVideo();
  // 再生した動画の時間をpopup.jsに渡す
  chrome.runtime.sendMessage({
    "maxTime": player.getDuration()
  });
}

// 音楽の一時停止
function bgPauseMusic() {
  player.pauseVideo();
}

// 音量の設定
function bgSetVolume(volume) {
  player.setVolume(volume);
}

// 再生時間の設定
function bgSetTime(time) {
  player.seekTo(time);
}