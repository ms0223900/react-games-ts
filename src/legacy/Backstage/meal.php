<?php
try{
	require_once("../connectMember.php");

  $sql = "select * from meal A1 inner join meal_genre A2 on A1.mealGenre_No = A2.mealGenre_No where meal_No = :mealNo group by A1.meal_No order by meal_No";
  $meal = $pdo->prepare($sql);
  $meal->bindValue(":mealNo", $_GET["meal_No"]);
  $meal->execute();

  if( $meal->rowCount() !=0 ){//如果找得資料，取回資料，送出json字串
  	$mealRow = $meal->fetch(PDO::FETCH_ASSOC);
    $jsonStr = json_encode($mealRow);
    echo  $jsonStr;
  }else{ //找不到
    //取回一筆資料
    //$jsonStr = "{}";
    $jsonStr = "not found";
  }	
  //送出json字串
 
}catch(PDOException $e){
  echo $e->getMessage();
}
?>