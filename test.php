<?php
require('read.php');
$user = readCsv("data/user.csv");

echo var_dump($user);

// 送られたユーザー情報があるかチェック
if(isset($_POST['userId']) && isset($_POST['userId'])){
  for($i=0; $i<count($user); $i++){
    if($user[0] == $_POST['userId']){
      
    }
  }
}

?>

<p>ログイン</p>

<form method="post" action="test.php">
  <input type="text" id="userId" name="userId" placeholder="ID">
  <input type="text" id="userPass" name="userPass" placeholder="PASS">
  <input type="submit">
</form>
