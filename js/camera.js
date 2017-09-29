$(function () {
  var b64 = $('#myImg').attr('src'); //画像の文字列
  var bagData; //全ての虫のデータ
  var imgDate; //今日の日付

  //画像認識に使う虫のデータを読み込む
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
        dataInput();
        $('#resultText').append('<p>'+ isBag + '件の候補が見つかりました。生き物を選択してください。</p>')
      }

      //画像候補が押されたらFormの虫の名前を書き換える
      $('.bagText h2').on('click', function () {
        $('bagName').value = $(this).text();
      });

      //画像のタイトル、B64データ、日付、場所をインプット
      function dataInput(Name) {
        $('#resultForm').append(
          '<input id="bagName" type="text" name="bagName" value="' + Name + '">' +
          '<input type="text" name="bagImage" value="' + b64.replace(/^data:image\/(png|jpg|jpeg);base64,/, "") + '">' +
          '<input type="text" name="bagDate" value="' + imgDate + '">' +
          '<input id="bagSubmit" type="submit" name="send" value="図鑑に登録">'
        );
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

  //APIに画像を送る
  getTextData(b64);

});
