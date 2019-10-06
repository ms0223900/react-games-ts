<?php

try {

	require_once("../connectMember.php");

$mealno=$_REQUEST['meal_No'];
$mealgenereno=$_REQUEST['mealGenre_No'];
$mealname=$_REQUEST['meal_Name'];
$mealprice=$_REQUEST['meal_Price'];
$mealinfo=$_REQUEST['meal_Info'];
$mealcal=$_REQUEST['meal_Cal'];
$mealsold=$_REQUEST['meal_Sold'];
$mealpic=$_REQUEST['meal_Pic'];

// $sql="update table"
if( $mealpic == '') {
	$sql1="update meal 
	set mealGenre_No = :GenNo, 
	meal_Name = :name, 
	meal_Price = :price, 
	meal_Info = :info, 
	meal_Cal = :cal,
	meal_Sold = $mealsold 
	where meal_No = :noo";
} else {
	$sql1="update meal 
	set mealGenre_No = :GenNo, 
	meal_Name = :name, 
	meal_Pic = '$mealpic',
	meal_Price = :price, 
	meal_Info = :info, 
	meal_Cal = :cal,
	meal_Sold = $mealsold 
	where meal_No = :noo";
}



$mealedit = $pdo->prepare($sql1);
$mealedit->bindValue(":noo",$mealno,PDO::PARAM_INT );
$mealedit->bindValue(":GenNo",$mealgenereno,PDO::PARAM_INT );
$mealedit->bindValue(":name",$mealname);
// $mealedit->bindValue(":pic",);
$mealedit->bindValue(":price",$mealprice);
$mealedit->bindValue(":info",$mealinfo);
$mealedit->bindValue(":cal",$mealcal);
// $mealedit->bindValue(":sold",$mealsold);
$mealedit->execute();

echo 'success';
header('backstage-meal.php');
// if( $mealedit->rowCount() !=0 ){//如果找得資料，取回資料，送出json字串
//   	$mealeditlRow = $mealedit->fetch(PDO::FETCH_ASSOC);
//     $jsonStr = json_encode($mealeditlRow);
//     echo  $jsonStr;
//   }else{ //找不到
//     //取回一筆資料
//     //$jsonStr = "{}";
//     $jsonStr = "not found";
//   }	

// -----------------------------------------------------------------

// $sql1="update meal_genre set mealGenre_Name = :Gen where mealGenre_No = :GenNo"; 

// $mealedit = $pdo->prepare($sql1);

// $mealedit->bindValue(":GenNo",$mealgenereno,PDO::PARAM_INT );
// $mealedit->bindValue(":Gen",$mealgenere);

// $mealedit->execute();

// if( $mealedit->rowCount() !=0 ){//如果找得資料，取回資料，送出json字串
//   	$mealeditlRow = $mealedit->fetch(PDO::FETCH_ASSOC);
//     $jsonStr = json_encode($mealeditlRow);
//     echo  $jsonStr;
//   }else{ //找不到
//     //取回一筆資料
//     //$jsonStr = "{}";
//     $jsonStr = "not found";
//   }	

// if($_FILES["upFile"]["error"] == 0){
// 	echo $_FILES["upFile"]["name"];
// }else{
// 	echo "error";
// }

}catch(PDOEXception $e){
	
	echo $e->getMessage();
	
	}
	
?>