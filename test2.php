<?php
//cameraから送られたデータの配列を参照
echo '<pre>';
echo var_dump($_POST);
echo '<pre>';
?>

<!doctype html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>生き物図鑑</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body>

<!-- 画像認識用の画像が入る -->
<div id="imgWrapper"></div>

<script src="js/exif.js"></script>
<script
  src="https://code.jquery.com/jquery-2.2.4.min.js"
  integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
  crossorigin="anonymous">
</script>
<script src="js/csv.js"></script>

<script>

</script>
</body>
</html>