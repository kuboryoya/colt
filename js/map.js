$(function(){

  // ウィンドウサイズを取得
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();

  // マップの高さを設定
  var mapWindow = $('#map-window');
  mapWindow.css('height',windowHeight);
  $('#single-map').css('height',windowWidth);

  // スマホのタブ対応
  // スクロールするたびに高さを設定し直す
  window.onscroll = function(){
    windowHeight = $(window).height();
    mapWindow.css('height',windowHeight);
    $('#single-map').css('height',windowWidth);
  };

  // map-windowを表示。ボタンの色を変更。
  function onMap() {
    mapWindow.animate({left: "0%"},500,"swing");
    $('#btn-map img').attr('src', 'image/btn-map_on.png');
    $('#btn-map').css('background', '#4d4d4d');
    $('#btn-list img').attr('src', 'image/btn-list.png');
    $('#btn-list').css('background', 'white');
  }
  // #map-windowを表示。ボタンの色を変更。
  function offMap() {
    mapWindow.animate({left: "100%"},500,"swing");
    $('#btn-list img').attr('src', 'image/btn-list_on.png');
    $('#btn-list').css('background', '#4d4d4d');
    $('#btn-map img').attr('src', 'image/btn-map.png');
    $('#btn-map').css('background', 'white');
  }

  // リスト表示ボタンを押した時
  $('#btn-list').on('click', function () {
    offMap();
  });
  // マップ表示ボタンを押した時
  $('#btn-map').on('click', function () {
    onMap();
  });

  // スワイプ対象
  var target = $('.content');
  target.on('touchstart', onTouchStart); //指が触れたか検知
  target.on('touchmove', onTouchMove); //指が動いたか検知
  target.on('touchend', onTouchEnd); //指が離れたか検知
  var direction, position;

  // スワイプ開始時の横方向の座標を格納
  function onTouchStart(event) {
    position = getPosition(event);
    direction = ''; //一度リセットする
  }

  // スワイプの方向（left／right）を取得
  function onTouchMove(event) {
    if (position - getPosition(event) > 70) { // 70px以上移動しなければスワイプと判断しない
      direction = 'left'; //左と検知
    } else if (position - getPosition(event) < -70){  // 70px以上移動しなければスワイプと判断しない
      direction = 'right'; //右と検知
    }
  }

  function onTouchEnd(event) {
    if (direction == 'right'){
      // 左から右にスワイプした時
      offMap();
    } else if (direction == 'left'){
      // 右から左にスワイプした時
      onMap();
    }
  }

  // 横方向の座標を取得
  function getPosition(event) {
    return event.originalEvent.touches[0].pageX;
  }

});