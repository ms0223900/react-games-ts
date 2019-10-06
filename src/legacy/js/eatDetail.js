// 加入購物車
var storage = sessionStorage;  
function doFirst(){

    if(storage['addItemList']==null){
        storage['addItemList']= '';
    }
    var list = document.querySelector('.add-cart');
    
        list.addEventListener('click',function(){
            var dishes = document.querySelector('#'+this.id+' input').value;
            addItem(this.id, dishes);
        });
    }

function addItem(itemId, itemValue){
    if(storage[itemId]){
        console.log('got it');
    }else{
        storage[itemId] = itemValue;
        console.log(storage[itemId]);
        storage['addItemList'] += itemId + ',';
    }
}
window.addEventListener('load',doFirst);
//加入購物車結束

// 圖片放大效果
$(function() {

    // 選擇圖片class名稱為sunder-img-zoom
    $('img.sunder-img-zoom').each(function(index, image) {

        // 設定縮放比例(默認為2倍)
        // $.isNumeric() 判断輸入值類型
        // data() 從被選元素中取回數據
        var zoom = $.isNumeric($(image).data('sunder-img-zoom')) ? $(image).data('sunder-img-zoom') : 2;

        // 用<figure>包圖片
        // parent() 返回被選元素的直接父元素
        var container = $(image).wrap('<figure></figure>').parent();

        // 設定父層寬高
        // 內部<img>保持相同大小
        container.css('width', '100%');
        container.css('height', $(image).height() + 'px');

        // 把要放大的圖設為父層背景圖
        container.css('background-image', 'url(\'' + $(image).attr('src') + '\')');
        container.css('background-repeat', 'no-repeat');
        container.css('background-position', '-100%');

        // 設定父層按指定的比例（默認為2倍）放大
        container.css('background-size', $(image).width() * zoom + 'px ' + $(image).height() * zoom + 'px');

        // 當用戶將滑鼠停在圖像上時，原圖片隱藏
        $(image).on('mouseover', function(e) { $(this).hide(); 
            container.css('cursor', 'zoom-in');
        });
        $(image).on('touchstart', function(e) { $(this).hide(); });

        // 當用戶離開圖像區域時，再次顯示常規尺寸的圖像
        container.on('mouseleave', function() { $(image).show(); 
            container.css('background-position', '-100%');
        });
        container.on('touchend', function() { $(image).show(); 
            container.css('background-position', '-100%');});


        // 當用戶在圖像區域內移動滑鼠時
        container.on('mousemove', function(e) {

            // 獲取圖像中滑鼠的位置
            var x = -e.pageX + $(this).offset().left;
            var y = -e.pageY + $(this).offset().top;

            // 將緩衝區應用於圖像的外側10％

            // X-軸
            if(x > -$(this).width() / 10)        x = 0;
            else if(x < -$(this).width() * 0.9)  x = -$(this).width();
            else if(x > -$(this).width() / 2)    x += $(this).width() / 10 + (x + $(this).width() / 10) * ($(this).width() / 10) / ($(this).width() / 2 - $(this).width() / 10);
            else                                 x -= $(this).width() / 10 - (x + $(this).width() * 0.9) * ($(this).width() / 10) / ($(this).width() / 2 - $(this).width() / 10);

            // Y-軸
            if(y > -$(this).height() / 10)       y = 0;
            else if(y < -$(this).height() * 0.9) y = -$(this).height();
            else if(y > -$(this).height() / 2)   y += $(this).height() / 10 + (y + $(this).height() / 10) * ($(this).height() / 10) / ($(this).height() / 2 - $(this).height() / 10);
            else                                 y -= $(this).height() / 10 - (y + $(this).height() * 0.9) * ($(this).height() / 10) / ($(this).height() / 2 - $(this).height() / 10);

            // 將較大的圖像移動到鼠標位置
            $(this).css('backgroundPosition', x * (zoom - 1) + 'px ' + y * (zoom - 1) + 'px');
        });

        container.on('touchmove', function(e) {

            // 獲取圖像中的觸摸位置
            var x = -e.targetTouches[0].pageX + $(this).offset().left;
            var y = -e.targetTouches[0].pageY + $(this).offset().top;

            // 將緩衝區應用於圖像的外側10％

            // X-軸
            if(x > -$(this).width() / 10)        x = 0;
            else if(x < -$(this).width() * 0.9)  x = -$(this).width();
            else if(x > -$(this).width() / 2)    x += $(this).width() / 10 + (x + $(this).width() / 10) * ($(this).width() / 10) / ($(this).width() / 2 - $(this).width() / 10);
            else                                 x -= $(this).width() / 10 - (x + $(this).width() * 0.9) * ($(this).width() / 10) / ($(this).width() / 2 - $(this).width() / 10);

            // Y-軸
            if(y > -$(this).height() / 10)       y = 0;
            else if(y < -$(this).height() * 0.9) y = -$(this).height();
            else if(y > -$(this).height() / 2)   y += $(this).height() / 10 + (y + $(this).height() / 10) * ($(this).height() / 10) / ($(this).height() / 2 - $(this).height() / 10);
            else                                 y -= $(this).height() / 10 - (y + $(this).height() * 0.9) * ($(this).height() / 10) / ($(this).height() / 2 - $(this).height() / 10);

            // 將較大的圖像移動到鼠標位置
            $(this).css('backgroundPosition', x * (zoom - 1) + 'px ' + y * (zoom - 1) + 'px');
        });

        // 使此設置響應
        $(window).resize(function() {
            container.css('height', $(image).height() + 'px');
            container.css('background-size', $(image).width() * zoom + 'px ' + $(image).height() * zoom + 'px');
        });
    }); 
}); 
// 圖片放大效果結束

// 評分蛋增減
function $all(all) {
    return document.querySelectorAll(all);
};
var eggScore = {
    egg(egg) {
        egg.container.forEach(function(e,w) {
            var score = Math.round(e.children[0].innerText);
            // console.log(score);
            
            var figure = e.querySelectorAll('figure');
            for(let i = 0; i < figure.length ; i ++) {
                let img = figure[i].querySelectorAll('img')[0];
                img.src = egg.whiteEgg;
            }
            for(let i = 0; i < score ; i ++) {
                let img = figure[i].querySelectorAll('img')[0];
                img.src = egg.blackEgg;
            }
        })
    }
}
window.addEventListener('load', function(){
    eggScore.egg({
        container: $all('.grade'),
        whiteEgg: 'images/icon/eggEmpty.svg',
        blackEgg: 'images/icon/eggFull.svg',
    });
});
// 評分蛋增減結束

// 數字增減
function detailQty(){
    var qty = document.getElementById("qty");
    var qtyAdd = document.getElementById("qty-add");
    var qtyCut = document.getElementById("qty-cut");
    var min = 0;
    var max = 100;

    qtyAdd.onclick = function(){
        if(qty.value == max || qty.value > max){  
            qty.value = max;  
        }else{  
            qty.value = parseInt(qty.value) + 1;  //parseInt() 將輸入的字串轉成整數
        }   
    };

    qtyCut.onclick = function(){
        if(qty.value == min || qty < min){  
            qty.value = min;  
        }else{  
            qty.value = parseInt(qty.value) - 1;
        }  
    };

    qty.onkeyup = function(){
        if(isNaN(qty.value)){      //isNaN()是否為數字
            qty.value = min;  
        }  
        if (qty.value.length > 2){
            qty.value = max; 
        }
    };
};
window.addEventListener('load',detailQty)
// 數字增減結束

// 新增留言
function eatDetailMsg() {

    var text = document.getElementById('memberLetter');

    document.getElementById('commentsBtn').onclick = function() {  //當點擊送出後執行function
        var today = new Date();  //建立時間物件
        var year = today.getFullYear();
        var mon = today.getMonth()+1;
        var day = today.getDate();
        var memberImg = "images/logo.png";  //變更圖片路徑
        if(text.value.trim()=='' ){         //trim()去除空白輸入
            swal({ text: "要輸入內容哦~", });  
        }else{ 
            var textDiv = document.createElement('div');  //設定變數為新增div
            textDiv.className = 'member-msg';             //設定新增div的class名稱
            textDiv.innerHTML +=                          //div內包的內容
                `<div class="member-data clearfix">
                    <div class="member-pic fl">
                        <figure class="member-img fl">
                            <img src=${memberImg}>
                        </figure>
                        <div class="member-id fl color">訪客</div>
                    </div>
                    <div class="comments-time fl">${year}/${mon}/${day}</div>
                </div>
                <div class="comments clearfix">
                    <p>${text.value}</p>
                    <div class="msg-btn">   
                        <button type="submit" name="comments" class="nextBTN">檢舉</button>
                    </div>
                </div>`;
            var textContainer = document.getElementsByClassName('text-container')[0];  //設定變數為放留言的空間
            textContainer.insertBefore(textDiv, textContainer.childNodes[0]);  //送出留言後，把留言設定在最上面
            location.reload();
        }
    }
};
window.addEventListener('load', eatDetailMsg);

//留言連結資料庫
function sendForm(){
    
    var text = document.getElementById('memberLetter');  
        
    // alert("HI");
    var xhr = new XMLHttpRequest();  //xml的請求物件

    xhr.onload = function(){
        if(xhr.status == 200){
            eatDetailMsg();
            document.querySelector('#memberLetter').value='';  //querySelector()尋找符合名稱的物件
        }else{
            alert(xhr.status);  //如果沒有成功，則出現代碼
        }
    }
    // console.log('executing');

    xhr.open("post","comment.php",true);  //把資料傳送到指定的檔案裡
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");  //傳送設定(固定寫法)
    var data = "mealNo=" + document.querySelector("#commentsBtn").value + "&msg=" + text.value;  //設定餐點編號為按鈕的值與訊息內容
    // alert(data);
    if(text.value == '') {  //如果值為空白不做事

    } else {
        xhr.send(data);     //傳送資料並把訊息框清空
        text.value = '';
    }
}

window.addEventListener('load',function(){
    document.getElementById('commentsBtn').addEventListener('click',sendForm);
});
// 新增留言結束

//隨機產生留言
function msg() {

    document.getElementById('commentsChange').onclick = function() {
        var title=document.getElementById('memberLetter');
        var n = ['救命啊~我從沒吃過這麼好吃的食物!!!','為什麼要讓我吃到一個這麼好的食物? 如果我以後吃不到怎麼辦啊~','節目中誇張的好吃表情真的不是騙人的，香氣咬兩下馬上在嘴中化開，甜味慢慢的滑入喉嚨，這味道真是太誘人了~','太感動了，我一定要帶妹妹來吃!!阿~我沒有妹妹T_T','感謝父母讓我來這世上~'];
        var max=4;
        var min=0;
        var title = n[Math.floor(Math.random()*(max-min+1)+min)];

        memberLetter.value = title;
    }
}
window.addEventListener('load',msg);
//隨機產生留言結束

//檢舉資料庫串接
function messagereport(){
    // alert('OK');
    var report = document.querySelectorAll('.report');
    for( i=0; i<report.length; i++ ){
        report[i].addEventListener('click',function(){
            num = this.id;
            mealnum = 'meal' + this.id;
            reportnum = 'report' + this.id;
            msgnum = 'msg'+ this.id;
            // alert(msgnum);
            sendMsgReport();
            // alert('ok');
            // console.log(this);
            
        });
    };
    function sendMsgReport(){
        // alert('123');
        var xhr = new XMLHttpRequest();
        xhr.onload=function (){
            if( xhr.status == 200 ){
                // alert('OK');
            }else{
                alert( xhr.status );
            }
        };
        xhr.open("post", "report.php", true);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        var reportData = 
         "&message_No=" + document.getElementById(msgnum).value;
         location.reload();
        alert('已檢舉該留言');
        xhr.send(reportData);
        location.reload();
    };
};  
window.addEventListener('load', messagereport);
//檢舉資料庫串接結束

//飯團串接
function initEatDetail() {
    getRecomm();
}
function getRecomm() {
    var xhr = new XMLHttpRequest();
    xhr.onload=function (){
        if( xhr.status == 200 ){
            if( xhr.responseText.indexOf("not found") != -1){//回傳的資料中含有 not found
                showRecomm(xhr.responseText); 
            } else {
                showRecomm(xhr.responseText); 
            } 
        }else{
            alert( xhr.status );
        }
    }

    var url = '6-1_recommendGrouponList.php';
    xhr.open("Get", url, true);
    xhr.send( null );
    
}
function showRecomm(jsonStr) {
    var recommGroupon = JSON.parse(jsonStr);
    console.log(recommGroupon);
    var recommGrouponCount = recommGroupon.length;
    for(let i = 0; i < recommGrouponCount;i++) { //加飯團
        var mealTotal = recommGroupon[i][11].length;
        var mealPrice = 0;
        var recommBox = 
        `<div class="groupon-box">
            <div class="groupon-title">
                <p class="color">${recommGroupon[i][1]}</p>
                <span>${recommGroupon[i][8].replace('0.','')}折</span>
            </div>
            <div class="groupon-meals">
                <div class="grouponMeals-container">

                </div>
                
                <div class="groupon-more color">
                    總共${mealTotal}個餐點...
                </div>
            </div>
            <div class="groupon-detail">
                <div class="groupon-day clearfix">
                    <span class="fl color">飯團天數</span>
                    <span class="fl">${mealTotal}天 </span>
                </div>
                <div class="groupon-money clearfix">
                    <span class="fl color">平均一餐</span>
                    <span class="fl fl-avgPrice"></span>
                </div>
                <div class="groupon-date clearfix">
                    <span class="fl color">截止日期</span>
                    <span class="fl">${recommGroupon[i][5]}前</span>
                </div>
            </div>
            <div class="groupon-btn subBTN">
            <a href="6-1_grouponDetail.php?no=${recommGroupon[i][0]}">查看此飯糰</a>
            </div>
        </div>`;
        document.querySelector('.eatDetail .groupon').innerHTML += recommBox;
        

        for(let j = 0; j < mealTotal ; j++) { //加餐點
            mealPrice += parseInt(recommGroupon[i][11][j][2]);
            if(j < 2) { //只增加兩個餐
                var grouponMeal =
                `<div class="groupon-item">
                    <figure class="meals-img">
                        <img src="images/meals/${recommGroupon[i][11][j][1]}" alt="${recommGroupon[i][11][j][0]}">
                    </figure>
                    <span class="meals-title">${recommGroupon[i][11][j][0]}</span>
                </div>`;
                document.getElementsByClassName('grouponMeals-container')[i].innerHTML += grouponMeal;
            }
            document.querySelectorAll('.groupon-money .fl-avgPrice')[i].innerHTML = Math.floor(mealPrice * 0.6 / mealTotal) + '元';
        }
        
    }
    // 全部加載後再加載owlCarousel
    $(document).ready(function(){
        $(".owl-carousel").owlCarousel({
            pagination: true,
            items: 1,
            loop: true,
            center: true,
            responsiveClass: true,
            nav: false,
            autoWidth:true,
            responsive:{
                0:{
                    items: 1,
                    margin: 30
                },
                768:{
                    items: 2,
                    margin: 50
                },
                1024:{
                    items: 3,
                    margin: 100
                }
            }
        });
    });
}
window.addEventListener('load',initEatDetail);
//飯團串接結束
