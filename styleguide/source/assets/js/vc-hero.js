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

          // On `esc` press hide open `vcToolContent`
          document.addEventListener('keyup', (e) => {
            if (!vcToolContent.hidden) {
              const key = e.key || e.keyCode;
              if (key === 'Escape' || key === 'Esc' || key === 27) {
                vcToolBtn.setAttribute('aria-expanded', 'false');
                vcToolContent.hidden = true;
              }
            }
          });

          // Close `vcToolContent` when mouseup outside of elements
          document.addEventListener('mouseup', function (e) {
            if (!e.target.closest('.vc-hero__tool-content') && !e.target.closest('.vc-hero__tool-button')) {
              vcToolBtn.setAttribute('aria-expanded', 'false');
              vcToolContent.hidden = true;
            }
          }, false);
        });
      }

      // Art of Medicine flip bg shapes
      const vcArtShapes = document.querySelector('.vc-art__bg-shapes');

      if (vcArtShapes) {
        const vcArtHeader = document.querySelector('.vc-hero-art');

        if (vcArtHeader.classList.contains('vc-hero-art--text-right')) {
          vcArtShapes.classList.add('flip');
        }
      }
    }
  };
})(jQuery, Drupal);
