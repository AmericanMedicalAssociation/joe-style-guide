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
        var filterTrigger = $('.joe__filters--trigger')
        var filters = $('.joe__filters');
        
         // Opens and closes filter drawer. 
         filterTrigger.click(function() {
          if ($(window).width() < 900) {
            // Unfocus on the dropdown
            $(this).blur();
            // add a class to the sibling dropdown
            $(this).toggleClass('is-active');
            // Only open this trigger's filters.
            $(this).siblings('.joe__filters').slideToggle(300);
          }
        });

       // Set the filters back to open when over 900px.
       if (filters.length) {
         $(window).on('resize', function () {
           if ($(this).width() > 900) {
             // Remove style from all filters.
             filters.removeAttr('style');
           }
         });
       }
        
        $(".joe__chosen").chosen({width: "100%"});
     }
   };
 })(jQuery, Drupal);
