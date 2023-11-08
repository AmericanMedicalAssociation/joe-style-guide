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
      $(".vc-featured-media, .vc-slide-rule")
        .not(".vc-modal .vc-featured-media")
        .each(function () {
          $(this).prepend(
            "<button aria-expanded='false' class='vc-button--is-zoomed' type='button'><span class='visually-hidden'>Zoom into Media Toggle</span><span class='vc-is-zoomed__open'><svg height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><circle cx='10.875' cy='10.125' r='5.375' fill='transparent' stroke='#fff' stroke-width='2'></circle><path d='m15.707 14.293 4.5 4.5' stroke='#fff' stroke-width='2'></path></svg></span><span class='vc-is-zoomed__close'><svg height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='m5.207 3.793 14.849 14.849M4.543 18.793 19.392 3.944' stroke='#fff' stroke-width='2'></path></svg></span></button>"
          );

          const figureText = $(this).find(
            ".vc-featured-media__caption, .vc-slide-rule__caption"
          );
          const figureHeight = figureText.outerHeight();
          const zoomButton = $(this).children(".vc-button--is-zoomed");

          zoomButton.css("top", figureHeight + 10);
        });

      $(".vc-button--is-zoomed").on("click", function () {
        const zoomContainer = $(this).closest(".layout__region");
        const windowWidth = $(document).width();

        if (zoomContainer.hasClass("is-zoomed")) {
          $(this).removeClass("is-open");
          zoomContainer.removeClass("is-zoomed");
          zoomContainer.css("width", "");
        } else {
          $(this).addClass("is-open");
          zoomContainer.addClass("is-zoomed");
          zoomContainer.css("width", windowWidth);
        }

        // If slide rule media, adjust the reveal image width
        if ($(this).siblings(".vc-slide-rule__slider")) {
          const initImage = $(this)
            .siblings(".vc-slide-rule__slider")
            .children("img")
            .width();
          const revealImage = $(this)
            .siblings(".vc-slide-rule__slider")
            .find(".beer-reveal img");

          revealImage.css("width", initImage);
        }
      });

      // Close `is-zoomed` when mouseup outside of element
      document.addEventListener(
        "mouseup",
        function (e) {
          if (!e.target.closest(".layout__region.is-zoomed")) {
            $(".layout__region").removeClass("is-zoomed");
            $(".layout__region").css("width", "");
            $(".vc-button--is-zoomed").removeClass("is-open");
          }
        },
        false
      );
    },
  };
})(jQuery, Drupal);
