/**
 * @file
 * Facets and filters
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */

(function ($, Drupal) {
  Drupal.behaviors.facet = {
    attach: function (context, settings) {
      function init() {
        $('.joe__facet').each(function () {

          var title = $(this).find('.fieldset-legend');

          title.click(function () {
            $(this).toggleClass('expanded').parent().next().slideToggle();
          });

          if ($(this).find('input').is(':checked')) {
            title.addClass('expanded').parent().next().slideDown();
          }
        });
      }
      init()
    }
  };
})(jQuery, Drupal);
