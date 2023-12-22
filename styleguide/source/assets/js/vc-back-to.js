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
  Drupal.behaviors.vc_back_to = {
    attach: function (context, settings) {
      const vcGalleries = document.getElementById('vc-galleries');
      const vcBackToGalleries = document.getElementById('vc-back-to-galleries');

      const vcEthicsHero = document.querySelector('.vc-hero-ethics');
      const vcBackToTop = document.getElementById('vc-back-to-top');

      // Find the dimensions of pastViewport
      const pastViewport = function (e) {
        const distance = e.getBoundingClientRect();
        return distance.bottom >= 0;
      };

      // Set past galleries view func
      function pastGalleriesView() {
        if (pastViewport(vcGalleries)) {
          // If in view
          vcBackToGalleries.classList.remove('is-visible');
        } else {
          vcBackToGalleries.classList.add('is-visible');
        }
      }

      if (vcGalleries) {
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
                pastGalleriesView(lastScrollPosition);
                throttle = false;
              }, 25);
            }
            throttle = true;
          },
          false
        );
      }

      // Set past hero view func
      function pastHeroView() {
        if (pastViewport(vcEthicsHero)) {
          // If in view
          vcBackToTop.classList.remove('is-visible');
        } else {
          vcBackToTop.classList.add('is-visible');
        }
      }

      if (vcEthicsHero) {
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
                pastHeroView(lastScrollPosition);
                throttle = false;
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
