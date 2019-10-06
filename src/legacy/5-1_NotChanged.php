<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.2/css/all.css" integrity="sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css">
    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/gsap/src/minified/TweenMax.min.js"></script>
    <script src="js/gsap/src/minified/easing/CustomEase.min.js"></script>
    <script src="js/main.js"></script>
    <style>
        #chatBot {
            display: none;
        }
    
    </style>
    <title>您已參加的飯團</title>
</head>

<body>
    <nav>
        <?php 
            require_once('nav.php');
        ?>
    </nav>

<div class="penguinPage">
    

    <div class="page5_1 page-container">
        <div class="page-BTN">
            <ul>
                <li class="active changePage">尚未兌換完的飯團</li>
                <li class="changePage">已參加的飯團</li>
                <!-- <li class="changePage">我發起的飯團</li> -->
            </ul>
        </div>
    </div>
    <div class="forBackgroundImage">
        <div class="maxWidthWrapper page5_1">
            <!-- <div class="filter-container clearfix">
                <span class="filter-span">排序</span>
                <div class="filter-wrapper">
                    <input type="checkbox" name="groupon_filter" class="groupon_filter" id="groupon_filter_time" checked>
                    <label for="groupon_filter_time" class="filter">餐點剩餘數量
                        <span class="filter-condition">由少至多</span>
                    </label>
                </div>
                
            </div> -->

            <!-- page -->
            <div class="page-wrapper">
                <!-- page-1 -->
                <div class="changeMeal-container changePage_container">
                        <h1><i class="fas fa-utensils"></i>&nbsp;&nbsp;&nbsp;點選各餐點即可選擇兌換&nbsp;&nbsp;&nbsp;<i class="fas fa-utensils"></i></h1>
                        
                                    
                </div>
                <!-- page-2 -->
                <div class="groupon-container changePage_container">
                    
                </div>
                <!-- page-3 -->
                <div class="changePage_container">
                    <h2>目前你還沒有發起飯團</h2>
                    <a class="clickToGroupon mainBTN" href="3-1_createGroupon.php">
                        <i class="fas fa-plus-circle"></i>
                        試試立刻發起飯團!
                    </a>
                </div>
            </div>
            
            <!-- popUpWindow -->
            <div class="checkChange-container" id="popUpChange">
                <div class="changeList-container">
                    <h2>
                        餐點兌換清單
                    </h2>
                    <table>
                        <tr>
                            <th>餐點名稱</th>
                            <th>數量</th>
                        </tr>
                        
                        
                    </table>
                </div>
                <div class="QRcodeAndCode">
                    <h2>您可以使用此QRcode出示給店員<br>或是記下以下代碼來兌換餐點</h2>
                    <div class="QR-container">
                        <h3>QRcode</h3>
                        <div class="pic">
                            <img src="" alt="" id="changeMealQRcode">
                        </div>
                    </div>
                    <!-- <div class="code-container">
                        <h3>取餐代碼</h3>
                        <input type="text" id="changeMealCode" value="Absjj001" readonly> 
                        
                    </div> -->
                </div>
                <div class="exchangeSuccess">
                    <h1>
                        您已成功兌換餐點!!
                    </h1>
                    <div class="success-icon">

                    </div>
                    <div class="pic chickShishou">
                        <img src="images/index_181018-03.png" alt="">
                    </div>
                    <a class="nextBTN closeFinnish">
                        確認
                    </a>
                </div>
                <div class="btn-container_changeItByYourself">
                    <h3>
                        如與店員確認兌換清單無誤後，<br>可以直接點選以下按鈕來進行餐點的兌換
                    </h3>
                    <a class="nextBTN" href="##" id="finishChangBTN">
                        進行兌換並取餐
                    </a>
                </div>
                <div class="btn-container clearfix">
                    <a class="cancelBTN" href="##" id="cancelChangBTN">
                        取消
                    </a>
                    <a class="nextBTN" href="##" id="confirmChangBTN">
                        確認兌換
                    </a>
                </div>
            </div>
            
            <div id="checkChange-container_bg"></div>
        </div>
    </div>
    




    <input type="checkbox" name="changeIt" id="changeIt">
    <div class="fixedChangeMenu-wrapper">
        <label class="titleClick" for="changeIt">
            <span>欲兌換的餐點清單</span>
            <span><i class="fas fa-angle-down"></i></span>
        </label>
        
        <div class="mealChange-container" id="mealChanger">
                <ul>
                    <!-- <li class="clearfix">
                        <div class="mealName grid-9">豪華便當組</div>
                        <div class="deleteIt grid-3">X</div>
                        <input type="hidden" value="g01|meal01">
                    </li>
                    <li class="clearfix">
                        <div class="mealName grid-9">豪華便當組</div>
                        <div class="deleteIt grid-3">X</div>
                        <input type="hidden" value="g03|meal02">
                    </li> -->
                </ul>
                <p class="info active">尚無餐點</p>
                <div class="btn-container clearfix">
                    <a class="subBTN" href="##" id="checkChangBTN">
                        兌換餐點
                    </a>
                </div>
        </div>
    </div>
</div>
    <footer>
        <!-- 放footer -->
    </footer>
</body>
<script>
    var url = '5-1_myGrouponListSearch.php?id=<?php echo $_SESSION['member_No']; ?>&order=';
    function showMyGroupon(jsonStr) {
        var myGrouponSearchR = JSON.parse(jsonStr);   
        myGrouponSearchR_length = myGrouponSearchR.length;
        console.log(myGrouponSearchR);
        var changeMealBox = 0;// page1餐點數量
        for(let i = 0; i < myGrouponSearchR_length; i++) {

                var endDate = myGrouponSearchR[i][5].substr(5).replace('-','/');
                // page1
                var changeMyGroupon = 
                `<div class="groupon-wrapper g_${myGrouponSearchR[i].groupon_TagNo}">
                        <div class="user-info"></div>
                        <div class="groupon_topUI clearfix">
                            <div class="leftUI grid-12">
                                <div class="titleTag grid-12 grid-lg-6">
                                    <span class="tag">
                                        #${myGrouponSearchR[i][2]}
                                    </span>
                                    <h3>
                                        ${myGrouponSearchR[i][1]}
                                    </h3>
                                </div>
                                <div class="mealAndScore-container grid-12 grid-lg-6">
                                    <div class="meal-counter grid-12">
                                        <i class="fas fa-utensil-spoon"></i> 剩餘
                                        <span></span>
                                        餐尚未兌換
                                    </div>
                                </div>
                                <div class="meal-container unChanged grid-12 clearfix">
                                
                                </div>
                            </div>
                        </div>
                    </div>`;
                $all('.changeMeal-container')[0].innerHTML += changeMyGroupon; //寫入container

                if(myGrouponSearchR[i][10]) { //如果該飯團還有餐點再執行以下
                    var toCount = myGrouponSearchR[i][10].length;
                    var myMealBoxCountL = myGrouponSearchR[i][10].length; //餐點數量
                    $all('.meal-counter')[i].getElementsByTagName('span')[0].innerHTML = myMealBoxCountL;// 寫入每一個未兌換飯團
                    for(let j = 0; j < myMealBoxCountL; j ++) {
                        changeMealBox++; //計算總餐數量
                        
                        var myMealBox = // 製作餐點
                        `<div class="meal-box">
                            <input type="hidden" id="" mealInfo="${myGrouponSearchR[i][10][j][0]}|${myGrouponSearchR[i][10][j][1]}">
                            <div class="price">
                                ${myGrouponSearchR[i][10][j][3]}元
                            </div>
                            <div class="pic">
                                <img src="images/meals/${myGrouponSearchR[i][10][j][2]}" alt="${myGrouponSearchR[i][10][j][1]}"  title="${myGrouponSearchR[i][10][j][1]}">
                            </div>
                            <div class="title">
                                ${myGrouponSearchR[i][10][j][1]}
                            </div>
                            <div class="added-bg" id="meal${myGrouponSearchR[i][10][j][0]}_bg">
                                <p><i class="fas fa-check"></i>  已選擇</p>
                            </div>
                        </div>`;
                    
                
                        $all('.meal-container')[i].innerHTML += myMealBox;//加入餐點
                    };
                } else { //將沒有餐點的飯團隱藏起來
                    $all('.changeMeal-container .groupon-wrapper')[i].style.display = 'none';
                };   
                
                console.log(changeMealBox);
                
            
        }
        // 全部加載之後，再註冊點擊事件
        for(let i = 0; i < changeMealBox ; i++) {
            $class('meal-box')[i].onclick = addToMenu;
        }
        
        
        // page2的我的飯團
        

    };
    function getMyGroupon(page) {
        console.log(url);
        var xhr = new XMLHttpRequest();
        xhr.onload=function (){
            if( xhr.status == 200 ){
                // console.log(xhr.responseText);
                if( xhr.responseText.indexOf("not found") != -1){//回傳的資料中含有 not found
                    $all('.groupon-container')[0].innerHTML = 
                    `<h1>目前還沒加入任何飯團，來去看看!</h1>
                    <a class="clickToGroupon mainBTN"       href="4-1_grouponList.php?search=&order=latest&p=1">
                        <i class="fas fa-plus-circle"></i>
                        看看所有飯團!
                    </a>`;
                    $all('.changeMeal-container')[0].innerHTML = 
                    `<h1>目前還沒加入任何飯團，來去看看!</h1>
                    <a class="clickToGroupon mainBTN"       href="4-1_grouponList.php?search=&order=latest&p=1">
                        <i class="fas fa-plus-circle"></i>
                        看看所有飯團!
                    </a>`;
                } else {
                    if(page == 'all') {
                        showMyAllGroupon(xhr.responseText);
                    } else if(page == 'change') {
                        showSuccess(); //兌換成功
                    } else {
                        showMyGroupon(xhr.responseText); //兌換清單
                    }
                     //json 字串
                }
                
            }else{
                alert( xhr.status );
            }
        }
    
        //搜尋用php
        // console.log(url);
        xhr.open("Get" ,url, true);
        xhr.send(null);
    }
    function getAllMyGroupon() {
        url = '5-1_myGrouponListSearch.php?id=<?php echo $_SESSION['member_No']; ?>&order=all';
        getMyGroupon('all');
    }
    function showSuccess() {
        // alert('//');
        // 先將跳窗的清空
        var popUpChangeCount = $id('popUpChange').children.length;
        for(let i = 0; i < popUpChangeCount;i++) {
            $id('popUpChange').children[i].style.display = 'none';
        }
        $class('exchangeSuccess')[0].style.display = 'block';
    }
    window.addEventListener('load', function() {
        
        getMyGroupon(); //load 資料庫中的我的尚未兌換飯團

        // $all('.filter')[0].addEventListener('click', filter);
        // $all('.filter')[1].addEventListener('click', filter); //篩選飯團
        //點擊頁籤後再顯示我的飯團
        
        $all('.changePage')[1].addEventListener('click', getAllMyGroupon);
        $class('closeFinnish')[0].onclick = function() {
            $id('popUpChange').style.display = 'none';
            $id('checkChange-container_bg').style.display = 'none';
            location.reload();
        }
        
    });

</script>
</html>



<script>
    // page2
    function showMyAllGroupon(jsonStr) {
        var myGrouponSearchR = JSON.parse(jsonStr);   
        var myGrouponSearchR_L = myGrouponSearchR.length;
        var genGroupon = function() {
            for(let i = 0; i < myGrouponSearchR_L;i++) {
                var toCount = myGrouponSearchR[i][10].length;
                var endDate = myGrouponSearchR[i][5].substr(5).replace('-','/');
                var gCode = 'g' + (((parseInt(myGrouponSearchR[i][0])+10)*2) + 1234);
                // $all('.groupon_shareCode')[i].value = gCode;
                // console.log($all('.groupon_shareCode')[i].value);
                var grouponTemp = 
                `<div class="groupon-wrapper g_${myGrouponSearchR[i].groupon_TagNo}">
                    <div class="user-info"></div>
                    <div class="groupon_topUI clearfix">
                        <div class="leftUI grid-12 grid-lg-8">
                            <div class="titleTag grid-12 grid-lg-6">
                                <span class="tag">#${myGrouponSearchR[i][2]}</span>
                                <h3>${myGrouponSearchR[i][1]}</h3>
                            </div>
                            <div class="mealAndScore-container grid-12 grid-lg-6">
                                <div class="meal-counter grid-5">
                                    共
                                    <span>${toCount}</span>
                                    餐
                                </div>
                                <div class="score-counter grid-7">
                                        平均評分為: 
                                        <span class="scoreHere"></span>
                                </div>
                            </div>
                            <div class="meal-container grid-12 clearfix">
                                
                            </div>
                        </div>
                        <div class="rightUI grid-12 grid-lg-4">
                            <div class="endDate-container clearfix">
                                <div class="date grid-12">
                                    截止日<span class="date-span">
                                        ${endDate}
                                    </span>
                                </div>
                                
                            </div>
                            <div class="threshold">
                                <h3>已參加人數/門檻人數</h3>
                                <div class="circleChart">
                                    <div class="people-container">
                                        <span class="peopleNow">${myGrouponSearchR[i][7]}</span>
                                        <span class="peopleNeeded">${myGrouponSearchR[i][9]}</span>
                                    </div>
                                    <div class="circleDisplay">
                                        <div class="circleDisplayB"></div>
                                        <div class="circleDisplayA"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="bonus-container clearfix">
                                    <div class="bonus grid-3">
                                        <div class="pic">
                                            <img src="images/bonusIcon-05.svg" alt="bonus">
                                            <span class="bonus-coin">${myGrouponSearchR[i][6]}</span>
                                        </div>
                                    </div>
                                    <div class="bonusPeople grid-9">
                                        <h3>達到後 前 
                                            <span class="people">${myGrouponSearchR[i][9]}</span>
                                            人每人:  
                                        </h3>
                                        <p>
                                            <span class="bonus">${myGrouponSearchR[i][6]}</span>
                                            元購物金
                                        </p>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div class="groupon_bottomUI clearfix">
                        <div class="callToAction grid-12">
                            <input type="checkbox" id="share5_1_${myGrouponSearchR[i][0]}" class="share5_1">
                            <div class="share-wrapper">
                                <a href="6-1_grouponDetail.php?no=${myGrouponSearchR[i][0]}" class="subBTN">
                                        查看此飯團
                                </a>
                                <label class="shareGroupon-BTN" for="share5_1_${myGrouponSearchR[i][0]}">
                                    分享此飯團
                                </label>
                                <div class="shareInfo-container">
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
                                                        <img src="http://chart.apis.google.com/chart?cht=qr&choe=UTF-8&chs=300x300&chl=http://127.0.0.1:5500/6-1_grouponDetail.php?no=${myGrouponSearchR[i][0]}" alt="">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="shareCode grid-12 grid-md-6">
                                                <h3>
                                                    飯團代碼
                                                </h3>
                                                <span>
                                                    可點擊"參加好友飯團"的按鈕，輸入此代碼來直接查看此飯團
                                                </span>
                                                <div class="codeHere clearfix">
                                                    <input type="text"  class="grid-9 groupon_shareCode" value="${gCode}" readonly> 
                                                    <span class="grid-3 copyCode">
                                                        複製代碼
                                                    </span>
                                                    <div class="hint">
                                                        已複製此代碼
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="shareFB-wrapper">
                                        <span class="shareFB">或是直接分享此飯團到您的FB</span>
                                        <div class="fb-share-button" data-href="http://127.0.0.1:5500/6-1_grouponDetail.php?no=${myGrouponSearchR[i][0]}" data-layout="button_count" data-size="large" data-mobile-iframe="true">
                                            <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2F127.0.0.1%3A5500%2F6-1_grouponDetail.php?no=${myGrouponSearchR[i][0]}&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">分享</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <label class="share5_1-bg" for="share5_1_${myGrouponSearchR[i][0]}"></label>
                        </div>
                    </div>
                    <div class="almostSucc-icon">
                        即將達標
                    </div>
                </div>`;
                $all('.groupon-container')[0].innerHTML += grouponTemp;

                if((myGrouponSearchR[i][7] / myGrouponSearchR[i][9]) >= 0.8 && window.innerWidth >= 600) {
                    $all('.almostSucc-icon')[i].style.display = 'block';
                } //第i個即將達標的顯示，且手機板不顯示

                //飯團代碼
                
                copyCode(); //註冊複製功能



                //填入餐點
                var toPrice = 0; //總價
                var toScore = 0; //總分
                var toKcal = 0; //總大卡
                for(let j = 0; j < myGrouponSearchR[i][10].length;j++) {
                    var count = myGrouponSearchR[i][10].lentgh; //餐點數量
                    toPrice += parseInt(myGrouponSearchR[i][10][j][3]);
                    toScore += parseInt(myGrouponSearchR[i][10][j][4]);
                    toKcal += parseInt(myGrouponSearchR[i][10][j][5]);
                    var mealBox = 
                    `<div class="meal-box">
                        <div class="price">
                            ${myGrouponSearchR[i][10][j][3]}元
                        </div>
                        <div class="pic">
                            <img src="images/meals/${myGrouponSearchR[i][10][j][2]}" alt="豪華便當組"  title="${myGrouponSearchR[i][10][j][1]}">
                        </div>
                        <div class="title">
                            ${myGrouponSearchR[i][10][j][1]}
                        </div>
                    </div>`;
                    if(j < 4) { //只加四餐
                        $all('.groupon-container .meal-container')[i].innerHTML += mealBox;
                        if(j == 3) {
                            $all('.groupon-container .meal-container')[i].innerHTML += 
                            `<div class="andMoreMeal-counter">
                                ...總共 <span>${toCount}</span>個餐點
                            </div>`;
                        }
                    }
                    
                }
                
                
                $all('.scoreHere')[i].innerHTML = Math.round(toScore / toCount);
                console.log($all('.groupon_shareCode')[i].value);
            }
        }
        console.log($all('.groupon-container .groupon-wrapper').length);
        if($all('.groupon-container .groupon-wrapper').length <= 0) { //如果還沒產生餐點才產生
            genGroupon();
        }
        //全部加載之後，再加載動畫
        circleChart();
        for(let i = 0;i < $all('.groupon_shareCode').length;i++) {
            console.log($all('.groupon_shareCode')[i].value);
        }

        checkSuccess(); //確認達標
        
    }
        
</script>