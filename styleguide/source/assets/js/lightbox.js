/**
 * @file
 * Lightbox interactions.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {
  Drupal.behaviors.lightbox = {
    attach: function (context, settings) {
        
      var $savedScrollPosition = 0;
      // Opens and closes lightbox.
      $('.joe__inline-image__zoom').click(function() {
        event.preventDefault();
        // Unfocus on the dropdown
        $(this).blur();
        // add a class to the sibling dropdown
        $(this).parents('.joe__inline-image').toggleClass('is-zoomed');
        // While image is zoomed-in, save the scroll position and freeze scrolling.
        if ($('.layout-container').hasClass('freeze-scrolling')) {
          $('.layout-container').removeClass('freeze-scrolling');
          // Restore scroll position before image was magnified.
          $(document).scrollTop($savedScrollPosition);
          $savedScrollPosition = 0;
        } else {
          // Save scroll position during 'freeze-scrolling'.
          $savedScrollPosition = $(document).scrollTop();
          $('.layout-container').addClass('freeze-scrolling');
        }
      });
      
      // close the modal when esc is pressed
      $(document).keydown(function(event) { 
        if (event.keyCode == 27) { 
          $('.layout-container').removeClass('freeze-scrolling');
          if ($savedScrollPosition) {
            // Restore scroll position before image was magnified.
            $(document).scrollTop($savedScrollPosition);
          }
          $(".joe__inline-image").removeClass('is-zoomed');
        }
      });
    }
  };
})(jQuery, Drupal);
