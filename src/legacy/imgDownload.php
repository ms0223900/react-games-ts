<?php 
// $storeId = $_REQUEST["storeId"];
$storeId = 43;
  
	$width = 150;
	$height = 150;
    $url = urlencode("http://140.115.236.72/demo-projects/CD103/CD103G3/takeMeal.php?memOrderNo=Meal20185318");
    $image  = 'http://chart.apis.google.com/chart?chs='.$width.'x'.$height.'&cht=qr&chl='.$url;
    // string filetype($image);
    $file = file_get_contents($image);

    header("Content-type: application/octet-stream");
    header("Content-Disposition: attachment; filename=qrcode.png");
    header("Cache-Control: public");
    header("Content-length: " . strlen($file)); // tells file size
    header("Pragma: no-cache");
    echo $file;
    die;

?>