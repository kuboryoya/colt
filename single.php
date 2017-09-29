<?php
  require('read.php');

  //全虫のデータ
  $bag = readCsv("data/bag.csv");
  //自分の持つ虫のデータ
  $have = readCsv("data/have.csv");

  for($i=1; $i<count($bag); $i++){
    if($_GET['bag'] == $bag[$i][5]){
      $bagIndex = $i;
    }
  }

?>

<!doctype html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>生き物図鑑</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/single.css">
</head>
<body>
  <header class="single-header">
    <div class="l-in">
      <h1><?php echo $bag[$bagIndex][0]; ?></h1>
    </div>
  </header>
  <div class="single-item content">
    <div class="single-main">
      <span class="single-main-img">
        <img src="data:image/jpeg;base64,<?php echo $have[$bagIndex][1]; ?>">
      </span>
      <div class="single-picture">
        <dl class="l-in l-cf">
          <dt><?php echo $have[$bagIndex][3] ?></dt>
          <dd><?php echo $have[$bagIndex][2] ?></dd>
        </dl>
      </div>
      <p class="l-in"><?php echo $bag[$bagIndex][1]; ?></p>
    </div>

    <div class="single-info">
      <img src="image/maps/<?php echo $bag[$bagIndex][3]; ?>.png">
      <table class="l-in">
        <tr>
          <td>分布</td>
          <td><?php echo $bag[$bagIndex][2]; ?></td>
        </tr>
        <tr>
          <td>時期</td>
          <td><?php echo $bag[$bagIndex][4]; ?></td>
        </tr>
      </table>
    </div>
    <div id="single-map">
      <div id="single-map-in">
        <div id="sample">
        </div>
        <p id="close-btn">X</p>
      </div>
      <table class="l-in">
        <tr>
          <td>場所</td>
          <td>静岡県浜松市</td>
        </tr>
        <tr>
          <td>日時</td>
          <td>2018年7月12日</td>
        </tr>
      </table>
  </div>

    <nav class="gnav" id="gnav">
      <div class="l-in">
        <p id="btn-list"><img src="image/btn-list.png"></p>
        <a class="gnav-camera" href="camera.php">
          <img src="image/camera.png">
        </a>
        <p id="btn-map"><img src="image/btn-map.png"></p>
      </div>
    </nav>

<script
  src="https://code.jquery.com/jquery-2.2.4.min.js"
  integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
  crossorigin="anonymous">
</script>

<script src="js/maps.js"></script>
<script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCUTtnZ8_BkU3tCdJgbRVqij3R1ZS03Fbs&callback=initMap">
</script>


</body>
</html>