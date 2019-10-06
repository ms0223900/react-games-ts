<?php
    // $reportQty = $_REQUEST["report_Qty"];
    $reportNo = $_REQUEST["report_No"];
    $status = $_REQUEST["report_Status"];
    try{
        require_once("../connectMember.php");

        // $sql = "update messagereport set report_Qty = :report_Qty where message_No=$messageNo";
        $sql = "UPDATE `messagereport` set `report_Status` = '$status' WHERE `messagereport`.`report_No` = $reportNo"; //更新該檢舉的留言資料
        $sentmsgreport = $pdo->prepare($sql);
        $sentmsgreport->execute();

        if($status = 'pass') { //如果通過則放行該留言
            $sql = "UPDATE `message` set `message_Reported` = false WHERE `message_No` IN (SELECT message_No FROM messagereport WHERE `report_No` = $reportNo)";
            $reportMes = $pdo->prepare($sql);
            $reportMes->execute();
        }
        
    }
    catch(PDOException $e){
        echo"錯誤原因",$e->getMessage(),"<br>";
        echo"錯誤行列",$e->getLine(),"<br>";
    };
?>