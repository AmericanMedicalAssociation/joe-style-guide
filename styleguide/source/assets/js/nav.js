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
   Drupal.behaviors.nav = {
     attach: function (context, settings) {

         // Menu
         // When a user clicks on the menu trigger (main)
         $('#menu-trigger').click(function() {
           // Unfocus on the dropdown
           $(this).blur();
           // add a class to the sibling dropdown
           $(this).toggleClass('is-active');
           $(this).siblings('#joe__nav-drawer').toggleClass('is-active');
           $('#search-trigger').removeClass('is-active');
           $('#site-search-form').removeClass('is-active');
         });
         
         // Search
         // When a user clicks on the search trigger
         $('#search-trigger').click(function() {
           // Unfocus on the dropdown
           $(this).blur();
           // add a class to the sibling dropdown
           $(this).toggleClass('is-active');
           $(this).siblings('#site-search-form').toggleClass('is-active');
           $('#joe__nav-drawer').removeClass('is-active');
           $('#menu-trigger').removeClass('is-active');
         });

     }
   };
 })(jQuery, Drupal);
