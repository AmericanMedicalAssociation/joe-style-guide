/**
 * @file
 * Facets and filters
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */

(function ($, Drupal) {
  Drupal.behaviors.vc_horizontal_gallery = {
    attach: function (context, settings) {
      // Variables
      const horizontalGalleries = $('.vc-horizontal-gallery__items');
      const modalButton = document.querySelectorAll(
        '.vc-horizontal-gallery__artwork'
      );
      const modalArtwork = $('.vc-horizontal-gallery__artwork-items');
      function stopAllPlayers() {
        // Stop all audio players
        $(".jp__player").each(function() {
          $(this).jPlayer("stop");
        });
        // Stop all youtube
        $('.vc-featured-media__video iframe,.youtube-iframe').each(function(){
          this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
        });
      }

      if (modalArtwork) {
        $('.vc-modal').appendTo('body');

        // Gallery slider
        horizontalGalleries.each(function (e) {
          $(this).slick({
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: '5%',
            variableWidth: true,
            speed: 800,
            touchMove: false,
            prevArrow: $(this).parent().find('.slick-prev'),
            nextArrow: $(this).parent().find('.slick-next'),
            responsive: [
              {
                breakpoint: 900,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  variableWidth: false,
                },
              },
            ],
          });

          // Fix for aria-hidden on slick slider for screen reader use
          $(this).on('init afterChange', function(event, slick, currentSlide) {
            setTimeout(function() {
                $('.slick-slide.slick-current').attr('aria-hidden', false);
            }, 100);
          });
        });

        // Artwork slider
        modalArtwork.each(function () {
          $(this).slick({
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: false,
            speed: 0,
            touchMove: false,
            draggable: false,
            swipe: false,
            initialSlide: 0,
            adaptiveHeight: true,
            prevArrow: $(this).parent().find('.slick-prev'),
            nextArrow: $(this).parent().find('.slick-next'),
          });
        });

        // Initate modal
        MicroModal.init({
          onClose: modal => stopAllPlayers(),
        });

        // Open to correct artwork when clicked
        modalButton.forEach((e) => {
          e.addEventListener('click', () => {
            $('.vc-horizontal-gallery__artwork-items').slick(
              'slickGoTo',
              e.dataset.slidenum
            );
            $(".jp__player").each(function(index) {
              stopAllPlayers();
            });
            $('.vc-modal .vc-featured-media').each(function () {
              setTimeout(() => {
                const modalFiguresHeight = $(this)
                  .find('.vc-featured-media__caption')
                  .innerHeight();
                $(this)
                  .find('.vc-featured-media__figure')
                  .css({
                    'padding-top': modalFiguresHeight + 'px',
                  });
                $(this)
                  .find('.vc-button--is-zoomed')
                  .css('top', modalFiguresHeight + 10);
              }, '50');
            });
          });
        });

      }

      $(".slick-prev, .slick-next").on('click', function() {
        stopAllPlayers();
      });

      $(".jp__player").each(function(index) {
        var idPlayer = $(this).attr("id"),
          audioID = $(this).attr("data-audio-id");

        // console.log(idPlayer+" : ");
        // console.log($(this).attr("data-audio-id"));

        $("#"+idPlayer).jPlayer({
          ready: function () {
            var that = this;
            $.ajax({
              url: 'https://html5-player.libsyn.com/embed/getitemdetails',
              type: "GET",
              data : {
                item_id : audioID,
                height : "480",
                autoplay : "false",
                thumbnail : "0",
              },
              success: function(data) {
                //update the embed code
                $(that).jPlayer("setMedia", {
                  mp3: data.download_link // Defines the mp3 url
                });
                $("#"+idPlayer+"-jp_container .vc-audio-player__label").text(data.item_title);
              }
            });

          },
          play: function() {
            // Stop all youtube
            $('.vc-featured-media__video iframe,.youtube-iframe').each(function(){
              this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
            });
            $(this).jPlayer("pauseOthers"); // pause all players except this one.
          },
          cssSelectorAncestor: "#"+idPlayer+"-jp_container",
          supplied: "mp3",
          wmode: "window"
        });
      });

    },
  };
})(jQuery, Drupal);
