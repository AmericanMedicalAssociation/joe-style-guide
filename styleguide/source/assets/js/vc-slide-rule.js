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
  Drupal.behaviors.vc_slide_rule = {
    attach: function (context, settings) {
      $.fn.BeerSlider = function (options) {
        options = options || {};
        return this.each(function () {
          new BeerSlider(this, options);
        });
      };
      $('.vc-rule-slide__slider').each(function (index, el) {
        $(el).BeerSlider()
      });
    }
  };
})(jQuery, Drupal);
