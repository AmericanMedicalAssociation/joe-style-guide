(function ($, Drupal) {
  Drupal.behaviors.audio = {
    attach: function (context, settings) {

      // attach player control
      var audio = document.getElementById("gallery-audio");
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

        // Fade the control button transition
        $('.play-container.paused').fadeOut(500, 'easeOutExpo', function() {
          $('.play-container').removeClass('paused').addClass('playing');
          $('.play-container.playing').fadeIn(300, 'easeInQuad');
        });
      });

      $('.gallery-audio').on('pause', function() {
        $(this).addClass('paused').removeClass('playing');

        // Fade the control button transition
        $('.play-container.playing').fadeOut(500, 'easeOutExpo', function() {
          $('.play-container').removeClass('playing').addClass('paused');
          $('.play-container.paused').fadeIn(300, 'easeInQuad');
        });
      });
    }
  };
})(jQuery, Drupal);
