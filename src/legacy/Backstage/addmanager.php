<?php
  // ob_start();
  // session_start();

  // $u_managerId = $_POST['managerId'];
  // $u_managerPsw = $_POST['managerPsw'];


  try{
    require_once("../connectMember.php");
    $sql = "insert into manager (manager_Id,manager_Psw) values (:managerId, :managerPsw)";
    $addmanager = $pdo->prepare($sql);
    $addmanager->bindValue(":managerId", $_POST['managerId']);
    $addmanager->bindValue(":managerPsw", $_POST['managerPsw']);
    $addmanager->execute();
    echo '新增成功';
     
  // header(location:getenv("HTTP_REFERER"));
  }
  catch(PDOException $e){
   echo "錯誤原因:",$e ->getMessage(),'<br>';
   echo "錯誤行列:",$e ->getLine();
   }

        
?>