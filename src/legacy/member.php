<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>會員中心</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" >
	<link href="https://cdn.bootcss.com/cropper/3.1.3/cropper.min.css" rel="stylesheet">
	<link rel="stylesheet" href="css/member.css">
	<script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
	<script src="https://cdn.bootcss.com/cropper/3.1.3/cropper.min.js"></script>
	<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
	<script src="http://ajax.aspnetcdn.com/ajax/knockout/knockout-3.0.0.js "></script>
 	<script src="http://html2canvas.hertzen.com/dist/html2canvas.js"></script>
	<!-- <script src="js/jquery-3.3.1.min.js"></script> -->
	<style>
		.member .member-contain .member-order .member-order-list li:last-child{
			display: none;
		}
		.member-panel label:hover {
			background-color: #FED44F;
			opacity: .8;
			/* color: #fff; */
		}
	</style>
</head>
<body onresize="myFunction()">

	<?php
		require_once("nav.php");
		require_once("login1.php");
	?>

	<div class="image-cutting-contain">
		<div class="container">
			<img src="" id="photo">
		</div>
		<p>裁切會員頭像</p>
		<button onclick="cansel()" id="image-cutting-cancel">取消</button>
		<button onclick="crop()">確定</button>			
	</div>

	<div class="member">
		<div class="member-list">
			<div class="member-list-item">
				<!-- <form action="#" id="myform" method="post" enctype="multipart/form-data"> -->
					<label class="member-Pic-box" for="upFile">
						<!-- <input type="file" id="input" class="sr-only"> -->
						<input type="file" id="upFile" name="upFile" accept="image/*">
						<img src="images/member_Pic/<?php echo $memRow->member_Pic ?>" alt="member-Pic" title="會員頭像" class="member-Pic" id="member-Pic">
						<span class="member-camera"></span>
					</label>
					<button type="submit" class="subBTN" id="subBTN-pic">修改頭像</button>
					<!-- <img id="ee" src="" alt=""> -->
					<!-- <a id="eee" href="" style="font-size: 16px">123</a> -->
				<!-- </form> -->
				<p class="member-list-item-contain">
					<span>  
						<img src="images/icon/user_black.svg" alt="member-Id" title="帳號" class="mem-icon">
						帳號ID: <?php echo $memRow->member_Id ?>	
					</span>
					<span>
						<img src="images/icon/money_black.svg" alt="member-Bonus" title="購物金" class="mem-icon">購物金: 
						<?php echo $memRow->member_Bonus ?>
					</span>
					<span>
						<img src="images/icon/mobile_black.svg" alt="mobile" title="手機" class="mem-icon">
						<?php echo $memRow->mobile ?>	
					</span>
				</p>
			</div>
			<script>
				document.getElementById("subBTN-pic").addEventListener('click',function(){
					//=====使用Ajax,更新登入者頭像
					var xhr = new XMLHttpRequest();
					// alert(document.getElementById("member-Pic").src);
					xhr.onload = function (){
						if( xhr.status == 200){
							// alert("會員頭像修改成功");
							swal("會員頭像修改成功", "", "success");
						}else{
							alert(xhr.status);
						}
					}
					xhr.open("post", "memberPicUpdate.php", true);
					xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
					var data_info = "memberPic=" + document.getElementById("member-Pic").src; //會員頭像url
					// alert(data_info);
					xhr.send(data_info);
				});


				// $("#subBTN-pic").click(function() {
				// 	html2canvas($("#member-Pic")[0]).then(function(canvas) {
				// 		// var $div = $("fieldset div");
				// 		// $div.empty();
				// 		// $("<img />", { src: canvas.toDataURL("image/png") }).appendTo($div);
				// 		$("#ee").attr('src', canvas.toDataURL("image/png"));
				// 		$("#eee").attr('href', canvas.toDataURL("image/png"));
				// 		$("#eee").attr('download','download.png');
				// 	});
				// });
			</script>
			<div class="member-panel">	
				<label for="member-Information-radio">會員資料</label>
				<label for="member-Order-radio">訂餐紀錄</label>
				<label for="member-Achievement-radio" id="achievement-button">我的成就</label>
				<label for=""><a href="coll.php">我的收藏</a></label>
				<label for=""><a href="5-1_NotChanged.php">我的飯團</a></label>
			</div>
			<div class="notebook"></div>
		</div>
	
		<div class="member-contain">
			
			<input type="radio" name="member-panel-radio" id="member-Information-radio" checked>	
			<div class="member-Information">
				<!-- 基本資料 -->
				<table class="member-content">
					<h2>
						<img src="images/member-data-img.svg" alt="基本資料">
					</h2>
						<tr>
							<td><label for="member-nickname">暱稱</label></td>
							<td>
								<input type="text" id="member-nickname" name="nickname" name="fname" value=<?php echo $memRow->member_Nick ?>>
								<label for="member-nickname">請輸入暱稱</label>
							</td>
						</tr>
						<tr>
							<td><label for="member-email">E-mail</label></td>
							<td>
								<input type="email" id="member-email" name="memEmail" value=<?php echo $memRow->email ?>>
								<label for="member-email">例:a123456@gmail.com</label>
							</td>
						</tr>
						<tr>
							<td><label for="member-tel">手機</label></td>	
							<td>
								<input type="tel" id="member-tel" name="memTel" value=<?php echo $memRow->mobile ?>>
								<label for="member-tel">例:0987654321</label>
							</td>
						</tr>
						<tr>
							<td></td>
							<td><button class="subBTN" id="subBTN-data" type="submit">資料修改</button></td>
						</tr>
					</table>	
				<script>
					document.getElementById("subBTN-data").addEventListener('click',function(){
						//=====使用Ajax,更新登入者暱稱, 信箱, 手機 
						var xhr = new XMLHttpRequest();
						// alert(document.getElementById("member-nickname").value);
						// alert(document.getElementById("member-email").value);
						// alert(document.getElementById("member-tel").value);
						xhr.onload = function (){
							if( xhr.status == 200){
								// alert("會員資料修改成功");
								swal("會員資料修改成功", "", "success");

								setInterval(() => {
									document.querySelector(".swal-button").addEventListener('click',function(){
										window.history.go(0);//重新整理頁面
									});
								}, 100);
								
							}else{
								alert(xhr.status);
							}
						}
						xhr.open("post", "memberDataUpdate.php", true);
						xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
						var data_info = "nickname=" + document.getElementById("member-nickname").value + //會員暱稱
										"&email=" + document.getElementById("member-email").value + //會員信箱
										"&tel=" + document.getElementById("member-tel").value;//會員手機
						// alert(data_info);
						xhr.send(data_info);

					});
				</script>
					<!-- 密碼修改 -->
					<table class="change-paw">
						<h2>
							<img src="images/member-paw-img.svg" alt="基本資料">
						</h2>
						<tr>
							<td><label for="old-paw">舊密碼</label></td>
							<td>
								<input type="password" id="old-paw" name="oldPaw">
								<label for="old-paw">請輸入舊密碼</label>
							</td>
						</tr>
						<tr>
							<td><label for="new-paw">新密碼</label></td>
							<td>
								<input type="password" id="new-paw" name="newPaw">
								<label for="new-paw">請輸入新密碼</label>
							</td>
						</tr>
						<tr>
							<td><label for="check-paw">確認新密碼</label></td>
							<td>
								<input type="password" id="check-paw" name="checkPaw">
								<label for="check-paw">請再次輸入新密碼</label>							
							</td>
						</tr>
						<tr>
							<td></td>
							<td colspan="2"><button class="subBTN" id="subBTN-paw" type="submit">密碼修改</button></td>
						</tr>
					</table>
			</div>
			<input type="hidden" id="op" value=<?php echo $memRow->member_Psw ?>>
			<script>					

				//=====使用Ajax,更新登入者密碼 
				document.getElementById("subBTN-paw").addEventListener('click',function(){
					// alert(document.getElementById("new-paw").value);
					if(document.getElementById("old-paw").value === document.getElementById("op").value){
						if(document.getElementById("new-paw").value.length<7){
							if(document.getElementById("new-paw").value === document.getElementById("check-paw").value){
								
								var xhr = new XMLHttpRequest();
								xhr.onload = function (){
									if( xhr.status == 200){
										// alert("會員密碼修改成功");
										swal("會員密碼修改成功", "", "success");
									}else{
										alert(xhr.status);
									}
								}
								xhr.open("post", "memberPawUpdate.php", true);
								xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
								var data_info = "newpaw=" + document.getElementById("new-paw").value;//會員新密碼

								// alert(data_info);
								xhr.send(data_info);	
							}else{
								// alert("確認密碼錯誤");
								swal("確認密碼錯誤", "", "error");
							}
						}else{
							// alert("新密碼長度不可超過6碼");
							swal("新密碼長度不可超過6碼", "", "error");
						}
					}else{
						// alert("密碼錯誤");
						swal("密碼錯誤", "", "error");
					}

					document.getElementById("old-paw").value = "";
					document.getElementById("new-paw").value = "";
					document.getElementById("check-paw").value = "";

					changePawLabel = document.querySelectorAll(".change-paw label");

					for(i=0; i<changePawLabel.length; i++){
						changePawLabel[i].style.opacity = 1;						
					}
				});
			</script>
			<input type="radio" name="member-panel-radio" id="member-Order-radio">
			<div class="member-order">
				
				<h2>
				<!-- 訂餐紀錄 -->
				<img src="images/member-order-img.svg" alt="訂餐紀錄">
				</h2>
				<!-- <ul class="member-filter-list">
					<li><button class="subBTN">尚未取餐</button></li>
					<li><button class="subBTN">訂單取消</button></li>
					<li><button class="subBTN">已取餐</button></li>
				</ul> -->
				<ul class="member-order-list">	
					<?php 
						$errMsg = "";
						try {
							$memNo = $_SESSION['member_No'];
							// require_once("connectBooks.php");
							$sqlMemberOrder = "select * from memberOrder WHERE member_No = $memNo ORDER BY memOrder_Time DESC";
							$productsMemberOrder = $pdo -> query( $sqlMemberOrder );
							// $productsMemberOrder -> bindValue()
						} catch (PDOException $e) {
							$errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
							$errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";
						}
					?>
					<?php	
						if( $errMsg !=""){
							echo "<tr><td colspan='6' align='center'>$errMsg</td></tr>";
						}else{
							while($prodRowMemberOrder = $productsMemberOrder->fetchObject()){
					?>
					<li>
						<div class="ordering-news">
							<div class="ordering-news-box1">
								<p class="memOrder-No"><span>訂單編號</span><?php echo $prodRowMemberOrder->memOrder_No ?></p>
								<p class="memOrder-Amount"><span>訂單金額</span>$<?php echo $prodRowMemberOrder->memOrder_Amount ?></p>
							</div>
							<!-- <div class="ordering-news-box2">
								<p class="memOrder-Time"><span>下單時間</span>　<span><?php echo $prodRowMemberOrder->memOrder_Time ?></span></p>
								<p class="memOrder-TakeTime"><span>取餐時間</span>　<span><?php echo $prodRowMemberOrder->memOrder_TakeTime ?></span></p>
							</div> -->
						</div>
						<div class="ordering-contain">
							<ul>
								<?php 
									$errMsg = "";
									try {
										// require_once("connectBooks.php");
										$sqlmemberOrderList = "select * from memberOrder, memberOrderList, meal
															   WHERE memberOrderList.memOrder_No = $prodRowMemberOrder->memOrder_No &&
															   memberOrderList.meal_No = meal.meal_No
															   GROUP BY memberOrderList.memOrderList_No;";
										$productsmemberOrderList = $pdo -> query( $sqlmemberOrderList );
									} catch (PDOException $e) {
										$errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
										$errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";
									}
								?>
								<?php	
									if( $errMsg !=""){
										echo "<tr><td colspan='6' align='center'>$errMsg</td></tr>";
									}else{
										while($prodRowmemberOrderList = $productsmemberOrderList->fetchObject()){
								?>
								<li>
									<img src="images/<?php echo $prodRowmemberOrderList->meal_Pic ?>" alt="meal">
									<p><?php echo $prodRowmemberOrderList->meal_Name ?></p>
									<span><?php echo $prodRowmemberOrderList->meal_Quantity ?>份</span>
								</li>
								<?php
										}//while
									}//else	
								?>
							</ul>
						</div>
					</li>
					<?php
							}//while
						}//else	
					?>				
				</ul>
			</div>

			<input type="radio" name="member-panel-radio" id="member-Achievement-radio">
			<div class="member-achievement">
				<h2>
				<!-- 我的成就 -->
				<img src="images/member-ach-img.svg" alt="我的成就">
				</h2>
				<!-- <ul class="member-filter-list">
					<li><button class="subBTN">已達成</button></li>
					<li><button class="subBTN">尚未達成</button></li>
				</ul> -->
				<p class="current-achievement">目前已訂購: <span><?php echo $memRow->member_buyCount ?></span> 道菜</p>
				<ul class="member-achievement-list">
				<?php 
					$errMsg = "";
					try {
						// require_once("connectBooks.php");
						$memBuyCount = $_SESSION['member_buyCount'];
						$sqlAchievement = "SELECT * FROM `achievement` WHERE meal_Total <= $memBuyCount and isAchievable = 1 order by `meal_Total` ASC";
						$productsAchievement = $pdo -> query( $sqlAchievement );
					} catch (PDOException $e) {
						$errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
						$errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";
					}
				?>
				<?php	
					if( $errMsg !=""){
						echo "<tr><td colspan='6' align='center'>$errMsg</td></tr>";
					}else{
						while($prodRowAchievement = $productsAchievement->fetchObject()){
				?>
					<li>
						<div class="achievement-pic">
							<img src="images/Achieve/<?php echo $prodRowAchievement->achievement_Pic ?>" alt="">
						</div>
						<div class="achievement-contain">
							<h3><?php echo $prodRowAchievement->achievement_Name ?></h3>
							<!-- <div class="meal-count">
								<?php echo $memRow->member_buyCount ?>/
								<?php echo $prodRowAchievement->meal_Total ?>
							</div> -->
							<p class="achievement-info">目標：完成訂購<?php echo $prodRowAchievement->meal_Total ?>道菜</p>
							<mark class="achievement-bonus">獎勵：<?php echo $prodRowAchievement->achievement_Bonus ?>元購物金</mark>
						</div>
					</li>
				<?php
						}//while
					}//else	
				?>
				</ul>
			</div>
		</div>

		<div class="table-hide"></div>
	</div>
	<script>

	// 調整顯示訂單菜色的父層大小
		var orderingContainUl = document.querySelectorAll('.ordering-contain ul');

		for(i=0; i<orderingContainUl.length; i++){
			
			childNumber = Math.floor(orderingContainUl[i].childNodes.length/2);
			orderingContainUl[i].style.width = childNumber * 178 + "px";
		}

	//調整成就進度條進度
	// background: linear-gradient(90deg, #fcf2ca 60%, #fff 60%); 
		// document.getElementById('achievement-button').addEventListener("click", function(){
		// 	var mealCount = document.querySelectorAll('.meal-count');

		// 	for(i=0; i<mealCount.length; i++){
		// 		percentage = mealCount[i].innerText.split("/")[0] / mealCount[i].innerText.split("/")[1];

		// 		if(percentage>1){percentage=1;}

		// 		mealCount[i].style.background = "linear-gradient(90deg, #FCE444 " + percentage*100 + "%, #fff " + percentage*100 + "%)"; 
		// 	}
		// })
	</script>
	
	<!-- 分頁 -->
	<script>
	
		var memberPanelLabel = document.querySelectorAll('.member-panel label');

		var memberInformationRadio = document.querySelector('#member-Information-radio');
		var memberOrderRadio = document.querySelector('#member-Order-radio');
		var memberAchievementRadio = document.querySelector('#member-Achievement-radio');

		var memberInformation = document.querySelector('.member-Information');
		var memberOrder = document.querySelector('.member-order');
		var memberAchievement = document.querySelector('.member-achievement');

		for( i = 0 ; i < memberPanelLabel.length; i++){
			memberPanelLabel[i].addEventListener('click', myFunction1);
		}

		myFunction();

		function myFunction(){

			if(window.innerWidth<768){						

				for( i = 0 ; i < memberPanelLabel.length; i++){
					memberPanelLabel[i].style.display = "inline-block";
					memberPanelLabel[i].style.color = "#76391B";
				}

				if(memberInformationRadio.checked){
					memberPanelLabel[0].style.display = "none";
					memberPanelLabel[0].style.color = "#ff5000";
				}else if(memberOrderRadio.checked){
					memberPanelLabel[1].style.display = "none";
					memberPanelLabel[1].style.color = "#ff5000";
				}else if(memberAchievementRadio.checked){
					memberPanelLabel[3].style.display = "none";
					memberPanelLabel[3].style.color = "#ff5000";
				}

			}else{

				for( i = 0 ; i < memberPanelLabel.length; i++){
					memberPanelLabel[i].style.display = "inline-block";
					memberPanelLabel[i].style.color = "#76391B";
				}
			}
		}

		function myFunction1(){

			if(window.innerWidth<768){						

				for( i = 0 ; i < memberPanelLabel.length; i++){
					memberPanelLabel[i].style.display = "inline-block";
					memberPanelLabel[i].style.color = "#76391B";
				}

				this.style.display = "none";
				this.style.color = "#ff5000";

			}else{

				for( i = 0 ; i < memberPanelLabel.length; i++){
					memberPanelLabel[i].style.display = "inline-block";
					memberPanelLabel[i].style.color = "#76391B";
				}
				
				this.style.color = "#ff5000";
			}
		}

	</script>

	<!-- input輸入判斷 -->
	<script>

		var memberInformationInput = document.querySelectorAll('.member-Information input');
		for(i=0;i<memberInformationInput.length;i++){

			inputValueIsNull.call(memberInformationInput[i]);

			memberInformationInput[i].addEventListener("change", function(){
				inputValueIsNull.call(this);
			});
		}

		function inputValueIsNull(){
			// console.log(this);
			if(this.value==""){
				this.nextSibling.nextSibling.style.opacity = "1";
			}else{
				this.nextSibling.nextSibling.style.opacity = "0";		
			}
		}

	</script>

	<!-- 會員頭像 -->
	<script>

		var imgCutCon = document.querySelector('.image-cutting-contain');

		document.getElementById("upFile").onchange = function(e){
			imgCutCon.style.display = 'inline-block';
			// var file = e.target.files[0];
			// var reader = new FileReader();
			// reader.onload = function(){
			// 	document.getElementById("member-Pic").src = reader.result;
			// }

			// reader.readAsDataURL(file);
		};
		
		var initCropper = function (img, input){
			var $image = img;
			var options = {
				aspectRatio: 1/1, // 纵横比
				viewMode: 2,
				background: false,
				// preview: '.img-preview' // 预览图的class名
			};
			$image.cropper(options);
			var $inputImage = input;
			var uploadedImageURL;
			if (URL) {
				// 给input添加监听
				$inputImage.change(function () {
					var files = this.files;
					var file;
					if (!$image.data('cropper')) {
						return;
					}
					if (files && files.length) {
						file = files[0];
						// 判断是否是图像文件
						if (/^image\/\w+$/.test(file.type)) {
							// 如果URL已存在就先释放
							if (uploadedImageURL) {
								URL.revokeObjectURL(uploadedImageURL);
							}
							uploadedImageURL = URL.createObjectURL(file);
							// 销毁cropper后更改src属性再重新创建cropper
							$image.cropper('destroy').attr('src', uploadedImageURL).cropper(options);
							$inputImage.val('');
						} else {
						window.alert('请选择一个图像文件！');
					}
				}
			});
			} else {
				$inputImage.prop('disabled', true).addClass('disabled');
			}
		}
		var cansel = function(){
			var imgCutCon = document.querySelector('.image-cutting-contain');
			imgCutCon.style.display = 'none';
		}
		var crop = function(){
			
			var imgCutCon = document.querySelector('.image-cutting-contain');
			imgCutCon.style.display = 'none';

			var $image = $('#photo');
			var $target = $('#member-Pic');
			$image.cropper('getCroppedCanvas',{
				width:300, // 裁剪后的长宽
				height:300
			}).toBlob(function(blob){
				// 裁剪后将图片放到指定标签
				$target.attr('src', URL.createObjectURL(blob));
			});
		}
		$(function(){
			initCropper($('#photo'),$('#upFile'));
		});


		if(document.getElementById('checkout_immediately_button')) {
			document.getElementById('checkout_immediately_button').addEventListener('click', function() {
			sessionStorage.clear();
			})
		}
		
	</script>
</body>
</html>