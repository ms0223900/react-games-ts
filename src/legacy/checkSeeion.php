<?php
ob_start();
session_start();
try{
    if(isset($_SESSION['member_No']) == false ) { //無登入會員資料
      echo "not found";
    } else {
      require_once("connectBooks.php");
      $sql = "select * from member where member_No=:member_No";
      $member = $pdo->prepare($sql);
      $member->bindValue(":member_No", $_SESSION['member_No']);
      $member->execute();
      if( $member -> rowCount() != 0) {
          $memRow = $member -> fetchAll();
          $jsonStr = json_encode($memRow);
      }
      echo $jsonStr;
    } 
}catch(PDOException $e){
  echo $e->getMessage();
}
?>