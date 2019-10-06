<?php
ob_start();
session_start();
try{
  require_once("connectMember.php");
  $sql = "UPDATE member
          SET member_Nick = :nickname, email = :email, mobile = :tel
          WHERE member_No = :member_No";

  $member = $pdo->prepare( $sql);
  $member->bindValue(":member_No", $_SESSION["member_No"]);
  $member->bindValue(":nickname", $_POST["nickname"]);
  $member->bindValue(":email", $_POST["email"]);
  $member->bindValue(":tel", $_POST["tel"]);
  $member->execute();
  
}catch(PDOException $e){
  echo $e->getMessage();
}
?>