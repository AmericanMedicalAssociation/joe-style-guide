(function ($, Drupal) {
  Drupal.behaviors.gallery = {
    attach: function (context, settings) {

      /*var w = '20';
      var x = '20';
      var y = '1680';
      var z = '1680';
      $( "#slider-vertical" ).slider({
        orientation: 'vertical',
        range: 'min',
        min: 0,
        max: 2000,
        value: 60,
        slide: function( event, ui ) {
          $( "#amount" ).val( ui.value );
          z = parseInt(ui.value);
          y = parseInt(ui.value);
          $('svg').attr('viewBox', w + ' ' + x +  ' ' + y + ' ' + z);
        }
      });
      $( "#slider-horizontal" ).slider({
      orientation: 'horizontal',
      range: 'min',
      min: -3000,
      max: 3000,
      value: 0,
        slide: function( event, ui ) {
          $("#amount").val( ui.value );
          w = parseInt(ui.value);
          $('svg').attr('viewBox', w + ' ' + x +  ' ' + y + ' ' + z);
        }
      });
      $('#slider-up-down").slider({
        orientation: 'vertical',
        range: 'min',
        min: -2000,
        max: 2000,
        value: 0,
        slide: function( event, ui ) {
          $("#amount").val( ui.value );
          x = parseInt(ui.value);
          $('svg').attr('viewBox', w + ' ' + x +  ' ' + y + ' ' + z);
        }
      });*/

    }
  };
})(jQuery, Drupal);
