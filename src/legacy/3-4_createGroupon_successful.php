<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous">
    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/gsap/src/minified/TweenMax.min.js"></script>
    <script src="js/gsap/src/minified/easing/CustomEase.min.js"></script>

    <title>3-4</title>
</head>
<body>
    <nav>
        <?php 
            require_once('nav.php');
        ?>
    </nav>
    <script src="js/main.js"></script>

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

    <div class="maxWidthWrapper ">
        <div class="step-wrapper create3_4 clearfix">
            <!-- 這裡放步驟 -->
            <h1>
                您已成功發起飯團!!
            </h1>
            <div class="forkSpoonSucc-container">
                <div class="fork">
                    <div class="pic">
                        <img src="images/longFork.png" alt="fork">
                    </div>
                </div>
                <div class="spoon">
                    <div class="pic">
                        <img src="images/longSpoon.png" alt="spoon">
                    </div>
                </div>
            </div>
        </div>
        <div class="woodTemp create3_4">
            <div class="grouponTitle-wrapper">
                <div class="text-box">
                    <span class="tag">
                        #<?php 
                            
                            echo $tagR[$grouponR["groupon_TagNo"] - 1]['groupon_TagName'] 
                        
                        ?>
                    </span>
                    <h2 id="createGrouponTitle">
                        <?php echo $grouponR["groupon_Name"] ?>
                    </h2>
                </div>                
                <div class="backRibbon"></div>  
                <div class="leftRibbon"></div>
                <div class="rightRibbon"></div>
                <div class="userInfo-wrapper clearfix">
                        <!-- // 取得現在會員的id -->
                    <div class="grouponUser"> 
                        <span>發起人: </span>
                    </div>
                    <div class="userPic">
                        <div class="pic">
                            <img src="images/user01.png" alt="user">
                        </div>
                    </div>
                    <div class="user grid-9">
                        <h3 class="userId">
                            Arthur00234
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
            <div class="shareInfo-wrapper clearfix">
                <h2>
                    使用以下QRcode / 代碼分享給朋友
                </h2>
                <p>
                    即可查看此飯團，達到門檻的朋友們，<br>
                    通通都可以拿到購物金!!
                </p>
                <div class="shareInfo-wrapper clearfix">
                    <div class="QRcode grid-12 grid-md-6">
                        <h3>
                            QRcode
                        </h3>
                        <p>
                            掃描此QRcode即可看到此飯團
                        </p>
                        <div class="QR-container">
                            <div class="pic">
                                <img src="" alt="QRcode" id="QR-picContainer">
                            </div>
                        </div>
                    </div>
                    <div class="shareCode grid-12 grid-md-6">
                        <h3>
                            飯團代碼
                        </h3>
                        <span class="">
                            可點擊"參加好友飯團"的按鈕，輸入此代碼來直接查看此飯團
                        </span>
                        <div class="codeHere clearfix">
                            <input type="text" class="grid-9 groupon_shareCode" value="" readonly> 
                            <span class="grid-3 copyCode" id="">
                                複製代碼
                            </span>
                            <div class="hint">
                                已複製此代碼
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="btn-container clearfix">
            <a class="cancelBTN" href="5-1_NotChanged.php">
                查看我的飯團
            </a>
            <a class="nextBTN" href="6-2_grouponPayment.php?no=<?php echo $grouponNo; ?>" id="">
                馬上付款此飯團
            </a>
        </div>
    </div>
    
</div>

    <footer>
        <!-- 放footer -->
    </footer>
</body>
<script>
    window.addEventListener('load', function() {
        //先顯示
        var thisGrouponNo = location.search.replace('?no=','');
        QRcodeAndCopyIt(thisGrouponNo); //寫入QRcode
        
        //顯示title, tag
        // var createGrouponInfo = storage.grouponInfo.split('|');
        // $class('tag').innerText = '#' + createGrouponInfo[2];
        // $id('createGrouponTitle').innerText = createGrouponInfo[0];
        // console.log(location.search);
        achievementShowOff('6-3_getAchievement.php' + location.search);

        
        
        // 最後再清空暫存資料
        storage.clear();
        // 等6-1作好後，抓QRcode資料 和產生代碼，測試網頁連結
    });
</script>
</html>
<?php
}
    }else {
}




}catch(PDOException $e) {
    echo $e->getMessage();
}
    
  
?>
<!-- phpEndHere -->