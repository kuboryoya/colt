<div class="single-info">
  <div class="l-in">
    <h2>分布・時期</h2>
  </div>
  <img src="image/maps/<?php echo $bag[$bagIndex][3]; ?>.png">
  <table class="l-in">
    <tr>
      <td>分布 ：</td>
      <td><?php echo $bag[$bagIndex][2]; ?></td>
    </tr>
    <tr>
      <td>時期 ：</td>
      <td><?php echo $bag[$bagIndex][4]; ?></td>
    </tr>
  </table>
</div>

<?php if($have[$bagIndex][1]): ?>
<div class="single-map">
  <div class="l-in">
    <h2>全国の<?php echo $bag[$bagIndex][0] ?></h2>
  </div>
  <div id="single-map-in">
    <div id="single-map">
    </div>
    <p id="close-btn">×</p>
    <div id="close-modal"></div>
  </div>
  <div id="single-map-text" class="l-in">
    <p>画像をタップすると情報がみれます。</p>
    <ul>
      <li><img src="image/icon_hito.png"><span id="single-map-user"></span></li>
      <li><img src="image/icon_map.png"><span id="single-map-place"></span></li>
      <li><img src="image/icon_time.png"><span id="single-map-time"></span></li>
    </ul>
  </div>
</div>
<?php endif; ?>