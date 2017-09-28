<?php
ini_set("display_errors", On);
error_reporting(E_ALL);
session_set_cookie_params(3600);
session_start();

$have = json_decode(file_get_contents('data/have.json'), true);

if($_POST['bagName']){
  for($i=0; $i<count($have); $i++){
    if($_POST['bagName'] == $have[$i]['name']){
      $have[$i]['image'] = $_POST['bagImage'];
      $have[$i]['place'] = $_POST['bagPlace'];
      $have[$i]['date'] = $_POST['bagDate'];
    }
  }
  $jsonHave = json_encode($have, JSON_UNESCAPED_UNICODE);

  file_put_contents('data/have.json', $jsonHave);
}

