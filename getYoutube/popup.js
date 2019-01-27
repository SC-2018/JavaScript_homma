// background.jsのオブジェクト登録
var bgPage = chrome.extension.getBackgroundPage();

// popup.htmlのイベントを生成
// 再生イベント
let target = document.getElementById('playIcon');
target.addEventListener('click', playMusic, false);

// 一時停止イベント
target = document.getElementById('pauseIcon');
target.addEventListener('click', pauseMusic, false);

// 音楽セットイベント
target = document.getElementById('setIcon');
target.addEventListener('click', setMusic, false);

// 拡張機能リロードイベント
target = document.getElementById('reloadIcon');
target.addEventListener('click', reload, false);

// 音楽登録イベント
target = document.getElementById('recordButton');
target.addEventListener('click', recordToLocalStorage, false);

// 音量調整イベント
target = document.getElementById('volumeBar');
target.addEventListener('change', setVolume, false);

// シークイベント
target = document.getElementById('seekBar');
target.addEventListener('change', seekTo, false);

// 音楽の選択
if (localStorage.length != 0) {
  for (let i = 0; i < localStorage.length; i++) {
    let option = document.createElement("option");
    option.innerText = localStorage.key(i);
    option.value = localStorage.getItem(localStorage.key(i));
    document.getElementById("selectMusic").appendChild(option);
  }
}

// background.jsの再生イベントを呼び出す
function playMusic() {
  document.getElementById("playIcon").style.display = "none";
  document.getElementById("pauseIcon").style.display = "inline-block";
  bgPage.playMusic();
}

// background.jsの停止イベントを呼び出す
function pauseMusic() {
  document.getElementById("playIcon").style.display = "inline-block";
  document.getElementById("pauseIcon").style.display = "none";
  bgPage.pauseMusic();
}

// 再生する音楽のIDをbackground.jsに渡す
function setMusic() {
  chrome.runtime.sendMessage({
    "musicId": document.getElementById("selectMusic").value
  });
}

// 拡張機能のリロード
function reload() {
  chrome.runtime.reload();
}

// localStorageに音楽を登録
function recordToLocalStorage() {
  let key = document.getElementById("localStorageKey").value;
  let value = document.getElementById("localStorageValue").value;
  localStorage.setItem(key, value);
}

// background.jsの音量調整イベント呼び出す
function setVolume() {
  chrome.runtime.sendMessage({
    "volume": document.getElementById("volumeBar").value
  });
}

// 再生時間をbackground.jsに渡す
function seekTo() {
  chrome.runtime.sendMessage({
    "time": document.getElementById("seekBar").value
  });
}

// 再生している動画の時間をbackground.jsから取得する
chrome.runtime.onMessage.addListener(
  function (request) {
    document.getElementById("seekBar").max = request.maxTime;
    document.getElementById("seekBar").value = request.currentTime;
    document.getElementById("volumeBar").value = request.currentVolume;
  }
);

// popup.html表示時に
// window.onload = bgPage.musicInfo();

// 現在の再生時間を取得し続ける
// setInterval(bgPage.getCurrentInfo(), 1000);

// ToDo:ポップアップを開きなおしたときの再生ボタンと一時停止ボタン
// ToDo:シークバーの動的な変更
// ToDo:動画の準備完了前に再生ボタン押下すると出るエラーの回避
// ToDo:maxTimeが必要なのは最初だけ
// ToDo:setやgetの名前は避ける