<?php 
    session_start();
    require_once('phpDB/connectDB_CD103G3.php');
    $bonus = $_REQUEST['bonus'];
    if(isset($_SESSION['member_No'])) {
        $memNo = $_SESSION['member_No'];
        $sql = "UPDATE `member` SET `member_Bonus` = member_Bonus + $bonus WHERE `member`.`member_No` = $memNo;";
        $tag = $pdo -> prepare($sql);
        $tag -> execute();
    } else {
        echo 'not login';
    }
?>