<!doctype html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body>
<form name="form" action="test2.php" method="post">
  <input type="file" name="bagImg" id="bagImg">
</form>

<script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>

<script>
  $('#bagImg').on("change", function(e) {
    document.form.submit();
  });
</script>

</body>
</html>