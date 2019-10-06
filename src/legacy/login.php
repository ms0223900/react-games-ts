<input type="checkbox" id="close-login" checked>
	<div id="login-wrap">
		<div class="login-wrap">
			<label for="close-login" class="close-login btn-cup"></label>
			<input type="radio" name="cover-item" id="to-sigin" checked>
			<input type="radio" name="cover-item" id="to-get-Psw">
			<input type="radio" name="cover-item" id="to-sigup">
			<div class="login-mark clearfix">
				<label for="to-sigin" class="sig-in btn-cup">登入</label>
				<label for="to-sigup" class="sig-up btn-cup">註冊</label>	
			</div>

			<!-- 登入 -->
			<div class="login-mark-cetentier to-sigin clearfix">
				<form action="" method="POST" onsubmit="return checkSubmit()" class="login-form">
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
				<label for="to-get-Psw" class="cover-run to-Psw btn-cup">忘記密碼?</label>
			</div>
			<!-- 註冊 -->
			<div class="login-mark-cetentier to-sigup clearfix">
				<form action="" method="POST" id="check-sigup-form" onsubmit="return checkSubmit()" class="login-form">
					<div class="input-wrap longing-input">
						<input type="text" id="sigup-member-Id" class="input-mem need-check need-check-id"required>
						<label for="sigup-member-Id" class="input-pl" maxlength="40">帳號</label>
						<label for="sigup-member-Id"><img src="images/icon/user.svg"></label>
						<img src="images/icon/checkN.svg" class="check"></div>
					<div class="input-wrap longing-input">
						<input type="password" id="sigup-member-Psw" class="input-mem need-check need-check-psw" maxlength="6" required>
						<label for="sigup-member-Psw" class="input-pl">密碼</label>
						<label for="sigup-member-Psw"><img src="images/icon/lock.svg"></label>
						<img src="images/icon/eye_n.png" class="eye"><img src="images/icon/checkN.svg" class="check"></div>
					<div class="input-wrap longing-input">
						<input type="text" id="sigup-member-Nick" class="input-mem need-check need-check-nick" maxlength="10" required>
						<label for="sigup-member-Nick" class="input-pl">暱稱</label>
						<label for="sigup-member-Nick"><img src="images/icon/lock.svg"></label><img src="images/icon/checkN.svg" class="check"></div>
					<div class="input-wrap longing-input">
						<input type="text" id="sigup-email" class="input-mem need-check need-check-email" required>
						<label for="sigup-email" class="input-pl">email</label>
						<label for="sigup-email" ><img src="images/icon/email.svg"></label>
						<img src="images/icon/checkN.svg" class="check"></div>
					<div class="cover-run-wrap">
						<button type="submit" class="btn-cup nextBTN" id="sigupSubmit">註冊</button>
						
					</div>
				</form>
			</div>
			<!-- 忘記密碼 -->
			<div class="login-mark-cetentier to-get-Psw clearfix">
				<form action="" method="POST" onsubmit="return checkSubmit()" class="login-form" id="check-getPsw-form">
					<div class="input-wrap longing-input">
						<input type="text" id="get-Psw-member-Id" class="input-mem" required>
						<label for="get-Psw-member-Id" ><img src="images/icon/user.svg"></label>
						<label for="get-Psw-member-Id" class="input-pl">帳號</label>
					</div>
					<div class="input-wrap longing-input">
						<input type="text" id="get-Psw-member-Psw" class="input-mem need-check need-check-email" required>
						<label for="get-Psw-emailmember-Psw" class="input-pl">email</label>
						<label for="get-Psw-emailmember-Psw"><img src="images/icon/lock.svg"></label>
						<img src="images/icon/checkN.svg" class="check"></div>
					<div class="cover-run-wrap"> 
						<button type="submit" class="btn-cup nextBTN" id="getPswSubmit">重設密碼</button>
						
					</div>
				</form>
			</div>
		</div>
				
	</div>
<script>
	function $id(id) {
		return document.getElementById(id);
	}
	function $class(className) {
		return document.getElementsByClassName(className);
	}
	function $all(all) {
		return document.querySelectorAll(all);
	}
	function checkSubmit() {
	  return false;
	}
	window.addEventListener('load', function() {
		<?php if(isset($_SESSION['member_No']) == false ) {
			echo "document.getElementsByClassName('hoverBox')[0].style.display = 'none';";	
		} else {
			echo "document.getElementsByClassName('hoverBox')[0].style.display = 'block';";	
		}?>
		if($class('swal-button--confirm').length > 0) {
			$class('swal-button--confirm')[0].onclick = function() {
			location.reload();
			}
			$class('swal-overlay--show-modal')[0].onclick = function() {
				location.reload();
			}
		} 
		
	})
</script>
