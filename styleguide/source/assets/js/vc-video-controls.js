/**
 * @file
 * Custom JavaScript behavior for handling YouTube players.
 *
 * Uses the YouTube Iframe API to create and manage YouTube players on the page.
 * Pauses all other players when one starts playing.
 */

(function ($, Drupal) {
  Drupal.behaviors.vc_pause_control = {
    attach: function (context, settings) {

      // Store the YouTube players in an array
      var youtubePlayers = [];

      // URL of the YouTube Iframe API script
      var scriptURL = 'https://www.youtube.com/iframe_api';

      // Function to load an external script dynamically
      function loadScript(url, callback) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onload = callback;

        document.head.appendChild(script);
      }

      // Callback function for when the YouTube API script is loaded
      function onYouTubeAPILoaded() {
        // Now that the API is loaded, you can use onYouTubeIframeAPIReady
        onYouTubeIframeAPIReady();
      }

      // Function to initialize YouTube API
      function onYouTubeIframeAPIReady() {
        window.YT.ready(function() {
          // Find all iframes with the specified class
          var iframes = document.querySelectorAll('.youtube-iframe');

          // Create a YouTube player for each iframe and store it in the array
          iframes.forEach(function (iframe) {
            var player = new YT.Player(iframe, {
              events: {
                'onStateChange': onPlayerStateChange
              }
            });
            youtubePlayers.push(player);
          });
        });
      }

      // Function to handle the state change of a YouTube player
      function onPlayerStateChange(event) {
        // If the video is playing pause all other videos
        if (event.data === YT.PlayerState.PLAYING) {
          pauseOtherPlayers(event.target);
        }
      }

      // Function to pause all other YouTube players
      function pauseOtherPlayers(currentPlayer) {
        youtubePlayers.forEach(function (player) {
          if (player !== currentPlayer) {
            player.pauseVideo();
          }
        });
      }

      // Function to play the video in the corresponding tab when a tab link is clicked
      function playVideoInTab(tabHref) {
          // Find the video element associated with the tab href and play the video
          var videoElement = $(tabHref).find('iframe.youtube-iframe');
          if (videoElement.length > 0) {
          var playerId = videoElement.attr('id');
          var player = youtubePlayers.find(function (p) {
              return p.getIframe().id === playerId;
          });
          if (player) {
              player.playVideo();
          }
          }
      }

      // Load the YouTube API script
      loadScript(scriptURL, onYouTubeAPILoaded);

      // Add onclick event for tab link
      $('.vc-video-tabs__group ul a').on('click', function () {
        // Pause all other YouTube players when the tab link is clicked
        pauseOtherPlayers(null); // Pass null to pause all players
      // Get the href attribute from the clicked tab link and call playVideoInTab
      var tabHref = $(this).attr('href');
      playVideoInTab(tabHref);
      });

    },
  };
})(jQuery, Drupal);
