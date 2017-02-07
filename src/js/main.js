'use strict';

var HOME_CONTROL = (function($) {

  var module;

  //initial set up constant for type of home needed to be automated
  var LIGHT = 'light';
  var CURTAIN = 'curtain';
  var TEMPERATURE = 'temperature';

  /**
   * Function calling to home control data on page load
   * @method init
   */
  function init() {
    $.get('/datasource/home.json', function(data) {
      // console.log(data);
      var arr = [];
      for (var key in data) {
        var obj = data[key];
        var str = "<div class='" + key + "'><h4>" + obj.title + "</h4><ul>";
        var lightOption = generateCheckBox(obj, LIGHT, obj.light.enabled);
        var curtainOption = generateCheckBox(obj, CURTAIN, obj.curtain.enabled);
        var temperatureOption = generateCheckBox(obj, TEMPERATURE, obj.temperature.enabled);
        str += lightOption + curtainOption + temperatureOption + "</ul></div>";
        arr.push(str);
      }
      var finalHTML = arr.join('');
      $('#control-room-panel').html(finalHTML);
    });
  }

  function generateCheckBox(obj, type, shouldDisplay) {
    if (shouldDisplay === true) {
      var checkbox_name = obj.id + '_' + type;
      var label_text = obj[type].label;
      return '<li><input type="checkbox" id="' + checkbox_name +'" name="' + checkbox_name + '" data-id="' + obj.id + '" /><label for="' + checkbox_name + '">' + label_text + '</label></li>';
    } else {
      return '';
    }
  }

  /**
   * Function being called on DOM ready
   * @method onReady
   */
  function onReady(themeModule) {
    module = themeModule || this;
    init();
  }


  /**
   * Return global function
   */
  return {
    onReady: onReady
  };

}(jQuery));

jQuery(document).ready(function() {
  HOME_CONTROL.onReady();
});
