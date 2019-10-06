<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous">
    

    <title>3-2</title>
</head>
<body>
    <nav>
        <?php 
            require_once('nav.php');
        ?>
    </nav>

<div class="penguinPage">  

    <div class="maxWidthWrapper">
        <div class="step-container clearfix">
            <!-- 這裡放步驟 -->
            <h2>發起飯團!</h2>
            <ul class="step-wrapper clearfix">
                <li class="grid-4 active">
                    <span >
                        1
                    </span>
                    選擇開始日期
                </li>
                <li class="grid-4">
                    <span class="active">2<div class="decoLine"></div></span>
                    選擇餐點和人數
                </li>
                <li class="grid-4">
                    <span>3<div class="decoLine"></div></span>
                    確認發起日期
                </li>
            </ul>
        </div>
        <div class="woodTemp create3_2">
            <h1>選擇你想在此飯團加入的餐點</h1>
            <input type="checkbox" id="add-meal">
            <div class="addMeal-container clearfix">     
                <div class="addMealPanel grid-12 grid-md-7">
                    <h2> 選擇餐點分類</h2>
                    <ul class="clearfix" id="mealGenre-container">   
                        
                    </ul>
                    <div class="add-wrapper" id="addWrapper3_2">
                        
                    </div>
                    <label for="add-meal" class="checkMeal-btn">
                        確認選擇這些餐點
                    </label>
                </div>
                <label for="add-meal" class="checkMeal-bg"></label>
                <div class="mealPointer">
                    <!-- <h3>從左側的餐點，<br>拖拉至右邊以新增餐點~</h3> -->
                    <div class="pic">
                        <img src="images/spoonFork-01.svg" alt="">
                    </div>
                </div>
                <div class="addedList grid-12 grid-md-5 clearfix">
                    <div class="grouponDate">
                        <h3>
                            購物金募集時間: 
                        </h3>
                        <span class="grouponDay">0</span>天
                    </div>
                    <div class="mealArea" id="mealArea">
                        <p id="mealAreaInfo">尚未有任何餐點<br>
                            您可以在左側的餐點列表<br>，在各個餐點點擊"+"，以新增餐點~
                        </p>
                        
                    </div>
                    <div class="grouponDetail">
                        <div class="mealCountNow grid-3">
                            <span id="addedMealNow">0</span>
                            餐
                        </div>
                        <div class="originalPrice grid-2">
                            <span>原價: </span>
                            <span id="originPrice">0</span>
                        </div>
                        <div class="salePrice grid-7">
                            <span>飯團價: </span>
                            <span id="salePrice">0</span>
                                元( <span id="saleCount">6</span>折)
                        </div>
                    </div>
                    <label for="add-meal" class="addMeal-btn">
                        +
                    </label>
                </div>
            </div>
        </div>
        <div class="settingThreshold-container grid-12 clearfix">
            <h2>
                設定此飯團的購物金人數門檻
            </h2>
            <div class="setting grid-12 grid-md-6 clearfix">
                <h3>設定人數門檻(單位: 人)</h3>
                <div class="settingArea">
                    <div id="minus" class="plusAndMinus grid-3">
                        -
                    </div>
                    <div id="people" class="grid-6 people">
                        10 
                    </div>
                    <div id="plus" class="plusAndMinus grid-3">
                        +
                    </div>
                </div>
            </div>
            <div id="bonus" class="bonus grid-12 grid-md-6">
                <!-- <h3>
                    達成後可獲得的購物金，達成門檻的前 <span id="people2"> 10 </span> 人可獲得  
                </h3>
                <p>
                    <span id="3_2Bonus">
                        0
                    </span>
                    元購物金
                </p> -->
                <h3 class="grid-12">達到後 前 
                        <span class="people" id="people2">10</span>
                        人每人可獲得:  
                    </h3>
                <div class="bonus-container grid-12 clearfix">
                    <div class="grid-4">
                        <div class="pic">
                            <img src="images/bonusIcon-05.svg" alt="bonus">
                            <span class="bonus-coin">99</span>
                        </div>
                    </div>
                    <p class="grid-8">
                        <span class="bonus" id="3_2Bonus">0</span>
                        元購物金
                    </p>
                </div>
            </div>
        </div>
        <div class="btn-container clearfix">
            <a class="cancelBTN" href="3-1_createGroupon.php">
                回上一步
            </a>
           <a class="nextBTN" id="next3_2">
               確認並繼續
           </a>
        </div>
    </div>
    
</div>   
    <footer>
        <!-- 放footer -->
    </footer>


<script>
    var loadComplete = false;
    function showMeal(jsonStr) {
        var mealInfo = JSON.parse(jsonStr);
        // document.write(mealInfo);
        mealInfoL = mealInfo.length; 
        var mealGenre = mealInfo[mealInfoL - 1];
        for(let i = 0; i < mealGenre.length;i++) {
            var list = `<li class='genreList' genre='mealGenre${mealGenre[i]['mealGenre_No']}'>${mealGenre[i]['mealGenre_Name']}</li>`;
            $id('mealGenre-container').innerHTML += list;
        }
        
        
        // console.log(mealInfo[1]);
        for(let i = 0; i < mealInfoL - 1 ;i++) { //因為最後一個是餐點分類
            var meal = `<div class="selectMeal mealGenre${mealInfo[i].mealGenre_No}"  id="meal${mealInfo[i].meal_No}">
                        <div class="topUI">
                            <div class="addThis">+
                                <div class="hint">加此餐點</div>
                            </div>
                        </div>
                        <div class="pic">
                            <img src="images/meals/${mealInfo[i].meal_Pic}" alt="">
                        </div>
                        <div class="meal-title">
                            <div class="meal-score">
                                    
                            </div>
                            <div class="title-wrapper" >
                                <h3 id="${mealInfo[i].meal_No}_name">
                                    ${mealInfo[i].meal_Name}
                                </h3>
                                <span id="${mealInfo[i].meal_No}_price">${mealInfo[i].meal_Price}元</span>
                            </div>
                        </div>
                        <div class="added-bg" id="meal${mealInfo[i].meal_No}_bg">
                            <p><i class="fas fa-check"></i>  已選擇</p>
                        </div>
                        <input type="hidden" id="meal${mealInfo[i].meal_No}input" value="${mealInfo[i].meal_Name}|${mealInfo[i].meal_Price}元|images/meals/${mealInfo[i].meal_Pic}">
                    </div>`;
                    
            document.getElementById('addWrapper3_2').innerHTML += meal;
        }
        
        var addThisMeal_btn = document.getElementsByClassName('selectMeal');
        for(var i in addThisMeal_btn) {
            addThisMeal_btn[i].onclick = addMeal;
        }
        
        loadComplete = true;
        setMealArea(); // put meal-boxes into area
        filterGenre(); //register click genre event
    };
    function getMeal() {
        var xhr = new XMLHttpRequest();
        xhr.onload=function (){
            if( xhr.status == 200 ){
                if( xhr.responseText.indexOf("not found") != -1){//回傳的資料中含有 not found
                    document.getElementById("showPanel").innerHTML = "<center>查無餐點資料</center>";
                } else {
                    showMeal(xhr.responseText);  //json 字串
                }
                
            }else{
                alert( xhr.status );
            }
        }
    var url = "3-2grouponMeal.php";
    xhr.open("Get" ,url, true);
    xhr.send(null);
    }
    function  checkMealCount() {
        if($id('mealArea').children.length < 6) {
            console.log($id('mealArea').children.length);
            alert('請選擇至少5個餐點~');
        } else {
            location.href = '3-3_createGroupon_createdList.php';
        }
    }   
    window.addEventListener('load', function() {
        // getMeal();
        $id('next3_2').addEventListener('click', checkMealCount);
    });

</script>
<script src="js/main.js"></script>
</body>

</html>