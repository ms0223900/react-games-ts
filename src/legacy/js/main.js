function $id(id) {
    return document.getElementById(id);
}
function $class(className) {
    return document.getElementsByClassName(className);
}
function $all(all) {
    return document.querySelectorAll(all);
}
function randomOneNum(min, max) {
    var length = max - min+1;
    var rand = min + Math.floor(Math.random() * length);
    return rand;
}
var storage = sessionStorage;




//初始化註冊or產生東西
function initDayCook() {
    // sessionStorage設定
    // 發起飯團的sessionStorage
    if(storage.addMealList == null) {
        storage.addMealList = ''; //storage.setItem('addItemList', '' );
    }
    // 設定發起的餐數
    var mealCount = 0;
    if(storage.mealCount == null) {
        storage.mealCount = 0; //storage.setItem('addItemList', '' );
    }

    // 設定發起人數
    var numIn = 10;
    if(storage.numIn == null) {
        storage.numIn = numIn; //storage.setItem('addItemList', '' );
    } else {
        numIn = parseInt(storage.numIn);
        if($id('people')) {
            $id('people').innerText = numIn;
        }
    }

    // add or minus some number
    // 發起人數的加減
    function addOrMinus(min,max) {
        min = 10;
        max = 100;
        numIn = parseInt($id('people').innerText);
        // alert(this.id);
        if(this.id == 'plus') {
            if(numIn < max) {
                numIn += 5;
                $id('people').innerText = numIn;
                $id('people2').innerText = numIn;
                storage.numIn = numIn;
            }
            else {
                alert('上限最多為:' + max);
            }
        } else {
            if(numIn > min) {
                numIn -= 5;
                $id('people').innerText = numIn;
                $id('people2').innerText = numIn;
                storage.numIn = numIn;
            }
            else {
                alert('最少為:' + min + '人');
                $id('people').innerText = 10;
            }
        }
        // change bonus money
        calBonus();

    }
    if($id('minus')) {
        $id('minus').onclick = addOrMinus;
        $id('plus').onclick = addOrMinus;
    }


    
    // alert(mealArray.length);
    //copy代碼
    if($class('copyCode').length > 0) {
        
        copyCode();
    }
    
    
    
    
    // 產生從今天開始的後七天
    if($class('chooseDay-wrapper').length) {
        cal7days();
    }
    // 隨機產生title
    if ($class('randomTitle').length) {
        $class('randomTitle')[0].onclick = genRandomTitle;
    }
    //註冊3-1頁面按鈕事件
    if(storage.grouponInfo == null) {
        storage.grouponInfo = '';
    }
    // 名稱和日期和標籤寫入session storage
    if($id('page3_1_Check_btn')) {
        $id('page3_1_Check_btn').onclick = function() {
            //if all inputed write into storage
            

            
            if(checkInput()) {
                storage.grouponInfo += $id('grouponTitle').value  + '|';
                // selected date
                for(let i in $class('element-day')[0].children) {
                    if($class('element-day')[0].children[i].checked) {
                        // write into storage
                        // alert($class('element-day')[0].children[i].id);
                        storage.grouponInfo += $class('element-day')[0].children[i].getAttribute('dateadded') + '|';
                    }
                }
                // groupon tag
                var optionIndex = $id('grouponTag').selectedIndex;
                storage.grouponInfo += $id('grouponTag').options[optionIndex].innerText + '|';

                //groupon tag no.
                var tagNo = $id('grouponTag').options[optionIndex].value.replace('tag','');
                storage.grouponInfo += tagNo + '|';
            } else {
                alert('請輸入飯團名稱~');
            }
            // title
            
            // alert($id('grouponTag').selectedIndex);
           
            // $id('grouponTag').option[optionIndex];
            // storage.grouponInfo +=
            // 檢查input輸入 
            
        };
    }

    //產生之前選的餐點，3-2
    if($id('mealArea')) {
        getMeal();
    }
    mealArray = storage.addMealList.substr(0, storage.addMealList.length - 1).split(',');


    // 註冊3-3確定發起的按鈕
    if($id('3_3_confirmCreate_BTN')) {
        // 產生meal 和其相關數據
        createMealList();
        $id('3_3_confirmCreate_BTN').onclick = function() {
            // 清空storage
            // alert('已成功發起飯團!!');
            
            
        };
    }
    
    //3-4
    if($all('.create3_4').length > 0) {
        
        animate3_4();
    }
    
    //4-1 
    if($all('.circleChart').length > 0) {
        circleChart();
    }
    if($id('searchGrouponById')) {
        $id('searchGrouponById').addEventListener('click',searchGrouponById );
        $id('searchId').addEventListener('keyup', searchGrouponById);
    }

    
    //add meal function
    var addThisMeal_btn = document.getElementsByClassName('selectMeal');
    for(var i in addThisMeal_btn) {
        addThisMeal_btn[i].onclick = addMeal;
    } 
    //5-1 change Meals
    if($class('changeMeal-container').length > 0) {
        for(let i in $class('meal-box')) {
            $class('meal-box')[i].onclick = addToMenu;
        }
        $id('checkChangBTN').addEventListener('click', displayPopUp5_1);
        $id('cancelChangBTN').addEventListener('click', displayPopUp5_1);
        $id('checkChange-container_bg').addEventListener('click', displayPopUp5_1);

        $id('checkChangBTN').addEventListener('click', genChangeList); //產生交換的清單來確認
        $id('confirmChangBTN').addEventListener('click', genChangeList); //產生更新資料庫的URL
        $id('cancelChangBTN').addEventListener('click', genChangeList);
        $id('checkChange-container_bg').addEventListener('click', genChangeList);

        $all('.changePage').forEach(function(pageBTN,w) {
            // console.log(pageBTN);
            // console.log(w);
            pageBTN.onclick = function() {
                $all('.changePage').forEach(function(e) {
                    e.className = 'changePage';
                });
                this.className += ' active';
                $all('.changePage_container').forEach(function(e) {
                    e.style.display = 'none';
                });
                $all('.changePage_container')[w].style.display = 'block';
            };
        });
    }
    
    //6-1
    if($all('.grouponDetail-container').length > 0) {
        var smallPicChange = $all('.mealSmallPic-container .meal-box');
        for(let i in smallPicChange) {
            smallPicChange.forEach(function(e) { e.addEventListener('mouseover', changeMealInfo)});
        }
        progressBar();
    }
    if($class('scoreEgg-container').length > 0) {
        eggScore.egg({
            container: $all('.score-wrapper'),
            whiteEgg: 'images/scoreEgg_w.svg',
            blackEgg: 'images/scoreEgg_y.svg',
        });
    }

    //6-2
    if($all('.grouponPayment-wrapper').length > 0) {
        var paymentMethod = $all('.paymentMethod');
        for(let y in paymentMethod) {
            paymentMethod[y].oninput = function() {
                $id('selectedResult').innerHTML = 
                this.nextElementSibling.getElementsByTagName('h3')[0].innerText;
            };
        }
    }

    //6-3 animation
    if($all('.dish-container').length > 0) {
        anime6_3(); 
    }

}
//-------------------------------



if(storage.mealCount == null) { var mealCount = 0; } 
else { var mealCount = parseInt(storage.mealCount); }

var originalPrice = 0;
var grouponPrice;

function cal7days(e) {
    // alert(e.getDay());
    var d = new Date();
    for(let x = 0 ; x < 7 ; x++) {
        d.setDate(d.getDate() + 1);
        
        // 產生七天的radioInput
        var date = d.getDate();
        var month = d.getMonth() + 1;
        var dString = d.toString();
        var day = dString.substr(0,3);

        var dayNowInput = (x == 0) ? 
        `<input type='radio' id='${month}/${date}' name='selectDate' dateAdded=${x} checked class='selectDate'>` : `<input type='radio' id='${month}/${date}' name='selectDate' dateAdded=${x} class='selectDate'>`;
         
        var dayNowLabel = `<label for ='${month}/${date}'><span>${month}/${date}</span>${day} </label>`;
        
        $class('element-day')[0].innerHTML += dayNowInput;
        $class('element-day')[0].innerHTML += dayNowLabel;
        // console.log(d);
        // alert();
    }
}

function checkInput() {
    if($id('grouponTitle').value == '') {
        return false;
    } else {
        return true;
    }
}


// 3-2
function setMealArea() {
    if($id('mealArea')) {
        if(storage.addMealList.length > 1) {
            for(let i in mealArray) {
                // mealCount++;
                var mealId = mealArray[i];
                var mealInfo = storage.getItem(mealArray[i]);     
                createMealBox(mealId, mealInfo);
                
                // originalPrice -= mealPrice;
                grouponPrice = Math.floor(originalPrice * 0.6);
                $id('originPrice').innerText = originalPrice;
                $id('salePrice').innerText = grouponPrice;
                $id('addedMealNow').innerText = storage.mealCount;
                $class('grouponDay')[0].innerText = storage.mealCount;
    
                $id('mealAreaInfo').style.display = 'none';
                var mealBG = mealId + '_bg';
                // console.log($id('mealBG'));
                $id(mealBG).style.left = '0px';
                $id(mealBG).style.opacity = '.7';
    
                calBonus();
            }
            // createMealBox(e);
        }
    }
}


function createMealList(e) {
    // setting title and tag
    var grouponInfo = storage.grouponInfo.split('|');
    $id('3_3_grouponTitle').innerHTML = `
    ${grouponInfo[0]}
    <span class="grouponTag">
        #${grouponInfo[2]}
    </span>`;

    //settting date
    var selectedDate = new Date();
    selectedDate.setDate(selectedDate.getDate() + parseInt(grouponInfo[1]));
    var dataildate = selectedDate.getDate();
    var datailmonth = selectedDate.getMonth() + 1;
    $class('startDate')[0].innerText = datailmonth + '/' + dataildate;
    selectedDate.setDate(selectedDate.getDate() + parseInt(storage.getItem('mealCount')));
    dataildate = selectedDate.getDate();
    datailmonth = selectedDate.getMonth() + 1;
    $class('endDate')[0].innerText = datailmonth + '/' + dataildate;

    $class('grouponDay')[0].innerText = parseInt(storage.getItem('mealCount')) + 2;
    
    //setting bonus 
    $class('people')[0].innerText = storage.numIn;
    $class('people')[1].innerText = storage.numIn;
    bonusNow = Math.round(storage.numIn * parseInt(storage.mealCount) / 10);
    console.log(bonusNow);
    $class('bonus-coin')[0].innerText = bonusNow;
    $class('bonus')[0].innerText = bonusNow;
    //setting  price
    for(let i in mealArray) {
        // mealCount++;
        let mealId = mealArray[i];
        let mealInfo = storage.getItem(mealArray[i]);     
        createMealBox(mealId, mealInfo);
        
        // originalPrice -= mealPrice;
        grouponPrice = Math.floor(originalPrice * 0.6);
        $id('originPrice').innerText = originalPrice;
        $id('salePrice').innerText = grouponPrice;
        $id('addedMealNow').innerText = mealCount;
        $class('grouponDay')[0].innerText = mealCount;

    }
}

function filterGenre(e) {
    var genreList = $class('genreList');
    var genreList_L = $class('genreList').length;
    for(let i = 0; i < genreList_L ;i++) {
        $class('genreList')[i].addEventListener('click', filterMeals); 
           
    }
}
var selectedGenreArr = []; //store selected meals genre
// var selectedGenreArr_L = selectedGenreArr.length;
function filterMeals(e) {
    var genreList = $class('genreList');
    var genreList_L = genreList.length;
    var allMeals = $all('.add-wrapper .selectMeal');
    var allMeals_L = allMeals.length;
    
    var genreName = this.getAttribute('genre');

    var mealDisplay = function() {
        for(let i = 0; i < allMeals_L;i++) {
        var mealClass = allMeals[i].className.substr(11); 
        
        // console.log(selectedGenreArr[j]);
        if(selectedGenreArr.indexOf(mealClass) != -1) { //if meal genre fit one of the selected genre
            allMeals[i].style.display = 'inline-block';
        } else if(selectedGenreArr.length == 0) {
            allMeals[i].style.display = 'inline-block';
        } else {
            allMeals[i].style.display = 'none';
        }
        
    } };

    if(this.className.indexOf('active') == -1) { //if has not been clicked
        
        selectedGenreArr.push(genreName);
        this.className += ' active';
        console.log(this.className);
        console.log(selectedGenreArr);
        mealDisplay();
    } else {
        var genreIndex = selectedGenreArr.indexOf(genreName);
        selectedGenreArr.splice(genreIndex,1);
        this.className= 'genreList';
        for(let i = 0; i < allMeals_L;i++) {
            allMeals[i].style.display = 'inline-block'; 
        }
        console.log(this.className);
        console.log(selectedGenreArr);
        mealDisplay();
    }
    
    // console.log(this.className.indexOf('activ'));
    
    
}
// 3-1
function genRandomTitle() {
    var adj = [ '超棒的', '吃飽飽的', '呷尚飽','前所未見','史無前例','驚天霹靂'];
    var adv = [ '天天', '開心', '爽der'];
    var n = ['作夥吃','拿錢錢~','揪飯團~'];
 
    // alert(randomOneNum(1, 3));
    var title = adv[randomOneNum(1, adv.length-1)] 
    + adj[randomOneNum(1, adj.length-1)] 
    + n[randomOneNum(1, n.length-1)];

    $id('grouponTitle').value = title;
    $id('grouponTitle').style.backgroundColor = '#FFFFFF';
}

// 計算購物金
function calBonus() {
    bonusNow = Math.round(storage.numIn * parseInt(storage.mealCount) / 10);
    $id('3_2Bonus').innerText = bonusNow;
    $class('bonus-coin')[0].innerText = bonusNow;
}

// 計算餐點數量
function calMealNumber(e) {
    $id('addedMealNow').innerText = mealCount;
    $class('grouponDay')[0].innerText = mealCount;

    //get mealList from session storage
    var mealList = storage.getItem('addMealList');
    var mealArray = mealList.substr(0, mealList.length - 1).split(',');
    $id('originPrice').innerText = originalPrice;
    $id('salePrice').innerText = grouponPrice;
}
// add meal info to session storage
function createMealSession(e) {
    storage.addMealList += e.id + ',';
    // alert('#' + e.id + 'input');
    storage[e.id] = document.querySelector('#' + e.id + 'input').value;
}
function deleteMeal(e) {
    // meal count
    mealCount --;
    storage.mealCount = mealCount;
    $id('addedMealNow').innerText = mealCount;
    $class('grouponDay')[0].innerText = mealCount;

    //bonus
    calBonus();
    
    var thisMealId = e.getAttribute('mealid').replace('_bg', '');
    var mealPrice = parseInt(storage.getItem(thisMealId).split('|')[1]);
    console.log(storage.getItem(thisMealId).split('|')[1]); 
    originalPrice -= mealPrice;
    grouponPrice = Math.floor(originalPrice * 0.6);
    $id('originPrice').innerText = originalPrice;
    $id('salePrice').innerText = grouponPrice;
    let id = e.getAttribute('mealid').replace('_bg', '');
    // alert(id);
    storage.addMealList= storage.getItem('addMealList').replace(id + ',', '');
    // alert('#' + e.id + 'input');
    storage.removeItem(id);
}
function removeThisMeal(e) {
    calMealNumber(this);
    deleteMeal(this);
    var mealid = this.getAttribute('mealid');
    //remove checked bg
    $id(mealid).style.left = '1000000px';
    $id(mealid).style.opacity = '0';
    //remove this from mealArea
    this.parentNode.parentNode.parentNode.removeChild(
        this.parentNode.parentNode
    );
    if($id('mealArea').children.length < 2) {
        $id('mealAreaInfo').style.display = 'block';
        $id('mealArea').style.display = 'flex';
    }
}

function addMeal(e) {
    //count cal
    //bonus
    if(this.children[3].style.left != '0px') {
        calBonus();
    
        createMealSession(this);
        // calMealNumber(this);
    
        var mealList = storage.getItem('addMealList');
        var mealArray = mealList.substr(0, mealList.length - 1).split(',');
    
        
        // for(let j =  ; j < $id('mealArea').children.length ; j++) {
        //     $id('mealArea').removeChild($id('mealArea').children[j]);
        // //     // alert('/');
        // }
        // for(let i in mealArray) {
        var mealId = this.id;
        var mealInfo = storage.getItem(mealId);     
        createMealBox(mealId, mealInfo);
    
        mealCount ++;
        $id('addedMealNow').innerText = mealCount;
        $class('grouponDay')[0].innerText = mealCount;
        storage.mealCount = mealCount;
    
        $id('originPrice').innerText = originalPrice;
        $id('salePrice').innerText = grouponPrice;
           
            // originalPrice -= mealPrice;
            
        grouponPrice = Math.floor(originalPrice * 0.6);
    
        
    
        //add to session storage
        
    
        //gray bg cover
        $id('mealAreaInfo').style.display = 'none';
        this.children[3].style.left = '0px';
        this.children[3].style.opacity = '.7';
        // this.parentNode.parentNode.children[3].onclick = removeThisMeal;
    
    
        //create the same meal in 3-2 right added list
    }
    
}
function createMealBox(meal, mealInfo) {
    if($id('mealArea')) {
        var mealArea = $id('mealArea');
        mealArea.style.display = 'block';
    }
    

    var mealList = storage.getItem(meal);
    let info = mealList.substr(0, mealList.length).split('|');
    var mealName = info[0];
    var mealPrice = info[1];
    var mealPic = info[2];
    originalPrice += parseInt(mealPrice);
    grouponPrice = originalPrice * 0.6;


    // newMeal div
    var newMeal = document.createElement('div');
    newMeal.className = 'selectMeal';
    if($id('mealArea')) {
        mealArea.appendChild(newMeal);
    } else {
        $class('addedMeal-wrapper')[0].appendChild(newMeal);
    }
    

    //second layer topUI------
    var topUI = document.createElement('div');
    topUI.className = 'topUI';
    newMeal.appendChild(topUI);

    if($id('mealArea')) {
        var addThis = document.createElement('div');
        addThis.className = 'removeThis';
        // addThis.id = 'removeThis';
        addThis.setAttribute('mealId', meal + '_bg');
        addThis.innerHTML = 'X<div class="hint">刪除此餐點</div>';
        addThis.onclick = removeThisMeal;
        topUI.appendChild(addThis);
    }
    

    //second layer pic------
    var pic = document.createElement('div');
    pic.className = 'pic';
    // var picSrc = e.parentNode.parentNode.children[1].children[0].src;
    pic.innerHTML = '<img src="' + mealPic + '" alt="'+ mealPic +'">';
    newMeal.appendChild(pic);

    //second layer title------
    var mealTitle = document.createElement('div');
    mealTitle.className = 'meal-title';
    newMeal.appendChild(mealTitle);

    var mealScore = document.createElement('div');
    mealScore.className = 'meal-score';
    mealTitle.appendChild(mealScore);

    var title = document.createElement('div');
    title.className = 'title-wrapper';
    // var titleName = e.parentNode.parentNode.children[2].children[1].children[0].innerText;
    // var titlePrice = e.parentNode.parentNode.children[2].children[1].children[1].innerText;
    title.innerHTML = '<h3>' + mealName +'</h3><span> ' + mealPrice + '</span>';
    mealTitle.appendChild(title);
}
function calScorePic() {

}
// 6-1
function changeMealInfo(e) {
    var thisInfo = this.id;
    $id('grouponDetail_pic').src = this.children[1].children[0].src;
    $id('grouponDetail_title').innerHTML = this.children[2].innerText;
    // console.log(this.getElementsByClassName('mealInfo')[0].value);
    $id('grouponDetail_info').innerHTML = this.getElementsByClassName('mealInfo')[0].value;
    $id('grouponDetail_kcal').innerHTML = this.getElementsByClassName('mealCal')[0].value;
    var smallPicChange = $('.mealSmallPic-container .meal-box');
    // 更改class
    for(let i in smallPicChange) {
        smallPicChange[i].className = 'meal-box';
    }
    this.className += ' active';    
    //保留用
    var thisScore = parseFloat(this.getAttribute('score'));
     $id('grouponDetail_score').innerHTML = thisScore;
    //  console.log($all('.scoreEgg-container ul li'));
    for(let x = 0 ; x < $all('.scoreEgg-container ul li').length; x++) {
    $all('.scoreEgg-container ul li img')[x].src = 'images/scoreEgg_w.svg';
    }

    //蛋蛋分數
    $class('scoreEgg-container')[0].setAttribute('score', thisScore);
    eggScore.egg({
        container: $all('.score-wrapper'),
        whiteEgg: 'images/scoreEgg_w.svg',
        blackEgg: 'images/scoreEgg_y.svg',
    });
    // $id('grouponDetail_score').innerHTML = ;
    // $id('grouponDetail_kcal').innerHTML = ;

}

const eggScore = {
    egg(egg) {
        egg.container.forEach(function(e,w) {
            var score = Math.round(e.children[1].innerText);
            // console.log(score);
            
            var li = e.children[2].children[0].getElementsByTagName('li');
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

function getScoreEgg(e) {
    var scoreEgg = $class('scoreEgg-container');
    for(let i = 0; i < scoreEgg.length ; i++) {
        var score = Math.round(scoreEgg[i].getAttribute('score'));
        let j = 0;
        do{
            scoreEgg[i].children[0].children[j].children[0].children[0].src = 
            'images/scoreEgg_y.svg';
            j++;
        } while(j < score);
    }
    // console.log(score);

}

function progressBar() {
    var pNow = parseInt($all('.peopleNow')[0].innerText);
    var pNeed = parseInt($all('.peopleNeeded')[0].innerText);
    var progress = (pNow / pNeed);
    if(progress >= 1) {
        progress = 1;
    } else {
        progress = (pNow / pNeed);
    }
    // console.log(pNeed);
    tl = new TimelineMax();
    tl.fromTo('.progressBar_B', 2.5 ,{
        width: '0px',
    },{
        width: progress * 100 + '%',
    });
    // $all('.progressBar_B')[0].style.width = (pNow / pNeed)*100 + '%';
}
// 3-4 tweenMax
function animate3_4() {
    var tl = new TimelineMax();
     // tl.fromTo('.fork', 1,{},{});

    tl.fromTo('.maxWidthWrapper',1.5, {
        opacity: 0.5,
        y: -1111,
    },{
        opacity: 1,
        y: 0,
        ease: Circ.easeOut,
    });

    tl.fromTo('.fork', 1,{
        opacity: 0,
        x: -100,
    },{
        opacity: 1,
        x: 20,
    });

    tl.fromTo('.spoon', 1,{
        opacity: 0,
        x: 100,
    },{
        opacity: 1,
        x: -20,
    }, '-=1');

    tl.fromTo('.shareInfo-wrapper', .7,{
        opacity: 0,
        scale: 1.3,
    },{
        opacity: 1,
        scale: 1,
    });

}

// 4-1
function circleChart(e) {
    $all('.circleChart').forEach(function(e, w) {
        var pNow = parseInt($all('.peopleNow')[w].innerText);
        // console.log(pNow);
        var pNeed = parseInt($all('.peopleNeeded')[w].innerText);
        // console.log(pNeed);
        var degree = Math.round(pNow / pNeed * 360 * 10) / 10;
        console.log(w,degree ,'//');
        // alert(degree);
        // console.log(e);
        // console.log(degree);
        // var rotation = window.getComputedStyle($class('circleDisplay')[0], 'before').getPropertyValue('transform');
        
        // $all('.circleDisplayB')[w].style.transform = 'rotate(' + degree + 'deg)';

        // console.log(rotation);
        if(degree > 180) {
            var deg180;
            if(degree >= 360) {
                deg180 = 180;
            } else {
                deg180 = degree - 180;
            }
            var tl = new TimelineMax();
            // console.log(w);
            $all('.circleDisplayB')[w].style.backgroundColor = '#76391B';
            tl.fromTo('.groupon-wrapper:nth-child('+ (w+2) + ') .circleDisplayB',1.5,
            {
                rotation: 0,
                backgroundColor: '#76391B',
            },{
                rotation: 180,
                backgroundColor: '#76391B',
                ease: Power0.easeNone,
            });
            // $all('.circleDisplayB')[w].style.backgroundColor = '#FCE444';
            tl.fromTo('.groupon-wrapper:nth-child('+ (w+2) + ') .circleDisplayB',1,{
                rotation: 0,
                backgroundColor: '#FCE444',
            },{
                rotation: deg180,
                // ease: Power4.easeOut,
            });
        } else {
            var tl = new TimelineMax();
            // console.log(w);
            tl.fromTo('.groupon-wrapper:nth-child('+ (w+2) + ') .circleDisplayB',3,
            {
                rotation: 0,
            },{
                rotation: degree,
                ease: Power4.easeOut,
            });
        }
    });
}
//用code搜尋飯團
var codeSearch = '';
// function searchGrouponById(e) {
//     var originId = $id('searchId').value.replace('g','');
//     var grouponId = (parseInt(originId) - 1234 ) / 2 - 10;

//     if(codeSearch == '') {
        
//     } else {
//         if(e.keyCode == 13) {
//             // location.href = '6-1_grouponDetail.php?no=' + grouponId;
//         } else if(e.button == 0) {
//             // location.href = '6-1_grouponDetail.php?no=' + grouponId;
//         }
//     } 
// }
function searchGrouponById(e) {
    var originId = $id('searchId').value.replace('g','');
    var grouponId = (parseInt(originId) - 1234 ) / 2 - 10;

    url = "4-1_checkGroupon.php?no=" + grouponId;
    // getGroupon('search');
    if(e.keyCode == 13 | e.button == 0) {
        getGroupon('search');
    } 
}
// 6-3 tweenMax
function anime6_3() {
    var tl = new TimelineMax();

    tl.fromTo(".dish-container", 1.2, {
        // x: 220,
        x: -300,
        alpha: 0.2,
        // scale: 1.3,
    },{
        x: 0,
        alpha: 1,
        scale: 1,
        delay: 0.3,
        // ease: CustomEase.create("custom", "M0,0 C0.14,0 0.242,0.438 0.272,0.561 0.313,0.728 0.354,0.963 0.362,1 0.37,0.985 0.406,0.922 0.466,0.878 0.53,0.83 0.609,0.855 0.622,0.864 0.698,0.914 0.741,0.993 0.748,1.01 0.82,0.95 0.84,0.946 0.859,0.96 0.878,0.974 0.897,0.985 0.911,0.998 0.922,0.994 0.939,0.984 0.954,0.984 0.969,0.984 1,1 1,1"),
    });
    tl.fromTo('.bonus-wrapper', 1.4, {
        alpha: 0,
        scale: 1.5
    },{
        alpha: 1,
        scale: 1,
        // ease: Circ.easeOut,
        ease: CustomEase.create("custom", "M0,0 C0.14,0 0.242,0.438 0.272,0.561 0.313,0.728 0.354,0.963 0.362,1 0.37,0.985 0.406,0.922 0.466,0.878 0.53,0.83 0.609,0.855 0.622,0.864 0.698,0.914 0.741,0.993 0.748,1.01 0.82,0.95 0.84,0.946 0.859,0.96 0.878,0.974 0.897,0.985 0.911,0.998 0.922,0.994 0.939,0.984 0.954,0.984 0.969,0.984 1,1 1,1"),
    });
    tl.fromTo(".chickPic", .1, {
        y: 10,
    },{
        y: -10,
        // repeatDelay: 0.5,
        yoyo: true,
        repeat: 22,
    });

    tl.fromTo(".chickPic", 2, {
        x: 900,
        opacity: 0,
    },{
        x: 0,
        opacity: 1,
        // repeatDelay: 0.5,
        ease: Power4.easeOut,
    }, "-=2");

    tl.fromTo(".chickDialogue", 1, {
        opacity: 0,
        rotation: 0,
        transformOrigin: 'center bottom',
    },{
        opacity: 1,
        rotation: 0,
        // repeatDelay: 0.5,
        // yoyo: true,
        // repeat: 3,
    });
    tl.fromTo(".chickDialogue", 1, {
        rotation: 0,
        transformOrigin: 'center bottom',
    },{
        rotation: 10,
        // repeatDelay: 0.5,
        yoyo: true,
        repeat: 3,
    });

    

    // tl.add([ani01, ani02]);
}

// 5-1-------------------------
function addToMenu(e) {
    // this.classList.toggle('active');
    // alert(this.classList);
    // console.log(this.classList);
    var noMeal = function() {
        if($id('mealChanger').children[0].children.length <= 0) {
            $class('info')[0].classList.add('active');
        } else {
            $class('info')[0].classList.remove('active');
        }
    };

    let thisMealInfo = this.children[0].getAttribute('mealInfo');
    // alert(thisMealInfo);
    let infoArr = thisMealInfo.split('|');
    // alert(infoArr);
    var newChangeMeal = `<li class="clearfix">
        <div class="mealName grid-9">${infoArr[1]}</div>
        <div class="deleteIt grid-3">X</div>
        <input type="hidden" value="${thisMealInfo}">
    </li>`;
    
    
    //還沒被選，增加物件和註冊事件
    if(this.classList.value.indexOf('active') == -1) {
        
        if($class('deleteIt').length < 8) { //限定最多一次8筆兌換
            this.classList.add('active');
            $id('mealChanger').children[0].innerHTML += newChangeMeal;
            var thisMealBox;
        // 從X把原本餐點的已選擇關掉
            for(let x in $class('deleteIt')) {
                $class('deleteIt')[x].onclick = function() {
                    for(let x = 0; x < $class('meal-box').length ; x++) {
                        if($class('meal-box')[x].children[0].getAttribute('mealInfo') == this.nextElementSibling.value) {
                            thisMealBox = $class('meal-box')[x];
                            console.log(thisMealBox);
                        }
                    }
                    thisMealBox.classList.remove('active'); //背景變回去
                    this.parentNode.parentNode.removeChild(this.parentNode); //砍掉自己
                    
                    noMeal();

                };
            }
        } 
        
        
    }
    //從餐點直接取消選取 
    else {
        this.classList.remove('active');
        var thisList;
        var mealChangerLi = $id('mealChanger').children[0];
        for(let y = 0; y < mealChangerLi.children.length;y++) {
            console.log(mealChangerLi.children[y]);
            // console.log(thisMealInfo);
            if(mealChangerLi.children[y].getElementsByTagName('input')[0].value == thisMealInfo) {
                thisList = mealChangerLi.children[y];
            }
        }
        $id('mealChanger').children[0].removeChild(thisList);
        noMeal();
    }
    
    // $id('mealChanger').insertBefore(newChangeMeal, $id('mealChanger').children[0].firstChild);
    

    // 尚無餐點的顯示
    noMeal();
}

function displayPopUp5_1() {
    var bgStyle = $id('checkChange-container_bg').style;
    var popStyle = $id('popUpChange').style;
    if(popStyle.display == 'block') {
        popStyle.display = 'none';
        bgStyle.left = '-10000px';
        bgStyle.opacity = 0;
    } else {
        $id('popUpChange').style.display = 'block';
        bgStyle.left = '0px';
        bgStyle.opacity = 1;
    }
}

var mealChangeArr = []; //兌換的餐點id清單
function genChangeList(e) {
    //預設顯示
    $all('.changeList-container')[0].style.display = 'block';
    $all('.QRcodeAndCode')[0].style.display = 'none';
    $all('.btn-container')[0].style.display = 'block';
    $all('.btn-container_changeItByYourself')[0].style.display = 'none';
    var changeMealCountainer = $id('popUpChange').getElementsByTagName('table')[0];
    var changeMealCountainer_Count = changeMealCountainer.getElementsByTagName('tr').length;
    var changeMeal = $id('mealChanger').getElementsByTagName('li');
    var changeMealCount = changeMeal.length;
    
    if(this.id == 'checkChangBTN') { //
        changeMealCountainer.innerHTML = 
        `<tr>
            <th>餐點名稱</th>
            <th>數量</th>
        </tr>
        `;
        if(changeMealCount > 0) {  //如果有餐點
            for(let i = 0; i < changeMealCount ; i++) {
                var mealInfo = changeMeal[i].children[2].value.split('|');
                var mealNo = mealInfo[0];
                var mealName = mealInfo[1];
                // console.log(mealName);
                var mealTd = 
                `<tr>
                    <td>${mealName}</td>
                    <td> x1 </td>
                </tr>`;
                changeMealCountainer.innerHTML += mealTd; //塞入餐點清單
                mealChangeArr[i] = mealNo; //將餐點id加入array中

                if(i == changeMealCount-1) {  //加入最後一行
                    changeMealCountainer.innerHTML +=
                    `<tr>
                        <td colspan="2" class="method">取餐方式: 現場取餐</td>
                    </tr>`; 
                }
            } 
            // console.log(mealChangeArr);
        } else {
            changeMealCountainer.innerHTML +=
            `<tr>
                <td colspan="2" class="method">目前尚無餐點</td>
            </tr>`; //加入最後一行
        }

    } else if(this.id == 'confirmChangBTN' && changeMealCountainer_Count > 2) { //把餐點ID加入input value以用來打包為json成為網址
        
        var jsonMealArr = JSON.stringify(mealChangeArr);
        // console.log(jsonMealArr);
        var changeMealURL = '5-1_1_myGrouponExchange.php?mealArr=' + jsonMealArr;
        //顯示QRcode和隱藏原本的清單
        $all('.changeList-container')[0].style.display = 'none';
        $all('.QRcodeAndCode')[0].style.display = 'block';
        $all('.btn-container_changeItByYourself')[0].style.display = 'block';
        $all('.btn-container')[0].style.display = 'none';
        
        $id('changeMealQRcode').src = 'http://chart.apis.google.com/chart?cht=qr&choe=UTF-8&chs=300x300&chl=localhost/phpLab/CD103G3_penguin/' + changeMealURL;

        // $id('changeMealCode').value = changeMealURL;
        
        $id('finishChangBTN').onclick =  function() {
            url = changeMealURL;
            getMyGroupon('change');
        }
    } else { //清空確認用的訂單
        changeMealCountainer.innerHTML = 
        `<tr>
            <th>餐點名稱</th>
            <th>數量</th>
        </tr>
        `;
    }
}

function QRcodeAndCopyIt(thisGrouponNo) { //單一飯團用
    var grouponNo = parseInt(thisGrouponNo);
    var grouponCode = 'g' + (((grouponNo + 10) * 2) + 1234);
    var shareURL = '6-1_grouponDetail.php?no=' + grouponNo;
    // QR
    $id('QR-picContainer').src = 'http://chart.apis.google.com/chart?cht=qr&choe=UTF-8&chs=300x300&chl=' + shareURL;

    // code
    $class('groupon_shareCode')[0].value = grouponCode;

    //產生之後再進行copy
    for(let i = 0; i < $class('copyCode').length ; i++) {
        $class('copyCode')[i].addEventListener('click', function() {
            //複製code in input
            var copyTxt = $class('groupon_shareCode')[i];
            copyTxt.select();
            document.execCommand('copy');
            $all('.codeHere .hint')[i].style.display = 'block';
            // 2秒後變display none
            setTimeout(function() {
                $all('.codeHere .hint')[i].style.display = 'none';
            }, 2000);
        });
    }
}

function copyCode() { //多飯團用
    for(let i = 0; i < $class('copyCode').length ; i++) {
        $class('copyCode')[i].addEventListener('click', function() {
            //複製code in input
            var copyTxt = $class('groupon_shareCode')[i];
            copyTxt.select();
            document.execCommand('copy');
            $all('.codeHere .hint')[i].style.display = 'block';
            // 2秒後變display none
            setTimeout(function() {
                $all('.codeHere .hint')[i].style.display = 'none';
            }, 2000);
        });
    }
}

function checkSuccess() {
    var peopleNow = $class('peopleNow');
    var peopleNeeded = $class('peopleNeeded');
    var almostSuccIcon = $class('almostSucc-icon');
    for(let i = 0 ; i < peopleNow.length;i++) {
        var peopleNowC = parseInt(peopleNow[i].innerText);
        var peopleNeededC = parseInt(peopleNeeded[i].innerText);
        var ratio = peopleNowC / peopleNeededC;
        if(ratio >= 0.8 && ratio < 1 && window.innerWidth >= 600) {
            almostSuccIcon[i].style.display = 'block';
        } else if(ratio >= 1 && window.innerWidth >= 600) {
            almostSuccIcon[i].style.display = 'block';
            almostSuccIcon[i].style.opacity = '0.7';
            almostSuccIcon[i].innerText = '已經達標!';

        }
    }
}

function achievementShowOff(getUrl) {
    var url;
    getAchiement();
    function getMealAll(what) {
        var xhr = new XMLHttpRequest();
        xhr.onload=function (){
            if( xhr.status == 200 ){
                if( xhr.responseText.indexOf("not found") != -1){//回傳的資料中含有 not found
                    
                } else if(what == 'recomm') {
                    showRecomm(xhr.responseText); 
                } else if(what == 'achie') {
                    showAchie(xhr.responseText);
                } else {
                    showMealInfo( xhr.responseText );
                }
            }else{
                alert( xhr.status );
            }
        }
        xhr.open("Get", url, true);
        xhr.send( null );
    }
    function getAchiement() {
        url = getUrl;
        getMealAll('achie');
    }
    function showAchie(jsonStr) {
        var founderAchie = JSON.parse(jsonStr);
        console.log(founderAchie);

        var thisFounderAchie = 
        `<div class="grouponUser">
                <span>發起人: </span>
            </div>
            <div class="userPic">
                <div class="pic">
                    <img src="images/${founderAchie[1]}" alt="user">
                </div>
            </div>
            <div class="user grid-9">
                <h3 class="userId">
                    ${founderAchie[0]}
                </h3>
                <div class="userExp clearfix">
                    <div class="achievePic grid-2">
                        <div class="pic">
                            <img src="images/achieve/${founderAchie[5]}" alt="">
                        </div>
                    </div>
                    <div class="achStatus grid-10 clearfix">
                        <h3>
                            ${founderAchie[4]}
                        </h3>
                        <p>
                            <span>${founderAchie[2]}</span> EXP
                        </p>
                    </div>
                    <div class="hint--achievement">
                        <div class="pic grid-6">
                            <img src="images/achieve/${founderAchie[5]}" alt="">
                        </div>
                        <p>
                            <span class="achName">${founderAchie[4]}成就</span> <br> 吃完${founderAchie[3]}餐後可獲得，可拿到<span>${founderAchie[3]}</span>元折價券
                        </p>
                    </div>
                </div>
            </div>`;
        $class('userInfo-wrapper')[0].innerHTML = thisFounderAchie;
    }
}
window.addEventListener('load',initDayCook);