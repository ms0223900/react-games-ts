<?php
  ob_start();
  session_start();

  try{
    require_once("../connectMember.php");
    $sql = "SELECT manager_No FROM manager 
          WHERE manager_Id = :manager_Id && manager_Psw = :manager_Psw";

    $productsmanager = $pdo->prepare( $sql);
    $productsmanager->bindValue(":manager_Id", $_POST["siginManagerId"]); //管理員帳號
    $productsmanager->bindValue(":manager_Psw", $_POST["siginManagerPsw"]); //管理員密碼

    $productsmanager->execute();
    
    $prodRowmanager = $productsmanager->fetchObject();

    $_SESSION["manager_No"] = $prodRowmanager->manager_No; //將管理員編號存入SESSION

    echo $prodRowmanager->manager_No; //回傳找到的管理員編號

  }catch(PDOException $e){
    echo $e->getMessage();
  }
?>



                 