if(document.getElementById('control_chatBot')!=null){
	document.getElementById('control_chatBot').addEventListener('click',function () {
		document.getElementById('close_chatBot').checked=true;
		document.getElementById('navctrl').checked=false;
	});	
}
if(document.getElementById('control_login')!=null){
	document.getElementById('control_login').addEventListener('click',function () {
		document.getElementById('close_login').checked=false;
		document.getElementById('navctrl').checked=false;		
	});
}
if(document.getElementById('control_search')!=null){

	document.getElementById('control_search').addEventListener("click", function () {
		document.getElementById('close_search').checked = false;
		// document.getElementById('to_sigin').checked=true;
	}, false);
}

var eye = document.getElementsByClassName('eye');
var need_check_id = document.getElementById('sigup_member_Id');
var need_check_psw = document.getElementById('sigup_member_Psw')
var need_check_nick = document.getElementById('sigup_member_Nick');
var need_check_email = document.getElementsByClassName('need_check_email');
var newPlace = "<div class='login_placeholder'></div>";
var checkAry = [];

var memCheckReg = new RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/) (\<)(\>)(\?)(\)]+/);

var emailCheckReg = new RegExp(/[(\ )(\~)(\!)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\/) (\<)(\>)(\?)(\)]+/);


need_check_id.addEventListener('input',function () {	//帳號
	this.parentNode.lastChild.style.display='block';
	var VL = this.value.length;
	var hasNumABC = false;
	var temp = this.value.toUpperCase().split("");
	var temp2 = memCheckReg.test(this.value);
		for( let i=0; i<temp.length; i++){
			var char = temp[i];
			if( char >= '0' && char <= '9'){
				hasNumABC = true;
			}else if(char >= 'A' && char <= 'Z'){
				hasNumABC = true;
			}else if(temp2==true){
				hasNumABC = false;
				break;
			}else{
				hasNumABC = false;
				break;
			}
		}
	if( hasNumABC===false ){   // 1111111
		this.parentNode.lastChild.src='images/checkN.svg';
		$(this).parent().append(newPlace);
		$(this).parent().find($('.login_placeholder')).text("請用英文或數字");
		checkAry[1]=false;
	}else if(VL < 3 || VL > 40 || this.value == ""){	
		var PlaceholderLenght = 3 - need_check_id.value.length;
		this.parentNode.lastChild.src='images/checkN.svg';
		$(this).parent().append(newPlace);
		$(this).parent().find($('.login_placeholder')).text("還差"+ PlaceholderLenght+"個字");
	
		checkAry[1]=false;
	}else{
		$(this).parent().find($('.login_placeholder')).remove();
		this.parentNode.lastChild.src='images/checkY.svg';
		
		checkAry[1]=true;					

	}
});

need_check_psw.addEventListener('input',function () {	//密碼
	this.parentNode.lastChild.style.display='block';
	var VL = this.value.length;
	var hasNumABC = false;
	var temp = this.value.toUpperCase().split("");
	var temp2 = memCheckReg.test(this.value);
		for( let i=0; i<temp.length; i++){
			var char = temp[i];
			if( char >= '0' && char <= '9'){
				hasNumABC = true;
			}else if(char >= 'A' && char <= 'Z'){
				hasNumABC = true;
			}else if(temp2==true){
				hasNumABC = false;
				break;
			}else{
				hasNumABC = false;
				break;
			}
		}
	if( hasNumABC===false ){   // 1111111
		this.parentNode.lastChild.src='images/checkN.svg';
		$(this).parent().append(newPlace);
		$(this).parent().find($('.login_placeholder')).text("請用英文或數字");
		this? this.preventDefault() : event.returnValue = false;
		checkAry[2]=false;
	}else if(VL < 3 || VL > 40 || this.value == ""){	
		var PlaceholderLenght = 3 - need_check_psw.value.length;
		this.parentNode.lastChild.src='images/checkN.svg';
		$(this).parent().append(newPlace);
		$(this).parent().find($('.login_placeholder')).text("還差"+ PlaceholderLenght+"個字");
	
		checkAry[2]=false;
	}else{
		$(this).parent().find($('.login_placeholder')).remove();
		this.parentNode.lastChild.src='images/checkY.svg';
		
		checkAry[2]=true;					

	}
});

need_check_nick.addEventListener('input',function () {	//暱稱
	this.parentNode.lastChild.style.display='block';
	var VL = this.value.length;
	var hasNumABC = true;
	var temp2 = memCheckReg.test(this.value);
		for( let i=0; i<VL; i++){
			if(temp2==true){
				hasNumABC = false;
				break;
			}
		}
	if( hasNumABC===false ){   // 1111111
		this.parentNode.lastChild.src='images/checkN.svg';
		$(this).parent().append(newPlace);
		$(this).parent().find($('.login_placeholder')).text("請用英文或數字");
		checkAry[3]=false;
	}else if(VL < 1 || VL > 10){
		this.parentNode.lastChild.src='images/checkN.svg';
		$(this).parent().append(newPlace);
		$(this).parent().find($('.login_placeholder')).text("店員將以此名稱呼您");
		$(this).parent().find($('.login_placeholder')).style.width='80%';
		checkAry[3]=false;	
	}else{
		$(this).parent().find($('.login_placeholder')).remove();
		this.parentNode.lastChild.src='images/checkY.svg';
		checkAry[3]=true;
	}			
});
need_check_email[0].addEventListener('change',function () {	//註冊信箱
	this.parentNode.lastChild.style.display='block';
	var VL = this.value.length;
	var hasNumABC = true;
	var temp2 = emailCheckReg.test(this.value);
		for( let i=0; i<VL; i++){
			if(temp2==true){
				hasNumABC = false;
				break;
			}
		}
	if( hasNumABC===false ){   // 1111111
		this.parentNode.lastChild.src='images/checkN.svg';
		$(this).parent().append(newPlace);
		$(this).parent().find($('.login_placeholder')).text("email格式有誤");
		checkAry[4]=false;
	}else if(this.value.indexOf('@') < 1  || this.value.indexOf('.com') < 1){
		this.parentNode.lastChild.src='images/checkN.svg';
		$(this).parent().append(newPlace);
		$(this).parent().find($('.login_placeholder')).text("請輸入email格式");
		this.parentNode.lastChild.src='images/checkN.svg';
		checkAry[4]=false;
	}else{
		this.parentNode.lastChild.src='images/checkY.svg';
		$(this).parent().find($('.login_placeholder')).remove();
		checkAry[4]=true;
	}		
});
need_check_email[1].addEventListener('change',function () {	//申請密碼信箱
	this.parentNode.lastChild.style.display='block';
	var VL = this.value.length;
	var hasNumABC = true;
	var temp2 = emailCheckReg.test(this.value);
		for( let i=0; i<VL; i++){
			if(temp2==true){
				hasNumABC = false;
				break;
			}
		}
	if( hasNumABC===false ){   // 1111111
		this.parentNode.lastChild.src='images/checkN.svg';
		$(this).parent().append(newPlace);
		$(this).parent().find($('.login_placeholder')).text("email格式有誤");
		checkAry[0]=false;
	}else if(this.value.indexOf('@') < 1  || this.value.indexOf('.com') < 1){
		this.parentNode.lastChild.src='images/checkN.svg';
		$(this).parent().append(newPlace);
		$(this).parent().find($('.login_placeholder')).text("請輸入email格式");
		this.parentNode.lastChild.src='images/checkN.svg';
		checkAry[0]=false;
	}else{
		$(this).parent().find($('.login_placeholder')).remove();
		this.parentNode.lastChild.src='images/checkY.svg';
		checkAry[0]=true;
	}		
});

function checkSubmit(a) {	//判斷是否填寫完整
	for (let i = a; i < 5; i++) {
		if(checkAry[a]==false){
			alert("內"+i +': '+checkAry[i]);
			return false;
		}
		alert("外"+i +': '+checkAry[i]);
		if(checkAry[i]==false){
			alert("內"+i +': '+checkAry[i]);
			return false;
		}
	}
	alert("YES");
	return true;
}
