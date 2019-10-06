<?php
try{
  require_once('phpDB/connectDB_CD103G3.php');
  $sql = "select * from groupontag";
  $groupontag = $pdo -> query($sql);

  while ($Row = $groupontag->fetch(PDO::FETCH_ASSOC)) {
    ?>
    <input type="radio" name="groupon-TagName" id="groupon-TagNo<?php echo $Row["groupon_TagNo"]?>">
    <label for="groupon-TagNo<?php echo $Row["groupon_TagNo"]?>" class="groupon-TagName"><img src="images/icon/tag_N.svg" alt="<?php echo  $Row["groupon_TagName"]?>"><?php echo  $Row["groupon_TagName"]?></label>
    <?php
  }
}catch(PDOException $e){
  echo $e->getMessage();
}
?>
