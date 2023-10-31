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
      const vcReactionBtn = document.querySelector('.vc-reaction-bar__emojis-button');
      const vcReactionEmojis = document.querySelector('.vc-reaction-bar__emojis-dropdown');

      if (vcReactionEmojis) {
        vcReactionBtn.addEventListener('click', function () {
          const expanded = this.getAttribute('aria-expanded') === 'true' || false;
          this.setAttribute('aria-expanded', !expanded);
          vcReactionEmojis.hidden = !vcReactionEmojis.hidden;

          // On `esc` press hide open `vcReactionEmojis`
          document.addEventListener('keyup', (e) => {
            if (!vcReactionEmojis.hidden) {
              const key = e.key || e.keyCode;
              if (key === 'Escape' || key === 'Esc' || key === 27) {
                vcReactionBtn.setAttribute('aria-expanded', 'false');
                vcReactionEmojis.hidden = true;
              }
            }
          });

          // Close `vcReactionEmojis` when mouseup outside of elements
          document.addEventListener('mouseup', function (e) {
            if (!e.target.closest('.vc-reaction-bar__emojis-button') && !e.target.closest('.vc-reaction-bar__emojis-dropdown')) {
              vcReactionBtn.setAttribute('aria-expanded', 'false');
              vcReactionEmojis.hidden = true;
            }
          }, false);
        });
      }

    }
  };
})(jQuery, Drupal);
