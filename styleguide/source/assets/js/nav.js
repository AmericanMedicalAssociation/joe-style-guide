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
            navAll = $('#joe__all-menu'),
            menuTriggerDesktop = $('#menu-trigger-desktop'),
            elementsToClone = $('#joe__nav-drawer').find('.joe__primary-nav__list, .joe__utility-nav__list'),
            searchDrawer = $('#site-search-form'),
            targetContainer = $('#joe__all-menu .nav-all');

        if (targetContainer.is(':empty')) {
         elementsToClone.clone().appendTo(targetContainer);
        }
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
           menuTriggerDesktop.removeClass('is-active');
           navAll.removeClass('is-active');
        });

         // Menu
         // When a user clicks on the menu trigger (main)
        menuTriggerDesktop.click(function() {
           // Unfocus on the dropdown
           $(this).blur();
           // add a class to the sibling dropdown
           $(this).toggleClass('is-active');
           navAll.toggleClass('is-active');
           searchTrigger.removeClass('is-active');
           searchDrawer.removeClass('is-active');
           navDrawer.removeClass('is-active');
           menuTrigger.removeClass('is-active');
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
           navAll.removeClass('is-active');
        });

         // close everything when esc is pressed
        $(document).keydown(function(event) {
          if (event.keyCode == 27) {
            navDrawer.removeClass('is-active');
            menuTrigger.removeClass('is-active');
            searchTrigger.removeClass('is-active');
            searchDrawer.removeClass('is-active');
            navAll.removeClass('is-active');
            menuTriggerDesktop.removeClass('is-active');
          }
        });

       // Close desktop menu on outside click
       $(document).click(function(event) {
         if (!$(event.target).is('#menu-trigger-desktop') && !$(event.target).closest('#menu-trigger-desktop').length) {
           menuTriggerDesktop.removeClass('is-active');
           navAll.removeClass('is-active');
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
           if (winTop >= 100) {
             $("body").addClass("joe__sticky-header");
           } else {
             $("body").removeClass("joe__sticky-header");
           }
         }
       });//win func.


     }
   };
 })(jQuery, Drupal);
