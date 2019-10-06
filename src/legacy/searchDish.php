<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	
</head>
<body>
	<?php
try{
	require_once('phpDB/connectDB_CD103G3.php');
	$name = isset($_REQUEST["search"]) ? trim($_REQUEST["search"]) : '';
	$sql = "select * from meal where meal_Name like :keyword && meal_Sold = 0";
	$name = "%$name%"; 
	$dishes = $pdo->prepare( $sql );
	$dishes->bindValue(":keyword", $name);
	$dishes->execute();
 
  if( $dishes->rowCount() == 0 ){
	echo "not found~";
  }else{
	while($dishesRow = $dishes->fetch( PDO::FETCH_NAMED)){
?>
	 <div class="food-item part--12 part-md-6 part-lg-4 part-xl-3 scale-anm <?php echo substr_replace($dishesRow["meal_Pic"],'',-7); ?>">
						<div class="food-item-box">
							<a href="eatDetail.php?meal_No=<?php echo $dishesRow["meal_No"];?>">
								<div class="food-pic">
									<img class="food-pic-intro" src="images/meals/<?php echo $dishesRow["meal_Pic"];?>" alt="">
									<!-- <div id="circle">
										<img src="images/icon/chili.svg" alt="">
									</div> -->
								</div>
							</a>
							<div class="food-title">
								<h2><?php echo $dishesRow["meal_Name"];?></h2>
							</div>
							<div class="food-price">
								<span>NT$ <?php echo $dishesRow["meal_Price"];?></span>
							</div>
							<div class="food-score clearfix">
								<span class="calc-score">評分</span>
								<div class="score-container clearfix">
									<span class="scoreNum"><?php echo $dishesRow["meal_Total"];?></span>
									<div class="scoreEgg-container" score="2.7" >
										<ul>
											<li>
												<div class="pic">
													<img src="images/eggEmpty.svg" alt="scoreYes" class="score">
												</div>
											</li>
											<li>
												<div class="pic">
													<img src="images/eggEmpty.svg" alt="scoreYes" class="score">
												</div>
											</li>
											<li>
												<div class="pic">
													<img src="images/eggEmpty.svg" alt="scoreYes" class="score">
												</div>
											</li>
											<li>
												<div class="pic">
													<img src="images/eggEmpty.svg" alt="scoreYes" class="score">
												</div>
											</li>
											<li>
												<div class="pic">
													<img src="images/eggEmpty.svg" alt="scoreYes" class="scoreW">
												</div>
											</li>
											</ul>
									</div>
								</div>
							</div>
							<div class="food-button clearfix">
								<a class="food-button-save mainBTN v2 heart_icon" href="javascript::" onclick="heartClick()">
									<p class="heart_icon">
										<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
											viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
											<g>
												<path class="st0" d="M83.2,16.3c-3.3-3-7.6-4.5-12.1-4.5c-5.2,0-10.2,2.2-13.7,5.9c-1.7,1.8-3,3.9-4.3,6.6c-0.5,1.3-1.8,2.1-3.1,2.1
												c-1.3-0.1-2.6-0.7-3.2-2l-0.6-1.2C42.6,16,36.2,11.8,29,11.8c-1.2,0-2.3,0.2-3.5,0.4c-6.1,1.1-10.9,4.7-14.3,10.5
												c-5,8.6-5.5,16.1-1.4,23.6c2.6,4.7,6,9.4,10.3,14.2c8.1,9,17.6,17.6,29.9,26.9c11.3-8.6,20.1-16.3,27.8-24.5
												C82,58.3,86.9,52.7,90.3,46c1.3-2.6,2.6-5.7,2.4-9C92.5,28.4,89.4,21.7,83.2,16.3z"/>
												<path class="st0" d="M87.9,10.6c-4.6-4-10.5-6.2-16.6-6.2c-7.1,0-13.9,2.9-18.8,8.1c-0.9,0.9-1.7,1.9-2.5,3C44,7.2,34.1,2.9,24.2,4.9
												c-8.1,1.5-14.5,6.2-19,13.9C-1.1,29.6-1.6,40.2,3.7,50c2.8,5.3,6.5,10.4,11.3,15.7c8.7,9.7,19,18.9,32.4,28.9c0.9,0.6,1.8,1,2.7,1
												c1.5,0,2.5-0.8,3-1.2C65,85.3,74.5,77,82.8,68.1c4.6-4.9,9.9-11,13.7-18.6c1.6-3.3,3.5-7.7,3.4-12.6C99.7,26.2,95.7,17.3,87.9,10.6z
												M90.3,46c-3.4,6.7-8.3,12.3-12.5,16.9C70.1,71.1,61.3,78.8,50,87.4c-12.3-9.3-21.8-17.9-29.9-26.9c-4.3-4.8-7.7-9.5-10.3-14.2
												c-4.1-7.5-3.6-15,1.4-23.6c3.4-5.8,8.2-9.4,14.3-10.5c1.2-0.2,2.3-0.4,3.5-0.4c7.2,0,13.6,4.2,17.2,11.4l0.6,1.2
												c0.6,1.3,1.9,1.9,3.2,2c1.3,0,2.6-0.8,3.1-2.1c1.3-2.7,2.6-4.8,4.3-6.6c3.5-3.7,8.5-5.9,13.7-5.9c4.5,0,8.8,1.5,12.1,4.5
												c6.2,5.4,9.3,12.1,9.5,20.7C92.9,40.3,91.6,43.4,90.3,46z"/>
											</g>
										</svg>
										<span>收藏</span>
									</p>
								
										<input class="mealState" type="hidden" name="mealstate" value="false">
										<input class="mealNo" type="hidden"  name="mealNo" value="A0<?php echo $dishesRow["meal_No"];?>">
									<div class="subBall b1"></div>
								</a>
								<a class="food-button-buy v2" id="A0<?php echo $dishesRow["meal_No"];?>">
									<span class="fas fa-cart-plus"></span>
									<p>加入購物車</p>
									<input type="hidden" value="<?php echo $dishesRow["meal_Name"];?>|<?php echo $dishesRow["meal_Pic"]; ?>|<?php echo $dishesRow["meal_Price"];?>|1|false">
									<div class="wrap">
										<div class="mainBall b1"></div>
										<div class="mainBall b2"></div>	
										<div class="mainBall b3"></div>	
									</div>
								</a>
							</div>
						</div>
					</div>

<?php	       
	}
  }	
}catch(PDOException $e){
  echo $e->getMessage();
}
?>

	
</html>