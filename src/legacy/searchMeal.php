<?php
try{
    require_once('phpDB/connectDB_CD103G3.php');
    $name = isset($_REQUEST["searchMeal"]) ? trim($_REQUEST["searchMeal"]) : '';
    $sql = "select * from meal where meal_Name like :keyword";
    $name = "%$name%"; 
    $dishes = $pdo->prepare( $sql );
    $dishes->bindValue(":keyword", $name);
    $dishes->execute();
  //如果找得資料,將會員資料送出
  if( $dishes->rowCount() == 0 ){
    echo "not found~";
  }else{
    while($dishesRow = $dishes->fetch( PDO::FETCH_NAMED)){
?>
     <div class="food-item part--12 part-md-6 part-lg-4 part-xl-3 scale-anm <?php echo substr_replace($dishesRow["meal_Pic"],'',-7); ?>">
						<div class="food-item-box">
							<a href="eatDetail.php?meal_No=<?php echo $dishesRow["meal_No"];?>">
								<div class="food-pic">
									<img class="food-pic-intro" src="images/<?php echo substr_replace($dishesRow["meal_Pic"],'',-7); ?>/<?php echo $dishesRow["meal_Pic"];?>" alt="">
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
								<a class="food-button-save mainBTN v2">
									<span class="fas fa-heart"></span>
									<p>收藏</p>  
									<div class="subBall b1"></div>
								</a>
								<a class="food-button-buy v2" id="A0<?php echo $dishesRow["meal_No"];?>">
									<span class="fas fa-cart-plus"></span>
									<p>加入購物車</p>
									<input type="hidden" value="<?php echo $dishesRow["meal_Name"];?>|<?php echo $dishesRow["meal_Pic"]; ?>|<?php echo $dishesRow["meal_Price"];?>">
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