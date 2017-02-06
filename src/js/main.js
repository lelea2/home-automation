'use strict';

var HOME_CONTROL = (function($) {
  /**
   * Function calling to init data
   */
  function init() {
    $.get('/datasource/home.json', function(data) {
      // console.log(data);
      var arr = [];
      for (key in data) {
        var obj = data[key];
        var str = "<div class='" + key + "'><h4>" + obj.title + "</h4><ul>";
        var lightOption = generateCheckBox();
        var curtainOption = generateCheckBox();
        var temperatureOption = generateCheckBox();
        var str += lightOption + curtainOption + temperatureOption + "</ul></div>";
        arr.push(str);
      }
      var finalHTML = arr.join('');
      $('#control-room-panel').html(finalHTML);
    });
  }

  function generateCheckBox() {

  }

  /**
   * Return global function
   */
  return {
    init: init
  };

}(jQuery));

