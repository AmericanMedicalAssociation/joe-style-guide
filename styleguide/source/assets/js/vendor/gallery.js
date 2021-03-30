(function ($, Drupal) {
  Drupal.behaviors.gallery = {
    attach: function (context, settings) {
      var audio = document.getElementById("gallery-audio");
      //var audio = $('.gallery-audio')
      var playing = false;
      $('.play-container').click(function() {
        if (playing == false) {
          audio.play();
          playing = true;
        } else {
          audio.pause();
          playing = false;
        }
      });

      $('.gallery-audio').on('play', function() {
        $('.top').addClass('player-offset');
        $(this).addClass('playing').removeClass('paused');
        $('.play-container').addClass('playing').removeClass('paused');
      });
      $('.gallery-audio').on('pause', function() {
        $(this).addClass('paused').removeClass('playing');
        $('.play-container').addClass('paused').removeClass('playing');
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
              'footer',
              'part-8'
            ],
            licenseKey: '77D14527-65F84765-8BF82EDE-2814ECA6',
            scrollOverflow: true,
            navigation: false,
            verticalCentered: false,
            onLeave: function(origin, destination, direction) {
              var params = {
                origin: origin,
                destination:destination,
                direction: direction
              };
              console.log(destination);
              console.log(destination.index);
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
                gallery.to(svg, {
                  attr: {
                    viewBox: '623 755 843 843'
                  }
                });
                $('.image-wrapper').addClass('hide');
                console.log(destination.index);
              }
              if (destination.index === 5) {
                gallery.to(svg, {
                  attr: {
                    viewBox: '65 755 843 843'
                  }
                });
                $('.image-wrapper').addClass('hide');
                console.log(destination.index);
              }
              if (destination.index === 6) {
                gallery.to(svg, {
                  attr: {
                    viewBox: '246 387 1188 1188'
                  }
                });
                $('.image-wrapper').addClass('hide');
                console.log(destination.index);
              }
              if (destination.index === 7) {
                gallery.to(svg, {
                  attr: {
                    viewBox: '65 755 843 843'
                  }
                });
                $('.image-wrapper').addClass('hide');
                console.log(destination.index);
              }
            }
          });
        }
        initialization();
      }
    };
  })(jQuery, Drupal);
