<?php
    ob_start();
    session_start();

    $memId = $_REQUEST['id'];
       
    require_once('phpDB/connectDB_CD103G3.php');
    $sql = "SELECT * from member WHERE `member_Id`= '$memId'";
    $member = $pdo -> prepare($sql);
    $member -> execute();

    if($member -> rowCount() != 0) {
        $_SESSION['memId'] = $memId;
        
        $memberR = $member -> fetchAll();
        $_SESSION['memNo'] = $memberR[0]['member_No'];
        echo '<h2>會員編號為:', $_SESSION['memNo'],'</h2>';
        echo '<h2>登入帳號為: ', $_SESSION['memId'],'</h2>';
        
        $_SESSION['memMealCount'] = $memberR[0]['member_buyCount'];
        echo '<h2>餐點數量為: ', $_SESSION['memMealCount'],'</h2>';
        $memBuyCount = $memberR[0]['member_buyCount'];

        $sql_achieve = "SELECT * FROM `achievement` WHERE meal_Total < $memBuyCount order by `meal_Total` DESC limit 1" ; 
        $memberAchie = $pdo -> prepare($sql_achieve);
        $memberAchie -> execute();
        $memberAchie_R = $memberAchie -> fetchAll();
        
        print_r($memberAchie_R);//找與現在數值最相近的最大值，為該會員的現在等級
    } else {
        echo '查無帳號';
        
        unset($_SESSION['memId']);
        $_SESSION['memId'] = '';
        unset($_SESSION['memNo']);
        unset($_SESSION['memMealCount']); //錯誤就把session清空
    }

    
    
    
    




?>