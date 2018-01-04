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
   Drupal.behaviors.tool_drawer = {
     attach: function (context, settings) {

         // Opens and closes tool drawer. 
         // Closes other drawers when selected one opens.
         $('#tool-drawer__trigger').click(function() {
           // Unfocus on the dropdown
           $(this).blur();
           // add a class to the sibling dropdown
           $(this).toggleClass('is-active');
           $(this).siblings('.joe__tool-drawer').slideToggle(300);
           $('#tool-drawer__trigger').not(this).removeClass('is-active');
           $('#tool-drawer__trigger').not(this).siblings('.joe__tool-drawer').slideUp(300);
         });
         
     }
   };
 })(jQuery, Drupal);
