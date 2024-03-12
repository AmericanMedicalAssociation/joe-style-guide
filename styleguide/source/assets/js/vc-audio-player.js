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
  Drupal.behaviors.vc_audio_player = {
    attach: function (context, settings) {
      const audioButtons = document.querySelectorAll(
        ".vc-audio-player__button"
      );

      if (audioButtons) {
        audioButtons.forEach((e) => {
          const audioPlayer = e.previousElementSibling;

          e.addEventListener("click", () => {
            // Pause audio if playing
            if (audioPlayer.duration > 0 && !audioPlayer.paused) {
              audioPlayer.pause();
              e.setAttribute("aria-pressed", "false");
              // Play Audio if paused
            } else {
              audioPlayer.play();
              e.setAttribute("aria-pressed", "true");
            }
          });

          // Reset player when audio has ended
          audioPlayer.addEventListener("ended", function () {
            audioPlayer.currentTime = 0;
            e.setAttribute("aria-pressed", "false");
          });
        });
      }
    },
  };
})(jQuery, Drupal);
