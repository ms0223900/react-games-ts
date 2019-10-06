<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<!-- 複製以下的html, css, js，只有放分數的地方可以更改class -->
    <!-- 放分數的地方，隨資料庫變動  -->
    <div class="container">
	
	</div>
    <!-- <p>
        評分 : 
        <span class="scoreNum" id="grouponDetail_score">2.2</span>
    </p>
    <div class="scoreEgg-container">
        <ul>
            <li>
                <div class="pic">
                    <img src="asset/scoreEgg_w.svg" alt="scoreYes" class="score">
                </div>
            </li>
            <li>
                <div class="pic">
                    <img src="asset/scoreEgg_w.svg" alt="scoreYes" class="score">
                </div>
            </li>
            <li>
                <div class="pic">
                    <img src="asset/scoreEgg_w.svg" alt="scoreYes" class="score">
                </div>
            </li>
            <li>
                <div class="pic">
                    <img src="asset/scoreEgg_w.svg" alt="scoreYes" class="score">
                </div>
            </li>
            <li>
                <div class="pic">
                    <img src="asset/scoreEgg_w.svg" alt="scoreYes" class="scoreW">
                </div>
            </li>
        </ul>
    </div> -->
    <style>
        .scoreEgg-container ul li {
            display: inline-block;
            width: 40px;
        }
        .pic img {
            width: 100%;
        }
    </style>
    <script>
        function $all(all) {
            return document.querySelectorAll(all);
        }
        score = {};
        score = {
            get: function(ee, src1, src2) {
                if(ee) {
                    // alert(ee);
                    var score;
                    score =  Math.round($all(ee)[0].innerText);
                    var src1 = src1;
                    var src2 = src2;
                    getScore(score, src1, src2);
                }
                
            },
            src_white: '',
            src_black: '',
        }
        function getScore(x, srcW, srcB) {
            // 找到所有需要計算的分數container;
            // document.createElement('div');

            var scoreEgg = document.getElementsByClassName('scoreEgg-container');
            // 轉換分數為蛋蛋
            for(let i = 0; i < scoreEgg.length ; i++) {
                console.log(i);
                // var score = Math.round(scoreEgg[i].getAttribute('score'));
                for(let x = 0 ; x < $all('.scoreEgg-container ul li').length; x++) {
                    console.log(x);
                scoreEgg[i].children[0].children[x].children[0].children[0].src = srcW;}
                var score = x;
                for(let j = 0; j < score ; j ++) {
                    scoreEgg[i].children[0].children[j].children[0].children[0].src = 
                    srcB;
                }
            }
        }
    </script>
<!-- 這裡自訂class和圖片 -->
    <script>
        window.onload = function() {
            score.get(
            '.scoreNum', //抓取分數的容器，自訂class名稱
            'images/eggEmpty.svg' ,  //預設的白色評分
            'images/eggFull.svg');  //顯示的有顏色評分
            // 'https://freeiconshop.com/wp-content/uploads/edd/star-outline.png' ,  //預設的白色評分
            // 'http://simpleicon.com/wp-content/uploads/star.png');  //顯示的有顏色評分
        }
    </script>
<!-- -->
</body>
</html>