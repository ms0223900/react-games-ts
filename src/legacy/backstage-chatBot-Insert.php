<?php
ob_start();
session_start();
try{
  require_once("connectMember.php");
  $sql = "INSERT INTO chatbot(keyword, content, is_Available) 
          VALUES (:keyword, :content, :is_Available)";

  $member = $pdo->prepare( $sql);
  $member->bindValue(":keyword", $_POST["chatBotKeyword"]); //關鍵字
  $member->bindValue(":content", $_POST["chatBotContent"]); //關鍵字回復
  $member->bindValue(":is_Available", $_POST["chatBotAvailable"]); //關鍵字狀態

  $member->execute();
  
}catch(PDOException $e){
  echo $e->getMessage();
}
?>