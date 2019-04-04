/**
 * @file
 * Form fields masking
 */

(function ($, Drupal) {
  Drupal.behaviors.formItems = {
    attach: function (context, settings) {
      (function ($) {
        $(document).ready(function(){
          $('.joe__search-bar__select').selectmenu();
        });
      })(jQuery);
    }
  };
})(jQuery, Drupal);
