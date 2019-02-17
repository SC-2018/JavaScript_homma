// アクティブなwindowを閉じる
function closeTabsAll() {
  chrome.tabs.query({ 'currentWindow': true }, function (tabs) {
    for (let i = 0; i < tabs.length; i++) 
      chrome.tabs.remove(tabs[i].id);
  });
}

// タイマーの生成
chrome.alarms.create('ChromeCloseTimer', { delayInMinutes: 1, periodInMinutes: 1 });

// 1分ごとに時間を比較
chrome.alarms.onAlarm.addListener(function () {
  let currentDateTime = new Date();
  
  // 時分を0詰めしてtype=timeとフォーマットを合わせる
  if (localStorage.getItem('closeTime') == (zeroPadding(currentDateTime.getHours()) + ":" + zeroPadding(currentDateTime.getMinutes()))) {
    localStorage.removeItem("closeTime");
    alert("時間になったのでクロームを強制終了します。");
    closeTabsAll();
  }
});

function zeroPadding(num) {
  return ('00' + num).slice(-2);
}