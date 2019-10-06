<?php
	switch( $_FILES["upFile"]['error']){
		case UPLOAD_ERR_OK : 
			$dir = "../images/achieve/";
			if( file_exists($dir) == false){
				mkdir($dir);
			}
			$info = pathinfo($_FILES["upFile"]['name']);
			// $_FILES["upFile"]['name'] = $_POST["psn"] . "." . $info["extension"];
			$from = $_FILES["upFile"]['tmp_name'];
			$to = $dir . $_FILES["upFile"]['name'];
			copy($from, $to);

			echo "異動成功~<br>";
			break;
		case UPLOAD_ERR_INI_SIZE : 
			echo "上傳檔案太大,不可超過", ini_get("upload_max_filesize"),"<br>";	
			break;
		case UPLOAD_ERR_FORM_SIZE : 
			echo "上傳檔案太大,不可超過", $_POST["MAX_FILE_SIZE"],"<br>";	
			break;	
		case UPLOAD_ERR_PARTIAL : 
			echo "上傳檔案不完整,請重新上傳<br>";	
			break; 
		case UPLOAD_ERR_NO_FILE : 
			echo "没有挑選檔案<br>";	
			break;   
		default :
			echo "上傳檔案失敗，請通知系統維護人員<br>";
	}
	header('location:backstage-achievement.php');
?>