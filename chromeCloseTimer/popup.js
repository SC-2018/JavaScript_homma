// popup.htmlのイベントを生成する
let target = document.getElementById('setCloseTimeButton');
target.addEventListener('click', recordToLocalStorage, false);

target = document.getElementById('resetCloseTimeButton');
target.addEventListener('click', reset, false);

// 入力した時間をローカルストレージへ保存する
function recordToLocalStorage(time) {
  if (document.getElementById("closeTime").value != "" && localStorage.key(0) == null) {
    localStorage.setItem("closeTime", document.getElementById("closeTime").value);
    document.getElementById("closeTime").value = null;
  } else if (document.getElementById("closeTime").value != "" && localStorage.key(0) != null)
    alert(localStorage.getItem('closeTime') + "にセットしてあります。")
  else
    alert("時間をセットしてください。");
}

// ローカルストレージに保存した時間を削除する
function reset() {
  if (localStorage.key(0))
    localStorage.removeItem("closeTime");
}

// localStorageの有無を判定し、ボタン表示を切り替える
function checkHasLocalStorage() {
  if (localStorage.key(0)) {
    document.getElementById("setCloseTimeButton").style.display = none;
    document.getElementById("resetCloseTimeButton").style.display = block;
  }
}

// window.onload = checkHasLocalStorage();

// ToDo
// storageが存在しない場合の処理追加
// onloadが動くようにする
// resetの名前
// 時分の0の処理
// localStorage.key(0)以外の指定方法