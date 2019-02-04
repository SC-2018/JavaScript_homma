// すべてのタブを閉じる
function closeTabsAll() {
    // 現在のwindowのすべてのタブを閉じる
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
  if (localStorage.getItem('closeTime') == (currentDateTime.getHours() + ":" + currentDateTime.getMinutes())) {
    localStorage.removeItem("closeTime");
    closeTabsAll();
  }
});