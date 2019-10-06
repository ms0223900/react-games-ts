//輸入框
var chatUserText = document.getElementsByClassName("chatBot-text")[0];
//內容第一層overflow
var content = document.getElementById("chatBot-content");
//內容第二層(包p)
var container = document.getElementById("chatBot-container");
//要被丟進PHP跟關鍵字搭配的字
var botSearch = "";

function $id(id) {
  return document.getElementById(id);
}
//刪除小黑點
function delQpoint() {
  // console.log(container.lastChild.previousSibling.tagName);
  // console.log(container.lastChild.tagName);
  container.removeChild(container.lastChild.previousSibling); //刪除container的最後一個小孩的上一個兄弟
  container.removeChild(container.lastChild); //刪除container的最後一個小孩

}
//卷軸維持在最底端
function chatBotScrollTo(container, content) {
  //找到對話框的高度，並設定變數
  let h = container.offsetHeight;
  //送出的同時滾動卷軸到最後一筆留言
  content.scrollTo({
    top: h,
    left: 0,
    behavior: "smooth"
  });
}
//新增內容
function addChatText(text) {
  //使用者打的文字存入隱藏標籤內
  $id("UserText").innerHTML = text;
  //設變數存要新增的內容，文字放隱藏標籤的純文字。
  let newText =
    "<p class='chatBot-content-Q'>" +
    $id("UserText").innerText +
    "</p><div style='clear:both'></div>";
  //隱藏標籤的純文字存入變數botSearch(關鍵字搜尋)
    botSearch = $id("UserText").innerText;
  //清空隱藏標籤
    $id("UserText").innerHTML = "";
  //把使用者的文字加到對話區
  container.innerHTML += newText;
  //清空輸入框的字
  chatUserText.value = "";
  //捲軸更新
  chatBotScrollTo(container, content);
}
function CallAjax(text) {
  var BotText ="";
  //傳PHP端
  var obj = {};
  obj.keyword = text;
  var jsonStr = JSON.stringify(obj);

  //=====使用Ajax 回server端,取回關鍵字內容, 放到頁面上
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (xhr.status == 200) {
      if (xhr.responseText.indexOf("not found") != -1) {
        //回傳的資料中有not found
        BotText = "你可以點選關鍵字問問我~或是聯絡客服(03)-4257387";
      } else {
        //查有此keyword
        BotText = xhr.responseText.replace(/(\r\n)/g , "<br>");
      }
      //把關鍵字內容加到對話區
      container.innerHTML += `<p class="chatBot-content-A">${BotText}</p><div style="clear: both"></div>`;
      //卷軸滑到底
      chatBotScrollTo(container, content);
    } else {
      alert(xhr.status);
    }
  };

  xhr.open("post", "chatBotSaveSession.php", true);
  xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  var data_info = "jsonStr=" + jsonStr;
  xhr.send(data_info);
}
chatUserText.addEventListener("keyup", function() {
  //小黑點
  var Qpoint = document.querySelectorAll(".chatBot-content-Q span");
  //HTML包含小黑點
  let newText = `<p class="chatBot-content-Q"><span></span><span></span><span></span></p><div style="clear: both"></div>`;
  //輸入字串長度大於等於1時，新增div包含小白點
  if (chatUserText.value != "") {
    //如果內容沒有空值
    if (
      chatUserText.value === null ||
      chatUserText.value.match(/^ *$/) !== null
    ) {
      //如果內容的值是空白值
      $id("chatBot-search").disabled = true;
      return;
    }
    if (Qpoint.length < 1) {
      //判斷有沒有小黑點,沒有就加。
      $("#chatBot-container").append(newText);
    }
    if (window.event.which == 13) {
      //判斷鍵盤有按下Enter,就送出內容
      delQpoint();
      addChatText(chatUserText.value);
      CallAjax(botSearch);
    }
  }else{
    if (Qpoint.length >= 1) {
      //小黑點
      delQpoint();
    }
  }
  chatBotScrollTo(container, content);
});
$id("chatBot-search").addEventListener("click", function() {
  if (chatUserText.value != "") {
    //清除小黑點
    delQpoint();
    //再新增文字
    addChatText(chatUserText.value);
    //判斷關鍵字同時CallAjax()
    CallAjax(botSearch);
  }
});
//使用關鍵字
var keyword = document.querySelectorAll(".chatBot-keyword li");
for (let i = 0; i < keyword.length; i++) {
  keyword[i].addEventListener("click", function() {
    var Qpoint = document.querySelectorAll(".chatBot-content-Q span");

    if (Qpoint.length >= 1) { //如果有小黑點
      //清除小黑點
      delQpoint();
    }
    //新增文字
    addChatText(keyword[i].innerText);
    //回傳關鍵字
    CallAjax(keyword[i].innerText);
  });
}
//捲動關鍵字項目-算出總寬度
var keywordWrap = document.querySelector(".chatBot-keyword");
var cc = 0;
var maxW = 0;
var keywordWidth = [];
// for (let i = 0; i < keyword.length; i++) {  //看li有幾個
//   keywordWidth.push(parseInt(getComputedStyle(keyword[i], null).width));  //把li的寬度放入陣列
//   maxW += keywordWidth[i];  //把陣列內容加起來
//   console.log(keyword[i].offsetWidth);
// }
//捲動關鍵字項目-完成捲動
//當滾輪發生時執行addKey
keywordWrap.onmousewheel = addKey;
function addKey(e) {
 
  var e = e || window.event; //看是哪個瀏覽器
  // console.log();
  if (keywordWrap.contains(e.target)) { //如果摸到時包含ul子層
    var orient = event.deltaY;
    if (orient > 0) {
      cc += 35;
      if (cc > maxW) {
        cc = maxW;
      }
    } else if (orient < 0) {
      cc -= 35;
      if (cc < 0) {
        cc = 0;
      }
    }
    keywordWrap.scrollTo({
      top: 0,
      left: cc,
      behavior: "smooth"
    });
  }
  event.preventDefault();
  e.stopPropagation();
}
document.getElementById("close-chatBot").addEventListener("click", function() {
  document.getElementById("navctrl").checked = false;
  for (let i = 0; i < keyword.length; i++) {  //看li有幾個
    keywordWidth.push(parseInt(getComputedStyle(keyword[i], null).width));  //把li的寬度放入陣列
    maxW += keywordWidth[i];  //把陣列內容加起來
    
  }
  console.log(maxW);
});
