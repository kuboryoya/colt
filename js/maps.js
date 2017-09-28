$(function () {
  var windowWidth;
  var windowHeight;

  window.onscroll = function(){
    windowWidth = $(window).width();
    windowHeight = $(window).height();
    $('#single-map').css('height',windowHeight - 130);
    $('#sample').css('height',windowWidth);
  };

  $(function() {
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
      } else if (direction == 'left'){
        //右から左
        $('#single-map').animate({left: "0%"},500,"swing");
      }
    }

    //横方向の座標を取得
    function getPosition(event) {
      return event.originalEvent.touches[0].pageX;
    }
  });

  $(function() {
    var target = $('#single-map');
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
        $('#single-map').animate({left: "100%"},500,"swing");
      } else if (direction == 'left'){
        //右から左
      }
    }

    //横方向の座標を取得
    function getPosition(event) {
      return event.originalEvent.touches[0].pageX;
    }
  });

});


var map;
var marker = [];
var infoWindow = [];
var markerData = [ // マーカーを立てる場所名・緯度・経度
  {
    name: '<img class="mapImg" src="image/item01.jpg">',
    lat: 33.1057806,
    lng: 135.76325010000005,
    icon: 'image/min/item01.jpg',
    place: '静岡県浜松市',
    date: '2018年7月12日'
  }, {
    name: '<img class="mapImg" src="image/item01-02.jpg">',
    lat: 37.6951212,
    lng: 143.76610649999998,
    icon: 'image/min/item01-02.jpg',
    place: '愛知県',
    date: '2018年3月12日'
  }, {
    name: '<img class="mapImg" src="image/item01-03.jpg">',
    lat: 32.69496,
    lng: 133.76746000000003,
    icon: 'image/min/item01-03.jpg',
    place: 'くまもtん',
    date: '2018年3月20日'
  }
];

function initMap() {
  // 地図の作成
  var mapLatLng = new google.maps.LatLng({lat: 35.696932, lng: 139.76543200000003}); // 緯度経度のデータ作成
  map = new google.maps.Map(document.getElementById('sample'), { // #sampleに地図を埋め込む
    center: mapLatLng, // 地図の中心を指定
    zoom: 4 // 地図のズームを指定
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
}



// マーカーにクリックイベントを追加
function markerEvent(i) {
  marker[i].addListener('click', function() { // マーカーをクリックしたとき
    $('#single-map-in').append(markerData[i]['name']);
    $('#single-map tr:first-child td:last-child').text(markerData[i]['place']);
    $('#single-map tr:last-child td:last-child').text(markerData[i]['date']);
    $('#close-btn').css('display','block');
  });
}

$(function () {
  $('#close-btn').on('click', function () {
    $('.mapImg').remove();
    $('#close-btn').css('display','none');
  });
});