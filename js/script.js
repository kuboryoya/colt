$(function(){
  
  //マップのサイズをウィンドウ幅いっぱいにする
  var windowWidth;
  var windowHeight = $(window).height();
  window.onscroll = function(){
    windowWidth = $(window).width();
    windowHeight = $(window).height();
    $('#single-map').css('height',windowHeight - 130);
    $('#sample').css('height',windowHeight);
  };

  $('#btn-list').on('click', function () {
    $('#sample').animate({left: "100%"},500,"swing");
  });
  $('#btn-map').on('click', function () {
    $('#sample').animate({left: "0%"},500,"swing");
    console.log("hoge");
  });

  //スワイプ対象
  var target = $('.content');
  target.on('touchstart', onTouchStart); //指が触れたか検知
  target.on('touchmove', onTouchMove); //指が動いたか検知
  target.on('touchend', onTouchEnd); //指が離れたか検知
  var direction, position;

  //スワイプ開始時の横方向の座標を格納
  function onTouchStart(event) {
    position = getPosition(event);
    direction = ''; //一度リセットする
  }

  //スワイプの方向（left／right）を取得
  function onTouchMove(event) {
    if (position - getPosition(event) > 70) { // 70px以上移動しなければスワイプと判断しない
      direction = 'left'; //左と検知
    } else if (position - getPosition(event) < -70){  // 70px以上移動しなければスワイプと判断しない
      direction = 'right'; //右と検知
    }
  }

  function onTouchEnd(event) {
    if (direction == 'right'){
      //左から右
      $('#sample').animate({left: "100%"},500,"swing");
    } else if (direction == 'left'){
      //右から左
      $('#sample').animate({left: "0%"},500,"swing");
    }
  }

  //横方向の座標を取得
  function getPosition(event) {
    return event.originalEvent.touches[0].pageX;
  }

});



var map;
var marker = [];
var infoWindow = [];
var markerData = [];

function initMap() {
  var have;
  var bagData;

  $.get('./data/bag.csv',function(data){
    bagData = $.csv()(data);
  }).done(function() {
    $.get('./data/have.csv',function(data){
      have = $.csv()(data);
    }).done(function() {

      console.log(bagData);
      console.log(have);

      for(var n=1; n<have.length; n++){
        if(have[n][1]){
          markerData.push( {
            name: '<p><a href="single.php?bag=' + bagData[n][5] + '">' + have[n][0] + '</a></p>',
            icon: 'data:image/jpeg;base64,' + have[n][6],
            place: have[n][2],
            date: have[n][3],
            lat: Number(have[n][4]),
            lng: Number(have[n][5])
          });
        }
      }

      // 地図の作成
      var mapLatLng = new google.maps.LatLng({lat: 35.1725324, lng: 136.8841393}); // 中心はトライデンt
      map = new google.maps.Map(document.getElementById('sample'), { // #sampleに地図を埋め込む
        center: mapLatLng, // 地図の中心を指定
        zoom: 5 // 地図のズームを指定
      });

      // マーカー毎の処理
      for (var i = 0; i < markerData.length; i++) {
        markerLatLng = new google.maps.LatLng({lat: markerData[i]['lat'], lng: markerData[i]['lng']}); // 緯度経度のデータ作成
        marker[i] = new google.maps.Marker({ // マーカーの追加
          position: markerLatLng, // マーカーを立てる位置を指定
          map: map // マーカーを立てる地図を指定
        });

        infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
          content: '<div class="sample">' + markerData[i]['name'] + '</div>' // 吹き出しに表示する内容
        });

        markerEvent(i); // マーカーにクリックイベントを追加
      }

      for (var i = 0; i < markerData.length; i++) {
        marker[i].setOptions({// マーカーのオプション設定
          icon: {
            url: markerData[i]['icon']// マーカーの画像を変更
          }
        });
      }
    });
  });

} //end InitMap

// マーカーにクリックイベントを追加
function markerEvent(i) {
  marker[i].addListener('click', function() { // マーカーをクリックしたとき
    infoWindow[i].open(map, marker[i]); // 吹き出しの表示
  });
}
