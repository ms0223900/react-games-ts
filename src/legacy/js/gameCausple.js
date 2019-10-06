var phoneWidth = parseInt(window.screen.width);
		var phoneScale = phoneWidth / 640;
		var ua = navigator.userAgent;
		if (/Android (\d+\.\d+)/.test(ua)) {
			var version = parseFloat(RegExp.$1);
		
			if (version > 2.3) {
				document.write('<meta name="viewport" content="width=640, minimum-scale = ' + phoneScale + ', maximum-scale = ' +
					phoneScale + ', target-densitydpi=device-dpi">');
				
			} else {
				document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
			}
		
		} else {
			document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">');
		}
	
		if (RegExp("MicroMessenger").test(navigator.userAgent)) {
			document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
				WeixinJSBridge.call('hideToolbar');
			});
		}



$(document).ready(function (e) {
			// 按鈕轉動
			$(".game_go").click(function(){
				rotateButton(360, ".game_go");
				
			});
			function rotateButton(d){
				var elem = $(".game_go");

				$({deg:0}).animate({deg: d},{
					duration:1000,
					step: function(now){
						elem.css({
							transform: "rotate(" + now + "deg)"
						});
					}
				});
			}
			
			$("#jianpin_1 em img").click(function () {
				$("#jianpin_1").hide();
			});
		
			$("#jianpin_2 em img").click(function () {
				$("#jianpin_2").hide();
			});

			$("#jianpin_3 em img").click(function () {
				$("#jianpin_3").hide();
			});
			$("#jianpin_4 em img").click(function () {
				$("#jianpin_4").hide();
			});
			$("#jianpin_5 em img").click(function () {
				$("#jianpin_5").hide();
			});
			$("#jianpin_6 em img").click(function () {
				$("#jianpin_6").hide();
			});
			$("#jianpin_7 em img").click(function () {
				$("#jianpin_7").hide();
			});
			$("#jianpin_8 em img").click(function () {
				$("#jianpin_8").hide();
			});
			$("#jianpin_9 em img").click(function () {
				$("#jianpin_9").hide();
			});
			$("#jianpin_10 em img").click(function () {
				$("#jianpin_10").hide();
			});
			var count = 10;
			$(".wdjifen").html(count);
			$(".game_go").click(function () {
				count -= 1;
				if (count < 0) {
					for (i = 1; i <= 11; i++) {
						$(".qiu_" + i).removeClass("wieyi_" + i);
					}
					$("#no_jifeng").show();
				} else {
					draw()
				}
			});
			function draw() {
				var number = Math.floor(10 * Math.random() + 1);
				for (i = 1; i <= 10; i++) {
					$(".qiu_" + i).removeClass("diaol_" + i);
					$(".qiu_" + i).addClass("wieyi_" + i);
				};

				setTimeout(function () {
					for (i = 1; i <= 10; i++) {
						$(".qiu_" + i).removeClass("wieyi_" + i);
					}
				}, 1100);
				setTimeout(function () {
					switch (number) {
						case 1:
							$(".zjdl").children("span").addClass("diaL_one");
							break;
						case 2:
							$(".zjdl").children("span").addClass("diaL_two");
							break;
						case 3:
							$(".zjdl").children("span").addClass("diaL_three");
							break;
						case 4:
							$(".zjdl").children("span").addClass("diaL_four");
							break;
						case 5:
							$(".zjdl").children("span").addClass("diaL_five");
							break;
						case 6:
							$(".zjdl").children("span").addClass("diaL_six");
							break;
						case 7:
							$(".zjdl").children("span").addClass("diaL_seven");
							break;
						case 8:
							$(".zjdl").children("span").addClass("diaL_eight");
							break;
						case 9:
							$(".zjdl").children("span").addClass("diaL_nine");
							break;
						case 10:
							$(".zjdl").children("span").addClass("diaL_ten");
							break;
					}
					$(".zjdl").removeClass("none").addClass("dila_Y");
					setTimeout(function () {
						switch (number) {
							case 1:
								$("#jianpin_1").show();
								break;
							case 2:
								$("#jianpin_2").show();
								break;
							case 3:
								$("#jianpin_3").show();
								break;
							case 4:
								$("#jianpin_4").show();
								break;
							case 5:
								$("#jianpin_5").show();
								break;
							case 6:
								$("#jianpin_6").show();
								break;
							case 7:
								$("#jianpin_7").show();
								break;
							case 8:
								$("#jianpin_8").show();
								break;
							case 9:
								$("#jianpin_9").show();
								break;
							case 10:
								$("#jianpin_10").show();
								break;
						}
					}, 900);
				}, 1100)

				//取消动画
				setTimeout(function () {
					$(".zjdl").addClass("none").removeClass("dila_Y");
					$(".wdjifen").html(count);
					$(".zjdl").children("span").removeAttr('class');
				}, 2500)
			}
});