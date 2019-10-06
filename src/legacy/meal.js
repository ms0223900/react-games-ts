function showDishes(jsonStr,no){
  var dishes = JSON.parse(jsonStr);
  console.log(typeof(dishes));
  console.log(dishes);  
  console.log(no);
 
 

  var content = `
                        <div class="d-flex form-group">   
                         <label for="viewMealNo" class="col-form-label title-width">餐點編號</label>
                         <input type="text" class="form-control" id="viewMealNo" value="${dishes.meal_No}" readonly>
                          </div>
                          <div class="d-flex form-group">
                           <label for="viewMealGenre" class="title-width">餐點類別</label>
                           <select class="form-control change-select" id="viewMealGenre" name>
                             <option value="3">拉麵</option>
                              <option value="2">丼飯</option>
                               <option value="6">鍋物</option>
                               <option value="4">定食</option>
                               option value="1">便當</option>
                               <option value="5">素食</option>
                             </select> 
                              </div>
                              <div class="d-flex form-group">
                                   <label for="viewMealName" class="col-form-label title-width">餐點名稱</label>
                                    <input type="text" class="form-control change" id="viewMealName" value="${dishes.meal_Name}" >
                               </div>
                               <div class="d-flex form-group">
                                    <label for="viewMealPrice" class="col-form-label title-width">餐點單價</label>
                                     <input type="text" class="form-control change" id="viewMealPrice" value="${dishes.meal_Price}" >
                               </div>
                                 <div class="d-flex form-group">
                                 <label for="viewMealInfo" class="col-form-label title-width">餐點介紹</label>
                                   <textarea class="form-control change" id="viewMealInfo" rows="3">${dishes.meal_Info}</textarea>
                                    </div>
                                <div class="d-flex form-group">
                               <label for="viewMealCal" class="col-form-label title-width">餐點卡路里</label>
                                     <input type="text" class="form-control change" id="viewMealCal" value="${dishes.meal_Cal}" >
                                    </div>
                              <div class="d-flex form-group">
                                   <label for="viewMealSold" class="title-width">餐點狀態</label>
                                   <select class="form-control change-select" id="viewMealSold">
                                    <option>上架</option>
                                     <option>下架</option>
                                  </select>
                                </div>
                               <div class="d-flex form-group">
                                 <label for="viewMealCount" class="col-form-label title-width">評分次數</label>
                                  <input type="text" class="form-control"  value="${dishes.meal_Count}" readonly>
                              </div>
                                    <div class="d-flex form-group">
                                 <label for="viewMealTotal" class="col-form-label title-width">評分總分</label>
                                 <input type="text" class="form-control"  value="${dishes.meal_Total}" readonly>
                              </div>
                                <div class="d-flex form-group">
                                   <label for="viewMealPic" class="title-width">修改餐點圖片</label>
                                </div>
                            `;   
   

// alert(content);

    document.querySelector("tr:nth-child(1) td:nth-child(9) .modal-body form").innerHTML = content;
    // document.querySelectorAll(".modal-body")[no].innerHTML = content;
    // console.log( document.querySelectorAll(".modal-body")[2].innerHTML = content);   
  };
  

  

function getDishes(no){
  var xhr = new XMLHttpRequest();
  xhr.onload=function (){
       if( xhr.status == 200 ){
          if( xhr.responseText.indexOf("not found") != -1){
            document.querySelector(".modal-body").innerHTML = "<center>查無資料</center>";
          } else {
            showDishes(xhr.responseText,no); 
          }
          
       }else{
          alert(xhr.status);
       }
  }
  
  var url = "meal.php?meal_No=" + no;
  xhr.open("get", url, true);
  xhr.send( null );
}