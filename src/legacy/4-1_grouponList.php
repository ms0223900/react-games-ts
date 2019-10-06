<?php
    // header();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css">
    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/gsap/src/minified/TweenMax.min.js"></script>
    <script src="js/gsap/src/minified/easing/CustomEase.min.js"></script>
    <script src="js/main.js"></script>

    <title>全部飯團</title>
</head>
<body>
    <nav>
     <?php 
            require_once('nav.php');
        ?>
    </nav>

<div class="penguinPage"> 
    
    <div class="searchBar" name="top">
        <!-- <form action="4-1_grouponList.php"> -->
            <div class="searchBar-container">
                <input type="text" placeholder="搜尋飯團，直接按搜尋可以查看全部飯團" name="grouponKW" id="searchInput">
                <button id="kwBTN">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        <!-- </form> -->
    </div>
    <div class="page-BTN">
        <!-- <ul>
            <li class="active">全部飯團一覽</li>
            <li>官方特惠飯團</li>
            <li>飯友的飯團</li>
        </ul> -->
    </div>
    <input type="checkbox" id="search-BTN4_1">
    <div class="searchGroupon-wrapper">
        <label class="search4_1 subBTN" for="search-BTN4_1">
                <i class="fas fa-plus-circle"></i> 參加飯團
        </label>
        <div class="search-container">
            <h2>請輸入飯團代碼</h2>
            <p>或是開啟相機掃描QRcode</p>
            <!-- <form action="##"> -->
                <input type="text" placeholder="請輸入5個字的飯團代碼" id="searchId">
                <button id="searchGrouponById">尋找飯團</button>
            <!-- </form> -->
        </div>
    </div>
    <label class="search-BTN-bg" for="search-BTN4_1"></label>
    <div class="forBackgroundImage page4_1">
        <div class="maxWidthWrapper page4_1">
            <div class="filter-container clearfix">
                <span class="filter-span">排序</span>
                <div class="filter-wrapper">
                    <input type="radio" name="groupon_filter" class="groupon_filter" id="groupon_filter_latest">
                    <label for="groupon_filter_latest" class="filter latest">最新飯團
                        <span class="filter-condition">由新到舊</span>
                        <input type="hidden" name="order" value="success">
                    </label>
                </div>
                <div class="filter-wrapper">
                    <input type="radio" name="groupon_filter" class="groupon_filter" id="groupon_filter_price">
                    <label for="groupon_filter_price" class="filter time">飯團截止日
                        <span class="filter-condition">由近到遠</span>
                        <!-- <span class="filter-condition">由低到高</span> -->
                    </label>
                </div>
                <div class="filter-wrapper">
                    <input type="radio" name="groupon_filter" class="groupon_filter" id="groupon_filter_time">
                    <label for="groupon_filter_time" class="filter success">門檻達標
                        <span class="filter-condition">即將達標</span>
                        <input type="hidden" name="order" value="success">
                        <!-- <span class="filter-condition">由低到高</span> -->
                    </label>
                </div>
                
                <div class="filter-wrapper">
                    <input type="radio" name="groupon_filter" class="groupon_filter" id="groupon_filter_official">
                    <label for="groupon_filter_official" class="filter official">官方飯團
                        <span class="filter-condition">特價四折!</span>
                        <input type="hidden" name="order" value="success">
                        <!-- <span class="filter-condition">由低到高</span> -->
                    </label>
                </div>
            </div>
            <div class="groupon-container">

            </div>
            <!-- 動態產生頁籤 -->
            <!-- <div class="page-container4_1">
                <ul>
                    <li>
                        1
                    </li>
                    <li>
                        2
                    </li>
                </ul>
            </div> -->
        </div>
    </div>
    

</div>
    
    <footer>
        <!-- 放footer -->
        <div class="tempHere">

        </div>
    </footer>
    <a class="toTop" href="#top">
        <i class="fas fa-arrow-up"></i>
        <!-- <br>Top -->
    </a>
</body>
<script>
    var url = '4-1_searchGrouponList.php' + location.search;
    // + location.search
    function showGroupon(jsonStr,url) {
            var grouponSearchR = JSON.parse(jsonStr);   
            grouponSearchR_length = grouponSearchR.length;
            console.log(grouponSearchR);
            for(let i = 0; i < grouponSearchR_length; i++) {
                var toCount = grouponSearchR[i][11].length;
                var endDate = grouponSearchR[i][5].substr(5).replace('-','/');
                var grouponTemp = 
                `<div class="groupon-wrapper g_${grouponSearchR[i].groupon_TagNo}">
                    <div class="user-info"></div>
                    <div class="groupon_topUI clearfix">
                        <div class="leftUI grid-12 grid-lg-8">
                            <div class="titleTag grid-12 grid-lg-7">
                                <span class="tag">#${grouponSearchR[i][2]}</span>
                                <h3>${grouponSearchR[i][1]}</h3>
                            </div>
                            <div class="mealAndScore-container grid-12 grid-lg-5">
                                <div class="meal-counter grid-5">
                                    共
                                    <span>${toCount}</span>
                                    餐
                                </div>
                                <div class="score-counter grid-7">
                                        平均評分: 
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
                                        <span class="peopleNow">${grouponSearchR[i][7]}</span>
                                        <span class="peopleNeeded">${grouponSearchR[i][9]}</span>
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
                                            <span class="bonus-coin">${grouponSearchR[i][6]}</span>
                                        </div>
                                    </div>
                                    <div class="bonusPeople grid-9">
                                        <h3>達到後 前 
                                            <span class="people">${grouponSearchR[i][9]}</span>
                                            人每人:  
                                        </h3>
                                        <p>
                                            <span class="bonus">${grouponSearchR[i][6]}</span>
                                            元購物金
                                        </p>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div class="groupon_bottomUI clearfix">
                        <div class="mealAndKcal grid-7 grid-lg-5">
                            <div class="avgPrice grid-6">平均<br>
                                <span>0</span>
                                元 / 餐
                            </div>
                            <div class="avgKcal grid-6">
                                平均<br><span>
                                    0
                                </span>
                                大卡 / 餐
                            </div>
                        </div>
                        <div class="price grid-5 grid-lg-3">
                            <div class="originalPrice grid-6">
                                原價<span>
                                    0元
                                </span>
                            </div>
                            <div class="grouponPrice grid-12 grid-lg-6">
                                飯團價(6折) <span>
                                    0元
                                </span>
                            </div>
                        </div>
                        <div class="callToAction grid-12 grid-lg-4">
                            <a href="6-1_grouponDetail.php?no=${grouponSearchR[i][0]}" class="subBTN">
                                查看此飯團
                            </a>
                        </div>
                    </div>
                    <div class="almostSucc-icon">
                        即將達標
                    </div>
                </div>`;
                $all('.groupon-container')[0].innerHTML += grouponTemp;

                if((grouponSearchR[i][7] / grouponSearchR[i][9]) >= 0.8 && window.innerWidth >= 600) {
                    $all('.almostSucc-icon')[i].style.display = 'block';
                } //第i個即將達標的顯示，且手機板不顯示

                //填入餐點
                var toPrice = 0; //總價
                var toScore = 0; //總分
                var toKcal = 0; //總大卡
                for(let j = 0; j < grouponSearchR[i][11].length;j++) {
                    var count = grouponSearchR[i][11].lentgh; //餐點數量
                    toPrice += parseInt(grouponSearchR[i][11][j][2]);
                    toScore += parseInt(grouponSearchR[i][11][j][3]);
                    toKcal += parseInt(grouponSearchR[i][11][j][4]);
                    var mealBox = 
                    `<div class="meal-box">
                        <div class="price">
                            ${grouponSearchR[i][11][j][2]}元
                        </div>
                        <div class="pic">
                            <img src="images/meals/${grouponSearchR[i][11][j][1]}" alt="豪華便當組"  title="${grouponSearchR[i][11][j][0]}">
                        </div>
                        <div class="title">
                            ${grouponSearchR[i][11][j][0]}
                        </div>
                    </div>`;
                    if(j < 4) { //只加四餐
                        $all('.meal-container')[i].innerHTML += mealBox;
                        if(j == 3) {
                            $all('.meal-container')[i].innerHTML += 
                            `<div class="andMoreMeal-counter">
                                ...總共 <span>${toCount}</span>個餐點
                            </div>`;
                        }
                    }
                    
                }
                //官方的飯團
                var discount; //原價是6折
                if(grouponSearchR[i].groupon_TagNo == 8) {
                    discount = 0.4;
                    $all('.grouponPrice')[i].innerHTML = 
                    `官方價(4折) <span>
                            0元
                        </span>`;
                } else {
                    discount = 0.6;
                }
                $all('.avgKcal')[i].getElementsByTagName('span')[0].innerHTML = Math.round(toKcal / toCount);
                $all('.scoreHere')[i].innerHTML = Math.round(toScore / toCount);
                $all('.originalPrice')[i].getElementsByTagName('span')[0].innerHTML = toPrice +'元';
                $all('.avgPrice')[i].getElementsByTagName('span')[0].innerHTML = Math.round(toPrice * discount / toCount);
                $all('.grouponPrice')[i].getElementsByTagName('span')[0].innerHTML = Math.round(toPrice * discount) +'元';
                
            }
            //全部加載之後，再加載動畫
            circleChart();
            checkSuccess(); //判斷是否即將達標
            // genPage();// 分頁註冊及產生
        };
        
    function getGroupon(code) {
        var originId = $id('searchId').value.replace('g','');
        var grouponId = (parseInt(originId) - 1234 ) / 2 - 10;
        var xhr = new XMLHttpRequest();
        
        // console.log(xhr.responseText);
        xhr.onload = function (){
            if( xhr.status == 200 ){
                if( xhr.responseText.indexOf("not found") != -1){//回傳的資料中含有 not found  
                    if(code) {
                        if(code.indexOf("search") != -1 ) {
                            alert('查無該代碼的飯團資料'); 
                        } //從代碼而來
                        
                    } else {
                        $all('.groupon-container')[0].innerHTML = "<h1>查無飯團資料，以下為所有飯團</h1>";
                        url = '4-1_searchGrouponList.php?search=&order=latest&p=1';
                        getGroupon();
                    }
                } else {
                    if(code) {
                        if(code.indexOf("search") != -1 ) {
                            location.href = '6-1_grouponDetail.php?no=' + grouponId;
                        } 
                    }
                    // var url = url;
                    showGroupon(xhr.responseText); 
                     //json 字串
                }
            }else{
                alert( xhr.status )
            }
        }
        
        xhr.open("Get" ,url, true);
        xhr.send(null);


        
        
    }
    
    window.addEventListener('load', function() {
        // 先轉網址
        // console.log(location.href);
        var searchCondition = decodeURI(location.search); //搜尋條件
        searchArr = searchCondition.substr(1).split('&');
        
        var searchKeyword = searchArr[0].substr(7);
        if(searchKeyword == '') {
            searchKeyword = '所有';
        }
        $all('.groupon-container')[0].innerHTML = "<h2>以下是 " + searchKeyword + " 的飯團搜尋結果</h2>";
        

        if(searchArr[1] == 'order=endDate') { //把搜尋的結果顯示在網頁
            $id('groupon_filter_price').checked = true;
        } else if(searchArr[1] == 'order=success') {
            $id('groupon_filter_time').checked = true;
        } else if(searchArr[1] == 'order=official') {   
            $id('groupon_filter_official').checked = true;
        } else if(searchArr[1] == 'order=latest') {
            $id('groupon_filter_latest').checked = true;
        }
        getGroupon(); //load 資料庫中的飯團
        for(let i = 0;i< $all('.filter').length;i++) {
            $all('.filter')[i].addEventListener('click', filter);
        }
       
         //篩選飯團
        $id('kwBTN').addEventListener('click', searchGroupon); //搜尋飯團
        $id('searchInput').addEventListener('keyup', searchGroupon); //搜尋飯團
        //輸入代碼的飯團先檢查是否存在

        
        
        function filter(e) {
            var searchKW = $id('searchInput').value;
            
            if(this.className == 'filter time') {
                $all('.groupon-container')[0].innerHTML = ''; //清空容器
                // url = "4-1_searchGrouponList.php?search=" + searchKW + '&order=endDate&p=1';
                searchArr[1] = 'order=endDate';
                searchCondition = '?' + searchArr.join('&');
                location.href = '4-1_grouponList.php' + searchCondition;
                // console.log(searchCondition);
                // getGroupon(); //跳轉
            } else if(this.className == 'filter success') {
                $all('.groupon-container')[0].innerHTML = ''; //清空容器
                searchArr[1] = 'order=success';
                searchCondition = '?' + searchArr.join('&');
                location.href = '4-1_grouponList.php' + searchCondition;
            } else if(this.className == 'filter official') {
                $all('.groupon-container')[0].innerHTML = ''; //清空容器
                searchArr[1] = 'order=official';
                searchCondition = '?' + searchArr.join('&');
                location.href = '4-1_grouponList.php' + searchCondition;
            } else {
                $all('.groupon-container')[0].innerHTML = ''; //清空容器
                searchArr[1] = 'order=latest';
                searchCondition = '?' + searchArr.join('&');
                location.href = '4-1_grouponList.php' + searchCondition;
            }
            // location.href = '4-1_grouponList.php?search=' + searchKW + '&order=' + ;
        }
        function searchGroupon(e) {
            var searchKW = $id('searchInput').value;
            if(e.keyCode == 13) {
                $all('.groupon-container')[0].innerHTML = ''; //清空容器
                // searchCondition =  searchCondition.replace('search=&','search=' + searchKW + '&');
                searchArr[0] = 'search=' + searchKW;
                searchCondition = '?' + searchArr.join('&');
                // console.log(searchCondition);
                location.href = '4-1_grouponList.php' + searchCondition;
                // getGroupon();
            } else if(e.button == 0) {
                $all('.groupon-container')[0].innerHTML = ''; //清空容器
                searchArr[0] = 'search=' + searchKW;
                searchCondition = '?' + searchArr.join('&');
                location.href = '4-1_grouponList.php' + searchCondition;
                // getGroupon(); //跳轉
            }
            
        }
        
    });
    
   
    //groupon代碼編碼為 ((no+10)*2)+1234
    //groupon代碼解碼

</script>
</html>
<script>

// <?php //產生飯團總筆數
//             try {
//                 require_once('phpDB/connectDB_CD103G3.php');
//                 $sql = 'SELECT COUNT(*) FROM groupon';
//                 $groupon = $pdo -> prepare($sql);
//                 $groupon -> execute();
//                 $grouponCount = $groupon -> fetch();
//                 echo $grouponCount[0];
//             }catch(PDOException $e) {
//                 echo $e->getMessage();
//             }
                
              
//             ?>

</script>
