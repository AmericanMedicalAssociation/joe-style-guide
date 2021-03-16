(function ($, Drupal) {
  Drupal.behaviors.gallery = {
    attach: function (context, settings) {

      $('.play-ring').on('click', function() {
        $('.gallery-audio').trigger('play');
        console.log("clicked");
      });

      var observer = new IntersectionObserver(function(entries) {
        // isIntersecting is true when element and viewport are overlapping
        // isIntersecting is false when element and viewport don't overlap
        if(entries[0].isIntersecting === true) {
          console.log('Element has just become visible in screen');
        }
      }, { threshold: [0] });

      //const p = document.querySelector('.image-wrapper p');
      var svg = document.querySelector('.image-wrapper svg');
      var gallery = gsap.timeline({
        repeat: false,
        defaults: {
          duration: 1.5,
          ease: 'power2.out'
        }
        //onUpdate: () => {
          //const x = Math.floor(svg.viewBox.baseVal.x);
          //const y = Math.floor(svg.viewBox.baseVal.y);
          //const width = Math.floor(svg.viewBox.baseVal.width);
          //const height = Math.floor(svg.viewBox.baseVal.height);
          //p.innerHTML = 'viewBox="${x} ${y} ${width} ${height}"';
        //}
      });

      $('.gallery-audio').on('play', function() {
        $(this).addClass('played');
      });

      function initialization() {
        var myFullpage = new fullpage('#fullpage', {
          anchors: [
            'part-1',
            'part-2',
            'part-3',
            'part-4',
            'part-5'
          ],
          licenseKey: '77D14527-65F84765-8BF82EDE-2814ECA6',
          scrollOverflow: true,
          navigation: false,
          onLeave: function(origin, destination, direction) {
            var params = {
              origin: origin,
              destination:destination,
              direction: direction
            };
            console.log(destination);
            console.log(destination.index);
            if (destination !== 0) {
              $('.gallery-header').addClass('joe__sticky-gallery-header');
            }
            if (destination.index === 0) {
              gallery.to(svg, {
                attr: {
                  viewBox: '352 385 954 954'
                }
              });
              $('.gallery-header').removeClass('joe__sticky-gallery-header');
              console.log(destination.index);
            }
            if (destination.index === 1) {
              gallery.to(svg, {
                attr: {
                  viewBox: '623 755 843 843'
                }
              });
              console.log(destination.index);
            }
            if (destination.index === 2) {
              gallery.to(svg, {
                attr: {
                  viewBox: '65 755 843 843'
                }
              });
              console.log(destination.index);
            }
            if (destination.index === 3) {
              gallery.to(svg, {
                attr: {
                  viewBox: '246 387 1188 1188'
                }
              });
              console.log(destination.index);
            }
            if (destination.index === 4) {
              $('.image-wrapper').addClass('hide');
              console.log('index 4');
            }
          }
        });
      }
      initialization();
    }
  };
})(jQuery, Drupal);
