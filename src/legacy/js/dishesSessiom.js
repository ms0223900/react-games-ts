var storage = sessionStorage;

function doFirst(){

    if(storage['addItemList']==null){
        storage['addItemList']= '';
    }
    var list = document.querySelectorAll('.food-button-buy'); 
    console.log(list);
    for(var i=0;i<list.length;i++){
        list[i].addEventListener('click',function(){
            var dishes = document.querySelector('#'+this.id+' input').value;
            // alert(dishes);
            var coll = document.querySelector('.mealState').value; 
            addItem(this.id, dishes + "|" + coll);
        });
    }
    // var coll = document.querySelectorAll('.food-button-save'); 
    // console.log(list);
    // for(var i=0;i<coll.length;i++){
    //     coll[i].addEventListener('click',function(){
            
    //         var coll = document.querySelector('#'+this.id+' .mealState').value;
    //         addItem(this.id, coll);
    //     });
    // }
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