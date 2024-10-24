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
      // Variables
      const horizontalGalleries = $('.vc-horizontal-gallery__items');
      const modalButton = document.querySelectorAll(
        '.vc-horizontal-gallery__artwork'
      );
      const modalArtwork = $('.vc-horizontal-gallery__artwork-items');

      if (modalArtwork) {
        $('.vc-modal').appendTo('body');

        // Gallery slider
        horizontalGalleries.each(function (e) {
          $(this).slick({
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: '5%',
            variableWidth: true,
            speed: 800,
            touchMove: false,
            prevArrow: $(this).parent().find('.slick-prev'),
            nextArrow: $(this).parent().find('.slick-next'),
            responsive: [
              {
                breakpoint: 900,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  variableWidth: false,
                },
              },
            ],
          });
        });

        // Artwork slider
        modalArtwork.each(function () {
          $(this).slick({
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: false,
            speed: 0,
            touchMove: false,
            draggable: false,
            swipe: false,
            initialSlide: 0,
            adaptiveHeight: true,
            prevArrow: $(this).parent().find('.slick-prev'),
            nextArrow: $(this).parent().find('.slick-next'),
          });
        });

        // Initate modal
        MicroModal.init();

        // Open to correct artwork when clicked
        modalButton.forEach((e) => {
          e.addEventListener('click', () => {
            $('.vc-horizontal-gallery__artwork-items').slick(
              'slickGoTo',
              e.dataset.slidenum
            );

            $('.vc-modal .vc-featured-media').each(function () {
              setTimeout(() => {
                const modalFiguresHeight = $(this)
                  .find('.vc-featured-media__caption')
                  .innerHeight();
                $(this)
                  .find('.vc-featured-media__figure')
                  .css({
                    'padding-top': modalFiguresHeight + 'px',
                  });
                $(this)
                  .find('.vc-button--is-zoomed')
                  .css('top', modalFiguresHeight + 10);
              }, '50');
            });
          });
        });
      }
    },
  };
})(jQuery, Drupal);
