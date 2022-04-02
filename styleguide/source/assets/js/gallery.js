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

      //  Setting the mobile captions to flex-end results in overflow not scrolling when it overflows the div
      //  calculate whether or not the content is overflowing and unset flex-end if it is.
      function columnHeightFix() {
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

      function breakpointCheck(width, height) {
        if (width < 900) {
          breakpoint = 'mobile';
          columnHeightFix();
        }
        if (width > 900 && width < 1200) {
          breakpoint = 'tablet';
        }
        if (width > 1200) {
          breakpoint = 'desktop';
        }
      }

      //  Initialize the GSAP timeline by setting the initial viewbox coordinates based on breakpoint.
      //  This resolves pop-in when the first item is added to the timeline, and sets the correct
      //  coordinates based on breakpoint.
      function setInitialCoords() {
        let height = $(window).height();
        let width = $(window).width();

        //  Run the breakpoint check
        breakpointCheck(width, height);

        //  Set starting coords based on first slide.
        let coords = $('.caption.part-1').attr('data-coordinates-' + breakpoint);

        //  set coords
        updateSvg(coords);
      }

      //  Set the proper coordinates based on breakpoint and available values.
      function getCoords(index) {
        var defaultCoords = '50 65 530 530';

        //  if desktop
        if(breakpoint === 'desktop') {
          //  check for desktop coordinates
          if(desktopCoordList[index]) {
            viewboxCoords = desktopCoordList[index];
          }
          //  check for tablet coordinates
          else if(tabletCoordList[index]) {
            viewboxCoords = tabletCoordList[index];
          }
          //  check for mobile coordinates
          else if(mobileCoordList[index]) {
            viewboxCoords = mobileCoordList[index];
          }
          //  In there are no coordinates, set defaults.
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

      //  portable svg update function
      function updateSvg(coords) {
        gallery.to(svg, {
          attr: {
            viewBox: coords
          }
        });
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
            $('.text-column').removeClass('loading').addClass('loaded');
          },

          //  This callback is fired after resizing the browser's window. Just after the sections are resized.
          afterResize: function(width, height){

            //  store the old breakpoint for comparison
            let oldBreakpoint = breakpoint;

            //  set the new breakpoint
            breakpointCheck(width, height);

            let targetAttr = 'data-coordinates-' + breakpoint;
            let coords = $('.active').attr(targetAttr);

            //  If the active slide has the attribute
            if (coords) {

              //  And the breakpoint has changed
              if (breakpoint !== oldBreakpoint) {

                //  update the viewbox
                updateSvg(coords);
              }
            }
          },

          //  Callback fired once the sections have been loaded, after the scrolling has ended.
          afterLoad: function(origin, destination, direction){
          },

          //  This callback is fired once the user leaves a section, in the transition to the new section.
          //  Returning false will cancel the move before it takes place.
          onLeave: function(origin, destination, direction){

            var sectionType = $(destination.item).attr('data-section');

            //  If this is a dynamic section.
            if(sectionType === 'dynamic') {

              //  Run coord finder
              let coords = getCoords(destination.index);

              //  Update the viewbox.
              updateSvg(coords);

              //  And reveal the svg
              $('.image-wrapper svg').css('opacity', 1);
            } else {
              // else, hide the svg
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
        setInitialCoords();
      })
      initialization();
    }
  };
})(jQuery, Drupal);
