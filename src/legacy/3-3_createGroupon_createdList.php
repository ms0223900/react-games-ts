<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous">

    <title>3-3</title>
</head>
<body>
    <nav>
        <?php 
            require_once('nav.php');
        ?>
    </nav>
    <script src="js/main.js"></script>

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
                    <span>2<div class="decoLine"></div></span>
                    選擇餐點和人數
                </li>
                <li class="grid-4">
                    <span class="active">3<div class="decoLine"></div></span>
                    確認飯團詳情
                </li>
            </ul>
        </div>
        <div class="woodTemp create3_2">
            <div class="createdList-wrapper clearfix">
                <h1>您發起的飯團詳情</h1>
                <section class="selectedMealList-container grid-12 grid-md-6">
                    <div class="mealList">
                        <h2>您選擇的餐點</h2>
                        <div class="addedMeal-wrapper">
                            <!-- <div class="selectMeal">
                                <div class="topUI">
                                    <div class="scaleUp">
                                        <i class="fas fa-search"></i>
                                    </div>
                                </div>
                                <div class="pic">
                                    <img src="images/teishoku01.gif" alt="meal-001">
                                </div>
                                <div class="meal-title">
                                    <div class="meal-score">
                                        AAAAA
                                    </div>
                                    <div class="title-wrapper" >
                                        <h3 id="meal01_name">燒烤鍋物組
                                        </h3>
                                        <span id="meal01_price">75元</span>
                                    </div>
                                </div>
                            </div> -->
                            
                        </div>
                    </div>
                </section>
                <section class="selectedDetail-container grid-12 grid-md-6">
                    <div class="selectedDetail">
                        <div class="grouponTitle">
                            <span>飯團名稱: </span>
                            <h2 id="3_3_grouponTitle">
                                驚天霹靂吃飽飽的揪個飯團吧~
                                <span class="grouponTag">
                                    #超省錢
                                </span>
                            </h2>
                        </div>
                        <div class="grouponDate">
                            <h3>
                                購物金募集時間: 
                            </h3>
                            <div class="date-wrapper">
                                <div class="date">
                                    <span class="startDate">10/20</span>~
                                    <span class="endDate">10/20</span>
                                </div>
                                <div class="howLong">共
                                    <span class="grouponDay">0</span>
                                    天
                                </div>
                        </div>
                        </div>
                        <div class="bonusArea-wrapper clearfix" id="bonusArea">
                            <span class="title">購物金門檻</span>
                            <div class="people-container grid-4">
                                <h3>購物金人數門檻: </h3>
                                <p>
                                    <span class="people">0</span>
                                    <span>人</span>
                                </p>
                            </div>
                            <div class="bonus-container grid-8 clearfix">
                                    <div class="grid-3">
                                        <div class="pic">
                                            <img src="images/bonusIcon-05.svg" alt="bonus">
                                            <span class="bonus-coin">99</span>
                                        </div>
                                    </div>
                                    <div class="grid-9">
                                        <h3>達到後 前 
                                            <span class="people">0</span>
                                            人每人可獲得:  
                                        </h3>
                                        <p>
                                            <span class="bonus">0</span>
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
                                    元( <span id="saleCount">6</span>折)
                            </div>
                        </div>
                    </div>
                </section>
                
            </div>
        </div>
        <div class="btn-container clearfix">
            <a class="cancelBTN" href="3-2_createGroupon_selectMeal.php">
                回上一步
            </a>
            <a class="nextBTN" id="3_3_confirmCreate_BTN">
                確認並繼續
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
        //檢查是否登入，尚未登入為空字串
       
        $id('3_3_confirmCreate_BTN').onclick = function() {
            var seeionMemberId = '';
            var info = storage.grouponInfo;
            // console.log(storage.grouponInfo);
            var infoArr = storage.grouponInfo.split('|');
            var bonus = document.getElementsByClassName('bonus')[0].innerHTML;
            // console.log(bonus);
            // console.log(infoArr[3]);
            var endDateNum = parseInt(infoArr[1]) + parseInt(storage.mealCount);
            var grouponList = {
                groupon_Name: infoArr[0],
                groupon_TagNo: infoArr[3],
                groupon_Founder: '',
                startDate: infoArr[1],
                endDate: endDateNum,
                groupon_Bonus: bonus,
                groupon_MemberNeed: storage.numIn,
            }
            // var mealArr = new Array();
            // 取得餐點array
            var mealArr = 
            storage.addMealList.substr(0, storage.addMealList.length - 1).replace(/meal/g,'').split(',');

            var mealList = JSON.stringify(mealArr);

            var str = JSON.stringify(grouponList);
            
	        xhr = new XMLHttpRequest();
	        xhr.onload = function() {
	        	if (xhr.status == 200) {
	        		if (xhr.responseText.indexOf("not found") != -1) {
	        			document.getElementById('close-login').checked=false;   //打開登入註冊跳窗
	        		} else {
                        seeionMemberId = xhr.responseText ;
                        console.log("seeionMemberId::"+seeionMemberId);
                        location.href = "3-3_createGroupon.php?jsonStr=" + str + "&mealList=" + mealList;
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
    });
    // document.querySelector('.swal-button--confirm"').click(function(){
    //     window.location.reload();
    // });
</script>
</html>