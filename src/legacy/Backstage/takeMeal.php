<?php
ob_start();
session_start();
try{
  require_once("../connectMember.php");
  $sql = "UPDATE memberorder
          SET is_memOrder = true
          WHERE memOrder_No = :memOrder_No";

  $member = $pdo->prepare( $sql);
  $member->bindValue(":memOrder_No", substr($_POST["memOrderNo"], 8, -2));
  $member->execute();
  
}catch(PDOException $e){
  echo $e->getMessage();
}
?>