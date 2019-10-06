<?php
ob_start();
session_start();
try{
 $loginInfo = json_decode($_REQUEST["jsonStr"]);  //取得前端送來的json字串，並將其轉成物件
  require_once('phpDB/connectDB_CD103G3.php');
  $sql = "select * from member where member_Id=:member_Id or email=:email";
  $member = $pdo->prepare($sql);
  $member->bindValue(":member_Id", $loginInfo->member_Id);
  $member->bindValue(":email", $loginInfo->email);
  $member->execute();

  if( $member->rowCount()==0){ //查無此人
	  echo "not found";
  }else{ //登入成功
    //自資料庫中取回資料
  	$memRow = $member->fetch(PDO::FETCH_ASSOC);
  	//送出登入者的姓名資料
    
    echo $memRow["email"]; 
  }
}catch(PDOException $e){
  echo $e->getMessage();
}
?>