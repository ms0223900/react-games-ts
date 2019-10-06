
<?php
    ob_start();
    session_start();
try {
    require_once('phpDB/connectDB_CD103G3.php');
    $jsonStr = $_REQUEST['jsonStr'];

    // echo  $jsonStr;
    if(isset($_SESSION['member_Id'])) {
        $memId = $_SESSION['member_Id'];
        if( strrpos($memId,'ayCook') ) {
            $discount = 0.4;
        } else {
            $discount = 0.6;
        }
    }

    $createG = json_decode($jsonStr);
    
    
    $sql = "INSERT INTO `groupon` (`groupon_No`, `groupon_Name`,  `groupon_TagNo`, `groupon_FounderId`, `startDate`, `endDate`, `groupon_Bonus`,`groupon_MemberNeed`, `memberNow`, `discount`) VALUES
    (NULL, '$createG->groupon_Name', '$createG->groupon_TagNo', '$memId', DATE_ADD(NOW(),INTERVAL '$createG->startDate' DAY) ,DATE_ADD(NOW(),INTERVAL '$createG->endDate' DAY), '$createG->groupon_Bonus', '$createG->groupon_MemberNeed', '0', '$discount')";
    

    // 抓系統日期 + N天
    // 抓最新一筆的飯團編號
    $groupon = $pdo -> prepare($sql);
    $groupon -> execute();

//------------------------------
    //取得最新一筆ID
    $sql_lastID =  'SELECT LAST_INSERT_ID()';
    $groupon = $pdo -> prepare($sql_lastID);
    $groupon -> execute();
    $idArr = $groupon -> fetch();
    //最新ID在此
    $id = $idArr[0];
//------------------------------
    //更新飯團的餐點清單array
    $mealListJson = $_REQUEST['mealList'];
    $mealList = json_decode($mealListJson);
    //迴圈更新資料庫
    foreach($mealList as $j => $mealListR) {
        $sqlAddMeal = "INSERT INTO `grouponlist` (`grouponList_No`, `meal_No`, `groupon_No`) VALUES (NULL, '$mealListR', '$id')";
        $addMeal = $pdo -> prepare($sqlAddMeal);
        $addMeal -> execute();
    };
?>
<script src="js/main.js"></script>
<script>
    window.onload = function() {
        if(storage.createGrouponId == null) {
            storage.createGrouponId = <?php echo $id ?>;
        }
        
    }
    
</script>
<?php
    header("Location: 3-4_createGroupon_successful.php?no=$id");
}catch(PDOException $e) {
    echo $e->getMessage();
}
    
  
?>


<!-- INSERT INTO `groupon` (`groupon_No`, `groupon_Name`, `groupon_TagNo`, `groupon_Founder`, `startDate`, `endDate`, `groupon_Bonus`, `memberNow`, `discount`) VALUES (NULL, '驚天霹靂吃飽飽的拿購物金!', '', '2', 'AAA', '2018-11-11', '2018-11-15', '22', '0', '0'); -->