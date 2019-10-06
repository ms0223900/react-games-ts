<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>日食餐點</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" >
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.4.2/css/swiper.css">

	<!-- -----------------日食餐點--------------- -->
	<!-- <link rel="stylesheet" href="css/style.css"> -->
	<link rel="stylesheet" href="css/dishes.css">
	
	<style>
		#mealSearchResult {
			text-align: center;
			padding: 10px;
		}
	
	</style>
</head>
<body>

	<?php
		require_once('nav.php');
	?>
	
	<!-- -----banner--- -->
	<div class="food-banner swiper-container">
		<div id="elimg" class="swiper-wrapper">
			<div class="swiper-slide">
				<div class="food-main">
					11/23號 新品上市 
				</div>
			</div>
			<div class="swiper-slide">
				<div class="food-main">
					店長推薦新品
				</div>
			</div>
			<!-- <div class="swiper-slide">
				<div class="food-main">
					館長強烈推薦
				</div>
			</div> -->
		</div>
		<canvas id="elcanvas"></canvas>
	</div>
	

	<!-- -----搜尋--- -->
	<div class="bg-images">
		<div class="wrap">
		<div class="searchBar">
        <!-- <form action="4-1_grouponList.php"> -->
            <div class="searchBar-container">
                <input type="text" placeholder="搜尋你的美食餐點" name="MealKW" id="searchInputMeal">
                <button id="MealBTN" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        <!-- </form> -->
    </div>

        <div class="food-choose sliderSlick clearfix">
            <div class="part--4 part-md-2">
				
				<img class="food-icon-lan" src="images/icon/lame.png" alt="">

                <div class="food-choose_item">
                    <p data-rel="ra">拉面</p>
                </div>
            </div>
            <div class="part--4 part-md-2">
			<img class="food-icon-don" src="images/icon/don.png" alt="">
               <div class="food-choose_item">
                   	<p data-rel="don">井飯</p>
                </div>
            </div>  
            <div class="part--4 part-md-2">
				<img class="food-icon-soup" src="images/icon/soup.png" alt="">
                <div class="food-choose_item">
                    <p data-rel="nabe">鍋物</p>
                </div>
            </div>
			<div class="rwd-dek part--4 part-md-2">
				<img class="food-icon-den" src="images/icon/denshyoku.png" alt="">
                <div class="food-choose_item">
                    <p data-rel="tei">定食</p>
                </div>
            </div>
            <div class="rwd-dek part--4 part-md-2">
				<img class="food-icon-ban" src="images/icon/bandon.png" alt="">
                <div class="food-choose_item">
                    <p data-rel="ben">便當</p>
                </div>
            </div>
            <div class="rwd-dek part--4 part-md-2">
				<img class="food-icon-veb" src="images/icon/veget.png" alt="">
                <div class="food-choose_item">
                    <p data-rel="vg">素食</p>
                </div>
            </div>
        </div>
		<div class="food-choose fdnot clearfix">
            
			<div class="part--4 part-md-2">
				<img class="food-icon-den" src="images/icon/denshyoku.png" alt="">
                <div class="food-choose_item">
                    <p data-rel="tei">定食</p>
                </div>
            </div>
            <div class="part--4 part-md-2">
				<img class="food-icon-ban" src="images/icon/bandon.png" alt="">
                <div class="food-choose_item">
                    <p data-rel="ben">便當</p>
                </div>
            </div>
            <div class="part--4 part-md-2">
				<img class="food-icon-veb" src="images/icon/veget.png" alt="">
                <div class="food-choose_item">
                    <p data-rel="vg">素食</p>
                </div>
            </div>
        </div>
    </div>

	<!-- 菜單一覽 -->
    <div class="wrap-2">
		<h1>餐點一覽</h1>
		<h2 id="mealSearchResult"></h2>  
        <div class="food-content search-content clearfix">


		</div>
	</div>
</div>

	<script
  src="https://code.jquery.com/jquery-3.3.1.js"
  integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
  crossorigin="anonymous"></script>
		
  	<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.js"></script> -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.4.2/js/swiper.js"></script>
	<script src="node_modules\sweetalert\dist\sweetalert.min.js"></script>
	<script src="js/alertCustom.js"></script>
	<script src="js/Swiper.js"></script>
	<script src="js/puzzle.js"></script>
	<script src="js/filiter.js"></script>  
	<script src="js/dishes-icon.js"></script>
	<script src="js/eggView.js"></script>
	
	<script src='https://cdn.jsdelivr.net/mojs/0.265.6/mo.min.js'></script>
	<script src="js/iconClick.js"></script>
	<script src="js/dishesSessiom.js"></script>
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


		var index = sessionStorage;
		var storage = sessionStorage;
		
		function dishAddToCart(){

			if(storage.addItemList == null){
				storage.addItemList = '';
			}
			var list = document.querySelectorAll('.food-button-buy.v2'); 
			console.log(list);
			for(var i=0;i<list.length;i++){
				list[i].addEventListener('click',function(){
					alert('該餐點已加入購物車');
					var dishes = document.querySelector('#'+this.id+' input').value;
					addItem(this.id, dishes);
				});
			}
		}

		function addItem(itemId, itemValue){
			if(storage[itemId]){
				console.log('got it');
			}else{
				storage[itemId] = itemValue;
				console.log(storage[itemId]);
				storage['addItemList'] += itemId + ',';
			}
		}
		var url = "searchDish.php"+ location.search;
		function getDishes(){
			
			if(storage['storage_search']!=null){
				document.getElementById('searchInputMeal').value=storage.getItem('storage_search');
				storage.removeItem('storage_search');
			}
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange=function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){ 
						if(index['index_search']!=null){
							index.removeItem('index_search');
						}
						console.log(xhr.responseText);
						if(xhr.responseText.indexOf('not found') != -1) { //無資料的話
							var kwd = location.search.substr(8);
							$id('mealSearchResult').innerHTML = '搜尋' + kwd + '查無結果，以下是所有餐點。';
							url = "searchDish.php?search=";
							getDishes();
						} else {
							
						}
						document.querySelector(".food-content").innerHTML = xhr.responseText;
						dishAddToCart();  //註冊加入購物車
						eggScore.egg({
							container: $all('.score-container'),
							whiteEgg: 'images/eggEmpty.svg',
							blackEgg: 'images/eggFull.svg',
						});
						addCollBTN();	//加入收藏
					}else{
						alert(xhr.status);
					}
				}
			}
			
			// var url = "searchDish.php?search="+ document.getElementById("searchInputMeal").value;
			
			xhr.open("Get", url, true);
  			xhr.send( null );
		}
        
        window.addEventListener("load", function(){
			getDishes();
			if(index['index_search']!=null){
				document.getElementById('searchInputMeal').value=index.getItem('index_search');
				getDishes();
			}

        	document.getElementById("searchInputMeal").addEventListener("keypress",function(e){
         		// window.alert(2);
        		console.log("eeeeeeeeee");
        		console.log(e);
        		if(e.keyCode == 13){
					// getDishes();
					var kw = $id('searchInputMeal').value;
					console.log(kw);
					location.href = 'dishes.php?search=' + kw;
        		}       		
			});
			
		});
		
		function addCollBTN() {
			var coll = document.querySelectorAll('.food-button-save'); 

			for(var i=0;i<coll.length;i++){
				coll[i].addEventListener('click',function(){
				
				var mealState = this.querySelectorAll('.mealState')[0];
				var mealVal = mealState.value;
				var mealNo = this.querySelectorAll('.mealNo')[0];
				if(mealState.value == 'false') {
						mealState.value = 'true';
					} else {
						mealState.value = 'false';
					}
				var xhr = new XMLHttpRequest();
					xhr.onload = function (){
						if( xhr.status == 200){
							alert("已收藏此餐點");
							
						}else{
							alert(xhr.status);
						}
					}
					xhr.open("POST", "heartDataUpdate.php", true);

					xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");

					//餐點收藏狀態
					var data_info = "mealState=" + mealVal + "&mealNo=" + mealNo.value;
					
					console.log(data_info);

					xhr.send(data_info);
				});
			}
		}
		
		

		$id('MealBTN').onclick = function() {
			var kw = $id('searchInputMeal').value;
			console.log(kw);
			location.href = 'dishes.php?search=' + kw;
		}
	</script>
	
</body>
</html>