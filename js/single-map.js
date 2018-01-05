
// google map api
var map;
var marker = [];
var infoWindow = [];
var markerData = [ // マーカーを立てる場所名・緯度・経度
  {
    image: '<img class="mapImg" src="image/bags/item02-01.jpg">',
    lat: 24.8958667,
    lng: 130.76325010000005,
    icon: 'image/min/item02-01.jpg',
    user: 'そらさん',
    place: '熊本県熊本市',
    date: '2017年7月12日'
  }, {
    image: '<img class="mapImg" src="image/bags/item02-02.jpg">',
    lat: 35.0001599,
    lng: 136.6926023,
    icon: 'image/min/item02-02.jpg',
    user: 'いきもの 太郎',
    place: '愛知県名古屋市',
    date: '2018年1月6日'
  }, {
    image: '<img class="mapImg" src="image/bags/item02-03.jpg">',
    lat: 24.69496,
    lng: 142.76746000000003,
    icon: 'image/min/item02-03.jpg',
    user: 'ポコちゃん',
    place: '青森県青森市',
    date: '2017年8月20日'
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
      content: '<div class="single-map">' + markerData[i]['image'] + '</div>' // 吹き出しに表示する内容
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
    $('#single-map-in').append(markerData[i]['image']);
    $('#single-map-text').children('p').remove();
    $('#single-map-text').children('ul').css('opacity','1');
    $('#single-map-user').text(markerData[i]['user']);
    $('#single-map-place').text(markerData[i]['place']);
    $('#single-map-time').text(markerData[i]['date']);
    $('#close-modal').css('display','block');
    $('#close-btn').css('display','block');
  });
}

$(function () {
  $('#close-btn').on('click', function () {
    $('.mapImg').remove();
    $('#close-modal').css('display','none');
    $('#close-btn').css('display','none');
  });
});