

<?php
ob_start();
session_start();
try{
 $loginInfo = json_decode($_REQUEST["jsonStr"]);  //取得前端送來的json字串，並將其轉成物件
  require_once('phpDB/connectDB_CD103G3.php');
  $sql = "select * from member where member_Id=:member_Id and member_Psw=:member_Psw";
  $member = $pdo->prepare($sql);
  $member->bindValue(":member_Id", $loginInfo->member_Id);
  $member->bindValue(":member_Psw", $loginInfo->member_Psw);
  // $member->bindValue(":member_Id", "ke");
  // $member->bindValue(":member_Psw", "ke");
  $member->execute();

  if( $member->rowCount()==0){ //查無此人
	  echo "not found";
  }else{ //登入成功
    //自資料庫中取回資料
    $memRow = $member->fetch(PDO::FETCH_ASSOC);
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
    
    $jsonStr = json_encode($memRow);

  	//送出登入者的姓名資料
    echo $jsonStr;
  }
}catch(PDOException $e){
  echo $e->getMessage();
}
?>
