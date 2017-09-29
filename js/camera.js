$(function () {
  var b64;
  var new_b64;
  var bagData;
  var imgLat,imgLng;
  var imgPlace;
  var imgDate;
  var imgResize;

  $.get('./data/bag.csv',function(data){
    bagData = $.csv()(data);
  });

  //今日の日付を取得する
  imgDate = getToday();
  function getToday() {
    var date = new Date();
    var dateMonth =  Number(date.getMonth())+1;
    return date.getFullYear() + '年' + dateMonth + '月' + date.getDate() + '日';
  }

  //ファイルが変更された時の処理
  $('#file_input').on("change", function(e) {

    //結果をクリアにする
    $('#file_btn').text('画像認識');
    $('#resultText').empty();
    $('#resultForm').empty();

    //ジオコーディングで使うGoogle Maps APIのURLとkey
    var mapsUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    var key = '&key=AIzaSyBFLtlLvGmy0vzobLRmKtFJBl_OS1HiKOE';

    //座標をジオコーディングして住所を割り出す
    function getAddress(Lat,Lng){
      var geoUrl = mapsUrl + Lat + ',' + Lng + key;
      $.ajax({
        url: geoUrl
      }).done(function(data) {
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
      });
    }

    //画像の位置情報を取得する
    var file   = e.target.files[0];
    var reader = new FileReader;
    reader.onload = function () {
      var gps, f;
      try {
        gps = Exif.loadFromArrayBuffer(reader.result).gpsifd;
        if (typeof gps === "undefined") {
          console.log("GPS data is unavailable.");
        } else {
          f = function (b, a) { return a + b / 60; };
          imgLat = gps.latitude.reduceRight(f)  * (gps.latitudeRef.indexOf("N") >= 0 ? 1 : -1);  //Latitude
          imgLng = gps.longitude.reduceRight(f) * (gps.longitudeRef.indexOf("E") >= 0 ? 1 : -1); //Longitude
          getAddress(imgLat,imgLng);

        }
      } catch (e) {
        console.log('写真位置情報がありませんでした。');
        //現在位置を取得
        console.log(navigator.geolocation);
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(
            function(position) {
              imgLat = position.coords.latitude;
              imgLng = position.coords.longitude;
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
    };

    reader.readAsArrayBuffer(file);
    var files = this.files;
    // FileReaderオブジェクトを作成
    var fileReader = new FileReader();
    // 読み込み後の処理を決めておく
    fileReader.onload = function() {
      // Data URIを取得
      var dataUri = this.result;
      // HTMLに書き出し (src属性にData URIを指定)
      $('#imgWrapper').html('<img id="MyImg" src="' + dataUri + '">');
      $('#imgWrapper').append('<img id="thumbnail" src="' + dataUri + '">');
    };
    // ファイルをData URIとして読み込む
    fileReader.readAsDataURL( files[0] );

  });

  //画像認識ボタンが押された時の処理
  $('#file_btn').on('click', function () {
    $('#file_btn').append("中です。しばらくお待ち下さい");
    var MyImg = $('#MyImg');
    // "data:image/jpeg;base64,XXXXXX..." みたいな文字列
    b64 = imageToBase64(MyImg[0], "image/jpeg");

    // リサイズ Base64 Image サムネイルサイズを作成
    ImgB64Resize(b64, 50, 50/MyImg[0].width*MyImg[0].height,
      function(img_b64) {
        // Destination Image
        imgResize = img_b64;
      }
    );

    // リサイズ Base64 Image 画面いっぱいのサイズを作成
    ImgB64Resize(b64, 750, 750/MyImg[0].width*MyImg[0].height,
      function(img_b64) {
        // Destination Image
        new_b64 = img_b64;
        //APIに画像を送る
        getTextData(new_b64);
      }
    );
  });

  // ImageオブジェクトをBase64形式にする
  // img: DOM - IMG
  // mime_type: String ex. "image/jpeg"
  var imageToBase64 = function (img, mime_type) {
    // New Canvas
    var canvas = document.createElement('canvas');
    canvas.width  = img.width;
    canvas.height = img.height;
    // Draw Image
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    // To Base64
    return canvas.toDataURL(mime_type);
  };

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

  // google cloud vision API
  // img: b64 - IMG
  var getTextData = function (img) {
    var str_endpoint = "https://vision.googleapis.com/v1/images:annotate?key=";
    var str_api_key = "AIzaSyCuxN6Tj8x7AwOq3flo25fxRA5aBLs_w3U";
    var request_url = str_endpoint + str_api_key;
    //リクエストデータを作成
    var data = {
      requests: [
        {
          image: {
            content: img.replace(/^data:image\/(png|jpg|jpeg);base64,/, "")
          }
          ,
          features: {
            type: 'LABEL_DETECTION',
            maxResults: 100
          }
        }
      ]
    };
    //JSON形式にする
    var str_json_data = JSON.stringify(data);

    $.ajax({
      url: request_url,
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      data: str_json_data
    }).done(function(data) {
      //画像のラベル一覧を取得。
      var texts = data.responses[0].labelAnnotations;
      //画像と一致する虫の数
      var isBag = 0;
      for(var i=0; i<texts.length; i++){
        console.log(texts[i].description.replace(/ /g,'_'));
        //データと照合して、データに存在する虫ならOK
        for(var n=0; n<bagData.length; n++){
          if(bagData[n][5] == texts[i].description.replace(/ /g,'_')) {
            //虫の名前と//説明文を表示
            $('#resultText').append(
              '<div class="bagText">' +
                '<h2 class="bagName">' + bagData[n][0] + '</h2>' +
                '<p>' + bagData[n][1] + '</p>' +
              '</div>'
            );
            isBag ++;
          }
        }
      }
      //連続してボタンを押さないように消す
      $('#file_text').empty();
      if(!isBag){
        $('#resultText').append('<p>なんの生き物かわかりませんでした。写真を撮りなおしてください。</p>');
      }else if(isBag == 1){
        dataInput($('.bagName').text());
      }else{
        $('#resultText').append('<p>'+ isBag + '件の候補が見つかりました。生き物を選択してください。</p>')
      }

      //画像候補が押されたらFormの内容を書き換える
      $('.bagText h2').on('click', function () {
        dataInput($(this).text());
      });

      //画像のタイトル、B64データ、日付、場所をインプット
      function dataInput(Name) {
        $('#resultForm').empty();
        $('#resultForm').append(
          '<form action="index.php" method="post">' +
          '<input type="text" name="bagName" value="' + Name + '">' +
          '<input type="text" name="bagImage" value="' + new_b64.replace(/^data:image\/(png|jpg|jpeg);base64,/, "") + '">' +
          '<input type="text" name="bagDate" value="' + imgDate + '">' +
          '<input type="text" name="bagPlace" value="' + imgPlace + '">' +
          '<input type="text" name="bagLat" value="' + imgLat + '">' +
          '<input type="text" name="bagLng" value="' + imgLng + '">' +
          '<input type="text" name="bagResize" value="' + imgResize.replace(/^data:image\/(png|jpg|jpeg);base64,/, "") + '">' +
          '<input type="submit" name="send" value="登録">' +
          '</form>');
      }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      $("#XMLHttpRequest").html("XMLHttpRequest : " + jqXHR.status);
      $("#textStatus").html("textStatus : " + textStatus);
      $("#errorThrown").html("errorThrown : " + errorThrown);
      console.log("ajax通信に失敗しました");
      console.log("XMLHttpRequest : " + jqXHR.status);
      console.log("textStatus : " + textStatus);
      console.log("errorThrown : " + errorThrown);
    })
    .always(function() {
    })
  };



});
