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
  Drupal.behaviors.vc_featured_media = {
    attach: function (context, settings) {
      $('.vc-featured-media, .vc-slide-rule').each(function () {
        $(this).prepend(
          "<button aria-expanded='false' class='vc-button--is-zoomed' type='button'><span class='visually-hidden'>Zoom into Media Toggle</span><span class='vc-is-zoomed__open'><svg fill='none' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='m11 16c3.3137 0 6-2.6863 6-6 0-3.31371-2.6863-6-6-6-3.31371 0-6 2.68629-6 6 0 3.3137 2.68629 6 6 6z' stroke='#fff' stroke-width='2'/><path d='m15.707 14.293 4.5 4.5z' fill='transparent'/><g stroke='#fff' stroke-width='2'><path d='m15.707 14.293 4.5 4.5'/><path d='m11 7v6'/><path d='m8 10h6'/></g></svg></span><span class='vc-is-zoomed__close'><svg height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='m5.207 3.793 14.849 14.849M4.543 18.793 19.392 3.944' stroke='#fff' stroke-width='2'></path></svg></span></button>"
        );

        const figureText = $(this).find(
          '.vc-featured-media__caption, .vc-slide-rule__caption'
        );
        const figureHeight = figureText.outerHeight();
        const zoomButton = $(this).children('.vc-button--is-zoomed');

        zoomButton.css('top', figureHeight + 10);
      });

      $('.vc-button--is-zoomed').on('click', function () {
        const zoomContainer = $(this).closest(
          '.layout__region, .vc-modal__first'
        );
        let windowWidth = $(document).width();

        if ($(this).parents('.vc-modal').length) {
          windowWidth = $(this).closest('.vc-modal__grid').width();
          console.log(windowWidth);
        }

        if (zoomContainer.hasClass('is-zoomed')) {
          $(this).removeClass('is-open');
          zoomContainer.removeClass('is-zoomed');
          zoomContainer.css('width', '');

          if ($(this).parents('.vc-modal').length) {
            $(this).closest('.vc-modal__container').removeClass('is-zoomed');
          }
        } else {
          $(this).addClass('is-open');
          zoomContainer.addClass('is-zoomed');
          zoomContainer.css('width', windowWidth);

          if ($(this).parents('.vc-modal').length) {
            $(this).closest('.vc-modal__container').addClass('is-zoomed');
          }
        }

        // If slide rule media, adjust the reveal image width
        if ($(this).siblings('.vc-slide-rule__slider')) {
          const initImage = $(this)
            .siblings('.vc-slide-rule__slider')
            .children('img')
            .width();
          const revealImage = $(this)
            .siblings('.vc-slide-rule__slider')
            .find('.beer-reveal img');

          revealImage.css('width', initImage);
        }
      });

      // Close `is-zoomed` when mouseup outside of element
      document.addEventListener(
        'mouseup',
        function (e) {
          if (
            !e.target.closest(
              '.layout__region.is-zoomed, .vc-modal__first.is-zoomed'
            )
          ) {
            $(
              '.layout__region, .vc-modal__container, .vc-modal__first'
            ).removeClass('is-zoomed');
            $('.layout__region, .vc-modal__first').css('width', '');
            $('.vc-button--is-zoomed').removeClass('is-open');
          }
        },
        false
      );

      // On `esc` press close `is-zoomed`
      document.addEventListener(
        'keyup',
        function (e) {
          if (
            !e.target.closest(
              '.layout__region.is-zoomed, .vc-modal__first.is-zoomed'
            )
          ) {
            console.log('hit');
            const key = e.key || e.keyCode;
            if (key === 'Escape' || key === 'Esc' || key === 27) {
              $(
                '.layout__region, .vc-modal__container, .vc-modal__first'
              ).removeClass('is-zoomed');
              $('.layout__region, .vc-modal__first').css('width', '');
              $('.vc-button--is-zoomed').removeClass('is-open');
            }
          }
        },
        false
      );
    },
  };
})(jQuery, Drupal);
