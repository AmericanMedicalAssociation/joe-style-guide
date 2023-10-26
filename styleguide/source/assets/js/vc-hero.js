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
  Drupal.behaviors.vc_hero_art = {
    attach: function (context, settings) {

      // Global header variables
      const vcToolBtn = document.querySelector('.vc-hero__tool-button');
      const vcToolContent = document.querySelector('.vc-hero__tool-content');

      if (vcToolContent) {
        vcToolBtn.addEventListener('click', function () {
          const expanded = this.getAttribute('aria-expanded') === 'true' || false;
          this.setAttribute('aria-expanded', !expanded);
          vcToolContent.hidden = !vcToolContent.hidden;

          document.addEventListener('click', function (e) {
            if (vcToolBtn !== e.target) {
              vcToolContent.hidden = true;
            }
          });
        });
      }
    }
  };
})(jQuery, Drupal);
