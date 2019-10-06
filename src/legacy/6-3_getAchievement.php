<?php
    ob_start();
    session_start();
    require_once('phpDB/connectDB_CD103G3.php');


    $grouponNo = $_REQUEST['no'];

    $sql = "SELECT * from groupon WHERE `groupon_No`= '$grouponNo'";
    $grouponFounder = $pdo -> prepare($sql);
    $grouponFounder -> execute();
    $grouponFounderR = $grouponFounder -> fetchAll();
    $memId = $grouponFounderR[0]['groupon_FounderId']; //從泛團編號找到該創辦的ID
       
    
    $sql = "SELECT * from member WHERE `member_Id`= '$memId'";
    $member = $pdo -> prepare($sql);
    $member -> execute();
    $memberR = $member -> fetchAll();
    $memBuyCount = $memberR[0]['member_buyCount']; //該會員已購買餐點數量

    if($memberR[0]['member_Nick'] == NULL) { //發起人資訊
        $founder = $memId;
    } else {
        $founder = $memberR[0]['member_Nick'];
    }

    if($memberR[0]['member_Pic'] == NULL) { //發起人大頭貼
        $founderPic = 'linkPixelArt.jpg';
    } else {
        $founderPic = $memberR[0]['member_Pic'];
    }

    $sql_achieve = "SELECT * FROM `achievement` WHERE meal_Total <= $memBuyCount and isAchievable = 1 order by `meal_Total` DESC limit 1" ; 
    $memberAchie = $pdo -> prepare($sql_achieve);
    $memberAchie -> execute();
    $memberAchie_R = $memberAchie -> fetchAll();
    // $memberAchie_R[0]['achievement_Bonus'] = 
   
    $founderInfo = [
        $founder,
        $founderPic, 
        $memBuyCount,
        $memberAchie_R[0]['achievement_Bonus'],
        $memberAchie_R[0]['achievement_Name'],
        $memberAchie_R[0]['achievement_Pic'],
    ];
    $jsonStr = json_encode($founderInfo);
    echo $jsonStr;
    




?>