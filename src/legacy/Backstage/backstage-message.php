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
    <title>留言審核</title>
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
                <a href="backstage-message.php" class="list-group-item list-group-item-action back-change focus-color">留言審核</a>
                <a href="backstage-chatBot.php" class="list-group-item list-group-item-action back-change">客服雞器人</a>
                <a href="backstage-achievement.php" class="list-group-item list-group-item-action back-change">成就管理</a>
                <a href="backstage-memberOrder.php" class="list-group-item list-group-item-action back-change">訂單管理</a>
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
                            <th scope="col">檢舉編號</th>
                            <th scope="col">檢舉日期</th>
                            <th scope="col">被檢舉會員</th>
                            <th scope="col">餐點編號</th>
                            <th scope="col">留言內容</th>
                            <th scope="col">審核狀態</th>
                            <th scope="col">修改</th>
                        </tr>
                    </thead>
                    <?php 
                        try {
                            require_once("../connectMember.php");
                            $sql = "select * from message inner join messagereport on message.message_No = messagereport.message_No WHERE messagereport.report_Status = 'not' group by messagereport.report_No  order by report_No";
                            $products = $pdo -> query( $sql );
                            while($prodRow = $products->fetchObject()){
                        ?>
                    <tbody>
                        <tr>
                            <td scope="row"><?php echo $prodRow->report_No; ?></td>
                            <td><?php echo $prodRow->report_Date; ?></td>
                            <td><?php echo $prodRow->member_No; ?></td>
                            <td><?php echo $prodRow->meal_No; ?></td>
                            <td><?php echo $prodRow->message_Content; ?></td>
                            <td><?php echo $prodRow->report_Status; ?></td>
                            <td>
                                <i class="fas fa-pencil-alt touch" data-toggle="modal" data-target="#message" reportNo="<?php echo $prodRow->report_No;?>" ></i>
                                <div class="modal fade" id="message" tabindex="-1" role="dialog" aria-labelledby="messageTitle" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <!-- 新增跳窗 -->
                                        <div class="modal-content">
                                            <figure class="modal-img">
                                                <img src="../images/dayCookIndex_whiteBG1.svg" alt="">
                                            </figure>
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="messageTitle">留言審核</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <form>
                                                    <div class="d-flex form-group">
                                                        <label for="reportNo" class="col-form-label title-width">檢舉編號</label>
                                                        <input type="text" class="form-control" id="reportNo" value="<?php echo $prodRow->report_No; ?>" readonly>
                                                    </div>
                                                    <div class="d-flex form-group">
                                                        <label for="reportDate" class="col-form-label title-width">檢舉日期</label>
                                                        <input type="text" class="form-control" id="reportDate" value="<?php echo $prodRow->report_Date; ?>" readonly>
                                                    </div>
                                                    <div class="d-flex form-group">
                                                        <label for="reportMem" class="col-form-label title-width">被檢舉會員</label>
                                                        <input type="text" class="form-control" id="reportMem" value="<?php echo $prodRow->member_No; ?>" readonly>
                                                    </div>
                                                    <div class="d-flex form-group">
                                                        <label for="mealName" class="col-form-label title-width">餐點編號</label>
                                                        <input type="text" class="form-control" id="mealName" value="<?php echo $prodRow->meal_No; ?>" readonly>
                                                    </div>
                                                    <div class="d-flex form-group">
                                                        <label for="messageContent" class="col-form-label title-width">留言內容</label>
                                                        <input type="text" class="form-control" id="messageContent" value="<?php echo $prodRow->message_Content; ?>" readonly>
                                                    </div>
                                                    <div class="d-flex form-group">
                                                        <label for="reportResult" class="title-width">審核結果</label>
                                                        <select class="form-control change-select" id="reportResult">
                                                            <option value="pass">通過</option>
                                                            <option value="unpass">
                                                                不通過
                                                            </option>
                                                        </select>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer justify-content-center">
                                                <button type="button" class="btn btn-primary mainBTN btn-touch" value="<?php echo $prodRow->report_No; ?>">修改</button>
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
  
    <a href="#top" class="toTop-arrow"><i class="fas fa-arrow-circle-up"></i></a>
 
</body>  
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    <!-- <script src="js/eatDetail.js"></script> -->

<!-- 按鈕切換 -->
<script>
    var reportNo;
    var reportStatus;
    var reportResultIndex;
    var reportResult;
        $(".touch").click(function(){ //鉛筆按鈕
            // alert(this.getAttribute('reportNo'));
            
            reportNo = this.getAttribute('reportNo');
            $(".change").attr("readonly",true);
            $(".change-select").attr("disabled",true);
            $('.btn-touch').click(function(){
                
                reportResultIndex = $id('reportResult').selectedIndex; //選擇的index
                reportResult = $all('#reportResult option')[reportResultIndex].value;
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
        var url = "setMessageReport.php?report_No=" + reportNo + '&report_Status=' + reportResult;
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
</html>
