<?php
ob_start();
session_start();
try{
  require_once("connectMember.php");
  $sql = "INSERT INTO `achievement`(`achievement_Name`, `achievement_Bonus`, `meal_Total`, `isAchievable`, `achievement_Pic`)
          VALUES (:viewAchievementName, :viewAchievementBonus, :viewAchievementMealTotal, :viewAchievementAchievable, :viewAchievementPic)";


  $member = $pdo->prepare( $sql);
  $member->bindValue(":viewAchievementName", $_POST["achievementName"]); //成就名稱
  $member->bindValue(":viewAchievementBonus", $_POST["achievementBonus"]); //成就完成獎勵
  $member->bindValue(":viewAchievementMealTotal", $_POST["achievementMealTotal"]); //達成餐點數量
  $member->bindValue(":viewAchievementAchievable", $_POST["achievementAchievable"]); //成就狀態
  $member->bindValue(":viewAchievementPic", $_POST["achievementPic"]); //成就圖檔位置

  $member->execute();

}catch(PDOException $e){
  echo $e->getMessage();
}
?>