
var tag = document.createElement('script');

// 動画が埋め込まれていない
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 以下イベントが動作していない
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('music', {
    height: '360',
    width: '640',
    videoId: 'sYkgblk0Xt0',
  });
}
function myPlayVideo() {
  player.playVideo();
}