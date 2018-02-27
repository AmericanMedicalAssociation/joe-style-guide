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
        // Opens and closes lightbox. 
        $('.joe__inline-image__zoom').click(function() {
          event.preventDefault();
          // Unfocus on the dropdown
          $(this).blur();
          // add a class to the sibling dropdown
          $(this).parents('.joe__inline-image').toggleClass('is-zoomed');
        });
        
        // close the modal when esc is pressed
        $(document).keydown(function(event) { 
          if (event.keyCode == 27) { 
            $(".joe__inline-image").removeClass('is-zoomed');
          }
        });

      }
   };
 })(jQuery, Drupal);
