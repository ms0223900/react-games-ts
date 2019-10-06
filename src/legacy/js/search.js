function $id(id) {
  return document.getElementById(id);
}
function $class(className) {
  return document.getElementsByClassName(className);
}
function $all(all) {
  return document.querySelectorAll(all);
}
// document.getElementById("close-search").addEventListener("click", function() {
//   searchImg();
//   //   searchAjax();
// });

// function searchImg() {
//   var grouponTagName = document.getElementsByName("groupon-TagName");
//   var N = "images/icon/tag_N.svg";
//   var Y = "images/icon/tag_Y.svg";
//   grouponTagName[0].checked = true;
//   document.querySelectorAll('.groupon-TagName img')[0].src=Y;
//   for (let i = 0; i < grouponTagName.length; i++) {
//     grouponTagName[i].addEventListener("input", function() {
//       var b = $(this)
//         .parent()
//         .find($(".groupon-TagName")[i])
//         .find($("img"));
//       if ((grouponTagName[i].checked = true)) {
//         $(".groupon-TagName")
//           .find($("img"))
//           .attr("src", N);
//         b.attr("src", Y);
//       }
//     });
//   }
// }

// var markGroupon = document.getElementById("bookmark-animation-groupon");
// var markMeal = document.getElementById("bookmark-animation-meal");
// var markGrouponText = $id("bookmark-animation-groupon").innerText;
// var markMealText = $id("bookmark-animation-meal").innerText;
// // var markSearchValue = markSearch.placeholder;
// markGroupon.addEventListener("click", function() {
//   $id("input-search").placeholder="請輸入" + markGrouponText + "關鍵字";
// });
// markMeal.addEventListener("click", function() {
//   $id("input-search").placeholder="請輸入" + markMealText + "關鍵字";
// });
// $id('start-search').addEventListener('click',function () {
//   var searchText = [];
//   inputText = $id('input-search').innerText;
//   searchText =  inputText.split(" ");
//   // startSearch(searchText); 
// },false);

// function startSearch(searchGO) {

  // if($id('bookmark-meal').checked==true){

  //   var xhr = new XMLHttpRequest();
  //   xhr.onload = function(){
  //     if( xhr.status == 200){
  //       window.alert(xhr.responseText);
  //       location.href = 'searchToMealUpshot.php';
  //     }else{
  //       alert(xhr.status);
  //     }
  //   }
  //   xhr.open("post","searchToMeal.php",true);
  //   var GOsearch = new FormData(document.getElementById("GOsearch"))
  //   xhr.send(GOsearch);

  // }else if($id('bookmark-groupon').checked==true){
  //   var xhr = new XMLHttpRequest();
  //   xhr.onload = function(){
  //     if( xhr.status == 200){
  //       window.alert(xhr.responseText);
  //       location.href = 'searchToGrouponUpshot.php';
  //     }else{
  //       alert(xhr.status);
  //     }
  //   }
  //   xhr.open("post","searchToGroupon.php",true);
  //   var GOsearch = new FormData(document.getElementById("GOsearch"))
  //   xhr.send(GOsearch);
  // }

// function searchAjax() {
//   //傳PHP端
//   var obj = {};
//   obj.meal_Genre = "meal_Genre";
//   obj.grouponTag = "grouponTag";
//   var jsonStr = JSON.stringify(obj);

//   //=====使用Ajax 回server端,取回關鍵字內容, 放到頁面上
//   var xhr = new XMLHttpRequest();
//   xhr.onload = function() {
//     if (xhr.status == 200) {
//       if (xhr.responseText.indexOf("not found") != -1) {
//         //回傳的資料中有not found
//         // return "";
//         alert("not found");
//       } else {
//         //查有此keyword
//         alert("OK");
//       }
//     } else {
//       alert(xhr.status);
//     }
//   };
//   xhr.open("post", "searchAjax.php", true);
//   xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
//   var data_info = "jsonStr=" + jsonStr;
//   xhr.send(data_info);
// }
