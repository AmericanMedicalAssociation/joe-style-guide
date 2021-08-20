(function ($, Drupal) {
  Drupal.behaviors.gallery = {
    attach: function (context, settings) {

      // Down button
      $('.scroll-down').on('click', function(e) {
        e.preventDefault();
        fullpage_api.moveSectionDown();
      });

      var svg = document.querySelector('.image-wrapper svg');
      var gallery = gsap.timeline({
        repeat: false,
        defaults: {
          duration: 1.3,
          ease: 'power2.out'
        }

        // Get visual viewbox coordinates for development
        //onUpdate: () => {
        //const x = Math.floor(svg.viewBox.baseVal.x);
        //const y = Math.floor(svg.viewBox.baseVal.y);
        //const width = Math.floor(svg.viewBox.baseVal.width);
        //const height = Math.floor(svg.viewBox.baseVal.height);
        //p.innerHTML = 'viewBox="${x} ${y} ${width} ${height}"';
        //}
      });

      // Initialize the first section to trigger correct first scroll animation
      $( document ).ready(function() {
        var viewBox = $('.image-wrapper svg').attr('viewBox');
        console.log(viewBox);
        gallery.to(svg, {
          attr: {
            viewBox: viewBox
          }
        });
      });

      function initialization() {
        var myFullpage = new fullpage('#fullpage', {
          anchors: [
            'part-1',
            'part-2',
            'part-3',
            'part-4',
            'part-5',
            'part-6',
            'part-7',
            'footer'
          ],
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

            //  When you leave the first slide
            if (destination.index !== 0) {
              $('.gallery-header').addClass('joe__sticky-gallery-header');
              $('.top').addClass('visible');
            } else {
              $('.top').removeClass('visible');
            }

            if (destination.index === 0) {
              gallery.to(svg, {
                attr: {
                  viewBox: '352 385 954 954'
                }
              });
              $('.gallery-header').removeClass('joe__sticky-gallery-header');
            }
            if (destination.index === 1) {
              gallery.to(svg, {
                attr: {
                  viewBox: '623 755 843 843'
                }
              });
            }
            if (destination.index === 2) {
              gallery.to(svg, {
                attr: {
                  viewBox: '65 755 843 843'
                }
              });
            }
            if (destination.index === 3) {
              gallery.to(svg, {
                attr: {
                  viewBox: '246 387 1188 1188'
                }
              });
            }
            if (destination.index === 4) {
              gallery.to(svg, {
                attr: {
                  viewBox: '623 755 843 843'
                }
              });
            }
            if (destination.index === 5) {
              gallery.to(svg, {
                attr: {
                  viewBox: '65 755 843 843'
                }
              });
            }
            if (destination.index === 6) {
              gallery.to(svg, {
                attr: {
                  viewBox: '246 387 1188 1188'
                }
              });
            }
            if (destination.index === 7) {
              gallery.to(svg, {
                attr: {
                  viewBox: '65 755 843 843'
                }
              });
            }
          }
        });
      }
      initialization();
    }
  };
})(jQuery, Drupal);
