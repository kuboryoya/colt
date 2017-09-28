<?php
//csvファイルを読み込む関数
function readCsv($path)
{
  try {
    $file = new SplFileObject($path);
    $file->setFlags(
      SplFileObject::READ_CSV |
      SplFileObject::READ_AHEAD |
      SplFileObject::SKIP_EMPTY |
      SplFileObject::DROP_NEW_LINE
    );
  } catch (RuntimeException $e) {
    throw $e;
  }
  $res = [];
  if (empty($file) == FALSE)
    foreach ($file as $v)
      $res[] = $v;
  return $res;
}