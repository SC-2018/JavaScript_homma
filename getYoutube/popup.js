// background.jsのオブジェクト登録
var bgPage = chrome.extension.getBackgroundPage();

// ckickイベントを生成
var target = document.getElementById('playButton');
target.addEventListener('click', bgPlay, false);

// background.jsのイベントを呼び出す
function bgPlay() {
  bgPage.myPlayVideo();
}
