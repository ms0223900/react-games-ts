<?php
ob_start();
session_start();
//客製化商品給key值
//  if(isset($_SESSION["customerCounter"])==false){
//   $_SESSION["customerCounter"] = 1;
//  }else{
//   $_SESSION["customerCounter"]++;
//  }
//  $offPdNo =  "c" . $_SESSION["customerCounter"];
//  $_SESSION["pdClassNo"][$offPdNo] = 1;

//儲存照片
    // 設定圖檔上傳路徑
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

//購物車繼續寫入
// $_SESSION["offPdName"][$offPdNo] = "客製化商品";
// $_SESSION["offPdNo"][$offPdNo] = $offPdNo;
// $_SESSION["offPdImg"][$offPdNo] = $fileName ;
// $_SESSION["pdPrice"][$offPdNo] = 90;
// $_SESSION["quantity"][$offPdNo] = 1;



header("location:member.php");
?>