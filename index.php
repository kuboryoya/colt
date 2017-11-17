<?php
require('read.php');

//cameraから送られたデータをデータベースに入れた配列を作成
$have = readCsv("data/have.csv");
$new = true;
if(isset($_POST['bagName'])){
  //データベースを参照
  for($i=0; $i<count($have); $i++){
    //該当する虫のデータに情報をそれぞれ代入
    if($_POST['bagName'] == $have[$i][0]){
      $new = false;
      $have[$i][1] = $_POST['bagImage'];
      $have[$i][2] = $_POST['bagPlace'];
      $have[$i][3] = $_POST['bagDate'];
      $have[$i][4] = $_POST['bagLat'];
      $have[$i][5] = $_POST['bagLng'];
      $have[$i][6] = $_POST['bagResize'];
      $have[$i][7] = $_POST['bagRatio'];
    }
  }
  // もし新しい虫なら、新しい行にデータ作成
  if($new){
    $have[] = [
      $_POST['bagName'],
      $_POST['bagImage'],
      $_POST['bagPlace'],
      $_POST['bagDate'],
      $_POST['bagLat'],
      $_POST['bagLng'],
      $_POST['bagResize'],
      $_POST['bagRatio']
    ];
  }

}
//配列を,区切りの文字列にして、csvファイルに１行ずつ書き込み
$fp = fopen('data/have.csv', 'w');
foreach($have as $data){
  $line = implode(',' , $data);
  fwrite($fp, $line . "\n");
}
fclose($fp);

//全虫のデータ
$bag = readCsv("data/bag.csv");
//自分の持つ虫のデータ
$have = readCsv("data/have.csv");

?>

<!doctype html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>いきものあつめ</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/index.css">
</head>
<body>
  <header>
    <div class="l-in">
      <p class="header-found">見つけた数
        <em>
          <?php
            $LookNum = 0;
            for($i=1; $i<25; $i++){
              if($have[$i][1]){
                $LookNum ++;
              }
            }
            echo '<span>';
            echo $LookNum;
            echo  '</span>';
            echo '<span>／</span>';
            echo '<span>';
            echo '24';
            echo '</span>';
          ?>
        </em>
        <strong>
          <?php
            if(count($have) - 25 > 0){
              echo '+';
              echo count($have) - 25;
            }
          ?>
        </strong>
      </p>
    </div>
  </header>

  <div class="index-bg"></div>

  <div class="content">
    <ul class="item-list l-in">
      <?php
        for($i=1; $i< count($have); $i++){
        echo '<li>';
        //撮った画像があるなら表示
        if($have[$i][1]){
          echo '<a href="single.php?bag=' . $have[$i][0] . '">';
          echo '<div class="item-list-mask"><img src="data:image/jpeg;base64,'. $have[$i][1] . '"></div>';
          echo '<p>'. $have[$i][0] . '</p>';
          echo '</a>';
        }else{
          echo '<div>';
          echo '<img src="image/hatena.png">';
          echo '<p>'. $have[$i][0] . '</p>';
          echo '</div>';
        }
        echo '</li>';
        }
      ?>
    </ul>
    <div id="map-window">
      <div id="myMap"></div>
    </div>
  </div>

  <nav class="gNav">
    <div class="l-in">
      <p id="btn-list"><img src="image/btn-list_on.png"></p>
      <form id="bagForm" class="gNav-camera" name="bagForm" action="camera.php" method="post">
        <input type="file" name="bagImg" id="bagImg">
      </form>
      <p id="btn-map"><img src="image/btn-map.png"></p>
    </div>
  </nav>

  <!-- 画像認識用の画像が入る -->
  <img id="myImg" src="">

<script src="js/exif.js"></script>
<script
        src="https://code.jquery.com/jquery-2.2.4.min.js"
        integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
        crossorigin="anonymous">
</script>
<script src="js/csv.js"></script>
<script src="js/map.js"></script>
<script src="js/inputRead.js"></script>
<script src="js/script.js"></script>
<script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBFLtlLvGmy0vzobLRmKtFJBl_OS1HiKOE&callback=initMap">
</script>
</body>
</html>