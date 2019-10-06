var storage = sessionStorage;
// storage['A02'] = '鮮茄蔬食鍋|vg_02.png|150|1|false';
// storage['A04'] = '菇菇瑧品拉麵|vg_04.png|240|2|true';
// storage['A03'] = '什蔬燴黑醋醬便當|vg_03.png|240|3|false'; 
// storage['addItemList'] = 'A02,A04,A03,'; 

var mealNo_list = "";
var mealQuantity_list = "";
if(storage.addItemList == null) {
    storage.addItemList = '';
}
memberBonus = document.getElementById('groupon_bonus_hidden').value; //會員持有購物金
        
function doFirst(){

	

    if(storage.addItemList != '') {
        $class('notMealYet')[0].style.display = 'none';
        var itemList = storage.getItem('addItemList');
        var itemArray = itemList.substr(0, itemList.length - 1).split(',');
    } else {
        $class('notMealYet')[0].style.display = 'block';
    }
   
    itemTime = 0; total = 0; itemSum = 0;
    for(var i in itemArray) {
        var itemInfo = storage.getItem(itemArray[i]);
        if(itemInfo != null) {
            createCartList(itemArray[i], itemInfo);

            itemTime += 15;
            document.getElementsByClassName('taketime_t')[0].innerText = itemTime;
            document.getElementsByClassName('taketime_t')[1].innerText = itemTime;

            itemSum += parseInt(itemInfo.split('|')[3]);
            document.getElementsByClassName('shopping_number_t')[0].innerText = itemSum;
            document.getElementsByClassName('shopping_number_t')[1].innerText = itemSum;
        
            total += parseInt(itemInfo.split('|')[2] * parseInt(itemInfo.split('|')[3]));
            document.getElementsByClassName('shopping_sum_t')[0].innerText = "NT$ " + total;
            document.getElementsByClassName('shopping_sum_t')[1].innerText = "NT$ " + total;

            Bonus = memberBonus > total*0.2 ? total*0.2 : memberBonus; 
            document.getElementsByClassName('groupon_bonus_t')[0].innerText = "NT$ " + Bonus;
            document.getElementsByClassName('groupon_bonus_t')[1].innerText = "NT$ " + Bonus;

            document.getElementsByClassName('memOrder_amount_t')[0].innerText = "NT$ " + (total - Bonus);
            document.getElementsByClassName('memOrder_amount_t')[1].innerText = "NT$ " + (total - Bonus); 
    
            mealQuantity_list += itemInfo.split('|')[3] + "," ; //餐點數量
        }
        

        
    }

    function createCartList(item, itemInfo) {
        
        itemTitle = itemInfo.split('|')[0];
        itemPic =  "images/" + itemInfo.split('|')[1];
        itemPrice = "NT$ " + parseInt(itemInfo.split('|')[2]);
        itemNumber = parseInt(itemInfo.split('|')[3]);

        isok = true; //是否為第一步
        add.call(document.getElementsByClassName('shopping_list')[0]);
        
        isok = false;
        add.call(document.getElementsByClassName('shopping_list')[1]);
        
       function add(){

            var trItemList = document.createElement('tr'); 
            trItemList.className = item;
            this.appendChild(trItemList);
        
            var tdImage = document.createElement('td'); 
            trItemList.appendChild(tdImage);

            var itemImage = document.createElement('img'); //商品圖
            itemImage.width = 80;
            itemImage.src = itemPic;
            tdImage.appendChild(itemImage);

            var tdTitle = document.createElement('td'); //商品名稱
            tdTitle.innerText = itemTitle;
            trItemList.appendChild(tdTitle);
            
            var tdNumber = document.createElement('td');
            trItemList.appendChild(tdNumber);

            var numberBox = document.createElement('div');
            numberBox.className = 'number_box';
            tdNumber.appendChild(numberBox);

            var numberValue = document.createElement('span'); //商品數量 
            numberValue.innerText = itemNumber;
            numberValue.className = 'number_value';
            numberBox.appendChild(numberValue);

            var tdPrice = document.createElement('td'); //商品價格 
            tdPrice.innerText = itemPrice;
            tdPrice.className = "tdPrice";
            trItemList.appendChild(tdPrice);

            if(isok){    

                var numberCut = document.createElement('span'); //減少按鈕 
                numberCut.innerText = '－';
                numberCut.className = 'number_cut plusAndMinus';
                numberCut.id = item;
                numberBox.appendChild(numberCut);
    
                numberCut.addEventListener('click',function(e){ //給減少按鈕綁定事件
                    if(this.previousSibling.innerText-1 != 0){

                        var itemId = this.getAttribute('id');
                        
                        total -= parseInt(storage.getItem(itemId).split('|')[2]);

                        itemSum -= 1;
                        document.getElementsByClassName('shopping_number_t')[0].innerText = itemSum;
                        document.getElementsByClassName('shopping_number_t')[1].innerText = itemSum;
                    
                        document.getElementsByClassName('shopping_sum_t')[0].innerText = "NT$ " + total;
                        document.getElementsByClassName('shopping_sum_t')[1].innerText = "NT$ " + total;
                    
                        Bonus = memberBonus > total*0.2 ? total*0.2 : memberBonus; 
                        document.getElementsByClassName('groupon_bonus_t')[0].innerText = "NT$ " + Bonus;
                        document.getElementsByClassName('groupon_bonus_t')[1].innerText = "NT$ " + Bonus;

                        document.getElementsByClassName('memOrder_amount_t')[0].innerText = "NT$ " + (total - Bonus);
                        document.getElementsByClassName('memOrder_amount_t')[1].innerText = "NT$ " + (total - Bonus); 
                
                        storage[itemId] = storage.getItem(itemId).split('|')[0] + "|" +
                                          storage.getItem(itemId).split('|')[1] + "|" +
                                          storage.getItem(itemId).split('|')[2] + "|" +
                                          (parseInt(storage.getItem(itemId).split('|')[3])-1) + "|" +
                                          storage.getItem(itemId).split('|')[4]; 

                        this.previousSibling.innerText--;
                    }
                });

                var numberAdd = document.createElement('span'); //增加按鈕 
                numberAdd.innerText = '＋';
                numberAdd.className = 'number_add plusAndMinus';
                numberAdd.id = item;
                numberBox.appendChild(numberAdd);
    
                numberAdd.addEventListener('click',function(e){ //給增加按鈕綁定事件

                    var itemId = this.getAttribute('id');

                    total += parseInt(storage.getItem(itemId).split('|')[2]);
                
                    itemSum += 1;
                    document.getElementsByClassName('shopping_number_t')[0].innerText = itemSum;
                    document.getElementsByClassName('shopping_number_t')[1].innerText = itemSum;
                
                    document.getElementsByClassName('shopping_sum_t')[0].innerText = "NT$ " + total;
                    document.getElementsByClassName('shopping_sum_t')[1].innerText = "NT$ " + total;

                    Bonus = memberBonus > total*0.2 ? total*0.2 : memberBonus; 
                    document.getElementsByClassName('groupon_bonus_t')[0].innerText = "NT$ " + Bonus;
                    document.getElementsByClassName('groupon_bonus_t')[1].innerText = "NT$ " + Bonus;

                    document.getElementsByClassName('memOrder_amount_t')[0].innerText = "NT$ " + (total - Bonus);
                    document.getElementsByClassName('memOrder_amount_t')[1].innerText = "NT$ " + (total - Bonus); 
                                    
                    storage[itemId] = storage.getItem(itemId).split('|')[0] + "|" +
                                      storage.getItem(itemId).split('|')[1] + "|" +
                                      storage.getItem(itemId).split('|')[2] + "|" +
                                      (parseInt(storage.getItem(itemId).split('|')[3])+1) + "|" +
                                      storage.getItem(itemId).split('|')[4]; 

                    this.previousSibling.previousSibling.innerText++;
                });

                var tdSubFeatures = document.createElement('td');
                trItemList.appendChild(tdSubFeatures);
    
                var heartIcon = document.createElement('p'); //收藏icon
                heartIcon.innerHTML = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
                                            viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">\
                                            <g>\
                                                <path class="st0" d="M83.2,16.3c-3.3-3-7.6-4.5-12.1-4.5c-5.2,0-10.2,2.2-13.7,5.9c-1.7,1.8-3,3.9-4.3,6.6c-0.5,1.3-1.8,2.1-3.1,2.1\
                                                c-1.3-0.1-2.6-0.7-3.2-2l-0.6-1.2C42.6,16,36.2,11.8,29,11.8c-1.2,0-2.3,0.2-3.5,0.4c-6.1,1.1-10.9,4.7-14.3,10.5\
                                                c-5,8.6-5.5,16.1-1.4,23.6c2.6,4.7,6,9.4,10.3,14.2c8.1,9,17.6,17.6,29.9,26.9c11.3-8.6,20.1-16.3,27.8-24.5\
                                                C82,58.3,86.9,52.7,90.3,46c1.3-2.6,2.6-5.7,2.4-9C92.5,28.4,89.4,21.7,83.2,16.3z"/>\
                                                <path class="st0" d="M87.9,10.6c-4.6-4-10.5-6.2-16.6-6.2c-7.1,0-13.9,2.9-18.8,8.1c-0.9,0.9-1.7,1.9-2.5,3C44,7.2,34.1,2.9,24.2,4.9\
                                                c-8.1,1.5-14.5,6.2-19,13.9C-1.1,29.6-1.6,40.2,3.7,50c2.8,5.3,6.5,10.4,11.3,15.7c8.7,9.7,19,18.9,32.4,28.9c0.9,0.6,1.8,1,2.7,1\
                                                c1.5,0,2.5-0.8,3-1.2C65,85.3,74.5,77,82.8,68.1c4.6-4.9,9.9-11,13.7-18.6c1.6-3.3,3.5-7.7,3.4-12.6C99.7,26.2,95.7,17.3,87.9,10.6z\
                                                M90.3,46c-3.4,6.7-8.3,12.3-12.5,16.9C70.1,71.1,61.3,78.8,50,87.4c-12.3-9.3-21.8-17.9-29.9-26.9c-4.3-4.8-7.7-9.5-10.3-14.2\
                                                c-4.1-7.5-3.6-15,1.4-23.6c3.4-5.8,8.2-9.4,14.3-10.5c1.2-0.2,2.3-0.4,3.5-0.4c7.2,0,13.6,4.2,17.2,11.4l0.6,1.2\
                                                c0.6,1.3,1.9,1.9,3.2,2c1.3,0,2.6-0.8,3.1-2.1c1.3-2.7,2.6-4.8,4.3-6.6c3.5-3.7,8.5-5.9,13.7-5.9c4.5,0,8.8,1.5,12.1,4.5\
                                                c6.2,5.4,9.3,12.1,9.5,20.7C92.9,40.3,91.6,43.4,90.3,46z"/>\
                                            </g>\
                                        </svg>';
                heartIcon.className = 'heart_icon';
                heartIcon.id = item;
                tdSubFeatures.appendChild(heartIcon);
    
                var heartText = document.createElement('span'); //收藏文字
                heartText.innerText = '收藏';
                heartIcon.appendChild(heartText);

                if(itemInfo.split('|')[4]=="false"){ //從session取得是否收藏餐點
                    isSwitch=0;    
                }else{
                    isSwitch=1;
                }
                
                isSwitch = iconSwitch(heartIcon, "b", "f35186", isSwitch); //有收藏餐點的話點亮收藏icon

                storage[item] = itemInfo.split('|')[0] + "|" + //更新session
                                  itemInfo.split('|')[1] + "|" +
                                  itemInfo.split('|')[2] + "|" +
                                  itemInfo.split('|')[3] + "|" +
                                  isSwitch; 

                heartIcon.addEventListener('click',function(e){ //為收藏icon綁定事件
                    var itemId = this.getAttribute('id'); 

                    heartClick(e);
                    if(storage.getItem(itemId).split('|')[4]=="false"){ //從session取得是否收藏餐點
                        isSwitch=0;    
                    }else{
                        isSwitch=1;
                    }
                    // alert(isSwitch);
                    isSwitch = iconSwitch(this, "b", "f35186", isSwitch); //有收藏餐點的話點亮收藏icon
                    storage[itemId] = storage.getItem(itemId).split('|')[0] + "|" + //更新session
                                      storage.getItem(itemId).split('|')[1] + "|" +
                                      storage.getItem(itemId).split('|')[2] + "|" +
                                      storage.getItem(itemId).split('|')[3] + "|" +
                                      isSwitch; 

                    //=====使用Ajax,更新登入者收藏資訊 
                    var xhr = new XMLHttpRequest();
                    
                    xhr.onload = function (){
                        if( xhr.status == 200){
                            // alert("收藏資料修改成功");
                        }else{
                            alert(xhr.status);
                        }
                    }
                    xhr.open("post", "heartDataUpdate.php", true);
                    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
                    var data_info = "mealstate=" + isSwitch + //餐點收藏狀態
                                    "&mealNo=" + itemId; //餐點編號

                    // alert(data_info);
                    xhr.send(data_info);
                });
    
                var trashIcon = document.createElement('p'); //刪除的icon
                trashIcon.innerHTML = '<svg version="1.1" id="圖層_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
                                            viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">\
                                            <g>\
                                                <path class="st1" d="M8.4,32.2c-1.6,0-2.9,0-4.2,0c-2.1,0-3.8-1.3-4-3C-0.1,26,0,22.9,0.4,19.8c0.8-5,6.6-9,12.6-9.1\
                                                    c5.1,0,10.1,0,15.2,0h1c0.3-3.7,2.6-7.1,6.4-9.1C37.4,0.5,39.7,0,42,0c5.3,0,10.6,0,15.9,0C64.5,0.1,70,4.3,70.8,9.9\
                                                    c0,0.2,0,0.4,0.1,0.8h16.4c6.8,0.2,12.3,4.9,12.7,10.7c0,2.2,0,4.4,0,6.6c0,2.7-1.6,4.1-4.8,4.1H16.7v1.4c0,17.3,0,34.7,0,52\
                                                    c0,4.7,3,7.3,8.5,7.3h49.1c0.7,0,1.4,0,2.1-0.1c4.4-0.5,6.9-3,6.9-6.9c0-8.7,0-17.4,0-26.1c0-6.7,0-13.4,0-20.1c0-2.4,1.7-4,4.2-4\
                                                    s4.2,1.6,4.2,4c0,15.3,0,30.6,0,46C91.3,93.5,84,99.7,74.9,100c-16.6,0-33.2,0-49.8,0c-8.7,0-16.7-6.8-16.7-14.3\
                                                    c0-17.4,0-34.7,0-52.1C8.4,33.1,8.4,32.7,8.4,32.2z M91.6,25c0-1.5,0.1-2.9,0-4.3c0-1.5-1.4-2.7-3.2-2.7c-0.5,0-1,0-1.6,0H23.1\
                                                    c-3.5,0-7.1,0-10.7,0c-2.4,0-3.6,0.7-3.9,2.4c-0.1,1.5-0.1,3.1,0,4.6H91.6z M62.4,10.7c0-2.4-1.2-3.5-3.8-3.5c-2.7,0-5.1,0-7.7,0\
                                                    c-3.2,0-6.4,0-9.6,0c-2.6,0-4,1.4-3.6,3.5H62.4z"/>\
                                                <path class="st1" d="M37.5,62.5c0,6.5,0,13,0,19.5c0.1,2-1.7,3.6-4,3.7c-1.9,0.1-3.6-1-4.1-2.6c-0.1-0.4-0.2-0.8-0.2-1.3\
                                                    c0-12.9,0-25.7,0-38.6c-0.2-2,1.6-3.7,3.9-3.9s4.3,1.3,4.5,3.3c0,0.2,0,0.4,0,0.5C37.6,49.6,37.5,56.1,37.5,62.5z"/>\
                                                <path class="st1" d="M54.2,62.6c0,6.5,0,13,0,19.5c0.2,2-1.5,3.7-3.8,3.9c-2.1,0.2-4.1-1.1-4.5-2.9c-0.1-0.4-0.2-0.7-0.2-1.1\
                                                    c0-13,0-26,0-38.9c-0.1-2,1.6-3.7,4-3.8c2.3-0.1,4.3,1.4,4.4,3.4c0,0.2,0,0.3,0,0.5C54.2,49.7,54.2,56.1,54.2,62.6L54.2,62.6z"/>\
                                                <path class="st1" d="M62.5,62.5c0-6.5,0-13.1,0-19.6c0-1.8,1.5-3.4,3.7-3.6c2.1-0.2,4.1,1,4.6,2.7c0.1,0.4,0.1,0.7,0.1,1.1\
                                                    c0,12.9,0,25.8,0,38.7c0,2.8-2.9,4.7-5.8,3.6c-1.7-0.6-2.7-2-2.6-3.5C62.5,75.4,62.5,69,62.5,62.5z"/>\
                                            </g>\
                                        </svg>';
                trashIcon.className = 'trash_icon';
                trashIcon.id = item;
                tdSubFeatures.appendChild(trashIcon);
    
                var trashText = document.createElement('span'); //刪除的文字
                trashText.innerText = '刪除';
                trashIcon.appendChild(trashText);
    
                var isSwitcha = true; 
                trashIcon.addEventListener('click',function(e){ //為刪除的icon綁定事件
                    trashClick(e);
                    isSwitcha = iconSwitch(this, "a", "0766ff", isSwitcha);
                    deleteItem.call(this);
                    // alert(isSwitch);
                    
                });
                
            }
       }
    }
}
function deleteItem() {

    var itemId = this.getAttribute('id');

    total -= storage.getItem(itemId).split('|')[2] * storage.getItem(itemId).split('|')[3];

    itemTime -= 15;
    document.getElementsByClassName('taketime_t')[0].innerText = itemTime;
    document.getElementsByClassName('taketime_t')[1].innerText = itemTime;

    itemSum -= storage.getItem(itemId).split('|')[3];
    document.getElementsByClassName('shopping_number_t')[0].innerText = itemSum;
    document.getElementsByClassName('shopping_number_t')[1].innerText = itemSum;

    document.getElementsByClassName('shopping_sum_t')[0].innerText = "NT$ " + total;
    document.getElementsByClassName('shopping_sum_t')[1].innerText = "NT$ " + total;

    Bonus = memberBonus > total*0.2 ? total*0.2 : memberBonus; 
    document.getElementsByClassName('groupon_bonus_t')[0].innerText = "NT$ " + Bonus;
    document.getElementsByClassName('groupon_bonus_t')[1].innerText = "NT$ " + Bonus;

    document.getElementsByClassName('memOrder_amount_t')[0].innerText = "NT$ " + (total - Bonus);
    document.getElementsByClassName('memOrder_amount_t')[1].innerText = "NT$ " + (total - Bonus); 
        
    storage.removeItem(itemId);
    storage['addItemList'] = storage.getItem('addItemList').replace(itemId + ',', '');
    
    thid = this.getAttribute('id');
    document.querySelector('.' + thid).style.opacity = 0;

    setTimeout(function(){
        document.querySelector('.' + thid).
        parentNode.removeChild(document.querySelector('.' + thid));
        document.querySelector('.' + thid).
        parentNode.removeChild(document.querySelector('.' + thid));

        if(storage.addItemList != '') {
            $class('notMealYet')[0].style.display = 'none';
        } else {
            $class('notMealYet')[0].style.display = 'block';
        }
    },1000);

    if($class('shopping_list')[0].children.length > 0) {
        $class('notMealYet')[0].style.display = 'none';
    } else {
        $class('notMealYet')[0].style.display = 'block';
    }
}

// 點擊下一步按鈕

var shoppingNextButton = document.querySelector('#shopping_Next_button');
var shoppingPreButton = document.querySelector('#shopping_pre_button');
var checkoutImmediatelyButton = document.querySelector('#checkout_immediately_button');

shoppingPreButton.addEventListener('click', windowMove);
shoppingNextButton.addEventListener('click', windowMove1);
checkoutImmediatelyButton.addEventListener('click', windowMove2, true);

var stepBox = document.querySelectorAll('.step_box');
var stepContainMask = document.querySelector('.step_contain_mask');

// stepBox[0].addEventListener('click', windowMove);

var stepPosition = 1;
    
function windowMove(){
    stepContainMask.style.transform = "translateX(0%)";
    // stepContainMask.style.height = "50vh";
    
    stepPosition = 1;
    stepBoxAnimation();
}

function windowMove1(){
    stepContainMask.style.transform = "translateX(-33.33333333%)";
    // stepContainMask.style.height = "50vh";
    
    // stepBox[1].addEventListener('click', windowMove1);
    stepPosition = 2;
    stepBoxAnimation();
}

function windowMove2(){
 
    stepContainMask.style.transform = "translateX(-66.66666666%)";
    // stepContainMask.style.height = "100vh";

    //=====使用Ajax,新增購物車訂單 
    var xhr = new XMLHttpRequest();
      xhr.onload = function (){
        if( xhr.status == 200){
            // alert("下單成功");
            swal("下單成功", "", "success");
        }else{
            alert(xhr.status);
        }
    }
    xhr.open("post", "cartDataUpdate.php", true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");

    var data_info = "memOrderAmount=" + (total - Bonus) + //訂單金額
                    "&memOrderTakeTime=" + itemTime + //取餐等待時間                    
                    "&mealNo=" + storage.getItem('addItemList') + //餐點編號
                    "&mealQuantity=" + mealQuantity_list + //餐點數量
                    "&memberbuyCount=" + itemSum + //餐點購買總數
                    "&memberBonus=" + Bonus; //會員所消耗購物金
    // alert(data_info);
    xhr.send(data_info);
 
    //給步驟按鈕click添加事件
    // stepBox[2].addEventListener('click', windowMove2);
    stepPosition = 3;
    stepBoxAnimation();
}

stepBoxAnimation();

function stepBoxAnimation(){

    for(i=0;i<3;i++){
        stepBox[i].children[0].children[0].style.color = "#76391B";
        stepBox[i].children[0].style.background = "#fcf2ca";
    }
    
    switch(stepPosition){
        case 3:
            stepBox[2].children[0].children[0].style.color = "#fcf2ca";
            stepBox[2].children[0].style.background = "#76391B";
            stepBox[2].children[0].style.cursor = "pointer";
        
        case 2:
            stepBox[1].children[0].children[0].style.color = "#fcf2ca";
            stepBox[1].children[0].style.background = "#76391B";
            stepBox[1].children[0].style.cursor = "pointer";
        
        case 1:
            stepBox[0].children[0].children[0].style.color = "#fcf2ca";
            stepBox[0].children[0].style.background = "#76391B";
            stepBox[0].children[0].style.cursor = "pointer";
        
        break;
    }                
}

window.addEventListener('load', doFirst);












