<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/style.css">
    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/main.js"></script>
    <title>3-1</title>
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
                <!-- 這裡放步驟    -->
                <h2>發起飯團!</h2>
                <ul class="step-wrapper clearfix">
                    <li class="grid-4 active">
                        <span class="active">
                            1
                        </span>
                        選擇開始日期
                        
                    </li>
                    <li class="grid-4">
                        <span>2<div class="decoLine"></div></span>
                        選擇餐點和人數
                    </li>
                    <li class="grid-4">
                        <span>3<div class="decoLine"></div></span>
                        確認發起日期
                    </li>
                </ul>
        </div>
        <div class="woodTemp">
            <div class="chooseDay-container clearfix">
                <div class="chooseDay-wrapper">
                    <h2>請選擇飯團開始日</h2>
                    <ul class="element-day">
                        <!-- <li><span>10/20</span> MON</li> -->
                    </ul>
                </div>
            </div>
            <div class="name-container clearfix">
                <h2>請輸入名稱和選擇飯團標籤</h2>
                <div class="input-wrapper grid-12 grid-md-8">
                    <h3>
                        請輸入飯團名稱
                    </h3>
                    <input type="text" placeholder="請輸入飯團名稱" id="grouponTitle" value="" maxlength="10">
                    <div class="hint">請輸入3~10個字，<br>或是隨機產生名稱</div>
                    <div class="randomTitle">
                        隨機產生飯團名稱
                    </div>    
                </div>
                <div class="select-wrapper grid-12 grid-md-4">
                    <h3>
                        請選擇此飯團的標籤
                    </h3>
                    <select name="grouponTag" id="grouponTag">
                        <?php require_once("3-1grouponTag.php"); ?>
                    </select>
                </div>
                
            </div>
            
        </div>
        <div class="btn-container page3_1 clearfix">
            <a class="cancelBTN" href="index.php">
                回首頁
            </a>
            <a class="nextBTN" id="page3_1_Check_btn">
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
    window.addEventListener('load',function() {
        $id('page3_1_Check_btn').addEventListener('click', checkGrouponNameAndTag);

        // load3-1時如果storage有東西，把原本的storageInfo倒出來
        if(storage.grouponInfo != '') {
            var grouponInfoArr = storage.grouponInfo.split('|');
            var TagIndex = parseInt(grouponInfoArr[3]) - 1;
            var dateIndex = parseInt(grouponInfoArr[1]);
            console.log(TagIndex);
            $id('grouponTitle').value = grouponInfoArr[0]; //title
            $id('grouponTag').selectedIndex = TagIndex; //tag
            console.log(grouponInfoArr[1]);
            $class('selectDate')[dateIndex].setAttribute('checked', 'checked');
        }
        // 再清空原本的storage
        storage.grouponInfo = '';
    });


    function checkGrouponNameAndTag() {
        if($id('grouponTitle').value == '') { //如果沒填名稱
            // $class('hint')[0].style.opacity = '1';
            $id('grouponTitle').style.backgroundColor = '#FCE444';
            $id('grouponTitle').onchange = defaultBG;
            
            var defaultBG = function() {
                if($id('grouponTitle').value.length > 0 ) {
                    $id('grouponTitle').style.backgroundColor = '#FFFFFF'; //變回白色
                }
            }
            alert('請輸入10個字以下的飯團名稱');
        } else {
            location.href = '3-2_createGroupon_selectMeal.php';
        }
    }
</script>
</html>