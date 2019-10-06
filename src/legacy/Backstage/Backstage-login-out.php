<?php
  ob_start();
  session_start();

  require_once("../connectMember.php");
  
  unset($_SESSION['manager_No']);

  header("Location:../index_front.php");
?>

