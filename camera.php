<!doctype html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
	<title>カメラロール</title>
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<link rel="stylesheet" href="css/normalize.css">
	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="css/camera.css">
</head>
<body>
	<header class="camera-header">
		<div class="l-in l-cf">
			<a href="index.php">×</a>
			<h1>カメラロール</h1>
		</div>
	</header>
	<div class="content">
		<main class="l-in">
			
			<form name='mainForm'>
				<input name='_file' id="file_input" type="file" accept="image/*">
			</form>
			
			<div id="descriptions">
				<p id="file_btn"></p>
			</div>
			
			<div id="imgWrapper"></div>
			
			<div id="resultText"></div>
			
			<div id="resultForm"></div>
			
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