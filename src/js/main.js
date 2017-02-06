var HOME_CONTROL = window.HOME_CONTROL || {};

/**
 * Function calling to init data
 */
HOME_CONTROL.init = function() {
  $.get('/datasource/home.json', function(data) {
    // console.log(data);
    var arr = [];
    for (key in data) {
      var obj = data[key];
      var str = "<div class='" + key + "'><h4>" + obj.title + "</h4></div>";
      arr.push(str);
    }
    var finalHTML = arr.join('');
    $('#control-room-panel').html(finalHTML);
  });
};

