/**
 * @file
 * Ribbon nav user interactions.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {
  function init(toggler, menu) {
    // When javascript is enabled, set the height to 0, collapsed menu.
    menu.style.height = "0";
    toggler.setAttribute('aria-expanded', 'false');
    menu.classList.add('facet-dropdown-items--collapsed');
    toggler.setAttribute('aria-controls', menu.getAttribute('id'));
  }

  function collapseSection(element) {
    // Get the height of the element's inner content,
    // regardless of its actual size.
    var sectionHeight = element.scrollHeight;

    // Temporarily disable all css transitions.
    var elementTransition = element.style.transition;
    element.style.transition = '';

    // On the next frame (as soon as the previous style change has taken
    // effect), explicitly set the element's height to its current pixel height,
    // so we aren't transitioning out of 'auto'.
    return requestAnimationFrame(function() {
      element.style.height = sectionHeight + 'px';
      element.style.transition = elementTransition;

      // On the next frame (as soon as the previous style change has taken
      // effect), have the element transition to height: 0.
      return requestAnimationFrame(function() {
        element.style.height = 0;
      });
    });
  }

  function expandSection(element) {
    // Get the height of the element's inner content,
    // regardless of its actual size.
    var sectionHeight = element.scrollHeight;

    // Have the element transition to the height of its inner content.
    element.style.height = sectionHeight + 'px';
  }

  function toggleMenu() {
    var expanded = this.getAttribute('aria-expanded');
    var menu = this.parentElement.querySelector('[data-drupal-selector="facet-dropdown-items"]');

    if (expanded === 'false') {
      this.setAttribute('aria-expanded', 'true');
      menu.classList.remove('facet-dropdown-items--collapsed');
      expandSection(menu);
    } else {
      this.setAttribute('aria-expanded', 'false');
      collapseSection(menu);
    }
  }

  function toggleVisibility(event) {
    if (event.propertyName === 'height') {
      // Waiting for drop-down to fully collapse before hiding the items.
      // Avoid hiding items if menu is still open (when user use double-click).
      if (this.previousElementSibling.getAttribute('aria-expanded') === 'false') {
        this.classList.add('facet-dropdown-items--collapsed');
      }
    }
  }

  function findCheckedFacetFilter() {
    $('.block-facet--checkbox').each(function() {
      // search for checkbox that are already checked (in order to keep the dropdown open)
      var checkboxFound = this.querySelectorAll('input[type="checkbox"]:checked').length > 0;
      if (checkboxFound) {
        this.querySelector('.facet-dropdown-toggle').click();
      }    
    });
  }

  Drupal.behaviors.facetDropdownToggler = {
    attach: function (context) {
      if (context.className === 'block-facet--checkbox' || context.nodeName === '#document') {
        var toggler = context.querySelectorAll(
          '[data-drupal-selector="facet-dropdown-toggle"]'
        );
        var menu = context.querySelectorAll('[data-drupal-selector="facet-dropdown-items"]');
        // The template doesn't have the aria-expanded attribute, so we can
        // use that as a proxy for the first run.
        if (menu.length > 0 && toggler && toggler[0].getAttribute('aria-expanded') === null) {
          for (i = 0; i < toggler.length; i++) {
            // Only create dropdown to facets that have options to choose from.
            if (menu[i]) {
              init(toggler[i], menu[i]);
              toggler[i].addEventListener('click', toggleMenu);
              menu[i].addEventListener('transitionend', toggleVisibility);
            }
          }
        }
      }

      // This javascript runs before facets finished running its own javascript (which create the checkboxes)
      setTimeout(function() {
        findCheckedFacetFilter();
      }, 500);

      // Apply Chosen on the sort-by select box.
      $('.joe__search-bar .form-item-sort-by .form-select').chosen( {disable_search: true} );

      // On narrow screens hide all filters and expose them when clicking on a button.
      var filterTrigger = $('.joe__filters--trigger');
      var filters = $('.joe__filters');
      
      // Opens and closes filter drawer. 
      filterTrigger.click(function() {
        if ($(window).width() < 900) {
          // Unfocus on the dropdown
          $(this).blur();
          // add a class to the sibling dropdown
          $(this).toggleClass('is-active');
          // Only open this trigger's filters.
          $(this).siblings('.joe__filters').slideToggle(300);
        }
      });

      // Set the filters back to open when over 900px.
      if (filters.length) {
        $(window).on('resize', function () {
          if ($(this).width() > 900) {
            // Remove style from all filters.
            filters.removeAttr('style');
          }
        });
      }
    }
  };
})(jQuery, Drupal);
