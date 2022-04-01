(function ($, Drupal) {
  Drupal.behaviors.gallery = {
    attach: function (context, settings) {

      //  down arrow click event
      $('.scroll-down').on('click', function(e) {
        e.preventDefault();
        fullpage_api.moveSectionDown();
      });

      var svg = document.querySelector('.image-wrapper svg');
      var anchorList = [];
      var coordList = [];
      var xoordList = [];
      var ycoordList = [];
      var zcoordList = [];

      function windowHeightCheck() {
        if($(window).innerWidth() < 960) {
          columnHeight = $('.part-1.caption').height();
          captionHeight = $('.part-1.caption .inner').height();
          heightDifference = (columnHeight - captionHeight - 70).toFixed(0);
          if (heightDifference <= 0) {
            $('.part-1.caption').addClass('height-fix');
          }
          else {
            $('.part-1.caption').removeClass('height-fix');
          }
        }
      }

      // Initialize the first section to trigger correct first scroll animation
      $( document ).ready(function() {

        //  set class if first caption is too large
        windowHeightCheck();
        $(window).on('resize', function(){
          windowHeightCheck();
        });

        // Add each data-anchor to an array for fullpage.js
        $('div[data-anchor]').each(function(idx, el){
          anchorList.push($(this).attr('data-anchor'));
        });

        // Add each coordinate to an array
        $('div[data-coordinates]').each(function(idx, el){
          let coordHolder = $(this).attr('data-coordinates');

          let n = coordHolder.search('([^\s]+)');
          console.log(n);

          coordList.push($(this).attr('data-coordinates'));
          //xcoordList.push();
          //ycoordList.push();
          //zcoordList.push();
        });
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
      console.log('new');
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


          onLeave: function(origin, destination, direction) {
            var params = {
              origin: origin,
              destination:destination,
              direction: direction
            };
            if((destination.anchor !== 'references') && (destination.anchor !== 'footer') && (destination.anchor !== 'notes') && (destination.section !== 'static')) {
              if(coordList[destination.index]) {
                var parseCoords = coordList[destination.index];
                gallery.to(svg, {
                  attr: {
                    viewBox: coordList[destination.index]
                  }
                });
              }
              $('.image-wrapper svg').css('opacity', 1);
            } else {
              $('.image-wrapper svg').css('opacity', 0);
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
