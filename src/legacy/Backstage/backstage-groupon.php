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
    <title>餐點資料後台</title>
</head>
<body class="out">
    <div class="d-flex" name="top">
        <div class="container col-xl-2">
            <div class="list-group back-nav">
                <div class="back-logo"><img src="../images/logo3.png" alt="logo"></div>
                <div class="back-signout">
                    <span><?php echo $prodRowmanager->manager_Id ?></span>
                    <form action="Backstage-login-out.php">
                        <button type="submit" id="manager-out">登出</button>
                    </form>
                </div>
                <a href="backstage-meal.php" class="list-group-item list-group-item-action back-change">餐點資訊</a>
                <!-- <a href="backstage-groupon.php" class="list-group-item list-group-item-action back-change focus-color">飯團管理</a> -->
                <a href="backstage-message.php" class="list-group-item list-group-item-action back-change">留言審核</a>
                <a href="backstage-chatBot.php" class="list-group-item list-group-item-action back-change">客服雞器人</a>
                <a href="backstage-achievement.php" class="list-group-item list-group-item-action back-change">成就管理</a>
                <a href="backstage-memberOrder.php" class="list-group-item list-group-item-action back-change">訂單管理</a>
                <a href="backstage-manager.php" class="list-group-item list-group-item-action back-change">管理員帳號</a>
                <a href="takeMealAfter.php" class="list-group-item list-group-item-action back-change">會員取餐</a>
            </div>
        </div>
    
        <div class="container col-xl-10">
            <div class="back-text meal-text">
                <div class="banner"><button type="button" class="mainBTN" tabindex="-1" data-toggle="modal" data-target="#addGroupon" >新增</button></div>
                <div class="modal fade" id="addGroupon" tabindex="-1" role="dialog" aria-labelledby="addGrouponTitle" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <!-- 新增跳窗 -->
                        <div class="modal-content">
                            <figure class="modal-img">
                                <img src="../images/dayCookIndex_whiteBG1.svg" alt="">
                            </figure>
                            <div class="modal-header">
                                <h5 class="modal-title" id="addGrouponTitle">新增飯團資料</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="d-flex form-group">
                                        <label for="grouponName" class="col-form-label title-width">飯團名稱</label>
                                        <input type="text" class="form-control" id="grouponName">
                                    </div>
                                    <div class="d-flex form-group">
                                        <label for="grouponInfo" class="col-form-label title-width">飯團介紹</label>
                                        <textarea class="form-control" id="grouponInfo" rows="3"></textarea>
                                    </div>
                                    <div class="d-flex form-group">
                                        <label for="grouponTag" class="col-form-label title-width">新增標籤</label>
                                        <input type="text" class="form-control" id="grouponTag">
                                    </div>
                                    <div class="d-flex form-group">
                                        <label for="startDate" class="col-form-label title-width">開始日期</label>
                                        <input type="text" class="form-control" id="startDate">
                                    </div>
                                    <div class="d-flex form-group">
                                        <label for="endDate" class="col-form-label title-width">截止日期</label>
                                        <input type="text" class="form-control" id="endDate">
                                    </div>
                                    <div class="d-flex form-group">
                                        <label for="grouponBonus" class="title-width">完成購物金</label>
                                        <select class="form-control" id="grouponBonus">
                                            <option>20</option>
                                            <option>30</option>
                                            <option>50</option>
                                        </select>
                                    </div>
                                    <div class="d-flex form-group">
                                        <label for="grouponMemberNeed" class="col-form-label title-width">購物金門檻人數</label>
                                        <input type="text" class="form-control" id="grouponMemberNeed">
                                    </div>
                                    <div class="d-flex form-group">
                                        <label for="grouponSold" class="title-width">飯團狀態</label>
                                        <select class="form-control" id="grouponSold">
                                            <option>未開始</option>
                                            <option>開始</option>
                                            <option>結束</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer justify-content-center">
                                <button type="button" class="btn btn-primary mainBTN">存檔</button>
                                <button type="button" class="btn btn-secondary subBTN" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">飯團編號</th>
                            <th scope="col">飯團名稱</th>
                            <th scope="col">發起者</th>
                            <th scope="col">開始日期</th>
                            <th scope="col">截止日期</th>
                            <th scope="col">完成購物金</th>
                            <th scope="col">目前參加人數</th>
                            <th scope="col">總價</th>
                            <th scope="col">折數</th>
                            <th scope="col">飯團狀態</th>
                            <th scope="col">詳情</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td scope="row">1</td>
                            <td>丼飯</td>
                            <td>(生)特級海鮮丼</td>
                            <td><img src="../images/丼1.png" alt=""></td>
                            <td>680</td>
                            <td>300</td>
                            <td>上架</td>
                            <td><i class="fas fa-book touch" data-toggle="modal" data-target="#viewMeal"></i></td>
                            <div class="modal fade" id="viewMeal" tabindex="-1" role="dialog" aria-labelledby="viewAddMealTitle" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <!-- 新增跳窗 -->
                                    <div class="modal-content">
                                        <figure class="modal-img">
                                            <img src="../images/dayCookIndex_whiteBG1.svg" alt="">
                                        </figure>
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="viewAddMealTitle">餐點資料</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <form>
                                                <div class="d-flex form-group">
                                                    <label for="viewMealNo" class="col-form-label title-width">餐點編號</label>
                                                    <input type="text" class="form-control" id="viewMealNo" value="1" readonly>
                                                </div>
                                                <div class="d-flex form-group">
                                                    <label for="viewMealGenre" class="title-width">餐點類別</label>
                                                    <select class="form-control change-select" id="viewMealGenre" >
                                                        <option>拉麵</option>
                                                        <option>丼飯</option>
                                                        <option>鍋物</option>
                                                        <option>定食</option>
                                                        <option>便當</option>
                                                        <option>素食</option>
                                                    </select>
                                                </div>
                                                <div class="d-flex form-group">
                                                    <label for="viewMealName" class="col-form-label title-width">餐點名稱</label>
                                                    <input type="text" class="form-control change" id="viewMealName" value="(生)特級海鮮丼" >
                                                </div>
                                                <div class="d-flex form-group">
                                                    <label for="viewMealPrice" class="col-form-label title-width">餐點單價</label>
                                                    <input type="text" class="form-control change" id="viewMealPrice" value="680" >
                                                </div>
                                                <div class="d-flex form-group">
                                                    <label for="viewMealInfo" class="col-form-label title-width">餐點介紹</label>
                                                    <textarea class="form-control change" id="viewMealInfo" rows="3" >海膽、干貝、牡丹蝦、鮭魚肚、鮪魚、紅甘肚、鮭魚卵等外加多款現流生魚片，滿滿的新鮮海味，隱藏首推的頂級美食。(附三品小菜及熱湯) •本店均採用當日現流魚，若當日海膽不足將以同等食材替換，請見諒。</textarea>
                                                </div>
                                                <div class="d-flex form-group">
                                                    <label for="viewMealCal" class="col-form-label title-width">餐點卡路里</label>
                                                    <input type="text" class="form-control change" id="viewMealCal" value="300" >
                                                </div>
                                                <div class="d-flex form-group">
                                                    <label for="viewMealSold" class="title-width">餐點狀態</label>
                                                    <select class="form-control change-select" id="viewMealSold" >
                                                        <option>未上架</option>
                                                        <option>上架</option>
                                                        <option>下架</option>
                                                    </select>
                                                </div>
                                                <div class="d-flex form-group">
                                                    <label for="viewMealCount" class="col-form-label title-width">評分次數</label>
                                                    <input type="text" class="form-control" id="viewMealCount" value="2" readonly>
                                                </div>
                                                <div class="d-flex form-group">
                                                    <label for="viewMealTotal" class="col-form-label title-width">評分總分</label>
                                                    <input type="text" class="form-control" id="viewMealTotal" value="4.5" readonly>
                                                </div>
                                                <div class="d-flex form-group">
                                                    <label for="viewMealPic" class="title-width">修改餐點照片</label>
                                                    <input type="file" class="form-control-file change" id="viewMealPic">
                                                </div>
                                            </form>
                                        </div>
                                        <div class="modal-footer justify-content-center">
                                            <button type="button" class="btn btn-primary mainBTN btn-touch">修改</button>
                                            <button type="button" class="btn btn-secondary subBTN" data-dismiss="modal">取消</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </tr>
                    </tbody>
                </table>
            <!-- 切換分頁 -->
                <!-- <ul class="pagination justify-content-center back-page">
                    <li><a href="#">&laquo;</a></li>
                    <li class="active"><a href="#">1</a></li>
                    <li class="disabled"><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">5</a></li>
                    <li><a href="#">&raquo;</a></li>
                </ul> -->
            </div>
        </div>
    </div>   
    
    <a href="#top" class="toTop-arrow"><i class="fas fa-arrow-circle-up"></i></a>
</body>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
<!-- 按鈕切換 -->
    <script>
        $(".touch").click(function(){

            $(".change").attr("readonly",true);
            $(".change-select").attr("disabled",true);
            $('.btn-touch').click(function(){
                $(".change").attr("readonly",false);
                $(".change-select").attr("disabled",false);
                //..........
                if($(".btn-touch").html() == "確認"){ //update to db;
                    $('.btn-touch').html("修改");
                    $(".change").attr("readonly",true);
                    $(".change-select").attr("disabled",true);
                }else{
                    $('.btn-touch').html("確認");
                }
                //..........
            });
        });
    </script>




</html>
