

<?php

try {
    require_once('phpDB/connectDB_CD103G3.php');
    $sql = "select * from grouponlist where groupon_No = :grouponNo";
    $grouponList = $pdo -> prepare($sql);
    $grouponList -> bindValue('grouponNo', $_REQUEST['no']);
    $grouponList -> execute();
    if( $grouponList -> rowCount() != 0) {
        $grouponListR = $grouponList -> fetchAll();
        // print_r($grouponListR);
        // $jsonStr = json_encode($grouponListR);
        // foreach($grouponListR as $i => $grouponListR) {
        //     $no = $grouponListR['meal_No'];
        //     echo $no.'|';
        //     // include("getMealInfo.php");
        // }
    }else {
        $jsonStr = 'not found';
    }

    // echo $jsonStr;
}catch(PDOException $e) {
    echo $e->getMessage();
}
    
  
?>