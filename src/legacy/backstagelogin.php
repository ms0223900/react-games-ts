<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>後台登入</title>

<meta name="description" content="">
<meta name="keywords" content="">
<link href="css/backstagelogin.css" rel="stylesheet">
</head>
<body>
    
	<div id="login-wrap">
		<div class="login-wrap">
			<div class="login-mark clearfix">
				<label for="to-sigin" class="sig-in btn-cup">登入</label>
			</div>

			<!-- 登入 -->
			<div class="login-mark-cetentier to-sigin clearfix">
				<form action="" method="POST"  class="login-form">
					<div class="input-wrap longing-input">
						<input type="text" id="sigin-member-Id" class="input-mem" required>
						<label for="sigin-member-Id" class="input-pl">帳號</label>
						<label for="sigin-member-Id"><img src="images/icon/user.svg"></label>
					</div>
					<div class="input-wrap longing-input">
						<input type="password" id="sigin-member-Psw" class="input-mem" required>
						<label for="sigin-member-Psw" class="input-pl">密碼</label>
						<label for="sigin-member-Psw"><img src="images/icon/lock.svg"></label>
						<img src="images/icon/eye_n.png" class="eye"></div>
					<div class="cover-run-wrap">
						<button type="submit" class="btn-cup nextBTN" id="siginSubmit">登入</button>
						
					</div>
	

				</form>
					
			</div>
			
			
		</div>
				
	</div>
<script>

	// 送出管理員帳密

	function $id(id) {
        return document.getElementById(id);
      }

	function owl(){
      //=====使用Ajax 回server端,取回登入者姓名, 放到頁面上 
      var xhr = new XMLHttpRequest();
      xhr.onload = function (){
        if( xhr.status == 200){
          if(xhr.responseText.indexOf("not found") != -1){ //回傳的資料中有not found
            alert("帳密錯誤");
          }else{ //登入成功 
             // alert(xhr.responseText);
             window.location.href="backstage.html"

          }
        }else{
          alert(xhr.status);
        }
      }
      xhr.open("post", "ajaxbacklogin.php", true);
      xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
      var data_info = "sigin-member-Id=" + document.getElementById("sigin-member-Id").value + "&sigin-member-Psw=" + document.getElementById("sigin-member-Psw").value;
      xhr.send(data_info);
    }

    document.getElementById("siginSubmit").addEventListener('click',owl,false);

</script>

</body>
</html>