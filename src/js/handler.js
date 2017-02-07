/**
 * Handle home control dashboard
 */

'use strict';

var HOME_HANDLER = (function($) {

  var module;

  /**
   * Function handle light in the room
   * @method handleLight
   */
  function handleLight(element, status) {
    var url = '';
    if (status) {
      url = '/datasource/lighton.json';
    } else {
      url = '/datasource/lightoff.json';
    }
    $.get(url, function(data) {
      element.style.opacity = data.opacity;
    });
  }

  /**
   * Function handle curtain in the room
   * @method handleCurtain
   */
  function handleCurtain(element, status) {
    $.get('/datasource/curtain.json', function(data) {
      var currOpacity = element.style.opacity;
      if (status) { //Curtain closed
        element.style.opacity = currOpacity - data.opacity;
      } else {
        element.style.opacity = currOpacity + data.opacity;
      }
    });
  }

  /**
   * Function handle temperature in the room
   * @method handleCurtain
   */
  function handleTemperature(element, temp) {
    //TODO: real response, server should return color of the room based on temperature
    $.get('/datasource/temp.json', function(data) {
      if (temp > 70) {
        element.style.fill = '#ff6666';
      } else if (temp < 60) {
        element.style.fill = '#bddfeb';
      } else {
        element.style.fill = 'transparent';
      }
    });
  }

  return {
    handleLight: handleLight,
    handleCurtain: handleCurtain,
    handleTemperature: handleTemperature
  };

}(jQuery));
