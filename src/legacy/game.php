<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>日食扭蛋機</title>
	<link rel="stylesheet" href="css/gameCapusle.css">
	<style>
		.game_go {
			cursor: pointer;
		}
		h3 {
			margin: auto;
			text-align: center;
			font-size: 20px; 
		}
	</style>
</head>
<body>
	<?php
  		require_once('nav.php');
	?>
    <div id="gameCapusle">
    	<h2>
    		<img class="game-title" src="images/game_title.svg" alt="">
		</h2>
		<h3>
			試試看點擊黃色的旋鈕吧~
		</h3>
    	<div class="niu_danji">
		<div class="game_qu">
			<div class="game_go"></div>
		</div>
		<!--球-->
		<div class="dan_gund">
			<span class="qiu_1 diaol_1"></span>
			<span class="qiu_2 diaol_2"></span>
			<span class="qiu_3 diaol_3"></span>
			<span class="qiu_4 diaol_4"></span>
			<span class="qiu_5 diaol_5"></span>
			<span class="qiu_6 diaol_6"></span>
			<span class="qiu_7 diaol_7"></span>
			<span class="qiu_8 diaol_8"></span>
			<span class="qiu_9 diaol_9"></span>
			<span class="qiu_10 diaol_10"></span>
		</div>

		<div class="medon"></div>
		<div class="zjdl ">
			<span></span>
		</div>
		<!-- <div class="hint"></div> -->
	</div>

	<!-- ---------------------------吃甚麼小遊戲------------------------ -->
	<?php 
		try{
			require_once('phpDB/connectDB_CD103G3.php');
			$sql = "select * from meal ORDER BY RAND() LIMIT 11";
			$dishes = $pdo -> query($sql);
			$dishesRows = $dishes->fetchAll(PDO::FETCH_ASSOC);
			$rowCount = count($dishesRows);
		foreach( $dishesRows as $i => $dishesRow ){
	?>
	<div class="zonj_zezc none" id="jianpin_<?php echo $i;?>">
		<div class="jpzs aiqiyi tc_anima">
			<em><img src="images/close.png"/></em>
			<h1>以下是為您挑選的餐點：</h1>
			<div class="dishes-img">
				<img src="images/meals/<?php echo $dishesRow["meal_Pic"];?>" alt="">
			</div>
			<h2>
				<b><?php echo $dishesRow["meal_Name"];?></b><span>NT $<?php echo $dishesRow["meal_Price"];?></span>
			</h2>
			<a href="eatDetail.php?meal_No=<?php echo $dishesRow["meal_No"] ?>"><span class="checkDishes nextBTN" href="javascript::">確認</span></a>
			
		</div>
	</div>
	<?php         
    	}
    }catch(PDOException $e){
        echo "Error ?",$e->getMessage(),"<br>";
        echo "Error line?",$e->getLine(),"<br>";    
    }
    ?>
    <script src="https://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
	 crossorigin="anonymous"></script>
	
	<script src="js/gameCausple.js"></script>
</body>
</html>