
var map;
var marker = [];
var infoWindow = [];
var markerData = [ // マーカーを立てる場所名・緯度・経度
  {
    name: '<img class="mapImg" src="image/bags/item01.jpg">',
    lat: 33.1057806,
    lng: 135.76325010000005,
    icon: 'image/min/item01.jpg',
    place: '静岡県浜松市',
    date: '2018年7月12日'
  }, {
    name: '<img class="mapImg" src="image/bags/item01-02.jpg">',
    lat: 37.6951212,
    lng: 143.76610649999998,
    icon: 'image/min/item01-02.jpg',
    place: '愛知県名古屋市',
    date: '2018年3月12日'
  }, {
    name: '<img class="mapImg" src="image/bags/item01-03.jpg">',
    lat: 32.69496,
    lng: 133.76746000000003,
    icon: 'image/min/item01-03.jpg',
    place: '熊本県熊本市',
    date: '2018年3月20日'
  }
];

function initMap() {
  // 地図の作成
  var mapLatLng = new google.maps.LatLng({lat: 35.696932, lng: 139.76543200000003}); // 緯度経度のデータ作成
  map = new google.maps.Map(document.getElementById('single-map'), { // #single-mapに地図を埋め込む
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
      content: '<div class="single-map">' + markerData[i]['name'] + '</div>' // 吹き出しに表示する内容
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
  marker[i].addListener('click', function() {
    //画像、テキスト（場所）（日付）、ボタンを表示
    $('#single-map-in').append(markerData[i]['name']);
    $('#single-map-text').children('p').remove();
    $('#single-map-text tr:first-child td:last-child').text(markerData[i]['place']);
    $('#single-map-text tr:last-child td:last-child').text(markerData[i]['date']);
    $('#close-btn').css('display','block');
  });
}

$(function () {
  $('#close-btn').on('click', function () {
    $('.mapImg').remove();
    $('#close-btn').css('display','none');
  });
});