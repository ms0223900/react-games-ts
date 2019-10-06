<?php
ob_start();
session_start();
try{
  require_once("connectMember.php");
  
  // 從資料庫取得目前最後的訂單編號
  $sqlMemberOrder = "select * from memberOrder 
                      where member_No = " . $_SESSION["member_No"] .
                    " order by memOrder_No DESC";
  $productsMemberOrder = $pdo -> query( $sqlMemberOrder );
  $prodRowMemberOrder = $productsMemberOrder->fetchObject();
  
  // 新增訂單
  $sqlorder = "INSERT INTO memberorder (member_No, memOrder_Time, memOrder_TakeTime, memOrder_Amount, memOrder_QR)
          VALUES (:member_No, NOW(), ADDTIME(NOW(), :memOrder_TakeTime), :memOrder_Amount, CONCAT(:memOrder_QR, '.png'))";

  $member = $pdo->prepare( $sqlorder);
  $member->bindValue(":member_No", $_SESSION["member_No"]); //會員編號
  $member->bindValue(":memOrder_TakeTime", "0:".$_POST["memOrderTakeTime"].":0"); //取餐時間
  $member->bindValue(":memOrder_Amount", $_POST["memOrderAmount"]); //訂單金額
  $member->bindValue(":memOrder_QR", $prodRowMemberOrder->memOrder_No+1); //流水號
  $member->execute();

  //獲取新增訂單的編號
  $sqlCurrent = "SELECT LAST_INSERT_ID() as Current";
  $memberCurrent = $pdo->prepare( $sqlCurrent);
  $memberCurrent->execute();

  $memRowCurrent = $memberCurrent->fetchObject();
  // echo $memRowCurrent->Current; //訂單編號

  // 新增訂單項目
  $mealNoList =  explode(",",$_POST["mealNo"]);
  $mealQuantityList = explode(",",$_POST["mealQuantity"]);
  $mealnew = "";
  
  for($i=0; $i<count($mealNoList)-1 ; $i++){
    $mealNoItem = substr($mealNoList[$i], 2);
    $mealnew = $mealnew . "($memRowCurrent->Current, $mealNoItem, $mealQuantityList[$i]),";
  }

  $sql = "INSERT INTO memberOrderList (memOrder_No, meal_No, meal_Quantity) VALUES " . substr($mealnew, 0, -1);

  // echo $sql."<br>";
  $member = $pdo->prepare( $sql);
  $member->execute();

  // 更新會員購買數量與剩餘購物金
  $sql = "UPDATE member
          SET member_buyCount = member_buyCount + :member_buyCount, member_Bonus = member_Bonus - :member_Bonus
          WHERE member_No = :member_No";

  $member = $pdo->prepare( $sql);
  $member->bindValue(":member_No", $_SESSION["member_No"]);
  $member->bindValue(":member_buyCount", $_POST["memberbuyCount"]);
  $member->bindValue(":member_Bonus", $_POST["memberBonus"]);
  $member->execute();

}catch(PDOException $e){
  echo $e->getMessage();
}
?>