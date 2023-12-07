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
  Drupal.behaviors.vc_hero_gallery = {
    attach: function (context, settings) {
      const vcHeroGallery = document.querySelector('.vc-hero-gallery');
      const vcBackToGalleries = document.getElementById('vc-back-to-galleries');

      // Find the dimensions of pastViewport
      const pastViewport = function (e) {
        const distance = e.getBoundingClientRect();
        return (
          distance.left >= 0 &&
          distance.right <=
            (window.innerWidth || document.documentElement.clientWidth) &&
          distance.bottom >= 0
        );
      };

      // Set inView
      function pastView() {
        if (pastViewport(vcHeroGallery)) {
          // If in view
          vcBackToGalleries.classList.remove('is-visible');
        } else {
          vcBackToGalleries.classList.add('is-visible');
        }
      }

      if (vcHeroGallery) {
        $('.vc-hero-gallery__nav').slick({
          infinite: false,
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '5%',
          variableWidth: true,
          speed: 800,
          touchMove: false,
          prevArrow: $('.vc-hero-gallery__nav').parent().find('.slick-prev'),
          nextArrow: $('.vc-hero-gallery__nav').parent().find('.slick-next'),
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

        // Set throttle variables
        let lastScrollPosition = 0;
        let throttle = false;

        window.addEventListener(
          'scroll',
          () => {
            // Set lastScrollPosition to window.scrollY
            lastScrollPosition = window.scrollY;
            // Throttle scroll behavior
            if (!throttle) {
              setTimeout(() => {
                pastView(lastScrollPosition);
                throttle = false;
                console.log('scrolling');
              }, 25);
            }
            throttle = true;
          },
          false
        );
      }
    },
  };
})(jQuery, Drupal);
