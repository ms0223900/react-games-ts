

<?php

try {
    require_once('phpDB/connectDB_CD103G3.php');
    //使用搜尋條件
    $order = $_REQUEST['order'];
    $search = "%".$_REQUEST['search']."%";
    $page = (($_REQUEST['p']-1) * 10);
    if($search == '' && $order == 'latest') {
        // if()
        $sql = "SELECT *,(memberNow / groupon_MemberNeed) as success from grouponorder by `groupon`.`groupon_No` DESC limit $page,10000";
    } else if($order == 'latest') {
        $sql = "SELECT *,(memberNow / groupon_MemberNeed) as success from groupon where groupon_Name LIKE '$search' order by `groupon`.`groupon_No` DESC limit $page,10000";
    } else if($order == 'endDate'){
        $sql = "SELECT *,(memberNow / groupon_MemberNeed) as success from groupon where groupon_Name LIKE '$search' order by `groupon`.`$order` ASC limit $page,10000";
    } else if($order == 'success') {
        $sql = "SELECT * ,(memberNow / groupon_MemberNeed) as success from groupon where groupon_Name LIKE '$search' order by success DESC limit $page,10000";
    } else if($order == 'official') {
        $sql = "SELECT * ,(memberNow / groupon_MemberNeed) as success from groupon where groupon_TagNo = 8 order by success DESC limit $page,10000";
    }
   
    $groupon = $pdo -> prepare($sql);
    $groupon -> execute();
if( $groupon -> rowCount() != 0) { //如果搜尋結果有配對成功
    $grouponR = $groupon -> fetchAll(); //1. 找到所有飯團
    
    $sql_Meal = 'SELECT * from meal'; 
    $meal = $pdo -> prepare($sql_Meal);
    $meal -> execute();
    if( $meal -> rowCount() != 0) {
        $mealArr = $meal -> fetchAll();
        // print_r($mealR) ; //先找到所有餐點，暫存起來，以免重複查詢
        // foreach($mealArr as $i => $mealR) {
        //     echo $i,'/';
        // //    echo  $mealR[0];
            
        // //    echo $mealR['meal_Name'];
        // }
    } else {
        $mealR = 'noMeal';
    }

    require_once('phpDB/connectDB_CD103G3.php');
    $sql = "select * from groupontag";
    $tag = $pdo -> prepare($sql);
    $tag -> execute();
    $tagR = $tag -> fetchAll(); //標籤名稱
    // $tagR[$i]['groupon_TagName'];

    foreach($grouponR as $i => $grouponRe) {
        $grouponNo = $grouponRe['groupon_No']; //2. 找到個別groupon的no
        $grouponTagNo = $grouponRe['groupon_TagNo'];
        // echo $grouponTagNo;
        $grouponR[$i][2] = $tagR[$grouponRe['groupon_TagNo']-1]['groupon_TagName']; //將標籤的編號轉為文字
        
        // echo $grouponNo;
        // echo "<div>飯團編號---$grouponNo","<br>";
        // $grouponSearch .= $grouponR['groupon_No'];
        $sql = "select * from grouponlist where groupon_No = $grouponNo";
        $grouponMeal = $pdo -> prepare($sql);
        $grouponMeal -> execute();
        if($grouponMeal -> rowCount() != 0) {
            $grouponMealR = $grouponMeal -> fetchAll(); //3. 找到個別groupon的餐點編號
            $mealInGroupon = []; //groupon最後塞進一個array
            array_push($grouponR[$i], $mealInGroupon);
            foreach($grouponMealR as $j => $grouponMealR) {
                $mealNo = $grouponMealR['meal_No'];     //4. 找到個餐點的個別編號及資訊
                
                $mealName = $mealArr[$mealNo - 1]['meal_Name']; //因為是array所以要-1
                $mealPic = $mealArr[$mealNo - 1]['meal_Pic'];
                $mealPrice = $mealArr[$mealNo - 1]['meal_Price'];
                $mealScore = $mealArr[$mealNo - 1]['meal_Total'];
                $mealKcal = $mealArr[$mealNo - 1]['meal_Cal'];
                $thisMealList = [$mealName, $mealPic, $mealPrice,$mealScore, $mealKcal];
                array_push($grouponR[$i][11], $thisMealList); //將查到的餐點資料放這邊
                
                // print_r($grouponR);
                // echo $grouponR[0];
                // echo $grouponMealR['meal_No'], '<br>';
            }
            
        }
        // echo "</div><br><br>";
        // 查每個groupon的餐點
    }
    // print_r($grouponR);
    $jstr = json_encode($grouponR);
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

