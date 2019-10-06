
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width" />
  <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700italic,700' rel='stylesheet' type='text/css'>
  
  <title>Scratch Card</title>
  <link rel="stylesheet" href="css/scratch.css">
  
</head>
<?php
  require_once('nav.php');
?>
<body>

<div id="scratchGame">
  <div class="scrach-card">
  <div class="wrap">
    <div id="promo" class="scratchpad"></div>
  </div>
  <div class="promo-container" style="display:none;">
    <div class="promo-code"></div>
    <a href="dishes.php" class="btn nextBTN">馬上選購餐點!</a>
  </div>
</div>


</div>



<script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>

<script type="text/javascript" src="https://jennamolby.com/scratch-and-win/js/wScratchPad.min.js"></script>

<script src="js/scratchCustom.js"></script>

</body>
</html>