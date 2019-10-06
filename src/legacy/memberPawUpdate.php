<?php
ob_start();
session_start();
try{
  require_once("connectMember.php");
  $sql = "UPDATE member
          SET member_Psw = :newpaw
          WHERE member_No = :member_No";

  $member = $pdo->prepare( $sql);
  $member->bindValue(":member_No", $_SESSION["member_No"]);
  $member->bindValue(":newpaw", $_POST["newpaw"]);
  $member->execute();

  // if( $member->rowCount()==0){ //查無此人
	//   echo "not found";
  // }else{ //登入成功
  //   //自資料庫中取回資料
  // 	$memRow = $member->fetch(PDO::FETCH_ASSOC);

  // 	//將登入者的資訊寫入session暫存區
  // 	$_SESSION["memNo"] = $memRow["no"];
  // 	$_SESSION["memId"] = $memRow["memId"];
  // 	$_SESSION["memName"] = $memRow["memName"];
  // 	$_SESSION["email"] = $memRow["email"];
  // 	//送出登入者的姓名資料
  // 	echo $memRow["memName"];
  // }

}catch(PDOException $e){
  echo $e->getMessage();
}
?>