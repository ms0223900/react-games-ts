<?php
ob_start();
session_start();
try{
  require_once("../connectMember.php");
  
  $sql = "SELECT * FROM manager 
          WHERE manager_No = :manager_No";

  $productsmanager = $pdo->prepare( $sql);
  $productsmanager->bindValue(":manager_No",  $_SESSION["manager_No"]); //管理員編號

  $productsmanager->execute();
  
  $prodRowmanager = $productsmanager->fetchObject();

}catch(PDOException $e){
  echo $e->getMessage();
}
?>

