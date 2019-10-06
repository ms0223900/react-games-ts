

<?php

try {
    require_once('phpDB/connectDB_CD103G3.php');
    //使用搜尋條件
    $mealArr = json_decode($_REQUEST['mealArr']); //用未兌換的餐點排序
    // echo $mealArr;
    for($i=0;$i<count($mealArr);$i++) {
        $mealNo = $mealArr[$i]; //第i筆資料為編號i+1
        // echo $mealNo,'/';
        $sql_ChangeMeal = "UPDATE `membergrouponmeallist` SET `isExchanged` = '1' WHERE `memberGrouponMealList_No` = $mealNo";
        $groupon = $pdo -> prepare($sql_ChangeMeal);
        $groupon -> execute();
    }
    echo 'success';
    // header();
    
    
   

}catch(PDOException $e) {
    echo $e->getMessage();
}
    
  
?>

