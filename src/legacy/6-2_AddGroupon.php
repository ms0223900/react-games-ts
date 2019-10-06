
<?php
ob_start();
session_start();

try {
    require_once('phpDB/connectDB_CD103G3.php');
    
    if(isset($_SESSION['member_Id'])) {
        $memId = $_SESSION['member_Id']; //會員id
        $memNo = $_SESSION['member_No']; //會員編號
    }
    
    $grouponNo = $_REQUEST['no'];
    $sql = "INSERT INTO `membergroupon` (`memberGrouponList_No`, `member_No`, `groupon_No`) VALUES (NULL, :memberNo, :grouponNo)";
    

    //更新會員參加的飯團
    $groupon = $pdo -> prepare($sql);
    $groupon -> bindValue('memberNo', $memNo); //id no.的會員
    $groupon -> bindValue('grouponNo', $grouponNo);
    $groupon -> execute();

    //找到該會員參加飯團清單的最新ID
    $sql_lastID =  'SELECT LAST_INSERT_ID()';
    $groupon = $pdo -> prepare($sql_lastID);
    $groupon -> execute();
    $idArr = $groupon -> fetch();
    //最新ID在此
    $id = $idArr[0];


    //先查該會員的餐點數量
    $sql_memberMeal = "SELECT * from `member` where `member_Id` = '$memId'";
    $memMeal = $pdo -> prepare($sql_memberMeal);
    $memMeal -> execute();
    $memMealR = $memMeal -> fetch();
    $_SESSION['memMealCount'] = $memMealR['member_buyCount'];
    // echo $_SESSION['memMealCount'];
    //再更新該會員餐點數量


    //找到該飯團的所有餐點
    $sql_grouponMeal = "SELECT * from `grouponlist` where `groupon_No` = :grouponNo";
    $groupon = $pdo -> prepare($sql_grouponMeal);
    $groupon -> bindValue('grouponNo', $_REQUEST['no']);
    $groupon -> execute();
    $grouponMeal = $groupon -> fetchAll();

     // 更新該會員的參加飯團的餐點清單
     $mealCount = 0;
    foreach ($grouponMeal as $i => $grouponMealR) {
        // print_r($grouponMealR);
        $sql_MealList = "INSERT INTO `membergrouponmeallist` (`memberGrouponMealList_No`, `memberGrouponList_No`, `meal_No`, `isExchanged`) VALUES (NULL, '$id', :mealNo, '0')";
        $groupon = $pdo -> prepare($sql_MealList);
        $groupon -> bindValue('mealNo', $grouponMealR['meal_No']);
        $groupon -> execute();
        $mealCount ++;
    }


    //更新該會員的餐點數量
    $sql_addMeal = "UPDATE `member` set `member_buyCount` = `member_buyCount` + '$mealCount' where `member_Id` = '$memId'";
    $groupon = $pdo -> prepare($sql_addMeal);
    $groupon -> execute();
    $_SESSION['memMealCount_After'] = $memMealR['member_buyCount'] + $mealCount;
    // echo $_SESSION['memMealCount_After'];




    //更新飯團的資訊，人數+1
    $sql_addPeople = "UPDATE `groupon` set `memberNow` = `memberNow` + 1 where `groupon_No` = :grouponNo";
    $groupon = $pdo -> prepare($sql_addPeople);
    $groupon -> bindValue('grouponNo', $grouponNo);
    $groupon -> execute();
    // $grouponR = $groupon -> fetchAll();
    //如果人數=門檻人數，則所有參加會員的購物金都新增該購物金
   //
    

//------------------------------
    

    header("Location: 6-3_grouponSuccessful.php?no=$grouponNo");
}catch(PDOException $e) {
    echo $e->getMessage();
}
    
  
?>

<!-- INSERT INTO `groupon` (`groupon_No`, `groupon_Name`, `groupon_TagNo`, `groupon_Founder`, `startDate`, `endDate`, `groupon_Bonus`, `memberNow`, `discount`) VALUES (NULL, '驚天霹靂吃飽飽的拿購物金!', '', '2', 'AAA', '2018-11-11', '2018-11-15', '22', '0', '0'); -->