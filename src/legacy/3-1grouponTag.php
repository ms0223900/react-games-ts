<?php
    require_once('phpDB/connectDB_CD103G3.php');
    // $_SESSION['memId'] = ''; 
    $sql = "SELECT * from groupontag WHERE `groupon_TagName` != '官方飯團'";
    $tag = $pdo -> prepare($sql);
    $tag -> execute();
    $tagR = $tag -> fetchAll();
    foreach ($tagR as $i => $tagRe) {
        
?>
<option value="tag<?php echo $tagRe["groupon_TagNo"]; ?>">
    <?php echo $tagRe["groupon_TagName"];   ?>
</option>

<?php
    }
    
?>


<?php
if(isset($_SESSION['member_Id'])) {
    $memId = $_SESSION['member_Id'];
    if( strrpos($memId,'ayCook') ) {?>
        <option value="tag8">
            官方飯團
        </option>
        <?php  }
}

  
   
?>