(function ($, Drupal) {
  Drupal.behaviors.gallery = {
    attach: function (context, settings) {

      $.fn.setViewportHeight = function() {
        var viewportHeight = $('.image-wrapper').height();
        var footerHeight = $('.gallery-footer-wrapper').height();
        $('.image-wrapper svg').css('height', viewportHeight);
        //$('.footer-spacer').css('height', (footerHeight + 36));
      };
      $('.scroll-down').on('click', function(e) {
        e.preventDefault();
        fullpage_api.moveSectionDown();
      });

      var svg = document.querySelector('.image-wrapper svg');
      var anchorList = [];
      var coordList = [];

      // Initialize the first section to trigger correct first scroll animation
      $( document ).ready(function() {
        $.fn.setViewportHeight();
        // Add each data-anchor to an array for fullpage.js
        $('div[data-anchor]').each(function(idx, el){
          anchorList.push($(this).attr('data-anchor'));
        });
        // Add each coordinate to an array
        $('div[data-coordinates]').each(function(idx, el){
          coordList.push($(this).attr('data-coordinates'));
        });
      });

      $(window).resize(function() {
        $.fn.setViewportHeight();
      });

      var gallery = gsap.timeline({
        repeat: false,
        defaults: {
          duration: 1.3,
          ease: 'power2.out'
        }
      });

      var viewBox = $('.image-wrapper svg').attr('viewBox');
      gallery.to(svg, {
        attr: {
          viewBox: viewBox
        }
      });
      function initialization() {
        var myFullpage = new fullpage('#fullpage', {
          anchors: anchorList,
          licenseKey: '77D14527-65F84765-8BF82EDE-2814ECA6',
          scrollOverflow: true,
          navigation: false,
          verticalCentered: false,
          scrollingSpeed: 1300,

          onLeave: function(origin, destination, direction) {
            var params = {
              origin: origin,
              destination:destination,
              direction: direction
            };
            if((destination.anchor !== 'references') && (destination.anchor !== 'footer')) {
              gallery.to(svg, {
                attr: {
                  viewBox: coordList[destination.index]
                }
              });
            }


            //  When you leave the first slide
            if (destination.index !== 0) {
              $('.gallery-header').addClass('joe__sticky-gallery-header');
              $('.top').addClass('visible');
            } else {
              $('.top').removeClass('visible');
              $('.gallery-header').removeClass('joe__sticky-gallery-header');
            }
          }
        });
      }
      initialization();
      $('.text-column').removeClass('loading').addClass('loaded');
    }
  };
})(jQuery, Drupal);
