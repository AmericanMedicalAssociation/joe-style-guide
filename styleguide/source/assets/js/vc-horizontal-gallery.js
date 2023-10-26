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
  Drupal.behaviors.vc_horizontal_gallery = {
    attach: function (context, settings) {
      const horizontalGalleries = $('.vc-horizontal-gallery__items');

      horizontalGalleries.each(function () {
        $(this).slick({
          infinite: false,
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '5%',
          variableWidth: true,
          speed: 800,
          touchThreshold: 500,
          touchMove: false,
          responsive: [
            {
              breakpoint: 900,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                variableWidth: false
              }
            }
          ]
        });
      });
    }
  };
})(jQuery, Drupal);
