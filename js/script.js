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
      map = new google.maps.Map(document.getElementById('myMap'), { // #myMapに地図を埋め込む
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
          content: '<div class="myMap">' + markerData[i]['name'] + '</div>' // 吹き出しに表示する内容
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

