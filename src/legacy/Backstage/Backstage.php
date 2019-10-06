<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" contet="IE=edge,chrome=1">
<title>後台登入</title>
<meta name="description" content="">
<meta name="keywords" content="">
<link href="../css/BackstageLogin.css" rel="stylesheet">
</head>
<body>
	<input type="checkbox" id="close-login" checked>
		<div id="login-wrap">
			<div class="login-wrap">
				<input type="radio" name="cover-item" id="to-sigin" checked>
				<input type="radio" name="cover-item" id="to-get-Psw">
				<input type="radio" name="cover-item" id="to-sigup">
				<div class="login-mark clearfix">
					<label for="to-sigin" class="sig-in btn-cup">管理員登入</label>
					<!-- <label for="to-sigup" class="sig-up btn-cup">註冊</label>	 -->
				</div>

				<!-- 管理員登入 -->
				<div class="login-mark-cetentier to-sigin clearfix">
						<div class="input-wrap longing-input">
							<input type="text" id="sigin-manager-Id" class="input-mem" required>
							<label for="sigin-manager-Id" class="input-pl">帳號</label>
							<label for="sigin-manager-Id"><img src="../images/icon/user.svg"></label>
						</div>
						<div class="input-wrap longing-input">
							<input type="password" id="sigin-manager-Psw" class="input-mem" required>
							<label for="sigin-manager-Psw" class="input-pl">密碼</label>
							<label for="sigin-manager-Psw"><img src="../images/icon/lock.svg"></label>
							<img src="../images/icon/eye_n.png" class="eye"></div>
						<div class="cover-run-wrap">
							<button type="button" class="btn-cup nextBTN" id="siginSubmit">管理員登入</button>
						</div>
				</div>								
			</div>
		</div>
	<script>
			document.getElementById("siginSubmit").addEventListener('click',function(){
			//=====使用Ajax,新增成就 
			var xhr = new XMLHttpRequest();
			xhr.onload = function (){
				if(xhr.status == 200){
					if(xhr.responseText==0){ //此管理員帳密回傳的筆數
						alert("管理員帳密錯誤");	
						window.history.go(0); //管理員登入失敗後重新整理頁面
					}else{
						alert("管理員登入成功");
						document.location.href= "backstage-meal.php"; //管理員登入成功後跳轉頁面
					}
				}else{
					alert("管理員帳密錯誤");	
				}
			}

			xhr.open("post", "Backstage-login.php", true);
			xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
			var data_info = "siginManagerId=" + document.getElementById("sigin-manager-Id").value + //管理員帳號
											"&siginManagerPsw=" + document.getElementById("sigin-manager-Psw").value; //管理員密碼;
																		
			// alert(data_info);
			xhr.send(data_info);
									
		});
	</script>
</body>
</html>