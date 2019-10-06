<?php
	require_once("Backstage-login-success.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.2/css/all.css" integrity="sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns" crossorigin="anonymous">
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/bootstrap-grid.min.css">
    <link rel="stylesheet" href="../css/backstage.css">
	<title>成就管理後台</title>
</head>
<body class="out">
    <div class="d-flex" name="top">
        <div class="container col-xl-2">
            <div class="list-group back-nav">
                <div class="back-logo"><img src="../images/logo3.png" alt="logo"></div>
                <div class="back-signout">
                    <span><?php echo $prodRowmanager->manager_Id ?></span>
                    <form action="Backstage-login-out.php">
                        <button type="submit" class="mainBTN" id="manager-out">登出</button>
                    </form>
                </div>
                <a href="backstage-meal.php" class="list-group-item list-group-item-action back-change">餐點資訊</a>
                <!-- <a href="backstage-groupon.php" class="list-group-item list-group-item-action back-change">飯團管理</a> -->
                <a href="backstage-message.php" class="list-group-item list-group-item-action back-change">留言審核</a>
                <a href="backstage-chatBot.php" class="list-group-item list-group-item-action back-change">客服雞器人</a>
                <a href="backstage-achievement.php" class="list-group-item list-group-item-action back-change focus-color">成就管理</a>
                <a href="backstage-memberOrder.php" class="list-group-item list-group-item-action back-change">訂單管理</a>
                <a href="backstage-manager.php" class="list-group-item list-group-item-action back-change">管理員帳號</a>
                <a href="takeMealAfter.php" class="list-group-item list-group-item-action back-change">會員取餐</a>
            </div>
        </div>
    
        <div class="container col-xl-10">
            <div class="back-text">
				<div class="banner"><button type="button" class="mainBTN" tabindex="-1" data-toggle="modal" data-target="#achievement">新增</button></div>
                <div class="modal fade" id="achievement" tabindex="-1" role="dialog" aria-labelledby="achievementTitle" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <!-- 新增跳窗 -->
                        <div class="modal-content">
                            <figure class="modal-img">
                                <img src="../images/dayCookIndex_whiteBG1.svg" alt="">
                            </figure>
                            <div class="modal-header">
                                <h5 class="modal-title" id="achievementTitle">新增成就資料</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
							</div>
							<form action="fileUpload.php" method="post" enctype="multipart/form-data">
                            <div class="modal-body">

                                    <div class="d-flex form-group">
                                        <label for="achievementName" class="col-form-label title-width">成就名稱</label>
                                        <input type="text" class="form-control" id="achievementName">
                                    </div>
                                    <div class="d-flex form-group">
                                        <label for="achievementBonus" class="col-form-label title-width">成就完成獎勵(元)</label>
                                        <input type="text" class="form-control" id="achievementBonus">
                                    </div>
                                    <div class="d-flex form-group">
                                        <label for="achievementMealTotal" class="col-form-label title-width">達成餐點數量</label>
                                        <input type="text" class="form-control" id="achievementMealTotal">
                                    </div>
                                    <div class="d-flex form-group">
                                            <label for="achievementAchievable" class="title-width">成就狀態</label>
                                            <select class="form-control" id="achievementAchievable">
                                                <option>使用中</option>
                                                <option>取消使用</option>
                                            </select>
										</div>
                                    <div class="d-flex form-group">
                                        <label for="achievementPic" class="title-width">上傳勳章圖片</label>
										<input type="file" class="form-control-file" id="achievementPic" name="upFile" accept="image/*">
                                    </div>
                            </div>
                            <div class="modal-footer justify-content-center">
                                <button id="achNew" type="submit" class="btn btn-primary mainBTN">存檔</button>
                                <button type="button" class="btn btn-secondary subBTN" data-dismiss="modal">取消</button>
							</div>
							</form>
                        </div>
                    </div>
				</div>
				<script>
						document.getElementById("achNew").addEventListener('click',function(){
						//=====使用Ajax,新增成就 
						var xhr = new XMLHttpRequest();
						xhr.onload = function (){
							if( xhr.status == 200){
								alert("成就資料新增成功");
								// swal("成就資料新增成功", "", "success");
							}else{
								alert(xhr.status);
							}
						}

						if(document.getElementById("achievementAchievable").value == "使用中"){
							AchState = 1;
						}else{
							AchState = 0;
						}

						filename = document.getElementById("achievementPic").value;
						
						xhr.open("post", "backstage-achievement-Insert.php", true);
						xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
						var data_info = "achievementName=" + document.getElementById("achievementName").value + //成就名稱
										"&achievementBonus=" + document.getElementById("achievementBonus").value + //成就完成獎勵
										"&achievementMealTotal=" + document.getElementById("achievementMealTotal").value + //達成餐點數量
										"&achievementAchievable=" + AchState +//成就狀態
										"&achievementPic=" + filename.substr(filename.lastIndexOf("\\") + 1, filename.length - filename.lastIndexOf("/"));			
						// alert(data_info);
                        xhr.send(data_info);
                        
                        window.history.go(0);//重新整理頁面
					});
				</script>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">成就編號</th>
                            <th scope="col">成就名稱</th>
                            <th scope="col">勳章圖片</th>
                            <th scope="col">成就完成獎勵(元)</th>
                            <th scope="col">達成餐點數量</th>
                            <th scope="col">成就狀態</th>
                            <th scope="col">修改</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php 
                            $errMsg = "";
                            try {
								  require_once("../connectMember.php");
                                $sqlAchievement = "select * from achievement";
                                $productsAchievement = $pdo -> query( $sqlAchievement );
                            } catch (PDOException $e) {
                                $errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
                                $errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";
                            }
                        ?>
                        <?php	
                            if( $errMsg !=""){
                                echo "<tr><td colspan='6' align='center'>$errMsg</td></tr>";
                            }else{
                                while($prodRowAchievement = $productsAchievement->fetchObject()){
                        ?>
                        <tr>
                            <td scope="row"><?php echo $prodRowAchievement->achievement_No ?></td>
                            <td><?php echo $prodRowAchievement->achievement_Name ?></td>
                            <td><img src="../images/Achieve/<?php echo $prodRowAchievement->achievement_Pic ?>" class="one-size" alt="<?php echo $prodRowAchievement->achievement_Name ?>"></td>
                            <td><?php echo $prodRowAchievement->achievement_Bonus ?></td>
                            <td><?php echo $prodRowAchievement->meal_Total ?></td>
                            <td><?php echo $prodRowAchievement->isAchievable ? "使用中" : "取消使用" ?></td>
                            <td>
                                <i class="fas fa-pencil-alt touch" data-toggle="modal" data-target="#viewAchievement<?php echo $prodRowAchievement->achievement_No ?>"></i>
                                <div class="modal fade" id="viewAchievement<?php echo $prodRowAchievement->achievement_No ?>" tabindex="-1" role="dialog" aria-labelledby="viewAddAchievementTitle" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <!-- 新增跳窗 -->
                                        <div class="modal-content">
                                            <figure class="modal-img">
                                                <img src="../images/dayCookIndex_whiteBG1.svg" alt="">
                                            </figure>
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="viewAddAchievementTitle">成就資料</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
											</div>
											<form action="fileUpload.php" method="post" enctype="multipart/form-data">
                                            <div class="modal-body">
                                                    <div class="d-flex form-group">
                                                        <label for="viewAchievementNo" class="col-form-label title-width">成就編號</label>
                                                        <input type="text" class="form-control" id="viewAchievementNo<?php echo $prodRowAchievement->achievement_No ?>" value="<?php echo $prodRowAchievement->achievement_No ?>" readonly>
                                                    </div>
                                                    <div class="d-flex form-group">
                                                        <label for="viewAchievementName" class="col-form-label title-width">成就名稱</label>
                                                        <input type="text" class="form-control change" id="viewAchievementName<?php echo $prodRowAchievement->achievement_No ?>" value="<?php echo $prodRowAchievement->achievement_Name ?>" >
                                                    </div>
                                                    <div class="d-flex form-group">
                                                        <label for="viewAchievementBonus" class="col-form-label title-width">成就完成獎勵(元)</label>
                                                        <input type="text" class="form-control change" id="viewAchievementBonus<?php echo $prodRowAchievement->achievement_No ?>" value="<?php echo $prodRowAchievement->achievement_Bonus ?>" >
                                                    </div>
                                                    <div class="d-flex form-group">
                                                        <label for="viewAchievementMealTotal" class="col-form-label title-width">達成餐點數量</label>
                                                        <input type="text" class="form-control change" id="viewAchievementMealTotal<?php echo $prodRowAchievement->achievement_No ?>" value="<?php echo $prodRowAchievement->meal_Total ?>" >
                                                    </div>
                                                    <div class="d-flex form-group">
                                                        <label for="viewAchievementAchievable" class="title-width">成就狀態</label>
                                                        <select class="form-control change-select" id="viewAchievementAchievable<?php echo $prodRowAchievement->achievement_No ?>">
                                                            <?php  
                                                            if($prodRowAchievement->isAchievable){ 
                                                            ?>                                                             
                                                                <option>使用中</option>
                                                                <option>取消使用</option>
                                                            ?>
                                                            <?php  
                                                            }else{
                                                            ?>                                       
                                                                <option>取消使用</option>   
                                                                <option>使用中</option>
                                                            <?php   
                                                            }
                                                            ?>  
                                                        </select>
                                                    </div>
                                                    <div class="d-flex form-group">
                                                        <label for="viewAchievementPic" class="title-width">修改勳章圖片</label>
														<label for="viewAchievementPic<?php echo $prodRowAchievement->achievement_No ?>" class="form-control-file change">
															<input type="file" class="form-control-file change" id="viewAchievementPic<?php echo $prodRowAchievement->achievement_No ?>" style="display: none" name="upFile" accept="image/*">
															<button type="button"><label for="viewAchievementPic<?php echo $prodRowAchievement->achievement_No ?>" style="margin: 0;">選擇檔案</label></button>
															<span id="viewAchievementPicName<?php echo $prodRowAchievement->achievement_No ?>"><?php echo $prodRowAchievement->achievement_Pic ?></span>
														</label>
													</div>
                                            </div>
                                            <div class="modal-footer justify-content-center">
												<button type="submit" class="btn btn-primary mainBTN btn-touch" id="achievement-updata<?php echo $prodRowAchievement->achievement_No ?>">修改</button>
												<script>
													document.getElementById("achievement-updata<?php echo $prodRowAchievement->achievement_No ?>").addEventListener('click',function(){
														//=====使用Ajax,更新成就  
														var xhr = new XMLHttpRequest();
														xhr.onload = function (){
															if( xhr.status == 200){
																alert("成就資料更新成功");
																// swal("成就資料更新成功", "", "success");
															}else{
																alert(xhr.status);
															}
														}

														if(document.getElementById("viewAchievementAchievable<?php echo $prodRowAchievement->achievement_No ?>").value == "使用中"){
															AchState = 1;
														}else{
															AchState = 0;
														}

														filename = document.getElementById("viewAchievementPic<?php echo $prodRowAchievement->achievement_No ?>").value;
                                                        filenameSub = filename.substr(filename.lastIndexOf("\\") + 1, filename.length - filename.lastIndexOf("/"))

                                                        filenameSub = filenameSub || document.getElementById("viewAchievementPicName<?php echo $prodRowAchievement->achievement_No ?>").innerText;

														document.getElementById("viewAchievementPicName<?php echo $prodRowAchievement->achievement_No ?>").innerText = filenameSub;
                                                      
                                                        xhr.open("post", "backstage-achievement-Updata.php", true);
														xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
														var data_info = "viewAchievementNo=" + document.getElementById("viewAchievementNo<?php echo $prodRowAchievement->achievement_No ?>").value + //成就編號
																		"&viewAchievementName=" + document.getElementById("viewAchievementName<?php echo $prodRowAchievement->achievement_No ?>").value + //成就名稱
																		"&viewAchievementBonus=" + document.getElementById("viewAchievementBonus<?php echo $prodRowAchievement->achievement_No ?>").value + //成就完成獎勵
																		"&viewAchievementMealTotal=" + document.getElementById("viewAchievementMealTotal<?php echo $prodRowAchievement->achievement_No ?>").value + //達成餐點數量
																		"&viewAchievementAchievable=" + AchState +//成就狀態
																		"&viewAchievementPic=" + filenameSub;			
														// alert(data_info);
														xhr.send(data_info);
                                                        window.history.go(0);//重新整理頁面
                                                    });
												</script>
                                                <button type="button" class="btn btn-secondary subBTN" data-dismiss="modal">取消</button>
											</div>
											</form>
                                        </div>
                                    </div>
                                </div>                           
                            </td>
                        </tr>
                        <?php
                                }//while
                            }//else	
                        ?>	
                    </tbody>
                </table>
            </div>
        </div>
    </div>   
  
    <!-- <button type="button" id="BackTop" class="toTop-arrow"></button> -->
    <a href="#top" class="toTop-arrow"><i class="fas fa-arrow-circle-up"></i></a>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>

<!-- 按鈕切換 -->
    <script>
        // $(".touch").click(function(){
		// 	// alert($( ".touch" ).index( this ));
        //     $(".change").attr("readonly",true);
        //     $(".change-select").attr("disabled",true);
        //     $('.btn-touch').click(function(){
        //         $(".change").attr("readonly",false);
        //         $(".change-select").attr("disabled",false);
        //         //..........
        //         if($(".btn-touch").html() == "確認"){ //update to db;
        //             $('.btn-touch').html("修改");
        //             $(".change").attr("readonly",true);
        //             $(".change-select").attr("disabled",true);
        //         }else{
        //             $('.btn-touch').html("確認");
        //         }
        //         //..........
        //     });
        // });
    </script>

<!-- GoTop -->
    <!-- <script>
        $(function(){
            $('#BackTop').click(function(){ 
                $('html,body').animate({scrollTop:0}, 333);
            });
            $(window).scroll(function() {
                if ( $(this).scrollTop() > 300 ){
                    $('#BackTop').fadeIn(222);
                } else {
                    $('#BackTop').stop().fadeOut(222);
                }
            }).scroll();
        });
    </script> -->

</body>
</html>
