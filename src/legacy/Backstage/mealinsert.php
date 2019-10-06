<?php
 
try
{
	require_once("../connectMember.php");

    // $no = $_POST['mealNo'];
    $genre = $_POST['mealGenre'];
    $name =$_POST['mealName'];
    $pic = $_POST['upFile'];
    $price = $_POST['mealPrice'];
    $info = $_POST['mealInfo'];
    $cal = $_POST['mealCal'];
    $sold = $_POST['mealSold'];
 
    $sql = "INSERT INTO meal (meal_No, mealGenre_No, meal_Name,meal_Pic,meal_Price,meal_Info,meal_Cal,meal_Sold,meal_Count,meal_Total) VALUES (:no, :genre, :name,:pic,:price,:info,:cal,:sold,1,4)";


    $mealedit = $pdo->prepare($sql);
    $mealedit->bindValue(":no",'int NOT NULL AUTO_INCREMENT',PDO::PARAM_INT);
    $mealedit->bindValue(":genre",$genre,PDO::PARAM_INT );
    $mealedit->bindValue(":name",$name);
    $mealedit->bindValue(":pic",$pic);
    $mealedit->bindValue(":price",$price);
    $mealedit->bindValue(":info",$info);
    $mealedit->bindValue(":cal",$cal);
    $mealedit->bindValue(":sold",$sold);
    $mealedit->execute();

// if (isset($_POST['upload'])) {
//   var_dump($_FILES);
//   move_uploaded_file($_FILES['upFile']['tmp_name'], 'up_tmp/'.time().'.dat');

//   exit;
// }

}catch(PDOEXception $e){
    
    echo $e->getMessage();
    
}
    

header('Location: backstage-meal.php');
?>