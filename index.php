<?php
require('read.php');

//cameraから送られたデータをデータベースに入れた配列を作成
$have = readCsv("data/have.csv");
if(isset($_POST['bagName'])){
  //データベースを参照
  for($i=0; $i<count($have); $i++){
    //該当する虫のデータをそれぞれ代入
    if($_POST['bagName'] == $have[$i][0]){
      $have[$i][1] = $_POST['bagImage'];
      $have[$i][2] = $_POST['bagPlace'];
      $have[$i][3] = $_POST['bagDate'];
      $have[$i][4] = $_POST['bagLat'];
      $have[$i][5] = $_POST['bagLng'];
      $have[$i][6] = $_POST['bagResize'];
    }
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
  <title>生き物図鑑</title>
  <meta name="viewport" content="width=360,initial-scale=1">
  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/index.css">
</head>
<body>
  <header>
    <div class="l-in">
      <p class="header-found">見つけた数
        <span>
          <?php
            for($i=1; $i<count($have); $i++){
              if($have[$i][1]){
                $LookNum ++;
              }
            }
            echo $LookNum;
          ?>
        </span>
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
    echo '<a href="single.php?bag=' . $bag[$i][5] . '">';
    echo '<img src="data:image/jpeg;base64,'. $have[$i][1] . '">';
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

    <div id="sample"></div>
  </div>
  <nav class="gnav">
    <a class="gnav-camera" href="camera.html">
      <img src="image/camera.png">
    </a>
  </nav>


  <script
          src="https://code.jquery.com/jquery-2.2.4.min.js"
          integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
          crossorigin="anonymous">
  </script>
  <script src="js/csv.js"></script>
  <script src="js/script.js"></script>
  <script async defer
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBFLtlLvGmy0vzobLRmKtFJBl_OS1HiKOE&callback=initMap">
  </script>
</body>
</html>