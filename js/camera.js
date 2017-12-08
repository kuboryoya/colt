$(function () {
  $('#resultText').append('分析中です。');

  if(!$('#bagPlace')[0].defaultValue){
    $('#resultText').append('<p>位置情報が取得できませんでした。<br>端末の位置情報の使用を許可してください。</p>');
    return;
  }

  var b64 = $('#myImg').attr('src'); //画像の文字列
  var bagData; //全ての虫のデータ

  //画像認識に使う虫のデータを読み込む
  $.get('./data/bag.csv',function(data){
    bagData = $.csv()(data);
  });

  // 画像データをFormに追加する
  $('#resultForm').append(
    '<input type="text" name="bagImage" value="' + b64.replace(/^data:image\/(png|jpg|jpeg);base64,/, "") + '">'
  );

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
      contentType: 'application/json; c rset=utf-8',
      dataType: 'json',
      data: str_json_data
    }).done(function(data) {
      //画像のラベル一覧を取得。
      var texts = data.responses[0].labelAnnotations;
      //画像と一致する虫の数
      var isBag = 0;
      var bagName = [];
      var bagDescription = [];

      // APIの結果分チェック
      for(var i=0; i<texts.length; i++){
        var isOverlap = false;
        console.log(texts[i].description.replace(/ /g,'_'));

        // APIのデータが重複してないかチェック
        for(var j=0; j<i; j++) {
          if(texts[i].description == texts[j].description) {
            isOverlap = true;
          }
        }

        // 重複してなければデータと照合して、データに存在する虫なら結果に追加する
        if(!isOverlap){
          for(var n=0; n<bagData.length; n++){
            if(bagData[n][5] == texts[i].description.replace(/ /g,'_')) {
              //出力結果をまとめる
              isBag ++;
              bagName.push(bagData[n][0]);
              bagDescription.push(bagData[n][1]);
            }
          }
        }
      }

      $('#resultText').text('');

      if(!isBag){
        $('#resultText').append('<p>なんの生き物かわかりませんでした。写真を撮りなおしてください。</p>');
        addNewBtn();
      }else if(isBag == 1){
        // 結果が1匹の場合の処理
        $('#resultText').append(
          '<div class="bagText">' +
            '<h2 class="bagName">' + bagName[0] + '</h2>' +
            '<p>' + bagDescription[0] + '</p>' +
          '</div>'
        );
        $('#bagName').attr('value', $('.bagName').text());
        addSubmit();
        addNewBtn();
      }else{
        // 結果が2匹以上の場合の処理
        for(var b=0; b<isBag; b++){
          $('#resultText').append(
            '<div class="bagText bagRadio">' +
            '<h2 class="bagName">' + bagName[b] + '</h2>' +
            '<p>' + bagDescription[b] + '</p>' +
            '</div>'
          );
        }
        $('#resultText').append('<p>'+ isBag + '件の候補が見つかりました。生き物を選択してください。</p>')
        addNewBtn();
      }

      //画像候補が押されたらFormの虫の名前を書き換える
      $('.bagRadio').on('click', function () {
        $('.bagRadio').css('background', 'white');
        $(this).css('background', 'pink');
        $('#bagName').attr('value', $(this).children('h2')[0].textContent);
        addSubmit();
      });

      //もし登録ボタンがないなら登録ボタンを出す。
      function addSubmit (){
        if(!$('#bagSubmit').length){
          $('#resultForm').append(
            '<input id="bagSubmit" class="btn-large" type="submit" name="send" value="図鑑に登録">'
          );
        }
      }

      //もし新規追加ボタンがないなら出す
      function addNewBtn (){
        $('#newBag').css('display', 'block');
      }

      // 新規追加ボタンを押したらフォームを表示
      $('#newBtn').on('click', function () {
        $('#resultText').css('display', 'none');
        $('#newBag').css('display', 'none');
        $('#bagName').css('display', 'block');
        addSubmit();
        $('#resultForm').attr('action', 'index.php');
      });

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
