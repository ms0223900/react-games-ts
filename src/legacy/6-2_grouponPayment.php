<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/style.css">
    <script src="js/main.js"></script>
<!--  phpStartHere -->
<?php
    require_once('nav.php');
try {
    require_once('phpDB/connectDB_CD103G3.php');
    $sql = "SELECT * from `groupontag` order by `groupon_TagNo` ASC";
    $tag = $pdo -> prepare($sql);
    $tag -> execute();
    $tagR = $tag -> fetchAll();

    $sql = "select * from groupon where groupon_No = :no";
    $groupon = $pdo -> prepare($sql);
    $groupon -> bindValue('no', $_REQUEST['no']);
    $groupon -> execute();
    if( $groupon -> rowCount() != 0) {
        $grouponR = $groupon -> fetchAll();
        foreach($grouponR as $i => $grouponR) {
?>
    <title><?php echo $grouponR["groupon_Name"] ?></title>
</head>
<body>
    <nav>
        
    </nav>

<div class="penguinPage"> 

    <div class="maxWidthWrapper" >
        <div class="createdList-wrapper clearfix">
            <h1> 此飯團餐點及價格詳情</h1>
            <section class="selectedMealList-container grid-12 grid-md-6">
                <div class="mealList">
                    <h2>此飯團餐點</h2>
                    <div class="addedMeal-wrapper">
                        
                    </div>
                </div>
            </section>
            <section class="selectedDetail-container grid-12 grid-md-6">
                <div class="selectedDetail">
                    <div class="grouponTitle">
                        <span>飯團名稱: </span>
                        <h2 id="3_3_grouponTitle">
                            <?php echo $grouponR["groupon_Name"] ?>
                            <span class="grouponTag">
                                #
                                <?php 
                            
                                    echo $tagR[$grouponR["groupon_TagNo"] - 1]['groupon_TagName'] 
                                
                                ?>
                            </span>
                        </h2>
                    </div>
                    <div class="grouponDate">
                        <h3>
                            購物金募集截止日: 
                        </h3>
                        <div class="date-wrapper">
                            <div class="date">
                                <span class="endDate">
                                    <?php echo $grouponR["endDate"] ?>
                                </span>
                            </div>
                            <div class="howLong">共
                                <span class="grouponDay">
                                    <!-- 待放 -->
                                </span>
                                天
                            </div>
                    </div>
                    </div>
                    <div class="bonusArea-wrapper clearfix" id="bonusArea">
                        <span class="title">購物金門檻</span>
                        <div class="people-container grid-4">
                            <h3>購物金人數門檻: </h3>
                            <p>
                                <span class="people">
                                    <?php echo $grouponR["groupon_MemberNeed"] ?>
                                </span>
                                <span>人</span>
                            </p>
                        </div>
                        <div class="bonus-container grid-8 clearfix">
                                <div class="grid-3">
                                    <div class="pic">
                                        <img src="images/bonusIcon-05.svg" alt="bonus">
                                        <span class="bonus-coin">
                                            <?php echo $grouponR["groupon_Bonus"] ?>
                                        </span>
                                    </div>
                                </div>
                                <div class="grid-9">
                                    <h3>達到後 前 
                                        <span class="people">
                                            <?php echo $grouponR["groupon_MemberNeed"] ?>
                                        </span>
                                        人每人可獲得:  
                                    </h3>
                                    <p>
                                        <span class="bonus">
                                            <?php echo $grouponR["groupon_Bonus"] ?>
                                        </span>
                                        元購物金
                                    </p>
                                </div>
                        </div>
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
                             元( <span id="saleCount">
                                 <?php if($grouponR["groupon_TagNo"] == 8) {
                                     echo '4';
                                 } else {
                                     echo '6';
                                 } ?>
                             </span>折)
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <div class="grouponPayment-wrapper">
            <h1>
                請選擇一種付款方式
            </h1>
            <div class="payment-container">
                <form action="###" class="clearfix">
                    
                    <div class="grid-12 grid-md-6 card-wrapper">
                        <h2 class=" grid-md-6">
                            信用卡付款
                        </h2>
                        <div class="cardPay">
                            <div class="selectPayment grid-12">
                                    <input type="radio" class="paymentMethod" id="visaCard" name="payment">
                                    <label for="visaCard" class="card">
                                        <h3 class="">VISA信用卡</h3>
                                        <div class="pic">
                                            <img src="images/creditCard-02.png" alt="">
                                        </div>
                                        <span class="radioCircle"></span>
                                    </label>
                                </div>
                                <div class="selectPayment grid-12">
                                    <input type="radio" class="paymentMethod" id="masterCard" name="payment">
                                    <label for="masterCard" class="card">
                                        <h3>master信用卡</h3>
                                        <div class="pic">
                                            <img src="images/creditCard-02.png" alt="">
                                        </div>
                                        <span class="radioCircle"></span>
                                    </label>
                                </div>
                                <div class="selectPayment grid-12">
                                    <input type="radio" class="paymentMethod" id="payPal" name="payment">
                                    <label for="payPal" class="card">
                                        <h3>JCB信用卡</h3>
                                        <div class="pic">
                                            <img src="images/creditCard-02.png" alt="">
                                        </div>
                                        <span class="radioCircle"></span>
                                    </label>
                                </div>
                        </div>
                    </div>
                    <div class="grid-12 grid-md-6">
                        <h2>
                            ATM轉帳
                        </h2>
                        <div class="selectPayment--ATM">
                            <div class="selectPayment">
                                <input type="radio" class="paymentMethod" id="ATMonline" name="payment">
                                <label for="ATMonline" class="ATM">
                                    <h3>
                                        ATM線上轉帳付款
                                    </h3>
                                    
                                    <span class="radioCircle"></span>
                                </label>
                            </div>
                            <div class="selectPayment">
                                <input type="radio" class="paymentMethod" id="ATMlocal" name="payment">
                                <label for="ATMlocal" class="ATM">
                                    <h3>
                                        ATM臨櫃轉帳付款
                                    </h3>
                                    
                                    <span class="radioCircle"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <p class="paymentRslt">
                您選擇的付款方式為:  <br> 
                <span id="selectedResult">
                </span>
            </p>
        </div>
    </div>
    <div class="btn-container clearfix">
        <a class="cancelBTN" href="6-1_grouponDetail.php?no=<?php echo $_REQUEST['no'] ?>">
            返回飯團詳細
        </a>
        <a class="nextBTN" id="finnishPayment">
            確認付款
        </a>
    </div>

</div>
    
    <footer>
        <!-- 放footer -->
    </footer>
</body>
<script>
    // 取得此飯團的餐點資料
    window.addEventListener('load',function() {
        
        getMealAll();
        $id('finnishPayment').onclick = alertPayment;
        function showMealInfo(jsonStr) {
            var mealArr = JSON.parse(jsonStr);
            
            // 數量就是餐點array的長度
            var mealCount = mealArr.length;
            // console.log(mealCount);
            //餐點數量計算++
            
            //價格計算
            var totalPrice = 0;
            //熱量計算
            var totalKcal= 0;
            for(let i in mealArr) {
                totalPrice += parseInt(mealArr[i].meal_Price);
                totalKcal += parseInt(mealArr[i].meal_Cal);
                var mealBox = `<div class="meal-box" id="meal${mealArr[i].meal_No}" score='${mealArr[i].meal_Total}'>
                        <div class="price">
                        ${mealArr[i].meal_Price}
                        </div>
                        <div class="pic">
                            <img src="images/meals/${mealArr[i].meal_Pic}" alt="${mealArr[i].meal_Name}"  title="${mealArr[i].meal_Info}">
                        </div>
                        <div class="title">
                            ${mealArr[i].meal_Name}
                        </div>
                        <input type='hidden' class='mealInfo' value = '${mealArr[i].meal_Info}'>
                        <input type='hidden' class='mealCal' value = '${mealArr[i].meal_Cal}'>
                    </div>`;

                $class('addedMeal-wrapper')[0].innerHTML += mealBox;
            }
            //寫入平均價格、熱量、總價
            // <div class="grouponDetail">
            //     <div class="mealCountNow grid-3">
            //         <span id="addedMealNow">0</span>
            //         餐
            //     </div>
            //     <div class="originalPrice grid-2">
            //         <span>原價: </span>
            //         <span id="originPrice">0</span>
            //     </div>
            //     <div class="salePrice grid-7">
            //         <span>飯團價: </span>
            //         <span id="salePrice">0</span>
            //             元( <span id="saleCount">6</span>折)
            //     </div>
            // </div>
            $all('.grouponDay')[0].innerText = mealCount;
            $id('addedMealNow').innerText = mealCount;
            
            var discount; //判斷是否官方
            if(<?php if($grouponR["groupon_TagNo"] == 8) {
                echo '0.4';
            } else {
                echo '0.6';
            } ?> == 0.4) {
                discount = 0.4;
                $all('.salePrice')[0].getElementsByTagName('span')[0].innerText = '官方價';
            } else {
                discount = 0.6;
            }
            $id('originPrice').innerText = totalPrice;
            $id('salePrice').innerText = Math.round(totalPrice * 0.6);

            
            
        }
        function getMealAll() {
            var xhr = new XMLHttpRequest();
            xhr.onload=function (){
                if( xhr.status == 200 ){
                    if( xhr.responseText.indexOf("not found") != -1){//回傳的資料中含有 not found
                        
                    } else {
                        showMealInfo( xhr.responseText );  //json 字串
                    }
                    
                }else{
                    alert( xhr.status );
                }
            }

            var url = "getMealInfo.php" + window.location.search;
            xhr.open("Get", url, true);
            xhr.send( null );
        }
        function alertPayment() {
            if($id('selectedResult').innerText == '') {
                alert('請選擇一個付款方式');
            } else { //判斷是否登入
                xhr = new XMLHttpRequest();
	            xhr.onload = function() {
	            	if (xhr.status == 200) {
	            		if (xhr.responseText.indexOf("not found") != -1) {
	            			document.getElementById('close-login').checked=false;   //打開登入註冊跳窗
	            		} else {
                            seeionMemberId = xhr.responseText ;
                            console.log("seeionMemberId::"+seeionMemberId);
                            location.href = '6-2_AddGroupon.php' + location.search;
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
        }
    })
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