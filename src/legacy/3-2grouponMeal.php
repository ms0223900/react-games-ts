

<?php

try {
    require_once('phpDB/connectDB_CD103G3.php');
    $sql = "SELECT * from meal ORDER by `mealGenre_No` ASC";
    $meal = $pdo -> prepare($sql);
    $meal -> execute();
    if( $meal -> rowCount() != 0) {
        $mealR = $meal -> fetchAll();
        
    }else {
        $jsonStr = 'not found';
    }

    $sql = 'SELECT * FROM `meal_genre` ORDER by `mealGenre_No` ASC';
    $mealTag = $pdo -> prepare($sql);
    $mealTag -> execute();
    if( $mealTag -> rowCount() != 0) {
        $mealTagR = $mealTag -> fetchAll();
        array_push($mealR, $mealTagR); //把餐點分類tag塞在最後
        // print_r($mealR);
        $jsonStr = json_encode($mealR);
    }else {
        $jsonStr = 'not found';
    }
    

    echo $jsonStr;
}catch(PDOException $e) {
    echo $e->getMessage();
}
    
  
?>