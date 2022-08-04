/**
 * @file
 * issue filter user interactions.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
 (function ($, Drupal) {
   Drupal.behaviors.issueFilters = {
     attach: function (context, settings) {
        
        // Opens and closes filter drawer. 
        $('.joe__issue-filter--trigger').click(function() {
          event.preventDefault();
          // Unfocus on the dropdown
          $(this).blur();
          // add a class to the sibling dropdown
          $(this).parents('.joe__issue-filter__tab').toggleClass('is-active');
          $(this).parents().siblings('.joe__issue-filter__tab').removeClass('is-active');
          
        });
     }
   };
 })(jQuery, Drupal);
