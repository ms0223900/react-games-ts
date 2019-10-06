<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>

    
</body>
<script>
    window.onload = function() {
        var storage = sessionStorage;
        storage.clear();
        location.href = 'index_front.php';
    }
    

</script>
</html>

<?php
session_start();
unset( $_SESSION["member_No"]);   
unset( $_SESSION["member_Id"]);
unset( $_SESSION["member_Psw"]);
unset( $_SESSION["member_Nick"]);
unset( $_SESSION["email"]);
unset( $_SESSION["mobile"]);
unset( $_SESSION["member_Pic"]);
unset( $_SESSION["member_Bonus"]);
unset( $_SESSION["member_buyCount"]);
// header('Location: index_front.php');  
?>


    
