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
        var menuTrigger = $('#menu-trigger'),
            searchTrigger = $('#search-trigger'),
            navDrawer = $('#joe__nav-drawer'),
            searchDrawer = $('#site-search-form');
         // Menu
         // When a user clicks on the menu trigger (main)
         menuTrigger.click(function() {
           // Unfocus on the dropdown
           $(this).blur();
           // add a class to the sibling dropdown
           $(this).toggleClass('is-active');
           $(this).siblings('#joe__nav-drawer').toggleClass('is-active');
           searchTrigger.removeClass('is-active');
           searchDrawer.removeClass('is-active');
         });

         // Search
         // When a user clicks on the search trigger
         searchTrigger.click(function() {
           // Unfocus on the dropdown
           $(this).blur();
           // add a class to the sibling dropdown
           $(this).toggleClass('is-active');
           $(this).siblings('#site-search-form').toggleClass('is-active');
           navDrawer.removeClass('is-active');
           menuTrigger.removeClass('is-active');
         });

         // close everything when esc is pressed
        $(document).keydown(function(event) {
          if (event.keyCode == 27) {
            navDrawer.removeClass('is-active');
            menuTrigger.removeClass('is-active');
            searchTrigger.removeClass('is-active');
            searchDrawer.removeClass('is-active');
          }
        });

        // sticky sticky-header
       $(window).scroll(function(){
         var winTop = $(window).scrollTop();
         if($('.gallery-header.gallery').length > 0) {
           if (winTop >= 10) {
             $("body").addClass("joe__sticky-gallery-header");
           } else {
             $("body").removeClass("joe__sticky-gallery-header");
           }
         } else {
           if (winTop >= 30) {
             $("body").addClass("joe__sticky-header");
           } else {
             $("body").removeClass("joe__sticky-header");
           }
         }
       });//win func.
     }
   };
 })(jQuery, Drupal);
