<?php
ob_start();
session_start();
try{
  require_once("../connectMember.php");
  $sql = "UPDATE `manager` 
          SET `manager_Id`=:managerId,`manager_Psw`=:managerPsw,`manager_Auth`=:managerAuth
          WHERE manager_No = :manager_No";

$member = $pdo->prepare( $sql);
$member->bindValue(":manager_No", $_POST["manager_No"]); //管理員編號
$member->bindValue(":managerId", $_POST["managerId"]); //管理員帳號
$member->bindValue(":managerPsw", $_POST["managerPsw"]); //管理員密碼
$member->bindValue(":managerAuth", $_POST["managerAuth"]); //管理員權限

  $member->execute();
  
}catch(PDOException $e){
  echo $e->getMessage();
}
?>