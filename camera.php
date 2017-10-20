<!doctype html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
	<title>いきものあつめ</title>
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<link rel="stylesheet" href="css/normalize.css">
	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="css/camera.css">
</head>
<body>
	<header class="camera-header">
		<div class="l-in l-cf">
			<a href="index.php">×</a>
			<h1>登録画面</h1>
		</div>
	</header>
	<div class="content">
		<main>
			<img id="myImg" src="<?php echo $_POST['bagB64']?>">

			<div class="l-in">
				<div id="descriptions">
					<p id="file_btn"></p>
				</div>

				<div id="resultText"></div>

				<form id="resultForm" action="index.php" method="post">
					<input id="bagName" type="text" name="bagName" value="">
					<input id="bagPlace" type="text" name="bagPlace" value="<?php echo $_POST['bagPlace']?>">
					<input type="text" name="bagLat" value="<?php echo $_POST['bagLat']?>">
					<input type="text" name="bagLng" value="<?php echo $_POST['bagLng']?>">
					<input type="text" name="bagDate" value="<?php echo $_POST['bagDate']?>">
					<input type="text" name="bagResize" value="<?php echo $_POST['minB64']?>">
					<input type="text" name="bagRatio" value="<?php echo $_POST['bagRatio']?>">
				</form>
				
				<div id="newBag">
					<p>または</p>
					<p id="newBtn" class="btn-large">新しく自分で登録する</p>
				</div>

			</div>
		</main>
	</div>
	<script src="js/exif.js"></script>
	<script
					src="https://code.jquery.com/jquery-2.2.4.min.js"
					integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
					crossorigin="anonymous"></script>
	<script src="js/csv.js"></script>
<script src="js/camera.js"></script>
</body>
</html>