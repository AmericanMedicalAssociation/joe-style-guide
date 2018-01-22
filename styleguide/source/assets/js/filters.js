/**
 * @file
 * Ribbon nav user interactions.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
 (function ($, Drupal) {
   Drupal.behaviors.filters = {
     attach: function (context, settings) {

         // Opens and closes filter drawer. 
         $('.joe__filters--trigger').click(function() {
           // Unfocus on the dropdown
           $(this).blur();
           // add a class to the sibling dropdown
           $(this).toggleClass('is-active');
           $(this).siblings('.joe__filters').slideToggle(300);
         });
         
         $(".joe__chosen").chosen();
     }
   };
 })(jQuery, Drupal);
