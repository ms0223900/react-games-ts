
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
	<link rel="stylesheet" href="css/dishes.css">
	
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
                <button id="MealBTN" type="submit" onclick="getDishes()">
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
       <div class="food-content search-content clearfix">
			<!-- 新增內容 -->

        </div>
	</div>
</div>

	<script
  src="https://code.jquery.com/jquery-3.3.1.js"
  integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
  crossorigin="anonymous"></script>
		
  	<script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.4.2/js/swiper.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@7.29.0/dist/sweetalert2.all.min.js"></script>
	<script src="js/alertCustom.js"></script>
	<script src="js/Swiper.js"></script>
	<script src="js/puzzle.js"></script>
	<script src="js/filiter.js"></script>  
	<script src="js/dishes-icon.js"></script>
	<script src="js/eggView.js"></script>
	<script src="js/dishesSessiom.js"></script>
	<script src='https://cdn.jsdelivr.net/mojs/0.265.6/mo.min.js'></script>
	<script src="js/iconClick.js"></script>
	<script>
		var index = sessionStorage;
		function getDishes(){

			if(index['index_search']!=null){
				document.getElementById('searchInputMeal').value=index.getItem('index_search');
				index.removeItem('index_search');
				console.log(document.getElementById('searchInputMeal').value);
			}
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange=function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						document.querySelector(".food-content").innerHTML = xhr.responseText;  
					}else{
						alert(xhr.status);
					}
				}
			}
			xhr.open("post", "searchToMeal".php", true);
			xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  			var data_info = "jsonStr=" + jsonStr;
  			xhr.send( data_info );
		};

        window.addEventListener("load", function(){
        	document.getElementById("searchInputMeal").addEventListener("keypress",function(e){
         		// window.alert(2);
        		if(e.keyCode == 13){
        			getDishes();
        		}       		
			});
			getDishes();
        });

		var coll = document.querySelectorAll('.food-button-save'); 
	    for(var i=0;i<coll.length;i++){
	        coll[i].addEventListener('click',function(){
	          // alert('hi');
	          var mealState = this.getElementsByClassName('mealState')[0];
	          var mealNo = this.getElementsByClassName('mealNo')[0];

	          if(mealState.value == 'false') {
	          	mealState.value = 'true';
	          } else {
	          	mealState.value = 'false';
	          } //切換該筆餐點的收藏狀態
 

	          // console.log(mealState.value);
	          // if(this.value == '')
	          // console.log(this);
	             var xhr = new XMLHttpRequest();
	                    
	                    xhr.onload = function (){
	                        if( xhr.status == 200){
	                            alert("收藏資料修改成功");
	                        }else{
	                            alert(xhr.status);
	                        }
	                    }
	                    xhr.open("post", "heartDataUpdate.php", true);
	                    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
	                    //餐點收藏狀態
	                    var data_info = "mealState=" + mealState.value + "&mealNo=" + mealNo.value;
	                    // console.log(data_info);
	                                     //餐點編號
	                    xhr.send(data_info);
	        });
	    }
	</script>
</body>
</html>