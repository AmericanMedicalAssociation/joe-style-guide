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
          var menu = $(this).find('.fieldset-wrapper .form-checkboxes');

          title.attr('aria-controls', menu.attr('id'));
          title.attr('tabindex', '0');

          function toggleFacet() {
            $(this).toggleClass('expanded').parent().next().slideToggle();
          }

          title.click(toggleFacet);

          title.keydown(function (e) {
            if (e.key === 'Enter' || e.keyCode === 13 || e.key === ' ' || e.keyCode === 32) {
              toggleFacet.call(this);
            }
          });
        });
      }
      init()
    }
  };
})(jQuery, Drupal);
