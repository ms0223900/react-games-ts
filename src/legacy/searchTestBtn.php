<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
	<title>首頁搜尋</title>
	<style>
      .indexSearch-searchBar {
        position: relative;
        padding: 130px 0;
      }
      .indexSearch-searchBar form {
        width: 70%;
        max-width: 600px;
        height: 40px;
        margin: auto;
        padding: 5px 10px;
        border-radius: 1000px;
        border: 6px solid #bb7232;
        background-color: #fcf2ca;
        box-shadow: 0 6px #76391b;
        position: relative;
      }
      .indexSearch-searchBar form div:nth-child(1) {
        display: inline-block;
        position: relative;
        top: -9px;
        left: -14px;
      }
      .indexSearch-searchBar form div:nth-child(1)::after {
        content: "▾";
        position: absolute;
        width: 20px;
        height: 20px;
        top: 19px;
        left: 65px;
        font-size: 18px;
        color: #fff;
      }
      .indexSearch-searchBar form div:nth-child(1) #indexSearch-select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: none;
        font-size: 20px;
        padding: 14px 34px 14px 16px;
        border-radius: 1000px;
        border: none;
        background-color: #bb7232;
        color: #fff;
        letter-spacing: 1px;
      }
      .indexSearch-searchBar form input[type="text"] {
        width: 50%;
        background-color: transparent;
        border: none;
        font-size: 18px;
        position: absolute;
        top: 0px;
        left: 90px;
        line-height: 46px;
      }
      .indexSearch-searchBar form .indexSearch-btn {
        font-size: 20px;
        padding: 16px 10px 16px;
        margin: -11px -11px -11px -13px;
        border-radius: 1000px;
        border: none;
        background-color: #bb7232;
        color: #fff;
        letter-spacing: 1px;
        cursor: pointer;
        width: 62px;
        height: 62px;
        position: absolute;
        right: 0px;
      }
      .indexSearch-searchBar form .indexSearch-rope img:nth-child(1) {
        width: 15px;
        position: absolute;
        bottom: 45px;
        left: 10%;
        transform: translateX(-50%);
      }
      .indexSearch-searchBar form .indexSearch-rope img:nth-child(2) {
        width: 15px;
        position: absolute;
        bottom: 45px;
        right: 10%;
        transform: translateX(50%);
        transform: rotateY(180deg);
      }
    </style>
</head>
<body>

<!-- 可以直接複製貼上，我只有新增看不到的東西，option的value有改好了 -->
<div class="indexSearch-searchBar">
	<form id="indexSearch-searchBar" method="GET" action="dishes.php">
		<div>
			<select id="indexSearch-select" >
				<option value="meal" selected>餐點</option>
				<option value="Groupon">飯團</option>
			</select>
		</div>
		<input id="index-searchInput" type="text" placeholder="以餐點關鍵字搜尋" />
		<input id="index-searchInput-hidden-filter" type="hidden" >
		<input id="index-searchInput-hidden-p" type="hidden" >
		<button id="index-searchBtn" class="indexSearch-btn"><i class="fas fa-search"></i></button>
	</form>
</div>


<!-- 新增這段js -->
<script>

function $id(id) {
  return document.getElementById(id);
}
function $class(className) {
  return document.getElementsByClassName(className);
}
function $all(all) {
  return document.querySelectorAll(all);
}

var indexSelect = document.getElementById('indexSearch-select');
var indexHiddenF = document.getElementById('index-searchInput-hidden-filter');
var indexHiddenP = document.getElementById('index-searchInput-hidden-p');
var index = sessionStorage;
//依選項改變placeholder & action;
indexSelect.addEventListener('change',function () {
	for (let  i= 0; i < indexSelect.options.length; i++) {
		if(indexSelect.options[i].selected==true){
			$id('index-searchInput').placeholder="以"+indexSelect.options[i].innerText+"關鍵字搜尋";

			if(indexSelect.options[i].value=='Groupon'){
				$id('indexSearch-searchBar').action='4-1_grouponList.php';
				indexHiddenF.name="order";
				indexHiddenF.value="latest";
				indexHiddenP.name="p";
				indexHiddenP.value="1";
				$id('index-searchInput').name="search";
				if(index['index_search']!=null){
					index.removeItem('index_search');
				}
			}else if(indexSelect.options[i].value=='meal'){
				$id('indexSearch-searchBar').action='dishes.php';
				indexHiddenF.name="";
				indexHiddenF.value="";
				indexHiddenP.name="";
				indexHiddenP.value="";
				$id('index-searchInput').name="";
				if(index['index_search']==null){
					index['index_search'] = '';	//storage.setItem('addItemList','');
				}
			}
		}
	}
});


$id("index-searchInput").addEventListener("keyup",function(e){
	if(indexSelect.options[0].selected==true){
		index['index_search'] = $id("index-searchInput").value;
		console.log( $id("index-searchInput").value );
	}
	if(e.keyCode == 13){
		$id('indexSearch-searchBar').submit();
	}    
});
</script>
</body>
</html>
