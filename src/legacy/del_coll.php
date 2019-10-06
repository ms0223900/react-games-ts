<?php
ob_start();
session_start();
try{
  require_once("connectmenu.php");
  $sql = "DELETE FROM membercoll WHERE  member_No = :member_No && meal_No = :meal_No";
  $member = $pdo->prepare( $sql);
  $member->bindValue(":member_No", $_POST["memNo"]);
  $member->bindValue(":meal_No", $_POST["mealNo"]);
  $member->execute();
  
}catch(PDOException $e){
  echo $e->getMessage();
}
?>