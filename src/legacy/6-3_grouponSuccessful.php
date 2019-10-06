<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/style.css">
    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/gsap/src/minified/TweenMax.min.js"></script>
    <script src="js/gsap/src/minified/easing/CustomEase.min.js"></script>
    <script src="js/main.js"></script>

    <title>已成功發起飯團!!</title>
</head>
<body>
    <nav>
        <?php 
            require_once('nav.php');
        ?>
    </nav>
<!--  phpStartHere -->
<?php

try {
    require_once('phpDB/connectDB_CD103G3.php');
    $sql = "SELECT * from `groupontag` order by `groupon_TagNo` ASC";
    $tag = $pdo -> prepare($sql);
    $tag -> execute();
    $tagR = $tag -> fetchAll(); //標籤

    $grouponNo = $_REQUEST['no'];
    $sql = "select * from groupon where groupon_No = :no";
    $groupon = $pdo -> prepare($sql);
    $groupon -> bindValue('no', $grouponNo);
    $groupon -> execute();
    if( $groupon -> rowCount() != 0) {
        $grouponR = $groupon -> fetchAll();
        foreach($grouponR as $i => $grouponR) {
?>
<div class="penguinPage"> 

    <div class="maxWidthWrapper success">
        <div class="success-wrapper">
            <div class="fork">
                <div class="pic">
                    <img src="images/longFork.png" alt="longFork">
                </div>
            </div>
            <div class="dish-container">
                <h2 class="chickDialogue">
                    您已成功加入此飯團!<br>
                    <span>
                        快邀請朋友一起參加<br>，拿購物金折抵消費!!
                    </span>
                    <div class="dialogueDeco"></div>
                </h2>
                <div class="chickPic">
                    <div class="pic">
                        <img src="images/dayCookIndex_181005-02.png" alt="">
                    </div>
                </div>
                <div class="grouponSimpleInfo-wrapper">
                    <div class="grouponTitle-wrapper">
                        <div class="text-box">
                            <span class="tag">#
                                <?php 
                            
                                    echo $tagR[$grouponR["groupon_TagNo"] - 1]['groupon_TagName'] 
                                
                                ?>
                            
                            </span>
                            <h2><?php echo $grouponR["groupon_Name"] ?></h2>
                        </div>                
                        <div class="backRibbon"></div>  
                        <div class="leftRibbon"></div>
                        <div class="rightRibbon"></div>
                        <div class="userInfo-wrapper clearfix">
                            <div class="grouponUser">
                                <span class="userName">發起人: </span>
                            </div>
                            <div class="userPic">
                                <div class="pic">
                                    <img src="images/user01.png" alt="user">
                                </div>
                            </div>
                            <div class="user grid-9">
                                <h3 class="userId">
                                    <?php echo $grouponR["groupon_No"] ?>
                                </h3>
                                <div class="userExp clearfix">
                                    <div class="achievePic grid-4">
                                        <div class="pic">
                                            <img src="images/achieve01.png" alt="">
                                        </div>
                                    </div>
                                    <div class="achStatus grid-8 clearfix">
                                        <h3>
                                            小菜蟲
                                        </h3>
                                        <p>
                                            <span>300 </span> EXP
                                        </p>
                                    </div>
                                    <div class="hint--achievement">
                                        <div class="pic grid-6">
                                            <img src="images/achieve01.png" alt="">
                                        </div>
                                        <p>
                                            <span class="achName">小菜蟲成就</span> <br> 吃完10餐後可獲得，可拿到<span>10</span>元折價券
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bonusInfo">
                    <div class="bonus-wrapper clearfix">
                        <div class="endDate grid-12 grid-md-3">
                            <p>募集截止日</p>
                            <span>
                                <?php 
                                    $date = substr($grouponR["endDate"], 5);
                                    $endDate = str_replace('-','/' ,$date);
                                    echo $endDate;
                                ?>
                            </span>
                        </div>
                        <div class="progress-container grid-12 grid-md-5">
                            <h3>已參加人數  /  門檻人數</h3>
                            <div class="people-container">
                                <span class="peopleNow">
                                    <?php echo $grouponR["memberNow"] ?>
                                </span> / 
                                <span class="peopleNeeded">
                                    <?php echo $grouponR["groupon_MemberNeed"] ?>
                                </span>
                            </div>
                            <div class="progressBar">
                                <div class="progressBar_B"></div>
                            </div>
                            <input type="hidden" id="grouponProgressRatio" value="<?php echo ($grouponR["memberNow"] / $grouponR["groupon_MemberNeed"]) ?>">
                        </div>
                        <div class="bonus-container  grid-6 grid-md-4 clearfix">
                            <div class="bonus grid-3">
                                <div class="pic">
                                    <img src="images/bonusIcon-05.svg" alt="bonus">
                                    <span class="bonus-coin">
                                        <?php echo $grouponR["groupon_Bonus"] ?>
                                    </span>
                                </div>
                            </div>
                            <div class="bonusPeople grid-9">
                                <h3>達到後 前 
                                    <span class="people">
                                        <?php echo$grouponR["groupon_MemberNeed"] ?>
                                    </span>
                                    人每人:  
                                </h3>
                                <p>
                                    <span class="bonus">
                                        <?php echo $grouponR["groupon_Bonus"] ?>
                                    </span>
                                    元購物金
                                </p>
                            </div>
                        </div>
                        <div class="almostSucc-icon">
                            即將達標    
                        </div>
                    </div>
                    </div>
                </div>
                <!-- <div class="mealCount">
                    <div class="beforeCount">
                        <h3>
                            你的餐點數量原為: 
                        </h3>

                    </div>
                    <div class="afterCount">
                        <h3>
                            你的餐點數量增加為: 
                        </h3>
                    </div>
                    <div class="more">
                        還需:
                        <span></span>
                        個餐點才能升級至下一階的成就
                    </div>
                </div> -->
                <div class="shareInfo">

                </div>
                
            </div>
            <div class="spoon">
                <div class="pic">
                    <img src="images/longSpoon.png" alt="longSpoon">
                </div>
            </div>
        </div>
        <div class="btn-container clearfix">
            <a class="cancelBTN" href="4-1_grouponList.php?search=&order=latest&p=1">
                查看更多飯團
            </a>
            <a class="nextBTN" href="5-1_NotChanged.php">
                看看我的飯團
            </a>
        </div>
        <div class="successGroupon-container">
        <input type="checkbox" id="success6_3" 
            <?php
                $success = false; 
                if($grouponR["memberNow"] == $grouponR["groupon_MemberNeed"]) {
                    echo 'checked';
                    $success = true;
                };
            ?>
            >
            <div class="grouponSuccessInfo-wrapper popUp">
                
                <div class="grouponSuccess-container">
                    <div class="chickShishou">
                        <div class="pic">
                            <img src="images/index_181018-03.png" alt="">
                        </div>
                    </div>
                    <h2>
                        恭喜您!! 此飯團已經達標!!
                    </h2>
                    <p>
                        參加此飯團的前 
                        <span id="sucessMember">
                            <?php echo $grouponR["groupon_MemberNeed"] ?>
                        </span> 人<br>
                        皆可以獲得 <span id="successBonus">
                            <?php 
                            echo $grouponR["groupon_Bonus"];
                            $memberBonus = $grouponR["groupon_Bonus"]; ?>
                        </span>
                        元購物金
                    </p>
                    
                    <label class="nextBTN" id="confirmSuccess" for="success6_3">確認</label> 
                    <p>
                        購物金已經發送到你的帳號了~<br>
                        在結帳時可以使用購物金(不含飯團)~
                    </p>
                </div>
                
            </div>
            <label class="success6_3-bg" for="success6_3"></label>
    </div>
    </div>
    <!-- 用check來控制 -->
    
        

</div>    

    <footer>
        <!-- 放footer -->
    </footer>
</body>
<script>


window.addEventListener('load',function() {
    
    achievementShowOff('6-3_getAchievement.php' + location.search);
    
})

</script>

</html>
<?php            
        }
    }else {
}
    if($success) { //如果人數達標
        $sql_grouponMem = "SELECT * from membergroupon WHERE `groupon_No` = '$grouponNo'";
        $memGroupon = $pdo -> prepare($sql_grouponMem);
        $memGroupon -> execute();
        $memGrouponR = $memGroupon -> fetchAll(); //參加該飯團的會員

        foreach($memGrouponR as $i => $memGrouponRe) {
            $memberNo = $memGrouponRe['member_No'];
            $sql_upBonus = "UPDATE `member` SET `member_Bonus` = `member_Bonus` + '$memberBonus'  WHERE `member`.`member_No` = '$memberNo'";
            $memBonus = $pdo -> prepare($sql_upBonus);
            $memBonus -> execute();
        }
        
    }




}catch(PDOException $e) {
    echo $e->getMessage();
}
    
  
?>
<!-- phpEndHere -->