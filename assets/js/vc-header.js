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
  Drupal.behaviors.vc_header = {
    attach: function (context, settings) {

      // Global header variables
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const globalHeader = document.querySelector('.vc-header');
      const navsBtn = document.getElementById('vc-header__nav-button');
      const navsDrop = document.getElementById('vc-header-nav');
      const searchBtn = document.getElementById('vc-header__search-button');
      const searchDrop = document.getElementById('vc-header__search');
      const closeDropBtn = document.querySelectorAll('.vc-header__close-dropdown');

      // Function for active and sibling dropdowns
      function headerDropdown(activeBtn, activeDrop, activeClass, siblingBtn, siblingDrop, siblingClass) {
        // Show active dropdown and hide sibling
        const dropdownExpanded = activeBtn.getAttribute('aria-expanded') === 'true' || false;
        activeBtn.setAttribute('aria-expanded', !dropdownExpanded);
        siblingBtn.setAttribute('aria-expanded', 'false');

        // Show or hide dropdown based on `click` context
        if (globalHeader.classList.contains('open-dropdown') && siblingDrop.hidden === true) {
          globalHeader.classList.remove('open-dropdown');
          globalHeader.classList.add(`close-${activeClass}-dropdown`);
        } else {
          globalHeader.classList.remove(`close-${activeClass}-dropdown`, `close-${siblingClass}-dropdown`);
          globalHeader.classList.add('open-dropdown');
        }

        // Toggle switch class if user clicks between navs and search
        if (siblingDrop.hidden === false) {
          globalHeader.classList.add(`switch-to-${activeClass}-dropdown`);
          globalHeader.classList.remove(`switch-to-${siblingClass}-dropdown`);
          siblingDrop.hidden = true;
        } else {
          globalHeader.classList.remove(`switch-to-${activeClass}-dropdown`);
        }

        if (!motionQuery || motionQuery.matches) {
          // No dropdown delay if `prefers-reduced-motion` is enabled
          activeDrop.hidden = !activeDrop.hidden;
        } else {
          activeDrop.hidden = !activeDrop.hidden;
        }
      }

      // Close all elements function
      function closeDropdown() {
        if (navsDrop.hidden === false) {
          // If navs is open
          globalHeader.classList.add('close-navs-dropdown');
          navsBtn.setAttribute('aria-expanded', 'false');
          navsDrop.hidden = true;
        } else if (searchDrop.hidden === false) {
          // If search is open
          globalHeader.classList.add('close-search-dropdown');
          searchBtn.setAttribute('aria-expanded', 'false');
          searchDrop.hidden = true;
        }

        // Reset classes
        globalHeader.classList.remove('open-dropdown', 'switch-to-navs-dropdown', 'switch-to-search-dropdown');
      }

      // If global header is present
      if (globalHeader) {
        // On navs-button click
        navsBtn.addEventListener('click', () => {
          // Show navs and hide search
          headerDropdown(navsBtn, navsDrop, 'navs', searchBtn, searchDrop, 'search');
        });

        // On search-button click
        searchBtn.addEventListener('click', () => {
          // Show search and hide navs
          headerDropdown(searchBtn, searchDrop, 'search', navsBtn, navsDrop, 'navs');
        });

        // Close dropdown on close button click
        closeDropBtn.forEach((e) => {
          e.addEventListener('click', () => {
            closeDropdown();
          });
        });

        // On `esc` press hide open dropdown
        document.addEventListener('keyup', (e) => {
          if (globalHeader.classList.contains('open-dropdown')) {
            const key = e.key || e.keyCode;
            if (key === 'Escape' || key === 'Esc' || key === 27) {
              closeDropdown();
            }
          }
        });

        // Close dropdowns when mouseup outside of elements
        document.addEventListener('mouseup', function (e) {
          if (!e.target.closest('.vc-header__action-button') && !e.target.closest('.vc-header__dropdown')) {
            closeDropdown();
          }
        }, false);
      }
    }
  };
})(jQuery, Drupal);
