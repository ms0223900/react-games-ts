 
<?php
  ob_start();
  session_start();

  // $u_managerId = $_POST['managerId'];
  // $u_managerPsw = $_POST['managerPswmanager_Psw

  try{
   require_once("../connectMember.php");
   $sql = "UPDATE manager
          SET  manager_Psw = :viewmanagerPsw,
               manager_Auth = :viewMealAuth
          WHERE manager_No = :viewMealNo";
  $member = $pdo->prepare($sql);
  $member->bindValue(":viewMealNo", $_POST["viewMealNo"]); //會員編號
  $member->bindValue(":viewmanagerPsw", $_POST["viewManagerPsw"]); //會員密碼
  $member->bindValue(":viewMealAuth", $_POST["viewMealAuth"]); //會員權限

  $member->execute();
  
     
  // header(location:getenv("HTTP_REFERER"));
  }catch(PDOException $e){
   echo "錯誤原因:",$e ->getMessage(),'<br>';
   echo "錯誤行列:",$e ->getLine();
   }

        
?>