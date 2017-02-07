/**
 * Generate home control dashboard
 */

'use strict';

var HOME_CONTROL_DASHBOARD = (function($) {

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
        var str = '<div class="' + key + '"><h4>' + obj.title + '</h4><ul>';
        var lightOption = generateCheckBox(obj, LIGHT, obj.light.enabled);
        var curtainOption = generateCheckBox(obj, CURTAIN, obj.curtain.enabled);
        var temperatureOption = generateCheckBox(obj, TEMPERATURE, obj.temperature.enabled);
        str += lightOption + curtainOption + temperatureOption + '</ul></div>';
        arr.push(str);
        //opacity for room (by default no lightoff)
        var id = obj.id;
        window.setTimeout(function(id) {
          var element_svg = document.getElementById('floor-plan').contentDocument.getElementById(id);
          if (!!element_svg) { //making sure that element is loaded in time of action
            element_svg.style.opacity = 0.5;
            element_svg.style.fill = 'transparent';
          }
        }(id), 500);
      }
      var finalHTML = arr.join('');
      $('#control-room-panel').html(finalHTML);
      //Bind newly generated input with function on change
      $('input').on('change', handleOnChange);
      $('button').on('click', handleTemp);
    });
  }

  /**
   * Helper function generating checkbox list for home control system
   * @method generateCheckBox
   */
  function generateCheckBox(obj, type, shouldDisplay) {
    var checkbox_name = obj.id + '_' + type;
    var label_text = obj[type].label;
    if (shouldDisplay === true && type === TEMPERATURE) {
      var input = '<input value="65" type="number" id="' + checkbox_name +'" name="' + checkbox_name + '" data-id="' + obj.id + '" />';
      var btn = '<button type="button" data-id="' + obj.id + '" class="btn btn-small">Update <sup>0</sup>F</button>'
      return '<li>' + input + btn + '</li>';
    } else if (shouldDisplay === true) {
      var input = '<input type="checkbox" id="' + checkbox_name +'" name="' + checkbox_name + '" data-id="' + obj.id + '" data-type="' + type + '"/>';
      var label = '<label for="' + checkbox_name + '">' + label_text + '</label>';
      return '<li>' + input + label + '</li>';
    } else {
      return '';
    }
  }

  /**
   * Helper function to handle input onchange
   * @method handleOnChange
   */
  function handleOnChange(e) {
    var target = $(e.target);
    var type = target.data('type'); //type of home automation
    var id = target.data('id'); //type id
    var element = document.getElementById('floor-plan').contentDocument.getElementById(id);
    var props = $(e.target).prop('checked');
    if (type === LIGHT) {
      HOME_HANDLER.handleLight(element, props);
    } else if (type === CURTAIN) {
      HOME_HANDLER.handleCurtain(element, props);
    }
  }

  /**
   * Helper function to handle temperature change
   * @method handleTemp
   */
  function handleTemp(e) {
    var target = $(e.target);
    var id = target.data('id'); //type id
    var currTemp = $('#' + id + '_' + TEMPERATURE).val();
    var element = document.getElementById('floor-plan').contentDocument.getElementById(id);
    HOME_HANDLER.handleTemperature(element, parseInt(currTemp, 10));
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

window.onload = function() {
  var obj = document.getElementById("floor-plan");
  obj.onload = HOME_CONTROL_DASHBOARD.onReady();
};
