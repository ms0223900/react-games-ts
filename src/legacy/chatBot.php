
	<label for="close-chatBot" class="close-chatBot"></label>
	<input type="checkbox" name="close-chatBot" id="close-chatBot" checked>
	<div id="chatBot" class="clearfix">
		<div class="chatBot-contenier-wrap">
			<h3>日食客服雞</h3>
			<label for="close-chatBot" class="close-chatBot"></label>
			<div id="chatBot-content" class="clearfix">
				<div id="chatBot-container">
					<p class="chatBot-content-A">HI! 很高興為您服務，您可以點擊下方關鍵字或是直接輸入詢問內容!</p><div style="clear:both"></div></div>
			</div>
			<ul class="chatBot-keyword clearfix">
				<?php
					require_once("connectBooks.php");
					$sql = "select * from chatbot where is_Available = '1'"; 
					$chatBot = $pdo->query( $sql);
					while ($BotRow = $chatBot->fetch(PDO::FETCH_ASSOC)) {
						?>
							<li><?php echo $BotRow["keyword"];?></li>
						<?php
					}
				?>
			</ul>
			<!-- <form action="http://localhost:3000/chatBot.html" method="get" class="chatBot-text-Wrap" name="chatBot"> -->
				<div class="chatBot-text-Wrap">
					<button type="submit" id="chatBot-search" class="nextBTN">送出</button>
					<input type="text" class="chatBot-text">
					<div id="UserText"></div>
				</div>
			
			<!-- </form> -->
		</div>
		<label for="close-chatBot" class="close-chatBot-pic">
			<img src="images/chatBot.svg" alt="日食客服機器人"  class="chatBot-pic">
			<span class="chatBot-shonw"></span>
		</label>
	</div>
