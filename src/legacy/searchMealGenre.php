<?php
try{
  require_once("connectBooks.php");
  $sql = "select * from meal_genre";
  $meal_genre = $pdo->query($sql);

  while ($Row = $meal_genre->fetch(PDO::FETCH_ASSOC)) {
    ?>
    <input type="checkbox" name="mealGenre-No" id="mealGenre-No<?php echo $Row["mealGenre_No"]?>">
    <label for="mealGenre-No<?php echo $Row["mealGenre_No"]?>" class="mealGenre-No"><?php echo $Row["mealGenre_Name"] ?></label>
    <?php
  }
}catch(PDOException $e){
  echo $e->getMessage();
}
?>
