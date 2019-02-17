// popup.htmlのイベントを生成する
let target = document.getElementById('setCloseTimeButton');
target.addEventListener('click', recordToLocalStorage, false);

target = document.getElementById('resetCloseTimeButton');
target.addEventListener('click', reset, false);

function recordToLocalStorage() {
  // ローカルストレージに時間が登録されていない場合のみセットできる
  if (document.getElementById("closeTime").value && !localStorage.getItem('closeTime')) {
    localStorage.setItem("closeTime", document.getElementById("closeTime").value);
    document.getElementById("closeTime").value = "";

  // ローカルストレージに登録した時間の上書きはできず、リセットが必要
  } else if (document.getElementById("closeTime").value && localStorage.getItem('closeTime'))
    alert(localStorage.getItem('closeTime') + "にセットしてあります。")

  else
    alert("時間をセットしてください。");
}

function reset() {
  if (localStorage.getItem('closeTime'))
    localStorage.removeItem("closeTime");
}
