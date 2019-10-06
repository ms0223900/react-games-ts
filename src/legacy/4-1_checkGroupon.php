

<?php

try {
    require_once('phpDB/connectDB_CD103G3.php');
    //使用搜尋條件
    $no = $_REQUEST['no'];
    
    $sql = "SELECT * from groupon WHERE groupon_No = '$no'";
    $groupon = $pdo -> prepare($sql);
    $groupon -> execute();
if( $groupon -> rowCount() != 0) { //如果搜尋結果有配對成功
    $grouponR = 'have groupon';
    echo $grouponR;
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

