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

      // Set the svg display, which controls image zoom based on caption.
      const svg = $('.image-wrapper svg');

      // Set our global params.
      let viewBox = svg.attr('viewBox');
      let anchorList = [];
      let desktopCoordList = [];
      let tabletCoordList = [];
      let mobileCoordList = [];
      let viewboxCoords;
      let breakpoint;
      let coords;
      let visibleCaption = -1;
      let prevScrollPosition = 0;
      let scrollingDown;
      // Find all captionsBox classes. These are captioned images.
      // @todo This only allows one per instance per page.
      const captionsBox = document.querySelectorAll('.vc-scroll-zoom__captions');

      // Find all unique captions inside the image.
      const captionsList = document.querySelectorAll('.vc-scroll-zoom__caption');

      // Get caption data.
      function loadArrays() {
        // Add each anchor to an array
        $('div[data-anchor]').each(function(idx, el){
          anchorList.push($(this).attr('data-anchor'));
        });
        // Add each coordinate to an array
        $('div[data-coordinates-desktop]').each(function(idx, el){
          desktopCoordList.push($(this).attr('data-coordinates-desktop'));
          tabletCoordList.push($(this).attr('data-coordinates-tablet'));
          mobileCoordList.push($(this).attr('data-coordinates-mobile'));
        });
      }

      // Portable svg update function.
      // See https://gsap.com/docs/v3/Eases.
      function updateSvg(coords, index = 0) {
        // Only move if the scroll forces an allowed change.
        if ((index > visibleCaption && scrollingDown) || (index < visibleCaption && !scrollingDown)) {
          gsap.to(svg, {
            scale: 1,
            duration: 1.3,
            attr: {
              viewBox: coords
            },
            ease: 'power2.out'
          });

          visibleCaption = index;
        }
      }

      // Set active breakpoint on resize.
      function breakpointCheck(width, height) {
        if (width < 900) {
          breakpoint = 'mobile';
        }
        if (width > 900 && width < 1200) {
          breakpoint = 'tablet';
        }
        if (width > 1200) {
          breakpoint = 'desktop';
        }
      }

      // Initialize the initial viewbox coordinates based on breakpoint.
      function setInitialCoords() {
        let height = $(window).height();
        let width = $(window).width();

        //  Run the breakpoint check
        breakpointCheck(width, height);

        //  Set starting coords based on first slide.
        coords = $('.static-display').attr('data-coordinates-' + breakpoint);

        //  set coords
        updateSvg(coords, 0);
      }

      // Set the proper coordinates based on breakpoint and available values.
      function getCoords(index) {
        // Set the defaults.
        viewboxCoords = '50 65 530 530';

        //  if desktop
        if (breakpoint === 'desktop') {
          if (desktopCoordList[index]) {
            viewboxCoords = desktopCoordList[index];
          }
        }
        if (breakpoint === 'tablet') {
          if (tabletCoordList[index]) {
            viewboxCoords = tabletCoordList[index];
          }
        }
        if (breakpoint === 'mobile') {
          if (mobileCoordList[index]) {
            viewboxCoords = mobileCoordList[index];
          }
        }

        return viewboxCoords;
      }

      /**
       * Set the scroll behaviors.
       */

        // Find the dimensions of captionsBox
      const inViewport = function (e, caller = '') {
          const distance = e.getBoundingClientRect();
          return (
            distance.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            distance.left >= 0 &&
            distance.right <= (window.innerWidth || document.documentElement.clientWidth) &&
            distance.bottom >= 0);
        };

      // Set inView
      function isInView() {

        for (let i = 0; i < captionsBox.length; i++) {
          if (inViewport(captionsBox[i], 'box')) {
            // If in view set the bounding image box to sticky.
            captionsBox[i].previousElementSibling.classList.add('is-sticky');

            // Now determine which caption we are looking at.
            for (let j = 0; j < captionsList.length; j++) {
              // Get the SVG render options, offset by 1 to account for the initial image.
              let offset = j + 1;
              if (inViewport(captionsList[j], 'caption') && offset !== visibleCaption) {
                coords = getCoords(offset);
                updateSvg(coords, offset);
              }
            }
          } else {
            captionsBox[i].previousElementSibling.classList.remove('is-sticky');
            // The 0th element is the default image.
            coords = getCoords(0);
            updateSvg(coords, 0);
          }
        }
      }

      // If has captionsBox, run throttled inViewport
      if (captionsBox && captionsList) {
        // Set throttle variables
        let lastScrollPosition = 0;
        let throttle = false;

        window.addEventListener('scroll', () => {
          // Set lastScrollPosition to window.scrollY
          lastScrollPosition = window.scrollY;
          // Track scroll direction.
          scrollingDown = (prevScrollPosition - lastScrollPosition) <= 0;
          // Throttle scroll behavior
          if (!throttle) {
            setTimeout(() => {
              isInView();
              throttle = false;
              prevScrollPosition = lastScrollPosition;
            }, 25);
          }
          throttle = true;
        }, false);
      }

      // Load the default image and data.
      $(document).ready(function() {
        loadArrays();
        setInitialCoords();
      });
    }
  };
})(jQuery, Drupal);
