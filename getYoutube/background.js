// popup.jsから各値の取得
chrome.runtime.onMessage.addListener(
  function (request) {
    if (request.musicId)
      setMusic(request.musicId);
    else if (request.volume)
      setVolume(request.volume);
    else if (request.time)
      seekTo(request.time);
  }
);

// youtubeを埋め込む
var music;
function setMusic(musicId) {
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
function playMusic() {
    player.playVideo();
    // 再生した音楽の情報をpopup.jsに渡す
    musicInfo();
}

// 音楽の情報をpopup.jsに渡す
function musicInfo() {
    chrome.runtime.sendMessage({
      "maxTime": player.getDuration(),
      "currentTime": player.getCurrentTime(),
      "currentVolume": player.getVolume(),
    });
}

// 音楽の一時停止
function pauseMusic() {
  player.pauseVideo();
}

// 音量の設定
function setVolume(volume) {
  player.setVolume(volume);
}

// 再生時間の設定
function seekTo(time) {
  player.seekTo(time);
}