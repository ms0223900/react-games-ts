<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.2/css/all.css" integrity="sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns" crossorigin="anonymous">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/bootstrap-grid.min.css">
    <link rel="stylesheet" href="css/backstage.css">
    <title>管理員帳號</title>
</head>
<body class="out">
    <div class="d-flex">
        <div class="container col-xl-2">
            <div class="list-group back-nav">
                <div class="back-logo"><img src="images/logo3.png" alt="logo"></div>
                <div class="back-signout">
                    <span>登入者</span>
                    <a href="#">登出</a>
                </div>
                <a href="backstage-meal.html" class="list-group-item list-group-item-action back-change">餐點資訊</a>
                <a href="backstage-groupon.html" class="list-group-item list-group-item-action back-change">飯團管理</a>
                <a href="backstage-message.html" class="list-group-item list-group-item-action back-change">留言審核</a>
                <a href="backstage-chatBot.html" class="list-group-item list-group-item-action back-change">客服雞器人</a>
                <a href="backstage-achievement.html" class="list-group-item list-group-item-action back-change">成就管理</a>
                <a href="backstage-memberOrder.html" class="list-group-item list-group-item-action back-change">訂單管理</a>
                <a href="backstage-manager.html" class="list-group-item list-group-item-action back-change focus-color">管理員帳號</a>
            </div>
        </div>
    


        <div class="container col-xl-10">
            <div class="back-text">
                <div class="banner"><button type="button" class="mainBTN" tabindex="-1" data-toggle="modal" data-target="#manager">新增</button></div>
                <div class="modal fade" id="manager" tabindex="-1" role="dialog" aria-labelledby="managerTitle" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <!-- 新增會員新增跳窗 -->
                        <div class="modal-content">
                            <figure class="modal-img">
                                <img src="images/dayCookIndex_whiteBG1.svg" alt="">
                            </figure>
                            <div class="modal-header">
                                <h5 class="modal-title" id="managerTitle">新增管理員</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                       
                            <?php
                                try{
                                    require_once("connectmenu.php");
                                      
                                    $addmanagersql = "select * from manager";
                                    $addmanagertotal = $pdo->prepare($addmanagersql);
                                    $addmanagertotal->execute();
                                    while($addrowmanager=$addmanagertotal->fetch(PDO::FETCH_ASSOC))
                            ?>

                                <form id="addmanager" method="post" name="addmanager" action="">  
                                    <!-- 表單傳送 -->
                                    <div class="d-flex form-group">
                                        <label class="col-form-label title-width">管理員帳號</label>
                                        <input type="text" class="form-control" id="managerId" name="managerId">
                                    </div>
                                    <div class="d-flex form-group">
                                        <label  class="col-form-label title-width">管理員密碼</label>
                                        <input type="text" class="form-control" id="managerPsw" name="managerPsw">
                                    </div>

                                    

                                    <!-- <div class="d-flex form-group">
                                            <label  class="title-width">管理員權限</label>
                                            <select class="form-control" id="managerAuth" name="managerAuth">
                                                <option>
                                                    <?php if($addrowmanager['manager_Auth']==1){
                                                                echo "有權";
                                                          }
                                                    ?>
                                                </option>
                                                <option>
                                                    <?php if($addrowmanager['manager_Auth']==0){
                                                                echo "停權";
                                                          }
                                                    ?>
                                                </option>
                                            </select>
                                        </div> -->
                                </form>
                               
                            <?php
                                }catch(PDOException $e){
                                    echo $e->getMessage();
                                }
                            ?>
                                
                            </div>
                            <div class="modal-footer justify-content-center">
                                <button type="button" class="btn btn-primary mainBTN addsave">存檔</button>
                                <button type="button" class="btn btn-secondary subBTN" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">管理員編號</th>
                            <th scope="col">管理員帳號</th>
                            <th scope="col">管理員密碼</th>
                            <th scope="col">管理員權限</th>
                            <th scope="col">修改</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        try{
                            require_once("connectmenu.php");
                              
                            $managersql = "select * from manager";
                            $managertotal = $pdo->prepare($managersql);
                            $managertotal->execute();
                            while($rowmanager=$managertotal->fetch(PDO::FETCH_ASSOC)){
                        ?>


                        <tr id="managers">
                            <td><?php echo $rowmanager["manager_No"]?></td>
                            <td><?php echo $rowmanager["manager_Id"]?></td>
                            <td><?php echo $rowmanager["manager_Psw"]?></td>
                            <td><?php if($rowmanager['manager_Auth']==1){
                                        echo "有權";
                                       }else{
                                        echo "停權";
                                }?>
                            </td>
                            <td>
                                <i class="fas fa-pencil-alt touch" data-toggle="modal" data-target="#viewManager<?php echo $rowmanager["manager_No"]?>"></i>
                                <div class="modal fade" id="viewManager<?php echo $rowmanager["manager_No"]?>" tabindex="-1" role="dialog" aria-labelledby="viewManagerTitle" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <!-- 修改狀態新增跳窗 -->
                                        <div class="modal-content">
                                            <figure class="modal-img">
                                                <img src="images/dayCookIndex_whiteBG1.svg" alt="">
                                            </figure>
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="viewManagerTitle">管理員資料</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <form method="post" action="managerAuth.php">
                                                    <div class="d-flex form-group">
                                                        <label for="viewMealNo" class="col-form-label title-width">管理員編號</label>
                                                        <input type="text" class="form-control" id="viewMealNo<?php echo $rowmanager["manager_No"]?>" value="<?php echo $rowmanager["manager_No"]?>" readonly>
                                                    </div>
                                                    <div class="d-flex form-group">
                                                        <label for="viewManagerId" class="col-form-label title-width">管理員帳號</label>
                                                        <input type="text" class="form-control " id="viewManagerId<?php echo $rowmanager["manager_No"]?>" value="<?php echo $rowmanager["manager_Id"]?>" readonly >
                                                    </div>
                                                    <div class="d-flex form-group">
                                                        <label for="viewManagerPsw" class="col-form-label title-width">管理員密碼</label>
                                                        <input type="text" class="form-control change" id="viewManagerPsw<?php echo $rowmanager["manager_No"]?>" value="<?php echo $rowmanager["manager_Psw"]?>">
                                                    </div>
                                                    <div class="d-flex form-group">
                                                        <label for="viewMealAuth" class="title-width">管理員權限</label>
                                                        <select class="form-control change-select" id="viewMealAuth<?php echo $rowmanager["manager_No"]?>">
                                                            <option><?php if($rowmanager['manager_Auth']==1){
                                                                            echo "有權";
                                                                           }else{
                                                                            echo "停權";
                                                                     }?></option>
                                                            <option><?php if($rowmanager['manager_Auth']==0){
                                                                            echo "有權";
                                                                           }else{
                                                                            echo "停權";
                                                                     }?></option>
                                                        </select>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer justify-content-center">
                                                <button type="button" class="btn btn-primary mainBTN btn-touch" id="manager-updata<?php echo $rowmanager['manager_No'] ?>">修改</button>
                                                <button type="button" class="btn btn-secondary subBTN" data-dismiss="modal">取消</button>
                                            </div>
                                             <script>
                                                document.getElementById("manager-updata<?php echo $rowmanager['manager_No'] ?>").addEventListener('click',function(){

                                                    var Auth = document.getElementById("viewMealAuth<?php echo $rowmanager["manager_No"]?>").value;
                                                    
                                                    if(Auth == '停權'){
                                                        i = 0;
                                                    }else{
                                                        i = 1;
                                                    }
                                                   
                                                    //=====使用Ajax,更新  
                                                    var xhr = new XMLHttpRequest();
                                                    xhr.onload = function (){
                                                        if( xhr.status == 200){
                                                            alert("資料更新成功");
                                                          
                                                            // swal("成就資料更新成功", "", "success");
                                                        }else{
                                                            alert(xhr.status);
                                                        }
                                                    }
                                                    
                                                    
                                                    xhr.open("post", "managerAuth.php", true);
                                                    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
                                                    var data_info = "viewMealNo=" + document.getElementById("viewMealNo<?php echo $rowmanager["manager_No"]?>").value + //會員編號
                                                                    
                                                                    "&viewManagerPsw=" + document.getElementById("viewManagerPsw<?php echo $rowmanager["manager_No"]?>").value + //會員密碼
                                                                    "&viewMealAuth=" + i;//會員狀態
                                                                      
                                                    console.log(data_info);
                                                    xhr.send(data_info);
                                                
                                                    location.reload();//重新整理頁面
                                                });
                                            </script>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>

                        <?php
                            }
                        ?>      
                        <?php
                            }catch(PDOException $e){
                                echo $e->getMessage();
                            }
                        ?>

                    </tbody>
                </table>
            </div>
        </div>
    </div>    
  
    <button type="button" id="BackTop" class="toTop-arrow"></button>
    
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    <script
      src="https://code.jquery.com/jquery-3.3.1.min.js"
      integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
      crossorigin="anonymous"></script>

<!-- 按鈕切換 -->
    <script>
        $(".touch").click(function(){

            $(".change").attr("readonly",false);
            $(".change-select").attr("disabled",false);
            $('.btn-touch').click(function(){
                $(".change").attr("readonly",false);
                $(".change-select").attr("disabled",false);
                //..........
                if($(".btn-touch").html() == "確認"){ //update to db;
                    $('.btn-touch').html("修改");
                    $(".change").attr("readonly",true);
                    $(".change-select").attr("disabled",false);
                }else{
                    $('.btn-touch').html("確認");
                }
                //..........
            });
        });
    </script>

<!-- GoTop -->
   <!--  <script>
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


<!-- 新增管理員 -->
   <script>
    $(function(){    
        $('.addsave').click(function(){
         $.ajax({
                type:'POST',      //使用POST
                url:'addmanager.php',  //請求的PHP位址

                //夾帶user輸入的資料name:$('#name').val()
                data:{
                    managerId:$('#managerId').val(),
                    managerPsw:$('#managerPsw').val(),
                    managerAuth:$('#managerAuth').val()},

                success:function(data){
                 alert(data);
                        //請求成功時重新reload讓他再做一次撈取資料庫資料的動作
                          // 這個時候撈出的資料就已經包含我們上傳的資料了
                 location.reload();
                },
                error: function(JqXHR, textStatus,errorThrown){
                 alert("失敗!!");
                 console.log(JqXHR.responseText);
                }
          });
        });
     });   
    </script>

<!-- //修改狀態改變 -->
    <!-- <script>
    $(function(){    
        $('.btn-touch').click(function(){
         $.ajax({
                type:'POST',      //使用POST
                url:'managerAuth.php',  //請求的PHP位址

                //夾帶user輸入的資料name:$('#name').val()
                data:{
                    viewManagerId:$('#viewManagerId').val(),
                    viewMealNo:$('#viewMealNo').val(),
                    viewManagerPsw:$('#viewManagerPsw').val(),
                    viewMealAuth:$('#viewMealAuth').val()},
                    
                success:function(data){
                 alert(data);
                        //請求成功時重新reload讓他再做一次撈取資料庫資料的動作
                          // 這個時候撈出的資料就已經包含我們上傳的資料了
                 location.reload();
                },
                error: function(JqXHR, textStatus,errorThrown){
                 alert("失敗!!");
                 console.log(JqXHR.responseText);
                }
          });
        });
     });   
    </script>
 -->    
   
    <!-- <script>
        $('.btn-touch').click(function () {
            manager_Auth=viewMealSold<?php echo $rowmanager["manager_No"]?>.split('_')[1];
            manageStatus=this.innerText;
            if(this.innerText=='停權'){
                this.innerText='有權';
                this.parentNode.previousElementSibling.innerText='停權';
            }else{
                this.innerText='停權';
                this.parentNode.previousElementSibling.innerText='有權';
            } 
            changeStatus(managerNo,manageStatus);
         });
//權限改變ajax改變資料庫
        function changeStatus(managerNo,manageStatus){
        
            var xhr = new XMLHttpRequest();
            xhr.onload = function(){
                // console.log(this.parentNode.previousSibling.previousSibling);
                if(xhr.status == 200){
                    if( xhr.responseText.indexOf("succes") != -1){
                        console.log('succes');
                    }
                }else{
                    alert(xhr.status);
                }
            }
            xhr.open('post','backChangeEmpStatus.php',true);
            xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
            var obj = {
                managerNo:managerNo,
                manageStatus:manageStatus,
            }
            var loginInfo = JSON.stringify(obj);
            var data_info = "loginInfo=" + loginInfo;
            xhr.send(data_info);
         }   
      
    </script> -->


</body>
</html>
