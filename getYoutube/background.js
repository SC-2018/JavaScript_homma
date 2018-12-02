var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

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