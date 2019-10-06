

<?php

try {
    require_once('phpDB/connectDB_CD103G3.php');
    include('getGrouponMealList.php');
    // print_r($grouponListR);
    $mealArr = array();
    foreach($grouponListR as $i => $grouponListR) {
        
        if(is_array($grouponListR)) {
            
            // print_r($grouponListR);
            $sql = "select * from meal where meal_No = :mealNo";
            $meal = $pdo -> prepare($sql);
            $meal -> bindValue('mealNo', $grouponListR['meal_No']);
            $meal -> execute();
            if( $meal -> rowCount() != 0) {
                
                $mealR = $meal -> fetch();
                //用單純的fetch再加到陣列
                array_push($mealArr, $mealR);
                
            }else {
                $jsonStr = 'not found';
            }
        
            
        } else {
            // print_r($grouponListR);
            // echo $grouponListR['meal_No'],'/';
        }
        
    }
    // print_r($mealArr);
    $jsonStr = json_encode($mealArr);
    echo $jsonStr;
}catch(PDOException $e) {
    echo $e->getMessage();
}
    
  
?>