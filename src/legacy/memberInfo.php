
<?php
if(isset($_SESSION["member_Id"])){
	$memId = $_SESSION["member_Id"];
	try{
		require_once("connectMember.php");
		$sql1 = "select * from member where member_Id = '$memId'";
		$member = $pdo -> query( $sql1 );

		//購物數量 member_buyCount 
		
		  if( $member->rowCount() != 0){

			$memRow = $member->fetchObject();//撈會員資料
			$buyCount = $memRow->member_buyCount; //存購買數量
			$sql2 = "select * from achievement where meal_Total <= :meal_Total order by achievement_No desc";	//比對成就條件，如果購買數量大於成就條件，撈出來，用成就編號大到小
			$achievement = $pdo->prepare($sql2); 
			$achievement->bindValue(":meal_Total", (int)$buyCount);
			$achievement->execute();
			$achievementRow = $achievement->fetchObject();//撈成就資料一次。
			//登入成功, 寫入session
			$_SESSION["member_No"] = $memRow->member_No; // 會員編號
			//是否從別支程式跳轉過來
			//   print_r($memRow);
			?>
			<div>
				<a href="member.php">
					<img src="images/member_pic/<?php echo $memRow->member_Pic?>" alt="member-Pic" class="member-Pic">
				</a>
			</div>
			<div>
				<span><img src="images/achieve/<?php echo $achievementRow->achievement_Pic ?>" width="30" alt="achievement-Pic" class="achievement-Pic"><?php echo $memRow->member_buyCount ?> </span><br>
				<span><?php echo $memRow->member_Nick ?></span>
			</div>
	
			<?php
	
		  }
	  }catch(PDOException $ex){
		echo "資料庫操作失敗,原因：",$ex->getMessage(),"<br>";
		echo "行號：",$ex->getLine(),"<br>";
	  }
}else{
	?>

		<div>
				<a href="member.php">
					<img src="images/" alt="member-Pic" class="member-Pic">
				</a>
		</div>
		<div>
			<span><img src="images/icon/riceball_white.svg" width="30" alt="achievement-Pic" class="achievement-Pic"></span><br>
			<span></span>
		</div>
	<?php
}
?>



