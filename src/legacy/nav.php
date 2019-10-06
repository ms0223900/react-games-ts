<?php
ob_start();
session_start();
	require_once("login.php");
	require_once("search.php");
	require_once("chatBot.php");
?>
 <!-- <script src="js/jquery-3.3.1.min.js"></script> -->
 <link rel="icon" href="images/logo3.png">
 <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
<meta name="format-detection" content="telephone=no">
<header>
	<input type="checkbox" id="navctrl">
	<div class="phone-nav">
		<div id="view1"></div>
		<div class="nav-left">
			<label class="hb" for="navctrl">
				<span class="line"></span>
			</label>
		</div>
		<div class="logo" >
			<a href="index_front.php">
				<img src="images/logo.png" alt="logo">
			</a>
		</div>
		<div class="nav-right">			
			<label for="close-search" class="seach-button">
				<img src="images/icon/search_black.svg" width="25" alt="seach">
				搜尋
			</label>
		</div>
	</div>
	<nav>
		<ul>
			<li class="logo">
				<div id="view4"></div>
				<a href="index_front.php">
					<img src="images/logo.png" alt="logo" style="margin-top: -2px;">
				</a>
			</li>
			<li class="index-member"> 
			<!-- hover跳窗 -->
				<div id="view6"></div>
				<label for="close-login" class="before-login">
					<!-- 註冊登入 -->
				</label>
				<div class="after-login">
					<?php 
						require_once('memberInfo.php');
					?>
				</div>
				<div class="hoverBox">
					<a href="coll.php">
						我的收藏
					</a>
					<a href="5-1_NotChanged.php">
						我的飯團
					</a>
					<form action="Logout.php">
						<button type="submit">
							登出
						</button>
					</form>
					
				</div>
			</li>
			<li class="meals">
					<div id="view5"></div>
				<a href="dishes.php">日食餐點</a>
			</li>
			<li class="initiate">			
				<div id="view2"></div>
				<a href="3-1_createGroupon.php">發起飯團</a>
			</li>
			<li class="participate">
				<div id="view3"></div>
				<a href="4-1_grouponList.php?search=&order=latest&p=1">參加飯團</a>
			</li>
			<li class="table-hidden"><a href="member.php">會員中心</a></li>
			<li class="table-hidden"><label for="close-chatBot">客服雞器人</label></li>
			<li class="table-hidden" id="clearMemberSeeion"><a href="javascript:void(0)">登出</a></li>
		</ul>
	</nav>
	<label class="white-Point" for="white-Point-control">
		<ul>
			<div id="view7"></div>
			<li>
				<a id="cartBTN">
					<img class="phone-hidden" src="images/icon/cart_black.svg" alt="cart">
					<img class="table-hidden" src="images/icon/cart_white.svg" alt="cart"><br>
					購物車
					<!-- <span>3</span> -->
				</a>
			</li>
			<li>
				<a href="javascript:void(0)">
					<img class="phone-hidden" src="images/icon/qrcode_black.svg" alt="qrcode">
					<img class="table-hidden" src="images/icon/qrcode_white.svg" alt="cart"><br>
					快速取餐
					<!-- <span>2</span> -->
				</a>
			</li>
			<li class="table-hidden">
				<a href="game.php">
					<img src="images/icon/game_white.svg" alt="game"><br>
					想吃什麼？
				</a>
			</li>
			<li class="table-hidden">
				<a href="javascript:void(0)">
					<img src="images/icon/heart_white.svg" alt="mc"><br>
					我的收藏
				</a>
			</li>
			<li class="table-hidden">
				<a href="5-1_NotChanged.php">
					<img src="images/icon/riceball_white.svg" alt="riceball"><br>
					我的飯團
				</a>
			</li>		
		</ul>
	</label>
</header>
<div class="nav_height"></div>
<!-- <script src="js/floaty.js"></script>S -->
<!-- <script src="js/svgColor.js"></script> -->
<script src="node_modules\sweetalert\dist\sweetalert.min.js"></script>
<script src="js/login.js"></script>
<script src="js/chatBot.js"></script>
<script src="js/search.js"></script>

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
	var logged = false;
	document.getElementById('cartBTN').onclick = function() {
		if(logged) {
			location.href = 'shopping_cart.php';
		} else {
			document.getElementById('close-login').checked = false;
		}
	}
	
	<?php 
	if(isset($_SESSION['member_Id'])) {
		echo "document.getElementById('cartBTN').onclick = function() {
			location.href = 'shopping_cart.php';
		}";
		echo "";
	} else {
		echo "document.getElementById('cartBTN').onclick = function() {
			document.getElementById('close-login').checked = false;
		}";
	}
	?>
	
	for (var i = 1; i <= 7; i++) {
	
		var view = document.querySelector("#view" +　i);

		struct1 = document.createElement("div");     
		struct1.className = "slice s" + 3;
	
		for (var j = 2; j > 0; j--) {
	
			struct2 = document.createElement("div");     
			struct2.className = "slice s" + j;
	
			struct2.appendChild(struct1);

			struct1 = struct2;
		}
	
		view.appendChild(struct2);
		
	}

	//-----------------------whitePoint--------------------------//

	var isMousemove = false,
		mouseX,
		mouseY;

	document.body.addEventListener('mousemove', function(e){
		mouseX = e.clientX;//滑鼠x位置
		mouseY = e.clientY;//滑鼠y位置

		// console.log(mouseX);
		// console.log(mouseY);
		// console.log(" ");

		if(isMousemove){
			whitePointDown();
		}
	});  

	document.body.addEventListener('touchmove', function(e){
		var touch = e.touches[0]; //獲取第一個觸點  
		var x = Number(touch.clientX); //頁面觸點X座標  
		var y = Number(touch.clientY); //頁面觸點Y座標  
		//記錄觸點初始位置  
		mouseX = x;//滑鼠x位置
		mouseY = y;//滑鼠y位置

		// console.log(touch);
		// console.log(mouseX);
		// console.log(mouseY);
		// console.log(" ");

		if(isMousemove){
			whitePointDown();
		}
	}, true);  

	var whitePoint = document.querySelector('.white-Point'),
		childList = whitePoint.children[0].children,
		whitePointLock = true;

	whitePoint.addEventListener('mousedown', function(){ // 按下鼠標左鍵時
		whitePointDown();
	}); 
	
	whitePoint.addEventListener('touchstart', function(){ //觸摸元素時
		whitePointDown();
	});
	

	function whitePointDown(){

		if(!isOpen){

			whitePoint.style.transition = "0.05s";
			whitePoint.style.top = mouseY - 25 + 'px';
			whitePoint.style.left = mouseX - 25 + 'px';
			isMousemove = true; //處於按壓拖移小白點狀態
		}
	}


	// function whitePointDown(){

	// 	if(!isOpen){

	// 		whitePoint.style.transition = "0.05s";
	// 		whitePoint.style.top = mouseY - 25 + 'px';
	// 		whitePoint.style.left = mouseX - 25 + 'px';
	// 		isMousemove = true; //處於按壓拖移小白點狀態
	// 	}
	// }
	// document.body.addEventListener('mouseup', whitePointClose, false); //在body釋放鼠標左鍵時
	// document.body.addEventListener('touchend', whitePointClose, false); //從body元素移除手指時

	// function whitePointClose(e){

 	// 	// e.preventDefault();

	// 	var w = window.innerWidth,
	// 		h = window.innerHeight;

	// 	if(w<1024){
	// 		whitePoint.style.width = "50px";
	// 		whitePoint.style.height = "50px";
			
	// 		whitePointBeforeY = mouseY - 25;

	// 		whitePoint.style.left = w-50 + "px";
	// 		whitePointBeforeX = w-50;

	// 		for(i=0;i<childList.length;i++){
	// 			childList[i].style.display = 'none';
	// 		}
	// 	}else{

	// 		whitePoint.style.transition = "0s";
	// 		whitePoint.style.width = '14.28571428%';
	// 		whitePoint.style.height = "100px";
	// 		whitePoint.style.display = 'static';

	// 		for(i=0;i<childList.length;i++){
	// 			childList[i].style.display = 'none';
	// 		}

	// 		for(i=0;i<3;i++){
	// 			childList[i].style.display = 'inline-block';
	// 		}
	// 	}
	// }

	whitePoint.addEventListener('mouseup', function(){//釋放鼠標左鍵時

		isOpen = !isOpen; //現在是否打開小白點
		whitePointUp();

	}, false); 
	
	whitePoint.addEventListener('touchend', function(){//從元素移除手指時

		isOpen = !isOpen; //現在是否打開小白點
		whitePointUp();

	}, false); 

	var isOpen = false,
		whitePointBeforeX = 0;
		whitePointBeforeY = 75;

	function whitePointUp(){

		// e.preventDefault();

		var w = window.innerWidth,
			h = window.innerHeight,
			minwh = w > h ? h : w;

		isMousemove = false; //離開按壓拖移小白點狀態

		//取得小白點前後位置,判斷使用者想要開啟或拖移小白點
		whitePointLock = Math.abs(whitePointBeforeX - mouseX) < 50 && Math.abs(whitePointBeforeY - mouseY) < 50;

		if(w<1024){
			whitePoint.style.display = 'fixed';
			whitePoint.style.transition = "0.5s";

			if(isOpen && whitePointLock){

				whitePoint.style.width = minwh * 0.7 + 'px';
				whitePoint.style.height = minwh * 0.7  + 'px';
				
				whitePoint.style.top = (h / 2) - (minwh * 0.35) + 'px';
				whitePoint.style.left = (w / 2) - (minwh * 0.35) + 'px';
				
				for(i=0;i<childList.length;i++){
					childList[i].style.display = 'inline-block';
				}

			}else{

				whitePoint.style.width = "50px";
				whitePoint.style.height = "50px";
				
				whitePointBeforeY = mouseY - 25;

				if(mouseX < w/2){
					whitePoint.style.left = 0;
					whitePointBeforeX = 0; 
				}else{
					whitePoint.style.left = w-50 + "px";
					whitePointBeforeX = w-50;
				}

				for(i=0;i<childList.length;i++){
					childList[i].style.display = 'none';
				}
			}
		}else{

			whitePoint.style.transition = "0s";
			whitePoint.style.width = '14.28571428%';
			whitePoint.style.height = "100px";
			whitePoint.style.display = 'static';

			for(i=0;i<childList.length;i++){
				childList[i].style.display = 'none';
			}

			for(i=0;i<3;i++){
				childList[i].style.display = 'inline-block';
			}
		}
	}

	whitePoint.addEventListener('mousemove', whitePointMove, false); //在元素內移動時
	whitePoint.addEventListener('Touchmove', whitePointMove, false); //移動手指時

	function whitePointMove(){
	}

	window.addEventListener("resize", function(){
    	whitePointUp();
	});

</script>
<script>
var beforeLogin = document.getElementsByClassName("before-login")[0];
var afterLogin = document.getElementsByClassName("after-login")[0];
var clearMemberSeeion = document.getElementById('clearMemberSeeion');
	<?php
		if(isset($_SESSION["member_Id"])){
			echo 'beforeLogin.style.display = "none";
				  afterLogin.style.display = "inline-block";
				  clearMemberSeeion.style.display = "inline-block"';
		}else{
			echo 'beforeLogin.innerText="登入/註冊"';
		}
	?>

	document.getElementById('clearMemberSeeion').addEventListener('click',function(){ //點擊登出
		//清除SEEION
		var xhr = new XMLHttpRequest();
        xhr.onload = function(){
			var memerIdLive = 0;
			beforeLogin.style.display = "inline-block";
			beforeLogin.innerText="登入/註冊";
			afterLogin.style.display = "none";
			clearMemberSeeion.style.display = "none";
			nike.innerText = "" ; 
			memberPic.src = "" ;
			buyCount.innerHTML = "";
			swal("已登出", {
				button: false,
			});
        }
        xhr.open("get","Logout.php", true);
        xhr.send( null);
	},false);
</script>