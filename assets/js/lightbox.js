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
  'use strict';

  Drupal.behaviors.lightbox = {
    attach: function (context, settings) {
      // Opens and closes lightbox.
      $('.joe__inline-image__zoom').click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        // Unfocus on the dropdown
        $(this).blur();
        // add a class to the sibling dropdown
        var $figure = $(this).closest('.joe__inline-image');
        $figure.toggleClass('is-zoomed');
        $figure.css('max-width', $('.layout-container').width());
      });
      
      // Close the modal when esc is pressed.
      $(document).on('keydown', function(e) {
        if (e.keyCode === 27) {
          $(".joe__inline-image").removeClass('is-zoomed');
        }
      });

      // Close when clicking outside of zoomed image.
      $(document).on('click', function(e) {
        e.preventDefault();
        var target = $(e.target);
        if (target.is(':not(img)')) {
          $(".joe__inline-image").removeClass('is-zoomed');
        }
      });
    }
  };
})(jQuery, Drupal);
