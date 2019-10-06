<?php
// ob_start();
// session_start();
try{

  function mb_str_split($a){
    return preg_split('/(?<!^)(?!$)/u', $a );
  };
  $BotInfo = json_decode($_REQUEST["jsonStr"]);  //取得前端送來的json字串，並將其轉成物件
  require_once("connectBooks.php");
  $sql = "select * from chatbot where keyword like :keyword" ;
  $key = "%".$BotInfo->keyword."%";
  $chatBot = $pdo->prepare($sql);
  $chatBot->bindValue(":keyword", $key);
  $chatBot->execute();

  if( $chatBot->rowCount()==0){ //查無此人
    $sql = "select * from chatbot" ;
    $chatBot = $pdo->query( $sql );
    $BotRows = $chatBot->fetchAll(PDO::FETCH_ASSOC);
    foreach ($BotRows as $q => $BotRow){
      $str = mb_str_split($BotRow["keyword"]);
      $strlen = count($str);
      for ($i=0; $i < $strlen ; $i++) { //跑正迴圈
          $str_tol = '';
          for ($j=$i ; $j < $strlen; $j++) { 
            $str_tol = $str_tol .  $str[$j]; 
          }
          if( strpos( $str_tol , $BotInfo->keyword) === false){ //在段落未找到與關鍵字符合
            for ($k= $strlen; $k > 0  ; $k--) {   //跑負迴圈換方向再搜尋一次
              $str_tol = '';
              for ($h=0 ; $h < $k; $h++) { 
                $str_tol = $str_tol . $str[$h]; 
              }
              if( strpos( $BotInfo->keyword, $str_tol) === false){ //還是未搜尋到
                $b=false;
              }else{
                $b=true;
                break;
              };
            };
          }else {
            $b=true;
            break;
          };
        }
      if($b){
        echo $BotRow["content"];
        break;
      };
    };
    if($b==false){
      echo "not found";
    };
  }else{
    $BotRows = $chatBot->fetch(PDO::FETCH_ASSOC);
    echo $BotRows["content"];
  };
}catch(PDOException $e){
  echo $e->getMessage();
}
?>
