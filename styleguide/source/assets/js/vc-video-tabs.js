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
  Drupal.behaviors.vc_video_tabs = {
    attach: function (context, settings) {

      // Tabs based on https://inclusive-components.design/videoTabs-interfaces/
      const videoTabs = document.querySelector('.vc-video-tabs__group');

      if (videoTabs) {
        const tablist = videoTabs.querySelector('ul');
        const tabs = tablist.querySelectorAll('a');
        const panels = videoTabs.querySelectorAll('[id^="section"]');

        // The tab switching function
        const switchTab = (oldTab, newTab) => {
          newTab.focus();
          // Make the active tab focusable by the user (Tab key)
          newTab.removeAttribute('tabindex');
          // Set the selected state
          newTab.setAttribute('aria-selected', 'true');
          oldTab.removeAttribute('aria-selected');
          oldTab.setAttribute('tabindex', '-1');

          // Get the indices of the new and old tabs to find the correct
          // tab panels to show and hide
          const index = Array.prototype.indexOf.call(tabs, newTab);
          const oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
          panels[oldIndex].hidden = true;
          panels[index].hidden = false;
        };

        // Add the tablist role to the first <ul> in the .vc-video-tabs__group container
        tablist.setAttribute('role', 'tablist');

        // Add semantics are remove user focusability for each tab
        Array.prototype.forEach.call(tabs, (tab, i) => {
          tab.setAttribute('role', 'tab');
          tab.setAttribute('id', `tab ${i + 1}`);
          tab.setAttribute('tabindex', '-1');
          tab.parentNode.setAttribute('role', 'presentation');

          // Handle clicking of tabs for mouse users
          tab.addEventListener('click', (e) => {
            e.preventDefault();
            const currentTab = tablist.querySelector('[aria-selected]');
            if (e.currentTarget !== currentTab) {
              switchTab(currentTab, e.currentTarget);
            }
          });

          // Handle keydown events for keyboard users
          tab.addEventListener('keydown', (e) => {
            // Get the index of the current tab in the tabs node list
            const index = Array.prototype.indexOf.call(tabs, e.currentTarget);
            // Work out which key the user is pressing and
            // Calculate the new tab's index where appropriate
            const dir = e.which === 37 ? index - 1 : e.which === 39 ? index + 1 : e.which === 40 ? 'down' : null;
            if (dir !== null) {
              e.preventDefault();
              // If the down key is pressed, move focus to the open panel,
              // otherwise switch to the adjacent tab
              return dir === 'down' ? panels[i].focus() : tabs[dir] ? switchTab(e.currentTarget, tabs[dir]) : 'undefined';
            }
          });
        });

        // Add tab panel semantics and hide them all
        Array.prototype.forEach.call(panels, (panel, i) => {
          panel.setAttribute('role', 'tabpanel');
          panel.setAttribute('tabindex', '-1');
          panel.setAttribute('aria-labelledby', tabs[i].id);
          panel.hidden = true;
        });

        // Initially activate the first tab and reveal the first tab panel
        tabs[0].removeAttribute('tabindex');
        tabs[0].setAttribute('aria-selected', 'true');
        panels[0].hidden = false;
      }
    }
  };
})(jQuery, Drupal);
