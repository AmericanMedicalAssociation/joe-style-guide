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
   Drupal.behaviors.sticky_share = {
     attach: function (context, settings) {

         // Opens and closes tool drawer.
         // Closes other drawers when selected one opens.
         $('#joe__share--trigger').click(function() {
           // Unfocus on the dropdown
           $(this).blur();
           // add a class to the sibling dropdown
           $(this).siblings('.joe__share').slideToggle(100);
         });

         // sticky sticky-share
         $(window).scroll(function(){
           var joeTop = $('#joe__top');
           if (joeTop.length) {
             var headerHeight = joeTop.height()
             var elementOffset = joeTop.offset().top
             var winTop = $(window).scrollTop()
             var distance = (elementOffset - winTop + headerHeight);

             if (distance < 0) {
               $("body").addClass("joe__sticky-share");
             } else {
               $("body").removeClass("joe__sticky-share");
             }
           }
          });//win func.

          // Create some variables to detect scroll and viewport
          $.fn.isInViewport = function() {
            var elementTop = $(this).offset().top;
            var share = $('.joe__share');
            if (share.length) {
              // Get the bottom position of the share element
              var shareTop = share.offset().top;
              var shareHeight = share.height();
              var shareBottom = shareTop + shareHeight;
              // Get the bottom position of the share trigger (in case element is hidden)
              var shareTriggerTop = $('.joe__share-trigger').offset().top;
              var shareTriggerHeight = $('.joe__share-trigger').height();
              var shareTriggerBottom = shareTriggerTop + shareTriggerHeight;

              return elementTop < shareBottom || elementTop < shareTriggerBottom;
            }
          };
          
          // When you see the issue teaser or the footer hide share trigger
          $(window).on('resize scroll', function() {
            $('.joe__article-issue-footer').each(function() {
              if ($(this).isInViewport()) {
                $('body').removeClass('joe__sticky-share');
              }
            });
            $('.joe__related-issues').each(function() {
              if ($(this).isInViewport()) {
                $('body').removeClass('joe__sticky-share');
              }
            });
            $('.joe__footer').each(function() {
              if ($(this).isInViewport()) {
                $('body').removeClass('joe__sticky-share');
              }
            });
          });
     }
   };
 })(jQuery, Drupal);
