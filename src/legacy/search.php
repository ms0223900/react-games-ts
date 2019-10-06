	<input type="checkbox" id="close-search" checked>
	
	<div class="search-wrap">
		<label for="close-search" class="close-search"></label>
		<div action="" class="search-bg" id="GOsearch">
			<!-- 頁籤類別 -->
			<input type="radio" name="bookmark" id="bookmark-meal" value="meal" checked>
			<input type="radio" name="bookmark" id="bookmark-groupon" value="groupon">
			<div class="bookmark">
				<label for="bookmark-meal" id="bookmark-animation-meal">餐點</label>
				<label for="bookmark-groupon" id="bookmark-animation-groupon">飯團</label>
			</div>

			<!-- 輸入關鍵字區 -->
			<div class="input-wrap">
				<input type="text" id="input-search-meal" class="input-search" maxlength="30" placeholder="請輸入餐點關鍵字" >
				<input type="text" id="input-search-groupon" class="input-search" maxlength="30" placeholder="請輸入飯團關鍵字" style="display:none;">
				<div  id="start-search" class="mainBTN">搜尋<span class="search-img"><img src="images/icon/search.svg" alt="搜尋" class="img-search"></span></div>
			</div>
			<!-- 頁籤類別內容-餐點 -->
			<div class="bookmark-cetentier bookmark-meal">
				<!-- 餐點類別 -->
				<div class="bookmark-cetentier-item bookmark-meal-item clearfix">
					<?php require_once("searchMealGenre.php"); ?>
				</div>
				<!-- 顯示更多按鈕 -->
				<input type="checkbox" id="bookmark-cetentier-more-meal">
				<label for="bookmark-cetentier-more-meal" class="bookmark-cetentier-more meal">顯示更多 +</label>
				<!-- 卡路里 -->
				<div class="bookmark-cetentier-item bookmark-meal-item clearfix">
					<span>卡路里</span>
					<div>
						<input type="checkbox" name="meal-Cal" id="meal-Cal1" value="300">
						<input type="checkbox" name="meal-Cal" id="meal-Cal2" value="600">
						<input type="checkbox" name="meal-Cal" id="meal-Cal3" value="900">
						<input type="checkbox" name="meal-Cal" id="meal-Cal4" value="901">

						<label for="meal-Cal1" class="meal-Cal">300以下</label>
						<label for="meal-Cal2" class="meal-Cal">301-600</label>
						<label for="meal-Cal3" class="meal-Cal">601-900</label>
						<label for="meal-Cal4" class="meal-Cal">901以上</label>
					</div>
				</div>
				<!-- 金額限制 -->
				<div class="bookmark-cetentier-item bookmark-meal-item clearfix">
					<span>價格</span>
					<input type="text" name="meal-Price" class="meal-Price" id="meal-Price1" placeholder="最低金額">
					<span>~</span>
					<input type="text" name="meal-Price" id="meal-Price2" placeholder="最高金額">
				</div>
			</div>
			<!-- 頁籤類別內容-飯團 -->
			<div class="bookmark-cetentier bookmark-groupon">
				<!-- TAG標籤 -->
				<div class="bookmark-cetentier-item bookmark-groupon-item clearfix">
					<div class="tagname-wrap clearfix">
						<?php require_once("searchTag.php"); ?>
					</div>
				</div>
				<!-- 顯示更多按鈕 -->
				<input type="checkbox" id="bookmark-cetentier-more-groupon">
				<label for="bookmark-cetentier-more-groupon" class="bookmark-cetentier-more groupon">顯示更多 +</label>
				<!-- 餐數篩選 -->
				<div class="bookmark-cetentier-item bookmark-groupon-item clearfix">
					<span>飯團餐數</span>
					<div>
						<input type="checkbox" name="grouponList-No" class="grouponList" id="grouponList-No1" value="3">
						<input type="checkbox" name="grouponList-No" class="grouponList" id="grouponList-No2" value="7">
						<input type="checkbox" name="grouponList-No" class="grouponList" id="grouponList-No3" value="8">

						<label for="grouponList-No1" class="grouponList-No">1~3餐</label>
						<label for="grouponList-No2" class="grouponList-No">4~7餐</label>
						<label for="grouponList-No3" class="grouponList-No">7餐以上</label>
					</div>
				</div>
				<!-- 價格篩選 -->
				<div class="bookmark-cetentier-item bookmark-groupon-item clearfix">
					<span>平均價格</span>
					<div>
						<input type="checkbox" name="groupon-avg" id="groupon-avg1" value="70">
						<input type="checkbox" name="groupon-avg" id="groupon-avg2" value="100">
						<input type="checkbox" name="groupon-avg" id="groupon-avg3" value="200">
						<input type="checkbox" name="groupon-avg" id="groupon-avg4" value="300">
						<input type="checkbox" name="groupon-avg" id="groupon-avg5" value="301">

						<label for="groupon-avg1" class="groupon-avg">1~70元</label>
						<label for="groupon-avg2" class="groupon-avg">71~100元</label>
						<label for="groupon-avg3" class="groupon-avg">101~200元</label>
						<label for="groupon-avg4" class="groupon-avg">201~300元</label>
						<label for="groupon-avg5" class="groupon-avg">301以上</label>
					</div>
				</div>
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

		var kw; 
		$id('start-search').onclick = function() {
			// alert('11');
		} 
		
		
		//預設是餐點
		// var gValue = $id('input-search-groupon').value;
		// var mValue = $id('input-search-meal').value;
		$id('start-search').onclick = function() {
			kw = $id('input-search-meal').value;
			// console.log(kw);
			location.href = 'dishes.php?search=' + kw; //暫時先跳轉
			
		}

		//預設是餐點
		$id('bookmark-animation-meal').addEventListener('click', function() {
			
			$id('input-search-groupon').style.display = 'none';
			$id('input-search-meal').style.display = 'block';
			if(gValue != '') {
				mValue = gValue;
			}
			$id('start-search').onclick = function() {
				kw = $id('input-search-meal').value;
				// console.log(kw);
				location.href = 'dishes.php?search=' + kw; //暫時先跳轉
			}
		})
		


		//飯團
		$id('bookmark-animation-groupon').addEventListener('click', function() {
			console.log($id('bookmark-groupon').checked);
		}) //飯團
		$id('bookmark-animation-groupon').addEventListener('click', function() {
			var gValue = $id('input-search-groupon').value;
			var mValue = $id('input-search-meal').value;

			$id('input-search-groupon').style.display = 'block';
			$id('input-search-meal').style.display = 'none';
			gValue = mValue;

			$id('start-search').onclick = function() {
				kw = $id('input-search-groupon').value;
				// console.log(kw);
				location.href = '4-1_grouponList.php?search='+ kw +'&order=latest&p=1'; //暫時先跳轉
				
			}
		})
		
		
		
		// if($id('bookmark-groupon')) {
			
		// 	var kw = $id('input-search').value;
		// 	$id('bookmark-animation-groupon').onclick = function() {
		// 		location.href = '4-1_grouponList.php?search='+ kw  +'&order=latest&p=1'
		// 	}
		// }
		
		// bookmark-animation-groupon
	
	</script>

