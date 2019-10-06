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
    <title>後台取餐</title>
    <style>
        #id{
            padding: 10px 0 24px;
        }
        #banner{
            margin: 0 auto;
            max-width: 480px;
            height: auto;
            background: none;
        }
        #AA{
            margin-top: -5px; 
            border: 3px solid #76391B;
            border-radius: 20px;
            font-size: 20px;
            vertical-align: middle;
            letter-spacing: 1px;
        }
        #BB{
            vertical-align: middle;
            bottom: auto;
        }
    </style>
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
                <a href="backstage-achievement.php" class="list-group-item list-group-item-action back-change">成就管理</a>
                <a href="backstage-memberOrder.php" class="list-group-item list-group-item-action back-change">訂單管理</a>
                <a href="backstage-manager.php" class="list-group-item list-group-item-action back-change">管理員帳號</a>
                <a href="takeMealAfter.php" class="list-group-item list-group-item-action back-change focus-color">會員取餐</a>
            </div>
        </div>
    
        <div class="container col-xl-10">
            <div class="back-text">
				<div class="banner"></div>
                <table class="table">
                    <tbody>
                        <tr>
                          <td id="id">
                            <div class="banner" id="banner"><input id="AA" type="text" placeholder="輸入訂單編號"><button id="BB" type="button" class="mainBTN">取餐</button></div>
                            <script>
                              document.getElementById("BB").addEventListener('click',function(){
                                //=====使用Ajax,取餐 
                                var xhr = new XMLHttpRequest();
                                xhr.onload = function (){
                                    if( xhr.status == 200){
                                        alert("取餐成功");
                                    }else{
                                        alert(xhr.status);
                                    }
                                }
                                xhr.open("post", "takeMeal.php", true);
                                xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");

                                var data_info = "memOrderNo=" + document.getElementById("AA").value; //訂單編號
                                // alert(data_info);
                                xhr.send(data_info);
                              });
                             </script>
                          </td>
                        </tr>
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
