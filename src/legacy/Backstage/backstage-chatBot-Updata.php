<?php
ob_start();
session_start();
try{
  require_once("../connectMember.php");
  $sql = "UPDATE chatbot 
          SET keyword = :keyword,
              content = :content,
              is_Available = :is_Available 
          WHERE keyword_No = :keyword_No";

  $member = $pdo->prepare( $sql);
  $member->bindValue(":keyword_No", $_POST["ChatBotKeywordNo"]); //關鍵字編號
  $member->bindValue(":keyword", $_POST["viewChatBotKeyword"]); //關鍵字
  $member->bindValue(":content", $_POST["viewChatBotContent"]); //關鍵字回復
  $member->bindValue(":is_Available", $_POST["viewChatBotKeywordState"]); //關鍵字狀態

  $member->execute();
  
}catch(PDOException $e){
  echo $e->getMessage();
}
?>