<?php 
ob_start();
session_start();
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Examples</title>
</head>
<body>
<?php 


//檢查是否已登入
if( isset( $_SESSION["memId"]) === false){ //尚未登入
	$_SESSION["where"] = $_SERVER["PHP_SELF"];
	echo "尚未登入, <a href='login.html'>請登入</a>";
    //echo "<script>window.alert('尚未登入, 請登入');location.href='login.html';</script>";
}else{ //已登入
	try {
	    require_once('phpDB/connectDB_CD103G3.php');
	    
        $pdo->beginTransaction(); //啟動交易管理
	    
	    $sql = "insert into membercoll (member_No, meal_No) values (:memberNo,:mealNo)";
	    $memcoll = $pdo->prepare($sql);
	    $memcoll->bindValue(":memberNo", $_SESSION["memNo"]);
	    $memcoll->bindValue(":mealNo",$_SESSION["meal_No"]);
	    $memcoll->execute();

	} catch (PDOException $e) {
		$pdo->rollBack();
		echo "錯誤原因 : ", $e -> getMessage(), "<br>";
		echo "錯誤行號 : ", $e -> getLine(), "<br>";
    }//try ... catch'
    echo "tes";
} 
?>    


</body>
</html>