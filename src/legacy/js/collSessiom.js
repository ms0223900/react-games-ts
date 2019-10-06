var storage = sessionStorage;

function doFirst(){

	if(storage['addItemList']==null){
		storage['addItemList'] ='';  //storage.setItem('addItemList','');
	}
	// 幫給個add Cart建事件聆聽功能。
	var list = document.querySelectorAll('.coll_food_shop'); //list是陣列
	console.log(list);
	for(var i=0; i<list.length;i++){
		list[i].addEventListener('click',function(){
			alert('該餐點已加入購物車');
			var collsadd = document.querySelector('#'+this.id+' input').value; //('#A1001_input').value
			addItem(this.id, collsadd);
		});
	}

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
