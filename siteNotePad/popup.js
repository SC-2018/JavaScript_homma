// popup.htmlのイベントを生成する
let target = document.getElementById('createNoteButton');
target.addEventListener('click', createNote, false);

document.getElementById('note');
target.addEventListener('change', autoSave, false);

// タブのURLを取得
function getURL() {
  return chrome.tabs.getSelected(null, function (tab) {
    return tab.url;
  })
}

// タブのURLをKeyとしてメモを作成(Valueはメモの内容)
function createNote() {
  localStorage.setItem(getURL(), "");
  alert(getURL());
  document.getElementById("createNoteButton").style.display = 'none';
  document.getElementById("note").style.display = 'block';
}

// 既にメモを作成してた場合に作成ボタンを表示させず、メモを表示させる
function dispNote() {
  if (localStorage.getItem(getURL())) {
    document.getElementById("createNoteButton").style.display = 'none';
    document.getElementById("note").style.display = 'block';
    // メモの内容を反映
    document.getElementById("note").value = localStorage.getItem(getURL());
  }
}

function autoSave() {
  localStorage.setItem(getURL(), document.getElementById("note").value);
}

window.onload = dispNote();