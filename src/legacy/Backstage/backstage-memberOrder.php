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
    <title>訂單資料</title>
</head>
<body class="out"></body>
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
                <a href="backstage-achievement.php" class="list-group-item list-group-item-action back-change">成就管理</a>
                <a href="backstage-memberOrder.php" class="list-group-item list-group-item-action back-change focus-color">訂單管理</a>
                <a href="backstage-manager.php" class="list-group-item list-group-item-action back-change">管理員帳號</a>
                <a href="takeMealAfter.php" class="list-group-item list-group-item-action back-change">會員取餐</a>
            </div>
        </div>
    
        <div class="container col-xl-10">
            <div class="back-text">
                <div class="banner"></div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">訂單編號</th>
                            <th scope="col">會員編號</th>
                            <th scope="col">訂餐時間</th>
                            <th scope="col">餐點數量</th>
                            <th scope="col">訂單金額</th>
                            <th scope="col">取餐時間</th>
                            <th scope="col">訂單狀態</th>
                            <th scope="col">修改</th>
                        </tr>
                    </thead>
                    <?php 
                        try {
                            require_once("../connectMember.php");
                            $sql = "select * from memberorder a 
                            left outer join member b on a.member_No = b.member_No
                            left outer join memberorderlist c on a.memOrder_No = c.memOrder_No";
                            $memorder = $pdo -> query( $sql );
                            while($memorderrow = $memorder->fetchObject()){
                    ?>
                    <tbody>
                        <tr>
                            <td scope="row"><?php echo $memorderrow->memOrder_No;?></td>
                            <td><?php echo $memorderrow->member_Id; ?></td>
                            <td><?php echo $memorderrow->memOrder_Time; ?></td>
                            <td><?php echo $memorderrow->meal_Quantity; ?></td>
                            <td><?php echo $memorderrow->memOrder_Amount; ?></td>
                            <td><?php echo $memorderrow->memOrder_TakeTime; ?></td>
                            <td><?php echo $memorderrow->memOrder_status; ?></td>
                            <td>
                                <i class="fas fa-pencil-alt touch" data-toggle="modal" data-target="#memOrder<?php echo $memorderrow->memOrder_No;?>" orderNo="<?php echo $memorderrow->memOrder_No;?>"></i>
                                <div class="modal fade" id="memOrder<?php echo $memorderrow->memOrder_No;?>" tabindex="-1" role="dialog" aria-labelledby="memOrderTitle" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <!-- 新增跳窗 -->
                                        <div class="modal-content">
                                            <figure class="modal-img">
                                                <img src="../images/dayCookIndex_whiteBG1.svg" alt="">
                                            </figure>
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="memOrderTitle">訂單資料</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <form>
                                                    <div class="d-flex form-group">
                                                        <label for="orderNo" class="col-form-label title-width">訂單編號</label>
                                                        <input type="text" class="form-control" id="orderNo" value="<?php echo $memorderrow->memOrder_No;?>" readonly>
                                                    </div>
                                                    <div class="d-flex form-group">
                                                        <label for="memberNo" class="col-form-label title-width">會員編號</label>
                                                        <input type="text" class="form-control" id="memberNo" value="<?php echo $memorderrow->member_Id; ?>" readonly>
                                                    </div>
                                                    <div class="d-flex form-group">
                                                        <label for="memOrderTime" class="col-form-label title-width">訂餐時間</label>
                                                        <input type="text" class="form-control" id="memOrderTime" value="<?php echo $memorderrow->memOrder_Time; ?>" readonly>
                                                    </div>
                                                    <div class="d-flex form-group">
                                                        <label for="memMealQuantity" class="col-form-label title-width">餐點數量</label>
                                                        <input type="text" class="form-control" id="memMealQuantity" value="<?php echo $memorderrow->meal_Quantity; ?>" readonly>
                                                    </div>
                                                    <div class="d-flex form-group">
                                                        <label for="memOrderAmount" class="col-form-label title-width">訂單金額</label>
                                                        <input type="text" class="form-control" id="memOrderAmount" value="<?php echo $memorderrow->memOrder_Amount; ?>" readonly>
                                                    </div>
                                                    <div class="d-flex form-group">
                                                        <label for="memOrderTakeTime" class="col-form-label title-width">取餐時間</label>
                                                        <input type="text" class="form-control" id="memOrderTakeTime" value="<?php echo $memorderrow->memOrder_TakeTime; ?>" readonly>
                                                    </div>
                                                    <div class="d-flex form-group">
                                                        <label for="memOrderstatus" class="title-width">訂單狀態</label>
                                                        <select class="form-control change-select" id="memOrderstatus">
                                                            <option value="not">未取餐</option>
                                                            <option value="done">已取餐</option>
                                                            <option value="cancel">訂單取消</option>
                                                        </select>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer justify-content-center">
                                                <button type="button" class="btn btn-primary mainBTN btn-touch" value="<?php echo $memorderrow->memOrder_No;?>">修改</button>
                                                <button type="button" class="btn btn-secondary subBTN" data-dismiss="modal">取消</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    <?php
                        }
                    } catch (PDOException $e) {
                        echo "錯誤原因 : ", $e -> getMessage(), "<br>";
                        echo "錯誤行號 : ", $e -> getLine(), "<br>";
                    }
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
    var OrderNo;
    var orderStatus;
    var orderResultIndex;
    var memOrderstatus;
        $(".touch").click(function(){ //鉛筆按鈕
            // alert(this.getAttribute('reportNo'));
            
            OrderNo = this.getAttribute('orderNo');
            $(".change").attr("readonly",true);
            $(".change-select").attr("disabled",true);
            $('.btn-touch').click(function(){
                
                orderResultIndex = $id('memOrderstatus').selectedIndex; //選擇的index
                memOrderstatus = $all('#memOrderstatus option')[orderResultIndex].value;
                // alert(reportResult);
                // alert(reportNo);
                if($('.btn-touch').html() == "確認") {
                    reviseMess(); //修改留言狀態
                }
                
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
    function $id(id) {
    return document.getElementById(id);
    }
    function $class(className) {
        return document.getElementsByClassName(className);
    }
    function $all(all) {
        return document.querySelectorAll(all);
    }
    function reviseMess() {
        var xhr = new XMLHttpRequest();
        xhr.onload=function (){
            if( xhr.status == 200 ){
                if( xhr.responseText.indexOf("not found") != -1){//回傳的資料中含有 not found
                    
                } else {
                    // showMeal(xhr.responseText);  //json 字串
                    alert('已成功修改該筆資料。');
                    // $id('message').style.display = 'none';
                }
                
            }else{
                alert( xhr.status );
            }
        }
        // alert(reportResult);
            // alert(reportNo);
        var url = "editOrder.php?orderNo=" + OrderNo + '&memOrderstatus=' + memOrderstatus;
        xhr.open("Get" ,url, true);
        xhr.send(null);
    }
    window.addEventListener('load', function() {
        // for(let i = 0 ; i < $class('touch').length ; i++) {
        //     $class('touch')[i].value = $class('touch')[i].parentNode.children[0].innerText;
        // }
        // 
        
    })
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
