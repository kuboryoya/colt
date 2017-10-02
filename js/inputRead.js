$(function () {
  //ジオコーディングで使うGoogle Maps APIのURLとkey
  var mapsUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  var key = '&key=AIzaSyBFLtlLvGmy0vzobLRmKtFJBl_OS1HiKOE';

  var imgLat;
  var imgLng;

  var file;
  var files;


  // ファイルから必要な情報はここで抜き出す。
  $('#bagImg').on("change", function(e) {

    files = this.files;
    file   = e.target.files[0];
    getImgPosition();

  });

  //画像の位置情報を取得する
  function getImgPosition(){
    var reader = new FileReader;
    reader.onload = function () {
      var gps, f;
      try {
        gps = Exif.loadFromArrayBuffer(reader.result).gpsifd;
        if (typeof gps === "undefined") {
          console.log("GPS data is unavailable.");
          alert("無効な画像です。他の画像を選択してくだしあ");
        } else {
          f = function (b, a) { return a + b / 60; };
          imgLat = gps.latitude.reduceRight(f)  * (gps.latitudeRef.indexOf("N") >= 0 ? 1 : -1);  //Latitude
          imgLng = gps.longitude.reduceRight(f) * (gps.longitudeRef.indexOf("E") >= 0 ? 1 : -1); //Longitude
          $('#bagForm').append('<input type="text" name="bagLat" value="' + imgLat + '">');
          $('#bagForm').append('<input type="text" name="bagLng" value="' + imgLng + '">');
          getAddress(imgLat,imgLng);
        }
      } catch (e) {
        console.log('写真位置情報がありませんでした。');
        getCurrentPosition();
      }
    };
    reader.readAsArrayBuffer(file);
  }

  //現在位置を取得
  function getCurrentPosition(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        function(position) {
          imgLat = position.coords.latitude;
          imgLng = position.coords.longitude;
          $('#bagForm').append('<input type="text" name="bagLat" value="' + imgLat + '">');
          $('#bagForm').append('<input type="text" name="bagLng" value="' + imgLng + '">');
          getAddress(imgLat,imgLng);
        },
        function (error) {
          // エラーメッセージを表示
          switch(error.code) {
            case 1: // PERMISSION_DENIED
              alert("位置情報の利用が許可されていません");
              break;
            case 2: // POSITION_UNAVAILABLE
              alert("現在位置が取得できませんでした");
              break;
            case 3: // TIMEOUT
              alert("タイムアウトになりました");
              break;
            default:
              alert("その他のエラー(エラーコード:"+error.code+")");
              break;
          }
        }
      );
    }
  }

  //座標をジオコーディングして住所を割り出す
  function getAddress(Lat,Lng){
    var geoUrl = mapsUrl + Lat + ',' + Lng + key;
    $.ajax({
      url: geoUrl
    }).done(function(data) {
      var imgPlace;
      //'administrative_area_level_1'(〇〇県)を探す
      for(var i=0; i<data.results[0].address_components.length; i++){
        if(data.results[0].address_components[i].types[0] == 'administrative_area_level_1'){
          imgPlace = data.results[0].address_components[i].long_name;
        }
      }
      //'locality'(〇〇市)を探す
      for(var n=0; n<data.results[0].address_components.length; n++){
        if(data.results[0].address_components[n].types[0] == 'locality'){
          imgPlace += data.results[0].address_components[n].long_name;
        }
      }
      $('#bagForm').append('<input type="text" name="bagPlace" value="' + imgPlace + '">');
      //b64の準備に移動
      readyImg();
    });
  }

  function readyImg(){
    // FileReaderオブジェクトを作成
    var fileReader = new FileReader();
    // 読み込み後の処理を決めておく
    fileReader.onload = function () {
      // Data URIを取得
      var dataUri = this.result;
      // HTMLに書き出し (src属性にData URIを指定)
      $('#myImg').attr('src', dataUri);

      // 何故かこの時点でMyImgがb64形式なのでそれを使う
      var myImg = $('#myImg');
      var b64 = myImg.attr('src');

      $('#myImg').load(function(){
        //画像の縦横比率を保存
        var bagRatio = myImg[0].height / myImg[0].width;
        $('#bagForm').append('<input type="text" name="bagRatio" value="' + bagRatio + '">');

        // リサイズ Base64 Image 画面いっぱいのサイズを作成
        ImgB64Resize(b64, 750, 750/myImg[0].width*myImg[0].height,
          function(img_b64) {
            $('#bagForm').append('<input type="text" name="bagB64" value="' + img_b64 + '">');
            // リサイズ Base64 Image サムネイルサイズを作成
            ImgB64Resize(b64, 100, 100/myImg[0].width*myImg[0].height,
              function(min_b64) {
                $('#bagForm').append('<input type="text" name="minB64" value="' + min_b64.replace(/^data:image\/(png|jpg|jpeg);base64,/, "") + '">');
                // カメラページにフォームデータを送信
                document.bagForm.submit();
              }
            );
          }
        );
      });
    };
    // ファイルをData URIとして読み込む
    fileReader.readAsDataURL(files[0]);
  }

  // Resize Base64 Image
  //   img_base64_src: string "data:image/png;base64,xxxxxxxx"
  function ImgB64Resize(imgB64_src, width, height, callback) {
    // Image Type
    var img_type = imgB64_src.substring(5, imgB64_src.indexOf(";"));
    // Source Image
    var img = new Image();
    img.onload = function() {
      // New Canvas
      var canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      // Draw (Resize)
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      // Destination Image
      var imgB64_dst = canvas.toDataURL(img_type);
      callback(imgB64_dst);
    };
    img.src = imgB64_src;
  }

});