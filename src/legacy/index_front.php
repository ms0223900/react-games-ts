<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>日食 Day Cook</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="css/index.css">
    <link rel="stylesheet" href="css/owl.carousel.min.css">
    <link rel="stylesheet" href="css/owl.theme.default.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz"
        crossorigin="anonymous">
    <link media="(max-width: 840px)" href="css/swiper.css" rel="stylesheet">
</head>
<body>
    <!-- 導覽列 -->

    <?php
    require_once('nav.php');
    // session_start();
    ?>


    <!-- 第一屏 搜尋/迴轉台 -->

    <section class="indexSearch">
        <div class="wrap">
            <div class="indexSearch-wrap">
                <div class="indexSearch-bg">
                    <img src="images/index_1_bg_desktop.png" alt="">
                </div>
                <div class="indexSearch-searchBar">
                    <form id="indexSearch-searchBar" method="GET" action="dishes.php">
                        <div>
                            <select id="indexSearch-select" >
                                <option value="meal" selected>餐點</option>
                                <option value="Groupon">飯團</option>
                            </select>
                        </div>
                        <input id="index-searchInput" type="text" placeholder="以餐點關鍵字搜尋" />
                        <input id="index-searchInput-hidden-filter" type="hidden" >
                        <input id="index-searchInput-hidden-p" type="hidden" >
                        <button id="index-searchBtn" class="indexSearch-btn"><i class="fas fa-search"></i></button>
                        <div class="indexSearch-rope">
                            <img src="images/index_rope.svg" alt="">
                            <img src="images/index_rope.svg" alt="">
                        </div>
                    </form>
                </div>
                <div class="indexSearch-conveyor">
                    <div class="indexSearch-owner">
                        <img src="images/index_owner.svg" alt="">
                        <img src="images/index_ownerWing.svg" alt="">
                        <div>
                            <p>餐點可以點看看喔！</p>
                        </div>
                    </div>
                    <div class="indexSearch-conveyorBox">
                        <div class="indexSearch-table">
                            <div class="indexSearch-tableImg">
                                <img src="images/index_1_conveyor.svg" alt="">
                            </div>
                            <ol>
                                <?php   
                                try{          
                                require_once("connectBooks.php");
                                // $sql = "select meal_Name,meal_Pic,meal_Price,meal_Total from meal where mealGenre_No = 2 and meal_Sold = 1 ";
                                $sql = "select * from meal where mealGenre_No = 2 and meal_Sold = 0 ";

                                $meal = $pdo -> query($sql);

                                $count = 0;
                                while($mealRow = $meal -> fetchObject()){
                                    $count++;
                               ?>
                                <li class="indexSearch-meal-<?php echo $count ?>">
                                    <div class="indexSearch-hover">
                                        <p>
                                            <a href="eatDetail.php?meal_No=<?php echo $mealRow->meal_No;?>"><?php echo $mealRow->meal_Name;?></a>
                                        </p>
                                        <div class="score-container">
                                            <span class="scoreNum" style="display:none;">
                                                <?php echo $mealRow->meal_Total;?>
                                            </span>
                                            <div class="scoreEgg-container">
                                                <ul>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="score">
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="score">
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="score">
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="score">
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="scoreW">
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <p><?php echo $mealRow->meal_Price;?>元</p>
                                    </div>
                                    <img class="indexSearch-mealImg" src="images/meals/<?php echo $mealRow->meal_Pic;?>" alt="">
                                </li>
                                 <?php
                                    }   
                                }catch(PDOException $e){
                                    echo "error ~<br>";
                                    echo $e->getMessage(),"<br>";
                                }
                                ?>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <div class="indexScroll">
        <!-- 第二屏 參加飯團動畫 -->
        <div class="indexScroll-wrap">
            <div class="indexScroll-hand">
                <img src="images/indexScrollHand.svg" alt="">
            </div>
            <div class="indexScroll-chicken">
                <img src="images/indexScrollChicken.svg" alt="">
            </div>
            <div class="indexScroll-top">
                <img src="images/index_woodtopMobile.png" alt="">
                <img src="images/index_woodtop.png" alt="">
            </div>
        </div>

        <div class="indexScroll-box"></div>
        <section class="indexJoin">
            <div class="wrap">
                <div class="indexJoin-wrap">
                    <div class="indexJoin-title indexTitle">
                        <!-- <h1>如何參加飯團</h1> -->
                        <img src="images/index_title2.svg" alt="">
                    </div>
                    <div class="indexJoin-phoneBox">
                        <div class="indexJoin-phone">
                            <div class="indexJoin-spotlightL"></div>
                            <div class="indexJoin-spotlightR"></div>
                            <div class="indexJoin-bg">
                                <img id="indexJoin-ckO" src="images/index_joinChicken1.svg" alt="">
                                <!-- <img src="images/index_joinChickenFeet1.svg" alt=""> -->
                                <img id="indexJoin-ckQr" src="images/index_joinChicken2.svg" alt="">
                                <!-- <img src="images/index_joinChickenFeet2.svg" alt=""> -->
                            </div>
                            <div class="indexJoin-info">
                                <img src="images/index_joinLogo.png" alt="">
                                <p>點選按鈕<br>觀看飯團教學</p>
                            </div>
                            <div class="indexJoin-stepOrigin">
                                <div class="indexJoin-stepO1">
                                    <img src="images/index_joinSurfing.png" alt="">
                                    <img src="images/index_finger.svg" alt="">
                                </div>
                                <div class="indexJoin-stepO2">
                                    <img src="images/index_joinEnter.png" alt="">
                                    <p class="indexJoin-stepO2-btn">參加此飯團</p>
                                    <img class="finger2" src="images/index_finger.svg" alt="">
                                </div>
                                <div class="indexJoin-stepO3">
                                    <div>
                                        <p>取餐QRcode</p>
                                        <p>豬排親子丼蓋飯</p>
                                    </div>
                                    <div class="indexJoin-stepO3-img">
                                        <div></div>
                                        <img src="images/index_joinQrcode.png" alt="">
                                    </div>
                                </div>
                                <div class="indexJoin-stepO4">
                                    <div>
                                        <p>感謝您的消費</p>
                                        <p>請於賞味期2小時內享用完畢</p>
                                    </div>
                                    <div>
                                        <i class="fas fa-check"></i>
                                        <span>取餐認證完成</span>
                                    </div>
                                </div>
                            </div>
                            <div class="indexJoin-stepQrcode">
                                <div class="indexJoin-stepQr1">
                                    <div>
                                        <p>參加我發起的飯團：<br>「吃丼飯一週吧！」<br>使用邀請碼：0666<br>或掃QRcode：</p>
                                        <img src="images/index_joinQrcode.png" alt="">
                                    </div>
                                </div>
                                <div class="indexJoin-stepQr2">
                                    <div>
                                        <p>我也要參加！</p>
                                    </div>
                                </div>
                                <div class="indexJoin-stepQr3">
                                    <div class="indexJoin-stepQr3-box">
                                        <p>掃描QRcode或輸入飯團代碼</p>
                                        <p>飯團代碼 :</p>
                                        <div class="indexJoin-stepQr3-input">
                                            <p>0666</p>
                                        </div>
                                        <div>
                                            <p class="indexJoin-stepQr3-btn">輸入確認</p>
                                            <img src="images/index_finger.svg" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="indexJoin-btn">
                            <button type="button" id="indexJoin-btnO" style="--color: #fe9954">
                                <p>自行挑選</p>
                            </button>
                            <button type="button" id="indexJoin-btnQr" style="--color: #faad2b">
                                <p>邀請碼</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 第三屏 官方飯團推薦-->
        <section class="indexGroupon indexGroupon-mobile">
            <div class="wrap">
                <div class="indexGroupon-wrap">
                    <div class="indexGroupon-title indexTitle">
                        <!-- <h1>推薦官方飯團</h1> -->
                        <img src="images/index_title3.svg" alt="">
                    </div>
                    <div class="indexGroupon-stage">
                        <div class="indexGroupon-box owl-carousel">
                            <div class="indexGroupon-part indexGroupon-part1 item">
                                <?php   
                                    try{          
                                    require_once("connectBooks.php");
                                    $sql = "select * from groupon where groupon_No = 25";
                                    $meal = $pdo -> query($sql);
                                    $groupRow = $meal -> fetchObject();
                                ?>
                                <div class="indexGroupon-sumTitle">
                                    <h3>
                                        <a href="6-1_grouponDetail.php?no=<?php echo $groupRow->groupon_No;?>"><?php echo $groupRow->groupon_Name;?></a>
                                    </h3>
                                    <div class="indexGroupon-average">
                                        <p><?php echo $groupRow->groupon_Bonus;?></p>
                                        <p>購物金</p>
                                    </div>
                                </div>
                                <img src="images/index_meal1.png" alt="">
                                <p class="indexGroupon-info"><mark>每日不同菜色讓你吃不膩，省錢之餘兼具美味。</mark></p>
                                <div class="indexGroupon-sum">
                                    <div class="indexGroupon-days">
                                        <span class="indexGroupon-subtitle">飯團天數｜</span>
                                        <span>7天</span>
                                    </div>
                                    <div class="indexGroupon-count">
                                        <span class="indexGroupon-subtitle">參加人數｜</span>
                                        <div class="indexGroupon-countBar">
                                            <p style="width:<?php
                                            $memberNow = $groupRow->memberNow;
                                            $memberNeed = $groupRow->groupon_MemberNeed;
                                            $memberCountBar = (100/$memberNeed)*$memberNow ;
                                            echo $memberCountBar;
                                            ?>px"><?php echo $groupRow->memberNow;?>/<?php echo $groupRow->groupon_MemberNeed;?></p>
                                        </div>
                                    </div>
                                    <div class="indexGroupon-deadline">
                                        <span class="indexGroupon-subtitle">門檻截止｜</span>
                                        <span>11/26前</span>
                                    </div>
                                </div>
                                <div class="indexGroupon-btn">
                                    <a href="6-1_grouponDetail.php?no=<?php echo $groupRow->groupon_No;?>">查看飯團</a>
                                </div>
                                <?php 
                                }catch(PDOException $e){
                                    echo "error ~<br>";
                                    echo $e->getMessage(),"<br>";
                                }
                                ?>
                            </div>
                            <div class="indexGroupon-part indexGroupon-part2 item">
                                <?php   
                                    try{          
                                    require_once("connectBooks.php");
                                    $sql = "select * from groupon where groupon_No = 26";
                                    $meal = $pdo -> query($sql);
                                    $groupRow = $meal -> fetchObject();
                                ?>
                                <div class="indexGroupon-sumTitle">
                                    <h3>
                                        <a href="6-1_grouponDetail.php?no=<?php echo $groupRow->groupon_No;?>"><?php echo $groupRow->groupon_Name;?></a>
                                    </h3>
                                    <div class="indexGroupon-average">
                                        <p><?php echo $groupRow->groupon_Bonus;?></p>
                                        <p>購物金</p>
                                    </div>
                                </div>
                                <img src="images/index_meal2.png" alt="">
                                <p class="indexGroupon-info"><mark>日食招牌餐點－－丼飯，每一分都是真材實料！</mark></p>
                                <div class="indexGroupon-sum">
                                    <div class="indexGroupon-days">
                                        <span class="indexGroupon-subtitle">飯團天數｜</span>
                                        <span>10天</span>
                                    </div>
                                    <div class="indexGroupon-count">
                                        <span class="indexGroupon-subtitle">參加人數｜</span>
                                        <div class="indexGroupon-countBar">
                                            <p style="width:<?php
                                            $memberNow = $groupRow->memberNow;
                                            $memberNeed = $groupRow->groupon_MemberNeed;
                                            $memberCountBar = (100/$memberNeed)*$memberNow ;
                                            echo $memberCountBar;
                                            ?>px"><?php echo $groupRow->memberNow;?>/<?php echo $groupRow->groupon_MemberNeed;?></p>
                                        </div>
                                    </div>
                                    <div class="indexGroupon-deadline">
                                        <span class="indexGroupon-subtitle">門檻截止｜</span>
                                        <span>11/29前</span>
                                    </div>
                                </div>
                                <div class="indexGroupon-btn">
                                    <a href="6-1_grouponDetail.php?no=<?php echo $groupRow->groupon_No;?>">查看飯團</a>
                                </div>
                                <?php 
                                }catch(PDOException $e){
                                    echo "error ~<br>";
                                    echo $e->getMessage(),"<br>";
                                }
                                ?>
                            </div>
                            <div class="indexGroupon-part indexGroupon-part3 item">
                                <?php   
                                    try{          
                                    require_once("connectBooks.php");
                                    $sql = "select * from groupon where groupon_No = 27";
                                    $meal = $pdo -> query($sql);
                                    $groupRow = $meal -> fetchObject();
                                ?>
                                <div class="indexGroupon-sumTitle">
                                    <h3>
                                        <a href="6-1_grouponDetail.php?no=<?php echo $groupRow->groupon_No;?>"><?php echo $groupRow->groupon_Name;?></a>
                                    </h3>
                                    <div class="indexGroupon-average">
                                        <p><?php echo $groupRow->groupon_Bonus;?></p>
                                        <p>購物金</p>
                                    </div>
                                </div>
                                <img src="images/index_meal3.png" alt="">
                                <p class="indexGroupon-info"><mark>給吃不胖的你滿滿的大份量，開始你的養豬計畫。</mark></p>
                                <div class="indexGroupon-sum">
                                    <div class="indexGroupon-days">
                                        <span class="indexGroupon-subtitle">飯團天數｜</span>
                                        <span>14天</span>
                                    </div>
                                    <div class="indexGroupon-count">
                                        <span class="indexGroupon-subtitle">參加人數｜</span>
                                        <div class="indexGroupon-countBar">
                                            <p style="width:<?php
                                            $memberNow = $groupRow->memberNow;
                                            $memberNeed = $groupRow->groupon_MemberNeed;
                                            $memberCountBar = (100/$memberNeed)*$memberNow ;
                                            echo $memberCountBar;
                                            ?>px"><?php echo $groupRow->memberNow;?>/<?php echo $groupRow->groupon_MemberNeed;?></p>
                                        </div>
                                    </div>
                                    <div class="indexGroupon-deadline">
                                        <span class="indexGroupon-subtitle">門檻截止｜</span>
                                        <span>12/09前</span>
                                    </div>
                                </div>
                                <div class="indexGroupon-btn">
                                    <a href="6-1_grouponDetail.php?no=<?php echo $groupRow->groupon_No;?>">查看飯團</a>
                                </div>
                                <?php 
                                }catch(PDOException $e){
                                    echo "error ~<br>";
                                    echo $e->getMessage(),"<br>";
                                }
                                ?>
                            </div>
                            <div class="indexGroupon-part indexGroupon-part4 item">
                                <?php   
                                    try{          
                                    require_once("connectBooks.php");
                                    $sql = "select * from groupon where groupon_No = 28";
                                    $meal = $pdo -> query($sql);
                                    $groupRow = $meal -> fetchObject();
                                ?>
                                <div class="indexGroupon-sumTitle">
                                    <h3>
                                        <a href="6-1_grouponDetail.php?no=<?php echo $groupRow->groupon_No;?>"><?php echo $groupRow->groupon_Name;?></a>
                                    </h3>
                                    <div class="indexGroupon-average">
                                        <p><?php echo $groupRow->groupon_Bonus;?></p>
                                        <p>購物金</p>
                                    </div>
                                </div>
                                <img src="images/index_meal4.png" alt="">
                                <p class="indexGroupon-info"><mark>素食還能更不一樣，跟著阿宏一起我素我驕傲！</mark></p>
                                <div class="indexGroupon-sum">
                                    <div class="indexGroupon-days">
                                        <span class="indexGroupon-subtitle">飯團天數｜</span>
                                        <span>7天</span>
                                    </div>
                                    <div class="indexGroupon-count">
                                        <span class="indexGroupon-subtitle">參加人數｜</span>
                                        <div class="indexGroupon-countBar">
                                            <p style="width:<?php
                                            $memberNow = $groupRow->memberNow;
                                            $memberNeed = $groupRow->groupon_MemberNeed;
                                            $memberCountBar = (100/$memberNeed)*$memberNow ;
                                            echo $memberCountBar;
                                            ?>px"><?php echo $groupRow->memberNow;?>/<?php echo $groupRow->groupon_MemberNeed;?></p>
                                        </div>
                                    </div>
                                    <div class="indexGroupon-deadline">
                                        <span class="indexGroupon-subtitle">門檻截止｜</span>
                                        <span>11/26前</span>
                                    </div>
                                </div>
                                <div class="indexGroupon-btn">
                                    <a href="6-1_grouponDetail.php?no=<?php echo $groupRow->groupon_No;?>">查看飯團</a>
                                </div>
                                <?php 
                                }catch(PDOException $e){
                                    echo "error ~<br>";
                                    echo $e->getMessage(),"<br>";
                                }
                                ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="indexGroupon indexGroupon-desc">
            <div class="wrap">
                <div class="indexGroupon-wrap">
                    <div class="indexGroupon-title indexTitle">
                        <!-- <h1>推薦官方飯團</h1> -->
                        <img src="images/index_title3.svg" alt="">
                    </div>
                    <div class="indexGroupon-stage">
                        <img src="images/index_grouponBentoCover.svg" alt="">
                        <div class="indexGroupon-box">
                            <div class="indexGroupon-part indexGroupon-part1">
                                <?php   
                                    try{          
                                    require_once("connectBooks.php");
                                    $sql = "select * from groupon where groupon_No = 25";
                                    $meal = $pdo -> query($sql);
                                    $groupRow = $meal -> fetchObject();
                                ?>
                                <div class="indexGroupon-sumTitle">
                                    <h3>
                                        <a href="6-1_grouponDetail.php?no=<?php echo $groupRow->groupon_No;?>"><?php echo $groupRow->groupon_Name;?></a>
                                    </h3>
                                    <div class="indexGroupon-average">
                                        <p><?php echo $groupRow->groupon_Bonus;?></p>
                                        <p>購物金</p>
                                    </div>
                                </div>
                                <img src="images/index_meal1.png" alt="">
                                <p class="indexGroupon-info"><mark>每日不同菜色讓你吃不膩，省錢之餘兼具美味。</mark></p>
                                <div class="indexGroupon-sum">
                                    <div class="indexGroupon-days">
                                        <span class="indexGroupon-subtitle">飯團天數｜</span>
                                        <span>7天</span>
                                    </div>
                                    <div class="indexGroupon-count">
                                        <span class="indexGroupon-subtitle">參加人數｜</span>
                                        <div class="indexGroupon-countBar">
                                            <p style="width:<?php
                                            $memberNow = $groupRow->memberNow;
                                            $memberNeed = $groupRow->groupon_MemberNeed;
                                            $memberCountBar = (100/$memberNeed)*$memberNow ;
                                            echo $memberCountBar;
                                            ?>px"><?php echo $groupRow->memberNow;?>/<?php echo $groupRow->groupon_MemberNeed;?></p>
                                        </div>
                                    </div>
                                    <div class="indexGroupon-deadline">
                                        <span class="indexGroupon-subtitle">門檻截止｜</span>
                                        <span>11/26前</span>
                                    </div>
                                </div>
                                <div class="indexGroupon-btn">
                                    <a href="6-1_grouponDetail.php?no=<?php echo $groupRow->groupon_No;?>">查看飯團</a>
                                </div>
                                <?php 
                                }catch(PDOException $e){
                                    echo "error ~<br>";
                                    echo $e->getMessage(),"<br>";
                                }
                                ?>
                            </div>
                            <div class="indexGroupon-part indexGroupon-part2">
                                <?php   
                                    try{          
                                    require_once("connectBooks.php");
                                    $sql = "select * from groupon where groupon_No = 26";
                                    $meal = $pdo -> query($sql);
                                    $groupRow = $meal -> fetchObject();
                                ?>
                                <div class="indexGroupon-sumTitle">
                                    <h3>
                                        <a href="6-1_grouponDetail.php?no=<?php echo $groupRow->groupon_No;?>"><?php echo $groupRow->groupon_Name;?></a>
                                    </h3>
                                    <div class="indexGroupon-average">
                                        <p><?php echo $groupRow->groupon_Bonus;?></p>
                                        <p>購物金</p>
                                    </div>
                                </div>
                                <img src="images/index_meal2.png" alt="">
                                <p class="indexGroupon-info"><mark>日食招牌餐點－－丼飯，每一分都是真材實料！</mark></p>
                                <div class="indexGroupon-sum">
                                    <div class="indexGroupon-days">
                                        <span class="indexGroupon-subtitle">飯團天數｜</span>
                                        <span>10天</span>
                                    </div>
                                    <div class="indexGroupon-count">
                                        <span class="indexGroupon-subtitle">參加人數｜</span>
                                        <div class="indexGroupon-countBar">
                                            <p style="width:<?php
                                            $memberNow = $groupRow->memberNow;
                                            $memberNeed = $groupRow->groupon_MemberNeed;
                                            $memberCountBar = (100/$memberNeed)*$memberNow ;
                                            echo $memberCountBar;
                                            ?>px"><?php echo $groupRow->memberNow;?>/<?php echo $groupRow->groupon_MemberNeed;?></p>
                                        </div>
                                    </div>
                                    <div class="indexGroupon-deadline">
                                        <span class="indexGroupon-subtitle">門檻截止｜</span>
                                        <span>11/29前</span>
                                    </div>
                                </div>
                                <div class="indexGroupon-btn">
                                    <a href="6-1_grouponDetail.php?no=<?php echo $groupRow->groupon_No;?>">查看飯團</a>
                                </div>
                                <?php 
                                }catch(PDOException $e){
                                    echo "error ~<br>";
                                    echo $e->getMessage(),"<br>";
                                }
                                ?>
                            </div>
                            <div class="indexGroupon-part indexGroupon-part3">
                                <?php   
                                    try{          
                                    require_once("connectBooks.php");
                                    $sql = "select * from groupon where groupon_No = 27";
                                    $meal = $pdo -> query($sql);
                                    $groupRow = $meal -> fetchObject();
                                ?>
                                <div class="indexGroupon-sumTitle">
                                    <h3>
                                        <a href="6-1_grouponDetail.php?no=<?php echo $groupRow->groupon_No;?>"><?php echo $groupRow->groupon_Name;?></a>
                                    </h3>
                                    <div class="indexGroupon-average">
                                        <p><?php echo $groupRow->groupon_Bonus;?></p>
                                        <p>購物金</p>
                                    </div>
                                </div>
                                <img src="images/index_meal3.png" alt="">
                                <p class="indexGroupon-info"><mark>給吃不胖的你滿滿的大份量，開始你的養豬計畫。</mark></p>
                                <div class="indexGroupon-sum">
                                    <div class="indexGroupon-days">
                                        <span class="indexGroupon-subtitle">飯團天數｜</span>
                                        <span>14天</span>
                                    </div>
                                    <div class="indexGroupon-count">
                                        <span class="indexGroupon-subtitle">參加人數｜</span>
                                        <div class="indexGroupon-countBar">
                                            <p style="width:<?php
                                            $memberNow = $groupRow->memberNow;
                                            $memberNeed = $groupRow->groupon_MemberNeed;
                                            $memberCountBar = (100/$memberNeed)*$memberNow ;
                                            echo $memberCountBar;
                                            ?>px"><?php echo $groupRow->memberNow;?>/<?php echo $groupRow->groupon_MemberNeed;?></p>
                                        </div>
                                    </div>
                                    <div class="indexGroupon-deadline">
                                        <span class="indexGroupon-subtitle">門檻截止｜</span>
                                        <span>12/09前</span>
                                    </div>
                                </div>
                                <div class="indexGroupon-btn">
                                    <a href="6-1_grouponDetail.php?no=<?php echo $groupRow->groupon_No;?>">查看飯團</a>
                                </div>
                                <?php 
                                }catch(PDOException $e){
                                    echo "error ~<br>";
                                    echo $e->getMessage(),"<br>";
                                }
                                ?>
                            </div>
                            <div class="indexGroupon-part indexGroupon-part4">
                                <?php   
                                    try{          
                                    require_once("connectBooks.php");
                                    $sql = "select * from groupon where groupon_No = 28";
                                    $meal = $pdo -> query($sql);
                                    $groupRow = $meal -> fetchObject();
                                ?>
                                <div class="indexGroupon-sumTitle">
                                    <h3>
                                        <a href="6-1_grouponDetail.php?no=<?php echo $groupRow->groupon_No;?>"><?php echo $groupRow->groupon_Name;?></a>
                                    </h3>
                                    <div class="indexGroupon-average">
                                        <p><?php echo $groupRow->groupon_Bonus;?></p>
                                        <p>購物金</p>
                                    </div>
                                </div>
                                <img src="images/index_meal4.png" alt="">
                                <p class="indexGroupon-info"><mark>素食還能更不一樣，跟著阿宏一起我素我驕傲！</mark></p>
                                <div class="indexGroupon-sum">
                                    <div class="indexGroupon-days">
                                        <span class="indexGroupon-subtitle">飯團天數｜</span>
                                        <span>7天</span>
                                    </div>
                                    <div class="indexGroupon-count">
                                        <span class="indexGroupon-subtitle">參加人數｜</span>
                                        <div class="indexGroupon-countBar">
                                            <p style="width:<?php
                                            $memberNow = $groupRow->memberNow;
                                            $memberNeed = $groupRow->groupon_MemberNeed;
                                            $memberCountBar = (100/$memberNeed)*$memberNow ;
                                            echo $memberCountBar;
                                            ?>px"><?php echo $groupRow->memberNow;?>/<?php echo $groupRow->groupon_MemberNeed;?></p>
                                        </div>
                                    </div>
                                    <div class="indexGroupon-deadline">
                                        <span class="indexGroupon-subtitle">門檻截止｜</span>
                                        <span>11/26前</span>
                                    </div>
                                </div>
                                <div class="indexGroupon-btn">
                                    <a href="6-1_grouponDetail.php?no=<?php echo $groupRow->groupon_No;?>">查看飯團</a>
                                </div>
                                <?php 
                                }catch(PDOException $e){
                                    echo "error ~<br>";
                                    echo $e->getMessage(),"<br>";
                                }
                                ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- 第四屏 好評餐點-->
        <section class="indexMeal-mobile">
            <div class="wrap">
                <div class="indexMeal-wrap">
                    <div class="indexMeal-title indexTitle">
                        <!-- <h1>好評餐點</h1> -->
                        <img src="images/index_title4.svg" alt="">
                    </div>
                    <div class="indexMeal-slider swiper-container">
                        <div class="swiper-scrollbar"></div>
                        <div class="indexMeal-box swiper-wrapper">
                            <div class="indexMeal-part top1 swiper-slide">
                                <?php   
                                    try{          
                                    require_once("connectBooks.php");
                                    $sql = "select * from meal where meal_Pic = 'don_02.png'";
                                    $meal = $pdo -> query($sql);
                                    $topRow = $meal -> fetchObject();
                                ?>
                                <div class="indexMeal-top">
                                    <img class="indexMeal-topCk indexMeal-top1Ck" src="images/index_top01.svg" alt="">
                                    <img class="indexMeal-meal" src="images/meals/<?php echo $topRow->meal_Pic;?>" alt="">
                                    <img class="indexMeal-topW" src="images/index_topWings01.svg" alt="">
                                </div>
                                <div class="indexMeal-topSum indexMeal-top1Sum">
                                    <h3><a href="eatDetail.php?meal_No=<?php echo $topRow->meal_No;?>"><?php echo $topRow->meal_Name;?></a>
                                        <h4><?php echo $topRow->meal_Price;?></h4>
                                    </h3>
                                        <div class="score-container">
                                            <span class="scoreNum" style="display:none;"><?php echo $topRow->meal_Total;?></span>
                                            <div class="scoreEgg-container">
                                                <ul>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="score">
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="score">
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="score">
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="score">
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="scoreW">
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    <div class="indexMeal-btn">
                                        <a href="eatDetail.php?meal_No=<?php echo $topRow->meal_No;?>">查看餐點</a>
                                        <button>
                                            <p class="heart_icon">
                                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                    viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
                                                    <g>
                                                        <path class="st0" d="M83.2,16.3c-3.3-3-7.6-4.5-12.1-4.5c-5.2,0-10.2,2.2-13.7,5.9c-1.7,1.8-3,3.9-4.3,6.6c-0.5,1.3-1.8,2.1-3.1,2.1
                                                        c-1.3-0.1-2.6-0.7-3.2-2l-0.6-1.2C42.6,16,36.2,11.8,29,11.8c-1.2,0-2.3,0.2-3.5,0.4c-6.1,1.1-10.9,4.7-14.3,10.5
                                                        c-5,8.6-5.5,16.1-1.4,23.6c2.6,4.7,6,9.4,10.3,14.2c8.1,9,17.6,17.6,29.9,26.9c11.3-8.6,20.1-16.3,27.8-24.5
                                                        C82,58.3,86.9,52.7,90.3,46c1.3-2.6,2.6-5.7,2.4-9C92.5,28.4,89.4,21.7,83.2,16.3z"/>
                                                        <path class="st0" d="M87.9,10.6c-4.6-4-10.5-6.2-16.6-6.2c-7.1,0-13.9,2.9-18.8,8.1c-0.9,0.9-1.7,1.9-2.5,3C44,7.2,34.1,2.9,24.2,4.9
                                                        c-8.1,1.5-14.5,6.2-19,13.9C-1.1,29.6-1.6,40.2,3.7,50c2.8,5.3,6.5,10.4,11.3,15.7c8.7,9.7,19,18.9,32.4,28.9c0.9,0.6,1.8,1,2.7,1
                                                        c1.5,0,2.5-0.8,3-1.2C65,85.3,74.5,77,82.8,68.1c4.6-4.9,9.9-11,13.7-18.6c1.6-3.3,3.5-7.7,3.4-12.6C99.7,26.2,95.7,17.3,87.9,10.6z
                                                        M90.3,46c-3.4,6.7-8.3,12.3-12.5,16.9C70.1,71.1,61.3,78.8,50,87.4c-12.3-9.3-21.8-17.9-29.9-26.9c-4.3-4.8-7.7-9.5-10.3-14.2
                                                        c-4.1-7.5-3.6-15,1.4-23.6c3.4-5.8,8.2-9.4,14.3-10.5c1.2-0.2,2.3-0.4,3.5-0.4c7.2,0,13.6,4.2,17.2,11.4l0.6,1.2
                                                        c0.6,1.3,1.9,1.9,3.2,2c1.3,0,2.6-0.8,3.1-2.1c1.3-2.7,2.6-4.8,4.3-6.6c3.5-3.7,8.5-5.9,13.7-5.9c4.5,0,8.8,1.5,12.1,4.5
                                                        c6.2,5.4,9.3,12.1,9.5,20.7C92.9,40.3,91.6,43.4,90.3,46z"/>
                                                    </g>
                                                </svg>
                                                <span>收藏</span>
                                            </p>    
                                        </button>
                                    </div>
                                </div>
                                 <?php  
                                    }catch(PDOException $e){
                                        echo "error ~<br>";
                                        echo $e->getMessage(),"<br>";
                                    }
                                ?>
                            </div>
                            <div class="indexMeal-part top2 swiper-slide">
                                <?php   
                                    try{          
                                    require_once("connectBooks.php");
                                    $sql = "select * from meal where meal_No = 67";
                                    $meal = $pdo -> query($sql);
                                    $topRow = $meal -> fetchObject();
                                    // print_r($topRow);
                                    // exit();
                                ?>
                                <div class="indexMeal-top">
                                    <img class="indexMeal-topCk indexMeal-top2Ck" src="images/index_top02.svg" alt="">
                                    <img class="indexMeal-meal" src="images/meals/<?php echo $topRow->meal_Pic;?>" alt="">
                                    <img class="indexMeal-topW" src="images/index_topWings02.svg" alt="">
                                </div>
                                <div class="indexMeal-topSum">
                                    <h3><a href="eatDetail.php?meal_No=<?php echo $topRow->meal_No;?>"><?php echo $topRow->meal_Name;?></a>
                                        <h4><?php echo $topRow->meal_Price;?></h4>
                                    </h3>
                                        <div class="score-container">
                                            <span class="scoreNum" style="display:none;"><?php echo $topRow->meal_Total;?></span>
                                            <div class="scoreEgg-container">
                                                <ul>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="score">
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="score">
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="score">
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="score">
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="scoreW">
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    <div class="indexMeal-btn">
                                        <a href="eatDetail.php?meal_No=<?php echo $topRow->meal_No;?>">查看餐點</a>
                                        <button>
                                            <p class="heart_icon">
                                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                    viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
                                                    <g>
                                                        <path class="st0" d="M83.2,16.3c-3.3-3-7.6-4.5-12.1-4.5c-5.2,0-10.2,2.2-13.7,5.9c-1.7,1.8-3,3.9-4.3,6.6c-0.5,1.3-1.8,2.1-3.1,2.1
                                                        c-1.3-0.1-2.6-0.7-3.2-2l-0.6-1.2C42.6,16,36.2,11.8,29,11.8c-1.2,0-2.3,0.2-3.5,0.4c-6.1,1.1-10.9,4.7-14.3,10.5
                                                        c-5,8.6-5.5,16.1-1.4,23.6c2.6,4.7,6,9.4,10.3,14.2c8.1,9,17.6,17.6,29.9,26.9c11.3-8.6,20.1-16.3,27.8-24.5
                                                        C82,58.3,86.9,52.7,90.3,46c1.3-2.6,2.6-5.7,2.4-9C92.5,28.4,89.4,21.7,83.2,16.3z"/>
                                                        <path class="st0" d="M87.9,10.6c-4.6-4-10.5-6.2-16.6-6.2c-7.1,0-13.9,2.9-18.8,8.1c-0.9,0.9-1.7,1.9-2.5,3C44,7.2,34.1,2.9,24.2,4.9
                                                        c-8.1,1.5-14.5,6.2-19,13.9C-1.1,29.6-1.6,40.2,3.7,50c2.8,5.3,6.5,10.4,11.3,15.7c8.7,9.7,19,18.9,32.4,28.9c0.9,0.6,1.8,1,2.7,1
                                                        c1.5,0,2.5-0.8,3-1.2C65,85.3,74.5,77,82.8,68.1c4.6-4.9,9.9-11,13.7-18.6c1.6-3.3,3.5-7.7,3.4-12.6C99.7,26.2,95.7,17.3,87.9,10.6z
                                                        M90.3,46c-3.4,6.7-8.3,12.3-12.5,16.9C70.1,71.1,61.3,78.8,50,87.4c-12.3-9.3-21.8-17.9-29.9-26.9c-4.3-4.8-7.7-9.5-10.3-14.2
                                                        c-4.1-7.5-3.6-15,1.4-23.6c3.4-5.8,8.2-9.4,14.3-10.5c1.2-0.2,2.3-0.4,3.5-0.4c7.2,0,13.6,4.2,17.2,11.4l0.6,1.2
                                                        c0.6,1.3,1.9,1.9,3.2,2c1.3,0,2.6-0.8,3.1-2.1c1.3-2.7,2.6-4.8,4.3-6.6c3.5-3.7,8.5-5.9,13.7-5.9c4.5,0,8.8,1.5,12.1,4.5
                                                        c6.2,5.4,9.3,12.1,9.5,20.7C92.9,40.3,91.6,43.4,90.3,46z"/>
                                                    </g>
                                                </svg>
                                                <span>收藏</span>
                                            </p>    
                                        </button>
                                    </div>
                                </div>
                                 <?php  
                                    }catch(PDOException $e){
                                        echo "error ~<br>";
                                        echo $e->getMessage(),"<br>";
                                    }
                                ?>
                            </div>
                            <div class="indexMeal-part top3 swiper-slide">
                                <?php   
                                    try{          
                                    require_once("connectBooks.php");
                                    $sql = "select * from meal where meal_Pic = 'ben_04.png'";
                                    $meal = $pdo -> query($sql);
                                    $topRow = $meal -> fetchObject();
                                ?>
                                <div class="indexMeal-top">
                                    <img class="indexMeal-topCk indexMeal-top3Ck" src="images/index_top03.svg" alt="">
                                    <img class="indexMeal-meal" src="images/meals/<?php echo $topRow->meal_Pic;?>" alt="">
                                    <img class="indexMeal-topW" src="images/index_topWings03.svg" alt="">
                                </div>
                                <div class="indexMeal-topSum">
                                    <h3><a href="eatDetail.php?meal_No=<?php echo $topRow->meal_No;?>"><?php echo $topRow->meal_Name;?></a>
                                        <h4><?php echo $topRow->meal_Price;?></h4>
                                    </h3>
                                        <div class="score-container">
                                            <span class="scoreNum" style="display:none;"><?php echo $topRow->meal_Total;?></span>
                                            <div class="scoreEgg-container">
                                                <ul>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="score">
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="score">
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="score">
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="score">
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="scoreW">
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    <div class="indexMeal-btn">
                                        <a href="eatDetail.php?meal_No=<?php echo $topRow->meal_No;?>">查看餐點</a>
                                        <button>
                                            <p class="heart_icon">
                                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                    viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
                                                    <g>
                                                        <path class="st0" d="M83.2,16.3c-3.3-3-7.6-4.5-12.1-4.5c-5.2,0-10.2,2.2-13.7,5.9c-1.7,1.8-3,3.9-4.3,6.6c-0.5,1.3-1.8,2.1-3.1,2.1
                                                        c-1.3-0.1-2.6-0.7-3.2-2l-0.6-1.2C42.6,16,36.2,11.8,29,11.8c-1.2,0-2.3,0.2-3.5,0.4c-6.1,1.1-10.9,4.7-14.3,10.5
                                                        c-5,8.6-5.5,16.1-1.4,23.6c2.6,4.7,6,9.4,10.3,14.2c8.1,9,17.6,17.6,29.9,26.9c11.3-8.6,20.1-16.3,27.8-24.5
                                                        C82,58.3,86.9,52.7,90.3,46c1.3-2.6,2.6-5.7,2.4-9C92.5,28.4,89.4,21.7,83.2,16.3z"/>
                                                        <path class="st0" d="M87.9,10.6c-4.6-4-10.5-6.2-16.6-6.2c-7.1,0-13.9,2.9-18.8,8.1c-0.9,0.9-1.7,1.9-2.5,3C44,7.2,34.1,2.9,24.2,4.9
                                                        c-8.1,1.5-14.5,6.2-19,13.9C-1.1,29.6-1.6,40.2,3.7,50c2.8,5.3,6.5,10.4,11.3,15.7c8.7,9.7,19,18.9,32.4,28.9c0.9,0.6,1.8,1,2.7,1
                                                        c1.5,0,2.5-0.8,3-1.2C65,85.3,74.5,77,82.8,68.1c4.6-4.9,9.9-11,13.7-18.6c1.6-3.3,3.5-7.7,3.4-12.6C99.7,26.2,95.7,17.3,87.9,10.6z
                                                        M90.3,46c-3.4,6.7-8.3,12.3-12.5,16.9C70.1,71.1,61.3,78.8,50,87.4c-12.3-9.3-21.8-17.9-29.9-26.9c-4.3-4.8-7.7-9.5-10.3-14.2
                                                        c-4.1-7.5-3.6-15,1.4-23.6c3.4-5.8,8.2-9.4,14.3-10.5c1.2-0.2,2.3-0.4,3.5-0.4c7.2,0,13.6,4.2,17.2,11.4l0.6,1.2
                                                        c0.6,1.3,1.9,1.9,3.2,2c1.3,0,2.6-0.8,3.1-2.1c1.3-2.7,2.6-4.8,4.3-6.6c3.5-3.7,8.5-5.9,13.7-5.9c4.5,0,8.8,1.5,12.1,4.5
                                                        c6.2,5.4,9.3,12.1,9.5,20.7C92.9,40.3,91.6,43.4,90.3,46z"/>
                                                    </g>
                                                </svg>
                                                <span>收藏</span>
                                            </p>    
                                        </button>
                                    </div>
                                </div>
                                 <?php  
                                    }catch(PDOException $e){
                                        echo "error ~<br>";
                                        echo $e->getMessage(),"<br>";
                                    }
                                ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="indexMeal-desc">
            <canvas id="indexMeal-canvas"></canvas>
            <div class="wrap">
                <div class="indexMeal-wrap">
                    <div class="indexMeal-title indexTitle">
                        <!-- <h1>好評餐點</h1> -->
                        <img src="images/index_title4.svg" alt="">
                    </div>
                    <div class="mount"></div>
                    <div class="indexMeal-confetti trigger">
                        <div class="indexMeal-confetti-after"></div>
                        <div class="indexMeal-confetti-rope">
                            <img src="images/index_celebrationRope.svg" alt="">
                        </div>
                        <div class="indexMeal-confetti-left">
                            <img src="images/index_celebrationL.svg" alt="">
                        </div>
                        <div class="indexMeal-confetti-right">
                            <img src="images/index_celebrationR.svg" alt="">
                        </div>
                    </div>
                    <div class="indexMeal-slider swiper-container">
                        <div class="swiper-scrollbar"></div>
                        <div class="indexMeal-box">
                            <div class="indexMeal-part top1">
                                <?php   
                                    try{          
                                    require_once("connectBooks.php");
                                    $sql = "select * from meal where meal_Pic = 'don_02.png'";
                                    $meal = $pdo -> query($sql);
                                    $topRow = $meal -> fetchObject();
                                ?>
                                <div class="indexMeal-top">
                                    <img class="indexMeal-topCk indexMeal-top1Ck" src="images/index_top01.svg" alt="">
                                    <img class="indexMeal-meal" src="images/meals/<?php echo $topRow->meal_Pic;?>" alt="">
                                    <img class="indexMeal-topW" src="images/index_topWings01.svg" alt="">
                                </div>
                                <div class="indexMeal-topSum indexMeal-top1Sum">
                                    <h3><a href="eatDetail.php?meal_No=<?php echo $topRow->meal_No;?>"><?php echo $topRow->meal_Name;?></a>
                                        <h4><?php echo $topRow->meal_Price;?></h4>
                                    </h3>
                                        <div class="score-container">
                                            <span class="scoreNum" style="display:none;"><?php echo $topRow->meal_Total;?></span>
                                            <div class="scoreEgg-container">
                                                <ul>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="score">
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="score">
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="score">
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="score">
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="scoreW">
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    <div class="indexMeal-btn">
                                        <a href="eatDetail.php?meal_No=<?php echo $topRow->meal_No;?>">查看餐點</a>
                                        <button>
                                            <p class="heart_icon">
                                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                    viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
                                                    <g>
                                                        <path class="st0" d="M83.2,16.3c-3.3-3-7.6-4.5-12.1-4.5c-5.2,0-10.2,2.2-13.7,5.9c-1.7,1.8-3,3.9-4.3,6.6c-0.5,1.3-1.8,2.1-3.1,2.1
                                                        c-1.3-0.1-2.6-0.7-3.2-2l-0.6-1.2C42.6,16,36.2,11.8,29,11.8c-1.2,0-2.3,0.2-3.5,0.4c-6.1,1.1-10.9,4.7-14.3,10.5
                                                        c-5,8.6-5.5,16.1-1.4,23.6c2.6,4.7,6,9.4,10.3,14.2c8.1,9,17.6,17.6,29.9,26.9c11.3-8.6,20.1-16.3,27.8-24.5
                                                        C82,58.3,86.9,52.7,90.3,46c1.3-2.6,2.6-5.7,2.4-9C92.5,28.4,89.4,21.7,83.2,16.3z"/>
                                                        <path class="st0" d="M87.9,10.6c-4.6-4-10.5-6.2-16.6-6.2c-7.1,0-13.9,2.9-18.8,8.1c-0.9,0.9-1.7,1.9-2.5,3C44,7.2,34.1,2.9,24.2,4.9
                                                        c-8.1,1.5-14.5,6.2-19,13.9C-1.1,29.6-1.6,40.2,3.7,50c2.8,5.3,6.5,10.4,11.3,15.7c8.7,9.7,19,18.9,32.4,28.9c0.9,0.6,1.8,1,2.7,1
                                                        c1.5,0,2.5-0.8,3-1.2C65,85.3,74.5,77,82.8,68.1c4.6-4.9,9.9-11,13.7-18.6c1.6-3.3,3.5-7.7,3.4-12.6C99.7,26.2,95.7,17.3,87.9,10.6z
                                                        M90.3,46c-3.4,6.7-8.3,12.3-12.5,16.9C70.1,71.1,61.3,78.8,50,87.4c-12.3-9.3-21.8-17.9-29.9-26.9c-4.3-4.8-7.7-9.5-10.3-14.2
                                                        c-4.1-7.5-3.6-15,1.4-23.6c3.4-5.8,8.2-9.4,14.3-10.5c1.2-0.2,2.3-0.4,3.5-0.4c7.2,0,13.6,4.2,17.2,11.4l0.6,1.2
                                                        c0.6,1.3,1.9,1.9,3.2,2c1.3,0,2.6-0.8,3.1-2.1c1.3-2.7,2.6-4.8,4.3-6.6c3.5-3.7,8.5-5.9,13.7-5.9c4.5,0,8.8,1.5,12.1,4.5
                                                        c6.2,5.4,9.3,12.1,9.5,20.7C92.9,40.3,91.6,43.4,90.3,46z"/>
                                                    </g>
                                                </svg>
                                                <span>收藏</span>
                                            </p>    
                                        </button>
                                    </div>
                                </div>
                                 <?php  
                                    }catch(PDOException $e){
                                        echo "error ~<br>";
                                        echo $e->getMessage(),"<br>";
                                    }
                                ?>
                            </div>
                            <div class="indexMeal-part top2">
                                <?php   
                                    try{          
                                    require_once("connectBooks.php");
                                    $sql = "select * from meal where meal_No = 67";
                                    $meal = $pdo -> query($sql);
                                    $topRow = $meal -> fetchObject();
                                ?>
                                <div class="indexMeal-top">
                                    <img class="indexMeal-topCk indexMeal-top2Ck" src="images/index_top02.svg" alt="">
                                    <img class="indexMeal-meal" src="images/meals/<?php echo $topRow->meal_Pic;?>" alt="">
                                    <img class="indexMeal-topW" src="images/index_topWings02.svg" alt="">
                                </div>
                                <div class="indexMeal-topSum">
                                    <h3><a href="eatDetail.php?meal_No=<?php echo $topRow->meal_No;?>"><?php echo $topRow->meal_Name;?></a>
                                        <h4><?php echo $topRow->meal_Price;?></h4>
                                    </h3>
                                        <div class="score-container">
                                            <span class="scoreNum" style="display:none;"><?php echo $topRow->meal_Total;?></span>
                                            <div class="scoreEgg-container">
                                                <ul>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="score">
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="score">
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="score">
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="score">
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="scoreW">
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    <div class="indexMeal-btn">
                                        <a href="eatDetail.php?meal_No=<?php echo $topRow->meal_No;?>">查看餐點</a>
                                        <button>
                                            <p class="heart_icon">
                                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                    viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
                                                    <g>
                                                        <path class="st0" d="M83.2,16.3c-3.3-3-7.6-4.5-12.1-4.5c-5.2,0-10.2,2.2-13.7,5.9c-1.7,1.8-3,3.9-4.3,6.6c-0.5,1.3-1.8,2.1-3.1,2.1
                                                        c-1.3-0.1-2.6-0.7-3.2-2l-0.6-1.2C42.6,16,36.2,11.8,29,11.8c-1.2,0-2.3,0.2-3.5,0.4c-6.1,1.1-10.9,4.7-14.3,10.5
                                                        c-5,8.6-5.5,16.1-1.4,23.6c2.6,4.7,6,9.4,10.3,14.2c8.1,9,17.6,17.6,29.9,26.9c11.3-8.6,20.1-16.3,27.8-24.5
                                                        C82,58.3,86.9,52.7,90.3,46c1.3-2.6,2.6-5.7,2.4-9C92.5,28.4,89.4,21.7,83.2,16.3z"/>
                                                        <path class="st0" d="M87.9,10.6c-4.6-4-10.5-6.2-16.6-6.2c-7.1,0-13.9,2.9-18.8,8.1c-0.9,0.9-1.7,1.9-2.5,3C44,7.2,34.1,2.9,24.2,4.9
                                                        c-8.1,1.5-14.5,6.2-19,13.9C-1.1,29.6-1.6,40.2,3.7,50c2.8,5.3,6.5,10.4,11.3,15.7c8.7,9.7,19,18.9,32.4,28.9c0.9,0.6,1.8,1,2.7,1
                                                        c1.5,0,2.5-0.8,3-1.2C65,85.3,74.5,77,82.8,68.1c4.6-4.9,9.9-11,13.7-18.6c1.6-3.3,3.5-7.7,3.4-12.6C99.7,26.2,95.7,17.3,87.9,10.6z
                                                        M90.3,46c-3.4,6.7-8.3,12.3-12.5,16.9C70.1,71.1,61.3,78.8,50,87.4c-12.3-9.3-21.8-17.9-29.9-26.9c-4.3-4.8-7.7-9.5-10.3-14.2
                                                        c-4.1-7.5-3.6-15,1.4-23.6c3.4-5.8,8.2-9.4,14.3-10.5c1.2-0.2,2.3-0.4,3.5-0.4c7.2,0,13.6,4.2,17.2,11.4l0.6,1.2
                                                        c0.6,1.3,1.9,1.9,3.2,2c1.3,0,2.6-0.8,3.1-2.1c1.3-2.7,2.6-4.8,4.3-6.6c3.5-3.7,8.5-5.9,13.7-5.9c4.5,0,8.8,1.5,12.1,4.5
                                                        c6.2,5.4,9.3,12.1,9.5,20.7C92.9,40.3,91.6,43.4,90.3,46z"/>
                                                    </g>
                                                </svg>
                                                <span>收藏</span>
                                            </p>    
                                        </button>
                                    </div>
                                </div>
                                 <?php  
                                    }catch(PDOException $e){
                                        echo "error ~<br>";
                                        echo $e->getMessage(),"<br>";
                                    }
                                ?>
                            </div>
                            <div class="indexMeal-part top3">
                                <?php   
                                    try{          
                                    require_once("connectBooks.php");
                                    $sql = "select * from meal where meal_Pic = 'ben_04.png'";
                                    $meal = $pdo -> query($sql);
                                    $topRow = $meal -> fetchObject();
                                ?>
                                <div class="indexMeal-top">
                                    <img class="indexMeal-topCk indexMeal-top3Ck" src="images/index_top03.svg" alt="">
                                    <img class="indexMeal-meal" src="images/meals/<?php echo $topRow->meal_Pic;?>" alt="">
                                    <img class="indexMeal-topW" src="images/index_topWings03.svg" alt="">
                                </div>
                                <div class="indexMeal-topSum">
                                    <h3><a href="eatDetail.php?meal_No=<?php echo $topRow->meal_No;?>"><?php echo $topRow->meal_Name;?></a>
                                        <h4><?php echo $topRow->meal_Price;?></h4>
                                    </h3>
                                        <div class="score-container">
                                            <span class="scoreNum" style="display:none;"><?php echo $topRow->meal_Total;?></span>
                                            <div class="scoreEgg-container">
                                                <ul>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="score">
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="score">
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="score">
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="score">
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="pic">
                                                            <img src="images/scoreEgg_w.svg" alt="scoreYes" class="scoreW">
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    <div class="indexMeal-btn">
                                        <a href="eatDetail.php?meal_No=<?php echo $topRow->meal_No;?>">查看餐點</a>
                                        <button>
                                            <p class="heart_icon">
                                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                    viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
                                                    <g>
                                                        <path class="st0" d="M83.2,16.3c-3.3-3-7.6-4.5-12.1-4.5c-5.2,0-10.2,2.2-13.7,5.9c-1.7,1.8-3,3.9-4.3,6.6c-0.5,1.3-1.8,2.1-3.1,2.1
                                                        c-1.3-0.1-2.6-0.7-3.2-2l-0.6-1.2C42.6,16,36.2,11.8,29,11.8c-1.2,0-2.3,0.2-3.5,0.4c-6.1,1.1-10.9,4.7-14.3,10.5
                                                        c-5,8.6-5.5,16.1-1.4,23.6c2.6,4.7,6,9.4,10.3,14.2c8.1,9,17.6,17.6,29.9,26.9c11.3-8.6,20.1-16.3,27.8-24.5
                                                        C82,58.3,86.9,52.7,90.3,46c1.3-2.6,2.6-5.7,2.4-9C92.5,28.4,89.4,21.7,83.2,16.3z"/>
                                                        <path class="st0" d="M87.9,10.6c-4.6-4-10.5-6.2-16.6-6.2c-7.1,0-13.9,2.9-18.8,8.1c-0.9,0.9-1.7,1.9-2.5,3C44,7.2,34.1,2.9,24.2,4.9
                                                        c-8.1,1.5-14.5,6.2-19,13.9C-1.1,29.6-1.6,40.2,3.7,50c2.8,5.3,6.5,10.4,11.3,15.7c8.7,9.7,19,18.9,32.4,28.9c0.9,0.6,1.8,1,2.7,1
                                                        c1.5,0,2.5-0.8,3-1.2C65,85.3,74.5,77,82.8,68.1c4.6-4.9,9.9-11,13.7-18.6c1.6-3.3,3.5-7.7,3.4-12.6C99.7,26.2,95.7,17.3,87.9,10.6z
                                                        M90.3,46c-3.4,6.7-8.3,12.3-12.5,16.9C70.1,71.1,61.3,78.8,50,87.4c-12.3-9.3-21.8-17.9-29.9-26.9c-4.3-4.8-7.7-9.5-10.3-14.2
                                                        c-4.1-7.5-3.6-15,1.4-23.6c3.4-5.8,8.2-9.4,14.3-10.5c1.2-0.2,2.3-0.4,3.5-0.4c7.2,0,13.6,4.2,17.2,11.4l0.6,1.2
                                                        c0.6,1.3,1.9,1.9,3.2,2c1.3,0,2.6-0.8,3.1-2.1c1.3-2.7,2.6-4.8,4.3-6.6c3.5-3.7,8.5-5.9,13.7-5.9c4.5,0,8.8,1.5,12.1,4.5
                                                        c6.2,5.4,9.3,12.1,9.5,20.7C92.9,40.3,91.6,43.4,90.3,46z"/>
                                                    </g>
                                                </svg>
                                                <span>收藏</span>
                                            </p>    
                                        </button>
                                    </div>
                                </div>
                                 <?php  
                                    }catch(PDOException $e){
                                        echo "error ~<br>";
                                        echo $e->getMessage(),"<br>";
                                    }
                                ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 第五屏 現在加入日食-->
        <section class="indexLogin">
            <div class="indexLogin-BG">
            </div>
            <div class="wrap">
                <div class="indexLogin-wrap">
                    <div class="indexLogin-title indexTitle">
                        <!-- <h1>現在加入日食</h1> -->
                        <img src="images/index_title5.svg" alt="">
                    </div>
                    <div class="indexLogin-sum">
                        <div class="indexLogin-main">
                            <div class="indexLogin-info">
                                <div class="indexLogin-balloon">
                                    <p>註冊帳號，獲得你的第一張刮刮樂！<mark>刮開「荷包蛋」，查看日食購物金使用規則。</mark></p>
                                </div>
                                <img src="images/index_login.svg" alt="">
                            </div>
                            <div class="indexLogin-pan">
                                <div class="indexLogin-handle"></div>
                                <div class="indexLogin-outer"></div>
                                <div class="indexLogin-inner"></div>
                            </div>
                            <div class="indexLogin-scratch" id="indexLoginScratch">
                                <canvas class="indexLogin-canvas " id="indexLoginCanvas" width="300" height="300"></canvas>
                                <div class="indexLogin-scratch-wrap"></div>
                            </div>
                        </div>
                    </div>
                    <div class="indexLogin-btn">
                        <button>立即註冊</button>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <a href="game.php" target="_blank" id="capsuleMachine"> 
    <!-- //轉蛋機 -->
        <img src="images/indexCapsule.png" alt="capsuleMachine">
        <div class="textBox">
            想不到吃什麼? <br> 點我看看~
        </div>
    </a>


<script>
window.onbeforeunload = function(){
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
 }
</script>

    <!-- JS -->
    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/jquery-ui.min.js"></script>
    <script src="js/jquery.mousewheel.min.js"></script>
    <script src="js/owl.carousel.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.0/js/swiper.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.0/js/swiper.esm.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.0/js/swiper.esm.bundle.js"></script>
    <script src='https://cdn.jsdelivr.net/mojs/0.265.6/mo.min.js'></script>

    <script src="js/iconCliCK.js"></script>
    <script src="js/indexJoin.js"></script>
    <script src="js/indexBtn.js"></script>
    <script src="js/indexSlider.js"></script>
    <script src="js/indexCube.js"></script>
    <script src="js/indexCelebration.js"></script>
    <script src="js/indexConfetti.js"></script>
    <script src="js/indexLift.js"></script>
    <script src="js/indexScratch.js"></script>
    <script src="js/indexRun.js"></script>


    <!-- 搜尋 -->
    <script>
    function $id(id) {
    return document.getElementById(id);
    }
    function $class(className) {
    return document.getElementsByClassName(className);
    }
    function $all(all) {
    return document.querySelectorAll(all);
    }

    var indexSelect = document.getElementById('indexSearch-select');
    var indexHiddenF = document.getElementById('index-searchInput-hidden-filter');
    var indexHiddenP = document.getElementById('index-searchInput-hidden-p');
    var index = sessionStorage;
    //依選項改變placeholder & action;

    // var kw = $id('index-searchInput').value;
    $id('indexSearch-searchBar').action='dishes.php';
    $id('index-searchInput').name="search";

    indexSelect.addEventListener('change',function () {
        for (let  i= 0; i < indexSelect.options.length; i++) {
            if(indexSelect.options[i].selected==true){
                $id('index-searchInput').placeholder="以"+indexSelect.options[i].innerText+"關鍵字搜尋";

                if(indexSelect.options[i].value=='Groupon'){
                    $id('indexSearch-searchBar').action='4-1_grouponList.php';
                    indexHiddenF.name="order";
                    indexHiddenF.value="latest";
                    indexHiddenP.name="p";
                    indexHiddenP.value="1";
                    $id('index-searchInput').name="search";
                    if(index['index_search']!=null){
                        index.removeItem('index_search');
                    }
                }else if(indexSelect.options[i].value == 'meal'){
                    console.log('///');
                    var kw = $id('index-searchInput').value;
                    $id('indexSearch-searchBar').action='dishes.php';
                    indexHiddenF.name="";
                    indexHiddenF.value= '';
                    indexHiddenP.name="";
                    indexHiddenP.value="";
                    $id('index-searchInput').name="search";
                    // if(index['index_search']==null){
                    //     index['index_search'] = '';	//storage.setItem('addItemList','');
                    // }
                }
            }
        }
    });

    $id("index-searchInput").addEventListener("keyup",function(e){
        if(indexSelect.options[0].selected==true){
            index['index_search'] = $id("index-searchInput").value;
            console.log( $id("index-searchInput").value );
            // console.log( index['index_search']  );
        }
        if(e.keyCode == 13){
            $id('indexSearch-searchBar').submit();
        }    
    });
    $class('indexLogin-btn')[0].onclick = function () {
        xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.status == 200) {
                if (xhr.responseText.indexOf("not found") != -1) {
                    $id('close-login').checked=false;   //打開登入註冊跳窗
                    $id("to-sigup").checked=true;
                } else {
                    swal({
                        title: "歡迎!",
                        text: "快來看看",
                        content: {
                            element: "a",
                            attributes: {
                            href: "4-1_grouponList.php?search=&order=latest&p=1",
                            text: "目前最 HOT!HOT!飯團"
                            }
                        }
                    });

                }
            } else {
                alert("3:"+xhr.status);
                return "s";
            };
        }
        xhr.open("post", "checkSeeion.php", true); //設定好所要連結的程式
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded"); 
        xhr.send(null); //送出資料
    }



    </script>

    <!-- 評分蛋 -->
    <script>
        function $all(all) {
            return document.querySelectorAll(all);
        };
        const eggScore = {
            egg(egg) {
                egg.container.forEach(function(e,w) {
                    var score = Math.round(e.children[0].innerText);
                    // console.log(e);
                    
                    var li = e.children[1].children[0].getElementsByTagName('li');
                    for(let i = 0; i < li.length ; i ++) {
                        let img = li[i].children[0].getElementsByTagName('img')[0];
                        img.src = egg.whiteEgg;
                    }
                    for(let i = 0; i < score ; i ++) {
                        let img = li[i].children[0].getElementsByTagName('img')[0];
                        img.src = egg.blackEgg;
                    }
                })
            }
        }
        window.addEventListener('load', function(){
            eggScore.egg({
                container: $all('.score-container'),
                whiteEgg: 'images/scoreEgg_w.svg',
                blackEgg: 'images/scoreEgg_y.svg',
            });
        });

        window.addEventListener('load', function() {
        })

        // $id('index-searchBtn').addEventListner('click', function() {

        // })
    </script>

</body>

</html>