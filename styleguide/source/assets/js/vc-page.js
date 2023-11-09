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
  Drupal.behaviors.vc_page = {
    attach: function (context, settings) {
      // Find all inViewSection classes
      const inViewSection = document.querySelectorAll(
        ":root[class*=vc-] article .c-paragraph"
      );

      // Find the dimensions of inPageView
      const inPageView = function (e) {
        const distance = e.getBoundingClientRect();
        return (
          distance.top <=
            (window.innerHeight - 200 ||
              document.documentElement.clientHeight - 200) &&
          distance.left >= 0 &&
          distance.right <=
            (window.innerWidth || document.documentElement.clientWidth)
        );
      };

      // Set inView
      function sectionInView() {
        for (let i = 0; i < inViewSection.length; i++) {
          if (inPageView(inViewSection[i])) {
            // If in view
            inViewSection[i].classList.add("in-view");
          }
        }
      }

      // If has inViewSection, run throttled inPageView
      if (inViewSection) {
        // Set throttle variables
        let lastScrollPosition = 0;
        let throttle = false;

        window.addEventListener(
          "scroll",
          () => {
            // Set lastScrollPosition to window.scrollY
            lastScrollPosition = window.scrollY;
            // Throttle scroll behavior
            if (!throttle) {
              setTimeout(() => {
                sectionInView(lastScrollPosition);
                throttle = false;
              }, 25);
            }
            throttle = true;
          },
          false
        );

        window.addEventListener("load", () => {
          sectionInView();
        });
      }
    },
  };
})(jQuery, Drupal);
