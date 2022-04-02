(function ($, Drupal) {
  Drupal.behaviors.gallery = {
    attach: function (context, settings) {

      var svg = $('.image-wrapper svg');
      var viewBox = svg.attr('viewBox');
      var anchorList = [];
      var desktopCoordList = [];
      var tabletCoordList = [];
      var mobileCoordList = [];
      var breakpoint;

      //  down arrow click event
      $('.scroll-down').on('click', function(e) {
        e.preventDefault();
        fullpage_api.moveSectionDown();
      });

      function loadArrays() {
        // Add each anchor to an array
        $('div[data-anchor]').each(function(idx, el){
          anchorList.push($(this).attr('data-anchor'));
        });
        // Add each coordinate to an array
        $('div[data-coordinates-desktop]').each(function(idx, el){
          desktopCoordList.push($(this).attr('data-coordinates-desktop'));
          tabletCoordList.push($(this).attr('data-coordinates-tablet'));
          mobileCoordList.push($(this).attr('data-coordinates-mobile'));
        });
      }

      function viewportCheck(width, height) {
        if (width < 900) {
          breakpoint = 'mobile';
          let columnHeight = $('.part-1.caption').height();
          let captionHeight = $('.part-1.caption .inner').height();
          let heightDifference = (columnHeight - captionHeight - 70).toFixed(0);

          if (heightDifference <= 0) {
            $('.part-1.caption').addClass('height-fix');
          }
          else {
            $('.part-1.caption').removeClass('height-fix');
          }
        }
        if (width > 900 && width < 1200) {
          breakpoint = 'tablet';
        }
        if (width > 1200) {
          breakpoint = 'desktop';
        }
      }

      function getCoords(index) {
        var defaultCoords = '50 65 530 530';
        if(breakpoint === 'desktop') {
          if(desktopCoordList[index]) {
            viewboxCoords = desktopCoordList[index];
          }
          else if(tabletCoordList[index]) {
            viewboxCoords = tabletCoordList[index];
          }
          else if(mobileCoordList[index]) {
            viewboxCoords = mobileCoordList[index];
          }
          else {
            viewboxCoords = defaultCoords;
          }
        }
        if(breakpoint === 'tablet') {
          if(tabletCoordList[index]) {
            viewboxCoords = tabletCoordList[index];
          }
          else if(desktopCoordList[index]) {
            viewboxCoords = desktopCoordList[index];
          }
          else if(mobileCoordList[index]) {
            viewboxCoords = mobileCoordList[index];
          }
          else {
            viewboxCoords = defaultCoords;
          }
        }
        if(breakpoint === 'mobile') {
          if(mobileCoordList[index]) {
            viewboxCoords = mobileCoordList[index];
          }
          else if(tabletCoordList[index]) {
            viewboxCoords = tabletCoordList[index];
          }
          else if(desktopCoordList[index]) {
            viewboxCoords = desktopCoordList[index];
          }
          else {
            viewboxCoords = defaultCoords;
          }
        }
        return viewboxCoords;
      }

      //  Initialise GSAP timeline
      var gallery = gsap.timeline({
        repeat: false,
        defaults: {
          duration: 1.3,
          ease: 'power2.out'
        }
      });

      //  initialize fullpage.js instance
      function initialization() {
        var myFullpage = new fullpage('#fullpage', {
          licenseKey: '77D14527-65F84765-8BF82EDE-2814ECA6',
          dragAndMoveKey: ['YW1hLWFzc24ub3JnX2Q1MVpISmhaMEZ1WkUxdmRtVT04S3o=', 'bG5kby5zaXRlX1k4R1pISmhaMEZ1WkUxdmRtVT03NWo='],
          dragAndMove: 'fingersonly',
          anchors: anchorList,
          scrollOverflow: true,
          navigation: false,
          verticalCentered: false,
          fitToSection: true,
          scrollingSpeed: 1300,
          animateAnchor: false,


          //  This callback is fired just after the structure of the page is generated.
          afterRender: function(){

            var height = $(window).height();
            var width = $(window).width();
            viewportCheck(width, height);
            let startingCoords = $('.caption.part-1').attr('data-coordinates-desktop');
            gallery.to(svg, {
              attr: {
                viewBox: startingCoords
              }
            });
            $('.text-column').removeClass('loading').addClass('loaded');
          },
          //  This callback is fired after resizing the browser's window. Just after the sections are resized.
          afterResize: function(width, height){
            //  store the old breakpoint for comparison
            let oldBreakpoint = breakpoint;
            //  set the new breakpoint
            viewportCheck(width, height);

            let targetAttr = 'data-coordinates-' + breakpoint;
            let newCoords = $('.active').attr(targetAttr);

            //  if the breakpoint has changed, set the new coordinates.
            if (breakpoint !== oldBreakpoint) {
              gallery.to(svg, {
                attr: {
                  viewBox: newCoords
                }
              });
            }
          },

          //  Callback fired once the sections have been loaded, after the scrolling has ended.
          afterLoad: function(origin, destination, direction){
          },

          //  This callback is fired once the user leaves a section, in the transition to the new section.
          //  Returning false will cancel the move before it takes place.
          onLeave: function(origin, destination, direction){
            var viewboxCoords;
            var params = {
              origin: origin,
              destination:destination,
              direction: direction
            };

            if((destination.anchor !== 'references') && (destination.anchor !== 'footer') && (destination.anchor !== 'notes') && (destination.section !== 'static')) {

              var currCoords = getCoords(destination.index);

              gallery.to(svg, {
                attr: {
                  viewBox: currCoords
                }
              });

              $('.image-wrapper svg').css('opacity', 1);
            } else {
              // if the target is not a dynamic slide, hide the image.
              $('.image-wrapper svg').css('opacity', 0);
            }
            //  When you leave the first, add the 'top' button and shrink the header
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
      $(document).ready(function() {
        loadArrays();
      })
      initialization();
    }
  };
})(jQuery, Drupal);
