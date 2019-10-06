<?php
        try{
            $meal_No = $_REQUEST["meal_No"];
            $_SESSION["quantity"][$meal_No] = 1;
            require_once('phpDB/connectDB_CD103G3.php');
            
            $sql = "select * from meal A1 inner join meal_genre A2 on A1.mealGenre_No = A2.mealGenre_No where A1.meal_No = $meal_No group by A1.meal_No";
            $dishes = $pdo -> query($sql);
            
            if( $dishes->rowCount() == 0){
                echo "查無此商品資料";
            }else{
                $dishesRow = $dishes -> fetchObject();
    ?> 


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
    <link rel="stylesheet" href="css/owl.carousel.min.css">
    <link rel="stylesheet" href="css/owl.theme.default.min.css">
    <link rel="stylesheet" href="css/eatDetail.css">
    <title><?php echo $dishesRow->meal_Name; ?></title>
</head>
<body>
    
    <?php
         require_once('nav.php');
    ?>
    <div class="eatDetail">
    <div class="eatDetail-body">

<!-- 產品介紹 -->
       
    <div class="banner">
        <div class="wrap clearfix">
            <div class="banner-pic part-md-6 part-lg-6 clearfix">
                <figure>
                    <img class="sunder-img-zoom" src="images/meals/<?php echo $dishesRow->meal_Pic; ?>" alt="<?php echo $dishesRow->meal_Name; ?>">
                </figure>
                <button class="heart_icon">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
                        <g>
                            <path class="st0" d="M83.2,16.3c-3.3-3-7.6-4.5-12.1-4.5c-5.2,0-10.2,2.2-13.7,5.9c-1.7,1.8-3,3.9-4.3,6.6c-0.5,1.3-1.8,2.1-3.1,2.1
                            c-1.3-0.1-2.6-0.7-3.2-2l-0.6-1.2C42.6,16,36.2,11.8,29,11.8c-1.2,0-2.3,0.2-3.5,0.4c-6.1,1.1-10.9,4.7-14.3,10.5
                            c-5,8.6-5.5,16.1-1.4,23.6c2.6,4.7,6,9.4,10.3,14.2c8.1,9,17.6,17.6,29.9,26.9c11.3-8.6,20.1-16.3,27.8-24.5
                            C82,58.3,86.9,52.7,90.3,46c1.3-2.6,2.6-5.7,2.4-9C92.5,28.4,89.4,21.7,83.2,16.3z"/>
                            <path class="st0" d="M87.9,10.6c-4.6-4-10.5-6.2-16.6-6.2c-7.1,0-13.9,2.9-18.8,8.1c-0.9,0.9-1.7,1.9-2.5,3C44,7.2,34.1,2.9,24.2,4.9
                            c-8.1,1.5-14.5,6.2-19,13.9C-1.1,29.6-1.6,40.2,3.7,50c2.8,5.3,6.5,10.4,11.3,15.7c8.7,9.7,19,18.9,32.4,28.9c0.9,0.6,1.8,1,2.7,1
                            c1.5,0,2.5-0.8,3-1.2C65,85.3,74.5,77,82.8,68.1c4.6-4.9,9.9-11,13.7-18.6c1.6-3.3,3.5-7.7,3.4-12.6C99.7,26.2,95.7,17.3,87.9,10.6z
                            M90.3,46c-3.4,6.7-8.3,12.3-12.5,16.9C70.1,71.1,61.3,78.8,50,87.4c-12.3-9.3-21.8-17.9-29.9-26.9c-4.3-4.8-7.7-9.5-10.3-14.2
                            c-4.1-7.5-3.6-15,1.4-23.6c3.4-5.8,8.2-9.4,14.3-10.5c1.2-0.2,2.3-0.4,3.5-0.4c7.2,0,13.6,4.2,17.2,11.4l0.6,1.2
                            c0.6,1.3,1.9,1.9,3.2,2c1.3,0,2.6-0.8,3.1-2.1c1.3-2.7,2.6-4.8,4.3-6.6c3.5-3.7,8.5-5.9,13.7-5.9c4.5,0,8.8,1.5,12.1,4.5
                            c6.2,5.4,9.3,12.1,9.5,20.7C92.9,40.3,91.6,43.4,90.3,46z"/>
                        </g>
                    </svg>
                    <span>收藏</span>
                </button>
            </div>
            <div class="banner-txt part-md-6 part-lg-6">
                <h2 class="product color"> <?php echo $dishesRow->meal_Name; ?> </h2>
                <div class="score clearfix">
                    <div class="tb-width fl color">評分</div>   
                    <div class="grade fl">
                        <span class="fl"> <?php echo $dishesRow->meal_Total; ?> </span>
                        <figure class="fl"><img src="images/icon/eggFull.svg"></figure>
                        <figure class="fl"><img src="images/icon/eggFull.svg"></figure>
                        <figure class="fl"><img src="images/icon/eggFull.svg"></figure>
                        <figure class="fl"><img src="images/icon/eggFull.svg"></figure>
                        <figure class="fl"><img src="images/icon/eggFull.svg"></figure>
                    </div>
                </div>
                <div class="sort clearfix">
                    <span class="tb-width fl color">分類</span>
                    <span class="fl"> <?php echo $dishesRow->mealGenre_Name; ?> </span>
                </div>       
                <div class="kcal clearfix">
                    <span class="tb-width fl color">卡路里</span>
                    <span class="fl"> <?php echo $dishesRow->meal_Cal; ?> kcal</span>
                </div> 
                <div class="content clearfix">
                    <span class="color">餐點介紹</span>
                    <p> <?php echo $dishesRow->meal_Info; ?> </p>  
                </div>
                <span class="price">NT <?php echo $dishesRow->meal_Price; ?> 元</span>
                <div class="count-buy clearfix">
                    <span class="tb-width fl color">數量</span>
                    <div class="count-qty line-block">
                        <button class="qty-cut plusAndMinus" id="qty-cut" name="qty-cut">-</button>
                        <input type="text" class="qty" id="qty" name="quantity" value="1">
                        <button class="qty-add plusAndMinus" id="qty-add" name="qty-add">+</button>
                    </div>    
                </div>
                <div class="count-btn clearfix">
                    <button class="add-cart mainBTN cart_icon" name="add-cart" id="A0<?php echo $dishesRow->meal_No; ?>">
                    <input type="hidden" value="<?php echo $dishesRow->meal_Name; ?>|<?php echo $dishesRow->meal_Pic; ?>|<?php echo $dishesRow->meal_Price; ?>|1">
                        <svg version="1.1" id="圖層_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
                            <g>
                                <path class="st2" d="M73.8,70c-11.3,0-22.4,0-33.5,0c3.4,1,6.3,3.1,8.3,6.7s2.6,7.4,1.8,11.6c-1.4,7.1-7,12-13.1,11.6
                                s-11.2-6.3-11.8-13.6c-0.5-6.8,3-14.1,10.3-16.3c-0.8,0-1.8,0-2.6,0c-4.3,0-7.4-3-8.5-7.9c-2.9-13.5-5.7-26.9-8.6-40.2
                                c-0.8-3.8-1.7-7.8-2.5-11.8c-2,0-4.1,0-6.2,0c-1.1,0-2.3,0-3.4,0C1.7,10-0.1,7.8,0,5c0-2.6,1.8-4.8,4-5c3.4,0,6.9,0,10.2,0.1
                                c3.7,0.1,6.6,3.3,7.5,7.8c2.1,9.7,4.1,19.2,6.1,28.8c1.6,7.7,3.2,15.3,4.8,23c16.1,0,32.2,0,48.4,0c2.6-11.5,5.3-23,8-34.8
                                c-19.2,0-38.2,0-57.5,0c-0.7-3.3-1.4-6.6-2.1-9.9c23.5,0,47,0,70.5,0c-1.4,5.8-2.6,11.5-4,17.3c-2.2,9.8-4.5,19.6-6.8,29.3
                                c-1.3,5.6-4.2,8.2-9.1,8.2c-0.7,0-1.4,0-2.2,0.1c3.6,1.1,6.4,3.2,8.4,6.8c2,3.6,2.5,7.6,1.6,11.8c-1.6,7.1-7,11.6-13.1,11.1
                                c-6-0.5-11-6.1-11.7-13.4C62.5,79.1,66.4,72.9,73.8,70z M38,79.9c-2.3,0-4.2,2.1-4.3,4.8c-0.1,2.8,1.8,5.1,4.2,5.1s4.3-2.2,4.3-5
                                C42.2,82.2,40.3,79.9,38,79.9z M75.9,89.8c2.3,0,4.2-2.1,4.3-4.8c0.1-2.8-1.8-5.1-4.2-5.1c-2.3,0-4.2,2.1-4.3,4.8
                                C71.7,87.6,73.5,89.8,75.9,89.8z"/>
                            </g>
                        </svg>
                        <span>加入購物車</span>
                    </button>
                    <button type="submit" class="go-cart subBTN" name="go-cart"><i class="fas fa-shopping-bag"></i>立即預訂</button>
                </div>
            </div>
        </div>
        <?php
            }
        }catch(PDOException $e){
            echo "error~<br>";
            echo $e->getMessage() , "<br>";
        }
        ?>
    </div>

<!-- 留言板 -->
    <div class="msg-board">
        <div class="wrap">
            <figure class="title"><img src="images/messageTitle.svg" alt=""></figure>
            <figure class="title-img">
                <img src="images/separate_line.png">
            </figure>
            <div class="member-msg">
                <div class="member-data clearfix">
                    <div class="member-pic fl">
                        <figure class="member-img fl">
                            <img src="images/longFork.png" style="width: auto; height: 60px; margin: auto;">
                        </figure>
                        <div class="member-id fl color">餐點留言區</div>
                    </div>
                    <!-- <div class="comments-time fl">2018-01-01</div> -->
                </div>
                <div class="comments clearfix">
                    <textarea placeholder="請輸入留言..." name="member-letter" id="memberLetter" class="member-letter" rows="3" maxlength="50" required="required"></textarea>
                    <div class="msg-btn">   
                        <button type="text" id="commentsChange" class="cancelBTN">隨機產生留言</button>
                        <button type="submit" value="<?php echo $meal_No ?>" name="comments" id="commentsBtn" class="nextBTN">送出</button>
                    </div>
                </div>
            </div>
            <div class="text-container">
            <?php
            
                
                $sql = "select * from message where message.meal_No=$meal_No && message.message_Reported = false ORDER BY message.message_No DESC";
                $message = $pdo -> query($sql);
                if($message -> rowCount() == 0) {
                    $memId = '訪客';
                    $memPic = 'icon7.png';
                }
                while($msgRow = $message->fetchObject()){
                     
                        $sql = 'SELECT * from member WHERE member_No = (SELECT member_No from message WHERE message_No = :memNo)';
                        $memInfo = $pdo -> prepare($sql);
                        $memInfo -> bindValue('memNo', $msgRow -> message_No);
                        $memInfo -> execute();
                        if($memInfo -> rowCount() == 0) {
                            $memId = '訪客';
                            $memPic = 'icon7.png';
                        } else {
                            $memInfoR = $memInfo -> fetchAll();
                            $memId = $memInfoR[0]['member_Id'];
                            $memPic = $memInfoR[0]['member_Pic'];
                        }
                    
                        
                        
                    
                        
                    
            ?>
                <div class="member-msg">
                        <div class="member-data clearfix">
                            <div class="member-pic fl">
                                <figure class="member-img fl">
                                    <img src="images/<?php echo $memPic ?>">
                                </figure>
                                <div class="member-id fl color"><?php echo $memId ?>留言</div>
                            </div>
                            <div class="comments-time fl"><?php echo $msgRow -> message_Time ?> </div>
                        </div>
                        <div class="comments clearfix">
                            <p><?php echo $msgRow -> message_Content ?></p>
                            <div class="msg-btn">  
                                <button type="submit" name="comments" id="num<?php echo $msgRow -> message_No ?>" class="nextBTN report">檢舉</button>
                                <input type="hidden" id="mealnum<?php echo $msgRow -> message_No ?>" value="<?php echo $msgRow -> meal_No ?>">
                                
                                <input type="hidden" id="msgnum<?php echo $msgRow -> message_No ?>" value="<?php echo $msgRow -> message_No ?>">
                            </div>
                        </div>
                    </div>
                
            
            <?php }; ?> 
                <div class="member-msg">
                    <div class="member-data clearfix">
                        <div class="member-pic fl">
                            <figure class="member-img fl">
                                <img src="images/<?php echo $memPic ?>">
                            </figure>
                            <div class="member-id fl color">使用者留言</div>
                        </div>
                        <div class="comments-time fl"></div>
                    </div>
                    <div class="comments clearfix">
                        <p></p>
                        <div class="msg-btn">  
                            <button type="submit" name="comments" class="nextBTN">檢舉</button>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    </div>

<!-- 推薦飯團 -->
    <div class="scorpion">
        <div class="wrap">
            <figure class="title">
                <img src="images/grouponTitle.svg" alt="">
            </figure>
            <figure class="title-img">
                <img src="images/separate_line.png">
            </figure>
        </div>
        <div class="groupon owl-carousel"> 
            <!-- <div class="groupon-box">
                <div class="groupon-title">
                    <p class="color">有青!才敢大聲!!</p>
                    <span>6折</span>
                </div>
                <div class="groupon-meals">
                    <div class="groupon-item">
                        <figure class="meals-img">
                            <img src="images/ra_03.png" alt="">
                        </figure>
                        <span class="meals-title">好好動吃動</span>
                    </div>
                    <div class="groupon-item">
                        <figure class="meals-img">
                            <img src="images/ra_03.png" alt="">
                        </figure>
                        <span class="meals-title">好好動吃動</span>
                    </div>
                    <div class="groupon-more color">
                        總共5個餐點...
                    </div>
                </div>
                <div class="groupon-detail">
                    <div class="groupon-day clearfix">
                        <span class="fl color">飯團天數</span>
                        <span class="fl">5天</span>
                    </div>
                    <div class="groupon-money clearfix">
                        <span class="fl color">平均一餐</span>
                        <span class="fl">20元</span>
                    </div>
                    <div class="groupon-date clearfix">
                        <span class="fl color">截止日期</span>
                        <span class="fl">11/30前</span>
                    </div>
                </div>
                <div class="groupon-btn subBTN"><a href="#">查看此飯糰</a></div>
            </div> -->
        </div>
    </div>

    </div>

    </div>
</body>

<script src='https://cdn.jsdelivr.net/mojs/0.265.6/mo.min.js'></script>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<script src="js/jquery-3.3.1.min.js"></script>
<script src="js/owl.carousel.min.js"></script>
<script src="js/iconCliCK.js"></script>
<script src="js/eatDetail.js"></script>
<script>
    document.getElementsByClassName('go-cart ')[0].addEventListener('click',function () {
        location.href='shopping_cart.php';
    })
</script>

</html>
