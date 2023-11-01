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
  Drupal.behaviors.vc_scroll_zoom = {
    attach: function (context, settings) {

      // Find all inViewCaptions classes
      const inViewCaptions = document.querySelectorAll('.vc-scroll-zoom__captions');

      console.log(inViewCaptions);

      // Find the dimensions of inViewport
      const inViewport = function (e) {
        const distance = e.getBoundingClientRect();
        return (
          distance.top <= (window.innerHeight || document.documentElement.clientHeight) &&
          distance.left >= 0 &&
          distance.right <= (window.innerWidth || document.documentElement.clientWidth) &&
          distance.bottom >= 0);
      };

      // Set inView
      function isInView() {
        for (let i = 0; i < inViewCaptions.length; i++) {
          if (inViewport(inViewCaptions[i])) {
            // If in view
            inViewCaptions[i].classList.add('in-view');
            inViewCaptions[i].previousElementSibling.classList.add('is-sticky');
          } else {
            inViewCaptions[i].classList.remove('in-view');
            inViewCaptions[i].previousElementSibling.classList.remove('is-sticky');
          }
        }
      }

      // If has inViewCaptions, run throttled inViewport
      if (inViewCaptions) {
        // Set throttle variables
        let lastScrollPosition = 0;
        let throttle = false;

        window.addEventListener('scroll', () => {
          // Set lastScrollPosition to window.scrollY
          lastScrollPosition = window.scrollY;
          // Throttle scroll behavior
          if (!throttle) {
            setTimeout(() => {
              isInView(lastScrollPosition);
              throttle = false;
            }, 25);
          }
          throttle = true;
        }, false);
      }
    }
  };
})(jQuery, Drupal);
