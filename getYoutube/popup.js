// background.jsのオブジェクト登録
var bgPage = chrome.extension.getBackgroundPage();

// popup.htmlのイベントを生成
// 再生イベント
let target = document.getElementById('playButton');
target.addEventListener('click', playMusic, false);

// 一時停止イベント
target = document.getElementById('pauseButton');
target.addEventListener('click', pauseMusic, false);

// 音楽セットイベント
target = document.getElementById('setButton');
target.addEventListener('click', setMusic, false);

// 拡張機能リロードイベント
target = document.getElementById('reloadButton');
target.addEventListener('click', reload, false);

// 音楽登録イベント
target = document.getElementById('recordButton');
target.addEventListener('click', recordToLocalStorage, false);

// 音量調整イベント
target = document.getElementById('volumeBar');
target.addEventListener('change', setVolume, false);

// シークイベント
target = document.getElementById('seekBar');
target.addEventListener('change', setTime, false);

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
  bgPage.bgPlayMusic();
}

// background.jsの停止イベントを呼び出す
function pauseMusic() {
  bgPage.bgPauseMusic();
}

// 再生する音楽の情報をbackground.jsに渡す
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
function setTime() {
  chrome.runtime.sendMessage({
    "time": document.getElementById("seekBar").value
  });
}

// 再生している動画の時間をbackground.jsから取得する
chrome.runtime.onMessage.addListener(
  function (request) {
    if(request.maxTime)
      document.getElementById("seekBar").max = request.maxTime;
  }
);