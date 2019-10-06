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
    <title>客服雞後台</title>
</head>
<body class="out">
    <div class="d-flex" name="top">
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
                <a href="backstage-chatBot.html" class="list-group-item list-group-item-action back-change focus-color">客服雞器人</a>
                <a href="backstage-achievement.html" class="list-group-item list-group-item-action back-change">成就管理</a>
                <a href="backstage-memberOrder.html" class="list-group-item list-group-item-action back-change">訂單管理</a>
                <a href="backstage-manager.html" class="list-group-item list-group-item-action back-change">管理員帳號</a>
            </div>
        </div>
    
        <div class="container col-xl-10">
            <div class="back-text">
                <div class="banner"><button type="button" class="mainBTN" tabindex="-1" data-toggle="modal" data-target="#chatBot">新增</button></div>
                <div class="modal fade" id="chatBot" tabindex="-1" role="dialog" aria-labelledby="chatBotTitle" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <!-- 新增跳窗 -->
                        <div class="modal-content">
                            <figure class="modal-img">
                                <img src="images/dayCookIndex_whiteBG1.svg" alt="">
                            </figure>
                            <div class="modal-header">
                                <h5 class="modal-title" id="chatBotTitle">新增客服雞資訊</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="d-flex form-group">
                                        <label for="chatBotKeyword" class="col-form-label title-width">關鍵字</label>
                                        <input type="text" class="form-control" id="chatBotKeyword">
                                    </div>
                                    <div class="d-flex form-group">
                                        <label for="chatBotContent" class="col-form-label title-width">關鍵字回覆</label>
                                        <textarea class="form-control" id="chatBotContent" maxlength="255" rows="3"></textarea>
                                    </div>
                                    <div class="d-flex form-group">
                                            <label for="chatBotAvailable" class="title-width">關鍵字狀態</label>
                                            <select class="form-control" id="chatBotAvailable">
                                                <option>使用中</option>
                                                <option>未使用</option>
                                            </select>
                                        </div>
                                </form>
                            </div>
                            <div class="modal-footer justify-content-center">
                                <button type="button" class="btn btn-primary mainBTN" id="proChatbotbtn">存檔</button>
                                <button type="button" class="btn btn-secondary subBTN" data-dismiss="modal">取消</button>
                            </div>
                            <script>
                                document.getElementById("proChatbotbtn").addEventListener('click',function(){
                                    //=====使用Ajax,更新成就  
                                    var xhr = new XMLHttpRequest();
                                    xhr.onload = function (){
                                        if( xhr.status == 200){
                                            alert("關鍵字資料新增成功");
                                            // swal("成就資料更新成功", "", "success");
                                        }else{
                                            alert(xhr.status);
                                        }
                                    }

                                    if(document.getElementById("chatBotAvailable").value == "使用中"){
                                        AchState = 1;
                                    }else{
                                        AchState = 0;
                                    }

                                    
                                    xhr.open("post", "backstage-chatBot-Insert.php", true);
                                    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
                                    var data_info = "chatBotKeyword=" + document.getElementById("chatBotKeyword").value + //關鍵字
                                                    "&chatBotContent=" + document.getElementById("chatBotContent").value + //關鍵字回復
                                                    "&chatBotAvailable=" + AchState; //關鍵字狀態

                                    // alert(data_info);
                                    xhr.send(data_info);
                                    
                                    window.history.go(0);//重新整理頁面
                                });
                            </script>
                        </div>
                    </div>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">關鍵字編號</th>
                            <th scope="col">關鍵字</th>
                            <th scope="col">關鍵字回覆</th>
                            <th scope="col">關鍵字狀態</th>
                            <th scope="col">修改</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php 
                            $errMsg = "";
                            try {
								  require_once("connectMember.php");
                                // require_once("connectBooks.php");
                                $sqlChatbot = "select * from chatbot";
                                $productsChatbot = $pdo -> query( $sqlChatbot );
                            } catch (PDOException $e) {
                                $errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
                                $errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";
                            }
                        ?>
                        <?php	
                            if( $errMsg !=""){
                                echo "<tr><td colspan='6' align='center'>$errMsg</td></tr>";
                            }else{
                                while($prodRowChatbot = $productsChatbot->fetchObject()){
                        ?>
                        <tr>
                            <td scope="row"><?php echo $prodRowChatbot->keyword_No ?></td>
                            <td><?php echo $prodRowChatbot->keyword ?></td>
                            <td><?php echo $prodRowChatbot->content ?></td>
                            <td><?php echo $prodRowChatbot->is_Available ? "使用中" : "未使用" ?></td>
                            <td>
                                <i class="fas fa-pencil-alt touch" data-toggle="modal" data-target="#viewChatBot<?php echo $prodRowChatbot->keyword_No ?>"></i>
                                <div class="modal fade" id="viewChatBot<?php echo $prodRowChatbot->keyword_No ?>" tabindex="-1" role="dialog" aria-labelledby="viewChatBotTitle" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <!-- 新增跳窗 -->
                                        <div class="modal-content">
                                            <figure class="modal-img">
                                                <img src="images/dayCookIndex_whiteBG1.svg" alt="">
                                            </figure>
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="viewChatBotTitle">關鍵字資料</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <form>
                                                    <div class="d-flex form-group">
                                                        <label for="ChatBotKeywordNo" class="col-form-label title-width">關鍵字編號</label>
                                                        <input type="text" class="form-control" id="ChatBotKeywordNo<?php echo $prodRowChatbot->keyword_No ?>" value="<?php echo $prodRowChatbot->keyword_No ?>" readonly>
                                                    </div>
                                                    <div class="d-flex form-group">
                                                        <label for="viewChatBotKeyword" class="col-form-label title-width">關鍵字</label>
                                                        <input type="text" class="form-control change" id="viewChatBotKeyword<?php echo $prodRowChatbot->keyword_No ?>" value="<?php echo $prodRowChatbot->keyword ?>" >
                                                    </div>
                                                    <div class="d-flex form-group">
                                                        <label for="viewChatBotContent" class="col-form-label title-width">關鍵字回覆</label>
                                                        <textarea class="form-control change" id="viewChatBotContent<?php echo $prodRowChatbot->keyword_No ?>" maxlength="50" rows="5"><?php echo $prodRowChatbot->content ?></textarea>
                                                    </div>
                                                    <div class="d-flex form-group">
                                                        <label for="viewChatBotAvailable" class="title-width">關鍵字狀態</label>
                                                        <select class="form-control change-select" id="viewChatBotAvailable<?php echo $prodRowChatbot->keyword_No ?>">
                                                            <?php  
                                                            if($prodRowChatbot->is_Available){ 
                                                            ?>                                                             
                                                                <option>使用中</option>
                                                                <option>未使用</option>
                                                            ?>
                                                            <?php  
                                                            }else{
                                                            ?>                                       
                                                                <option>未使用</option>
                                                                <option>使用中</option>
                                                            <?php   
                                                            }
                                                            ?>  
                                                        </select>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer justify-content-center">
                                                <button type="button" class="btn btn-primary mainBTN btn-touch" id="proChatbot<?php echo $prodRowChatbot->keyword_No ?>">修改</button>
                                                <button type="button" class="btn btn-secondary subBTN" data-dismiss="modal">取消</button>
                                            </div>
                                            <script>
                                                document.getElementById("proChatbot<?php echo $prodRowChatbot->keyword_No ?>").addEventListener('click',function(){
                                                    //=====使用Ajax,更新成就  
                                                    var xhr = new XMLHttpRequest();
                                                    xhr.onload = function (){
                                                        if( xhr.status == 200){
                                                            alert("關鍵字資料更新成功");
                                                            // swal("成就資料更新成功", "", "success");
                                                        }else{
                                                            alert(xhr.status);
                                                        }
                                                    }

                                                    if(document.getElementById("viewChatBotAvailable<?php echo $prodRowChatbot->keyword_No ?>").value == "使用中"){
                                                        AchState = 1;
                                                    }else{
                                                        AchState = 0;
                                                    }

                                                    
                                                    xhr.open("post", "backstage-chatBot-Updata.php", true);
                                                    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
                                                    var data_info = "ChatBotKeywordNo=" + document.getElementById("ChatBotKeywordNo<?php echo $prodRowChatbot->keyword_No ?>").value + //關鍵字編號
                                                                    "&viewChatBotKeyword=" + document.getElementById("viewChatBotKeyword<?php echo $prodRowChatbot->keyword_No ?>").value + //關鍵字
                                                                    "&viewChatBotContent=" + document.getElementById("viewChatBotContent<?php echo $prodRowChatbot->keyword_No ?>").value + //關鍵字回復
                                                                    "&viewChatBotKeywordState=" + AchState; //關鍵字狀態

                                                    // alert(data_info);
                                                    xhr.send(data_info);
                                                    
                                                    window.history.go(0);//重新整理頁面
                                                });
                                            </script>
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
