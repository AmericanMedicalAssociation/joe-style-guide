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

      // EWLJ-764: Select all tab groups on the page to handle multiple sets of tabs.
      const videoTabsGroups = document.querySelectorAll('.vc-video-tabs__group');

      // EWLJ-764: Check if NodeList.forEach is supported
      if (!NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach; // Polyfill for forEach on NodeList
      }

      // EWLJ-764: Loop through each video tab group and apply tab functionality.
      videoTabsGroups.forEach((videoTabs) => {
        const tablist = videoTabs.querySelector('ul');
        const tabs = tablist.querySelectorAll('a');
        const panels = videoTabs.querySelectorAll('[id^="section"]');

        // EWLJ-764: Helper function to resize iframe videos when tab is activated or page loads
        const resizeIframe = () => {
          panels.forEach(panel => {
            const iframe = panel.querySelector('iframe');
            if (iframe) {
              iframe.style.height = '100%';
              iframe.style.width = '100%';
            }
          });
        };

        // The tab switching function
        const switchTab = (oldTab, newTab) => {
          // EWLJ-764: Prevent focus issues in Safari by adding a small delay on focus
          setTimeout(() => newTab.focus(), 0);

          // Make the active tab focusable by the user (Tab key)
          newTab.removeAttribute('tabindex');
          newTab.setAttribute('aria-selected', 'true');
          oldTab.removeAttribute('aria-selected');
          oldTab.setAttribute('tabindex', '-1');

          // Get the indices of the new and old tabs to find the correct
          // tab panels to show and hide
          const index = Array.prototype.indexOf.call(tabs, newTab);
          const oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
          panels[oldIndex].hidden = true;
          panels[index].hidden = false;

          // EWLJ-764: Resize iframe when tab is activated
          resizeIframe();
        };

        // EWLJ-764: Add the tablist role to the first <ul> in the .vc-video-tabs__group container
        tablist.setAttribute('role', 'tablist');

        // EWLJ-764: Add semantics and remove user focusability for each tab
        tabs.forEach((tab, i) => {
          tab.setAttribute('role', 'tab');
          tab.setAttribute('id', `tab-${i + 1}`); // EWLJ-764: Updated ID format for better uniqueness
          tab.setAttribute('tabindex', '-1');
          tab.parentNode.setAttribute('role', 'presentation');

          // EWLJ-764: Handle clicking of tabs for mouse users
          tab.addEventListener('click', (e) => {
            e.preventDefault();
            const currentTab = tablist.querySelector('[aria-selected="true"]');
            if (e.currentTarget !== currentTab) {
              switchTab(currentTab, e.currentTarget);
            }
          });

          // EWLJ-764: Handle keydown events for keyboard users with cross-browser support
          tab.addEventListener('keydown', (e) => {
            const index = Array.prototype.indexOf.call(tabs, e.currentTarget);
            const dir = e.key === 'ArrowLeft' ? index - 1 : e.key === 'ArrowRight' ? index + 1 : e.key === 'ArrowDown' ? 'down' : null;
            if (dir !== null) {
              e.preventDefault();
              if (dir === 'down') {
                panels[i].focus();
              } else if (tabs[dir]) {
                switchTab(e.currentTarget, tabs[dir]);
              }
            }
          });
        });

        // EWLJ-764: Add tab panel semantics and hide them all initially
        panels.forEach((panel, i) => {
          panel.setAttribute('role', 'tabpanel');
          panel.setAttribute('tabindex', '-1');
          panel.setAttribute('aria-labelledby', tabs[i].id);
          panel.hidden = true;
        });

        // EWLJ-764: Initially activate the first tab and reveal the first tab panel
        tabs[0].removeAttribute('tabindex');
        tabs[0].setAttribute('aria-selected', 'true');
        panels[0].hidden = false;
        
        // EWLJ-764: Trigger resize after the first load to ensure the correct aspect ratio
        window.addEventListener('load', resizeIframe);

        // EWLJ-764: Trigger resize on window resize to handle changes in viewport dimensions
        window.addEventListener('resize', resizeIframe);
      });
    }
  };
})(jQuery, Drupal);
