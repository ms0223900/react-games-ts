

<?php

try {
    require_once('phpDB/connectDB_CD103G3.php');
    //使用搜尋條件
    $order = $_REQUEST['order']; //用未兌換的餐點排序
    $idNo = $_REQUEST['id']; //用SESSION
    $memberGrouponArr = []; //儲存該會員的飯團array
    
    $sql = "SELECT * from groupon";

    $groupon = $pdo -> prepare($sql);
    $groupon -> execute();
if( $groupon -> rowCount() != 0) { //如果有飯團
    $grouponR = $groupon -> fetchAll(); //1. 先找到所有飯團


    $sql_memberGroupon = 'SELECT * from membergroupon where member_No = :memberNo order by memberGrouponList_No DESC' ;
    $memberGroupon = $pdo -> prepare($sql_memberGroupon);
    $memberGroupon -> bindValue('memberNo', $idNo);
    $memberGroupon -> execute();
    if($memberGroupon -> rowCount() != 0) { //如果該會員有飯團
        $memberGrouponR = $memberGroupon -> fetchAll();
        // $memberGrouponR[$i]['groupon_No']; //該會員飯團的no.

    } else {
        $grouponR = 'not found';
        echo $grouponR;
        exit();
    }

    
    $sql_Meal = 'SELECT * from meal order by meal_No ASC'; //降序排列確保順序正確
    $meal = $pdo -> prepare($sql_Meal);
    $meal -> execute();
    if( $meal -> rowCount() != 0) {
        $mealArr = $meal -> fetchAll(); //先找到所有餐點，暫存起來
        // print_r($mealArr) ; 
        // foreach($mealArr as $i => $mealR) {
        //     echo $i,'/';
        // //    echo  $mealR[0];
            
        // //    echo $mealR['meal_Name'];
        // }
    } else {
        $mealR = 'noMeal';
    }

    $sql = "select * from groupontag";
    $tag = $pdo -> prepare($sql);
    $tag -> execute();
    $tagR = $tag -> fetchAll(); //標籤名稱
    // $tagR[$i]['groupon_TagName'];

    foreach($grouponR as $i => $grouponRe) {
        $grouponTagNo = $grouponRe['groupon_TagNo'];
        $grouponR[$i][2] = $tagR[$grouponRe['groupon_TagNo']-1]['groupon_TagName']; //將標籤的編號轉為文字
        // echo $grouponTagNo;
    }

    foreach($memberGrouponR as $i => $memberGrouponRe) {
        $grouponNo = $memberGrouponRe['groupon_No']; //2. 找到個別groupon的no
        $memberGrouponArr[$i] = $grouponR[$grouponNo - 1]; //groupon資訊
        
        //設定條件來取出該會員的所有飯團或是未兌換的飯團
        if($order == 'all') {
            $sql = "select * from membergrouponmeallist where memberGrouponList_No = :memberGrouponListNo";
            //選擇所有我的餐點
        } else {
            $sql = "select * from membergrouponmeallist where memberGrouponList_No = :memberGrouponListNo and isExchanged = 0";
            //選擇還沒兌換過的餐點
        }
        
        $memberGrouponMeal = $pdo -> prepare($sql);
        $memberGrouponMeal -> bindValue('memberGrouponListNo', $memberGrouponRe['memberGrouponList_No']); //找到該會員飯團的餐點編號
        $memberGrouponMeal -> execute();
        if($memberGrouponMeal -> rowCount() != 0) {
            $memberGrouponMealR = $memberGrouponMeal -> fetchAll(); //3. 找到個別groupon的餐點編號
            // print_r($memberGrouponMealR);
            $mealInGroupon = []; //groupon最後塞進一個array
            array_push($memberGrouponArr[$i], $mealInGroupon);
            foreach($memberGrouponMealR as $j => $memberGrouponMealRe) {
                $mealNo = $memberGrouponMealRe['meal_No'];     //4. 找到個餐點的個別編號及資訊
                $memberMealNo = $memberGrouponMealRe['memberGrouponMealList_No']; //記錄其獨立ID
                $mealName = $mealArr[$mealNo - 1]['meal_Name'];  //因為是array所以要-1
                
                $mealPic = $mealArr[$mealNo - 1]['meal_Pic'];
                $mealPrice = $mealArr[$mealNo - 1]['meal_Price'];
                $mealScore = $mealArr[$mealNo - 1]['meal_Total'];
                $mealKcal = $mealArr[$mealNo - 1]['meal_Cal'];
                $thisMealList = [$memberMealNo, $mealName, $mealPic, $mealPrice,$mealScore, $mealKcal];
                array_push($memberGrouponArr[$i][10], $thisMealList); //將查到的餐點資料放這邊
                
                
                // echo $grouponR[0];
                // echo $grouponMealR['meal_No'], '<br>';
            }
            
        }
        // echo "</div><br><br>";
        // 查每個groupon的餐點
    }
        // print_r($memberGrouponArr);
    // print_r($grouponR);
    $jstr = json_encode($memberGrouponArr);
    echo $jstr;

} else { //否則出現not found
    $grouponR = 'not found';
    echo $grouponR;
    // $jstr = json_encode($grouponR);
    // echo $jstr;
}
    

}catch(PDOException $e) {
    echo $e->getMessage();
}
    
  
?>

