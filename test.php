<!doctype html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body>

<div id="map" style="width:100px;height:100px;"></div>
<script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBFLtlLvGmy0vzobLRmKtFJBl_OS1HiKOE&callback=initMap">
</script>

<script>


  function initMap() {
    var myLatlng = new google.maps.LatLng(34.687571, 135.526239);

    var mapOptions = {
      zoom : 17,
      center : myLatlng
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var image = {
      url : 'icon.png',
      scaledSize : new google.maps.Size(48, 48)
      // ↑ここで画像のサイズを指定
    };

    var marker = new google.maps.Marker({
      position : myLatlng,
      map : map,
      icon : image,
      title : "hogehoge"
    });
  }
</script>

</body>
</html>