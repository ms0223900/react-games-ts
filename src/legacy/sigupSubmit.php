<?php
ob_start();
session_start();
try{
 $loginInfo = json_decode($_REQUEST["jsonStr"]);  //取得前端送來的json字串，並將其轉成物件
  require_once("connectBooks.php");

  $sql = "select * from member where member_Id=:member_Id " ;
  $member = $pdo->prepare($sql);
  $member->bindValue(":member_Id", $loginInfo->member_Id);
  $member->execute();

  if( $member->rowCount()==0){ //查無此人
    $sqlInto = "insert into member ( member_Id,member_Psw,member_Nick,email) 
        values(:member_Id, :member_Psw, :member_Nick, :email)" ;
    $memberInto = $pdo->prepare($sqlInto);
    $memberInto->bindValue(":member_Id", $loginInfo->member_Id);
    $memberInto->bindValue(":member_Psw", $loginInfo->member_Psw);
    $memberInto->bindValue(":member_Nick", $loginInfo->member_Nick);
    $memberInto->bindValue(":email", $loginInfo->email);
    $memberInto->execute();
    //自資料庫中取回資料
    $sqlCall = "select * from member where member_Id=:member_Id" ;
    $memberCall = $pdo->prepare($sqlCall);
    $memberCall->bindValue(":member_Id", $loginInfo->member_Id);
    $memberCall->execute();
    $memRow = $memberCall->fetch(PDO::FETCH_ASSOC);

    $buyCount = $memRow["member_buyCount"];
    $sql2 = "select * from achievement where meal_Total <= :meal_Total order by achievement_No desc";	//比對成就條件，如果購買數量大於成就條件，撈出來，用成就編號大到小
    $achievement = $pdo->prepare($sql2);
    $achievement->bindValue(":meal_Total", (int)$buyCount);
    $achievement->execute();
    $achievementRow = $achievement->fetch();//撈成就資料一次。
    array_push($memRow, $achievementRow);
    //將登入者的資訊寫入session暫存區
    $_SESSION["member_No"] = $memRow["member_No"]; //會員編號
    $_SESSION["member_Id"] = $memRow["member_Id"]; //會員帳號
    $_SESSION["member_Psw"] = $memRow["member_Psw"]; //會員密碼
    $_SESSION["member_Nick"] = $memRow["member_Nick"]; //會員暱稱
    $_SESSION["email"] = $memRow["email"];  //會員信箱
    $_SESSION["mobile"] = $memRow["mobile"];  //會員電話
    $_SESSION["member_Pic"] = $memRow["member_Pic"];  //會員大頭貼
    $_SESSION["member_Bonus"] = $memRow["member_Bonus"];  //會員購物金
    $_SESSION["member_buyCount"] = $memRow["member_buyCount"];  //會員購買數量
    $_SESSION["where"] = "login";  //告知我是註冊登入
    //送出登入者的姓名資料
    $jsonStr = json_encode($memRow);
    echo $jsonStr;
    // echo 'not found'; //會員大頭貼
    
    $memNo = $memRow["member_No"];
    $sql = "INSERT INTO `memberorder` (`memOrder_No`, `member_No`, `memOrder_Time`, `memOrder_TakeTime`, `memOrder_status`, `memOrder_Amount`, `is_memOrder`, `memOrder_QR`) VALUES (NULL, $memNo, Now(), Now(), 'ing', '246', '0', '8.png')";
    $memOrder = $pdo -> prepare($sql);
    $memOrder -> execute();


    header('Location: scratch.php');
  }else{ //註冊失敗
    echo 'hasMember';
  }
}catch(PDOException $e){
  echo $e->getMessage();
}
?>