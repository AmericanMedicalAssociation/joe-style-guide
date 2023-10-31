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
  Drupal.behaviors.vc_reaction_bar = {
    attach: function (context, settings) {

      // Global variables
      const vcReactionBtn = document.querySelectorAll('.vc-reaction-bar__emojis-button');
      const vcReactionEmojis = document.querySelectorAll('.vc-reaction-bar__emojis-dropdown');

      if (vcReactionEmojis) {
        vcReactionBtn.forEach(e => {
          e.addEventListener('click', function () {
            const expanded = e.getAttribute('aria-expanded') === 'true' || false;
            e.setAttribute('aria-expanded', !expanded);
            e.nextElementSibling.hidden = !e.nextElementSibling.hidden;
          });
        });

        // On `esc` press hide open `vcReactionEmojis`
        document.addEventListener('keyup', (e) => {
          vcReactionEmojis.forEach(emoji => {
            if (!emoji.hidden) {
              const key = e.key || e.keyCode;
              if (key === 'Escape' || key === 'Esc' || key === 27) {
                emoji.hidden = true;
                emoji.previousElementSibling.setAttribute('aria-expanded', 'false');
              }
            }
          });
        });

        // Close `vcReactionEmojis` when mouseup outside of elements
        document.addEventListener('mouseup', function (e) {
          if (!e.target.closest('.vc-reaction-bar__emojis-button') && !e.target.closest('.vc-reaction-bar__emojis-dropdown')) {
            vcReactionBtn.forEach(e => {
              e.setAttribute('aria-expanded', 'false');
              e.nextElementSibling.hidden = true;
            });
          }
        }, false);
      }
    }
  };
})(jQuery, Drupal);
