<?php
ob_start();
session_start();
try{
  
  define('UPLOAD_PATH', 'images/member_pic/');
  $img = $_POST["imgRUL"];
  // 接收 POST 進來的 base64 DtatURI String
  // 轉檔 & 存檔
  $img = str_replace('data:image/png;base64,', '', $img);
  $img = str_replace(' ', '+', $img);
  $data = base64_decode($img);
  $file = UPLOAD_PATH . $_SESSION["member_No"] . '.png';
  $fileName = date("Ymdhis") . $offPdNo . '.png';

  file_put_contents($file, $data);

  //更新會員頭像資料
  require_once("connectMember.php");
  $sql = "UPDATE member
          SET member_Pic = :member_Pic
          WHERE member_No = :member_No";

  $member = $pdo->prepare( $sql);
  $member->bindValue(":member_No", $_SESSION["member_No"]);
  $member->bindValue(":member_Pic", $_POST["memberPic"]);
 
  echo $_POST["imgRUL"];
 
  $member->execute();

  // header("location:member.php");

}catch(PDOException $e){
  echo $e->getMessage();
}
?>