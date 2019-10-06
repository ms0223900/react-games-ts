<?php
ob_start();
session_start();
try{
  require_once("../connectMember.php");
  $sql = "INSERT INTO `manager`(`manager_Id`, `manager_Psw`, `manager_Auth`) 
          VALUES (:managerId, :managerPsw, :managerAuth)";

  $member = $pdo->prepare( $sql);
  $member->bindValue(":managerId", $_POST["managerId"]); //管理員帳號
  $member->bindValue(":managerPsw", $_POST["managerPsw"]); //管理員密碼
  $member->bindValue(":managerAuth", $_POST["managerAuth"]); //管理員權限

  $member->execute();

}catch(PDOException $e){
  echo $e->getMessage();
}
?>