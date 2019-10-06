<?php
ob_start();
session_start();
try{
  require_once("connectMember.php");
  $sql = "UPDATE achievement
          SET  achievement_Name = :viewAchievementName,
               achievement_Bonus = :viewAchievementBonus,
               meal_Total = :viewAchievementMealTotal,
               isAchievable = :viewAchievementAchievable,
               achievement_Pic = :viewAchievementPic
          WHERE achievement_No = :viewAchievementNo";

  $member = $pdo->prepare( $sql);
  $member->bindValue(":viewAchievementNo", $_POST["viewAchievementNo"]); //成就編號
  $member->bindValue(":viewAchievementName", $_POST["viewAchievementName"]); //成就名稱
  $member->bindValue(":viewAchievementBonus", $_POST["viewAchievementBonus"]); //成就完成獎勵
  $member->bindValue(":viewAchievementMealTotal", $_POST["viewAchievementMealTotal"]); //達成餐點數量
  $member->bindValue(":viewAchievementAchievable", $_POST["viewAchievementAchievable"]); //成就狀態
  $member->bindValue(":viewAchievementPic", $_POST["viewAchievementPic"]); //成就圖檔位置

  $member->execute();
  
}catch(PDOException $e){
  echo $e->getMessage();
}
?>