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
  Drupal.behaviors.vc_featured_audio = {
    attach: function (context, settings) {

      // Audio Visualizer - https://codepen.io/enjikaka/pen/QbJmRJ
      const $ = (q) => document.querySelector(q);
      const audio = $(".vc-featured-audio__player audio");
      const audioContext = new AudioContext();
      const source = audioContext.createMediaElementSource(audio);
      const analyser = audioContext.createAnalyser();

      source.connect(analyser);
      analyser.connect(audioContext.destination);
      analyser.fftSize = 1024;

      const bufferLength = analyser.frequencyBinCount;
      const frequencyData = new Uint8Array(bufferLength);

      const bars = [];

      for (let i = 1; i <= 128; i++) {
        bars.push(document.getElementById("bar-" + i));
      }

      const MusicVisuals = {
        rafId: null,
        start() {
          analyser.getByteFrequencyData(frequencyData);

          let barcc = 0;
          const numberOfBars = 128;

          for (let increment = -1; increment < numberOfBars * 2; increment += 2) {
            const y = frequencyData[increment];

            barcc++;

            if (barcc > numberOfBars) {
              barcc = 0;
            }

            const bar = bars[barcc];

            if (bar) {
              bar.style.transform = `translateZ(0) translateY(${225 - y}px)`;
            }
          }

          MusicVisuals.rafId = requestAnimationFrame(MusicVisuals.start);
        },
        stop() {
          cancelAnimationFrame(MusicVisuals.rafId);
        }
      };

      $("audio").addEventListener("play", () => {
        audioContext.resume();
        audio
          .play()
          .then(() => { })
          .catch(() => {
            audio.pause();
            $(".vc-featured-audio__player p").innerHTML +=
              "<br><br><strong>Autoplay was blocked. Press play below to play!</strong>";
          });

        MusicVisuals.start();
      });

      $("audio").addEventListener("pause", () => {
        for (let i = 0; i < bars.length; i++) {
          if (bars[i]) {
            bars[i].style.transform = null;
          }
        }

        MusicVisuals.stop();
      });

      $("audio").addEventListener("ended", () => {
        MusicVisuals.stop();
      });
    }
  };
})(jQuery, Drupal);
