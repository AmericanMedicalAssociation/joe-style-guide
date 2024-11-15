(function ($, Drupal) {
  Drupal.behaviors.vc_video_tabs = {
    attach: function (context, settings) {
      const videoTabsGroups = document.querySelectorAll('.vc-video-tabs__group');

      if (!NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
      }

      videoTabsGroups.forEach((videoTabs) => {
        const panels = videoTabs.querySelectorAll('[id^="section"]');

        // Helper function to adjust iframe aspect ratio for mobile
        const adjustIframeAspectRatio = () => {
          panels.forEach(panel => {
            const iframe = panel.querySelector('iframe');
            if (iframe) {
              const containerWidth = iframe.parentNode.clientWidth;
              iframe.style.width = '100%';
              iframe.style.height = `${containerWidth * 9 / 16}px`; // Set height to maintain 16:9 ratio
            }
          });
        };

        // Initial adjustment and set up event listeners for mobile
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        if (isMobile) {
          adjustIframeAspectRatio();
          window.addEventListener('resize', adjustIframeAspectRatio);
          window.addEventListener('orientationchange', adjustIframeAspectRatio);
        }

        // Desktop tabs functionality (unchanged from previous solutions)
        const tablist = videoTabs.querySelector('ul');
        const tabs = tablist.querySelectorAll('a');
        
        const switchTab = (oldTab, newTab) => {
          setTimeout(() => newTab.focus(), 0);
          newTab.removeAttribute('tabindex');
          newTab.setAttribute('aria-selected', 'true');
          oldTab.removeAttribute('aria-selected');
          oldTab.setAttribute('tabindex', '-1');
          const index = Array.prototype.indexOf.call(tabs, newTab);
          const oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
          panels[oldIndex].hidden = true;
          panels[index].hidden = false;
          adjustIframeAspectRatio();
        };

        tablist.setAttribute('role', 'tablist');

        tabs.forEach((tab, i) => {
          tab.setAttribute('role', 'tab');
          tab.setAttribute('id', `tab-${i + 1}`);
          tab.setAttribute('tabindex', '-1');
          tab.parentNode.setAttribute('role', 'presentation');
          tab.addEventListener('click', (e) => {
            e.preventDefault();
            const currentTab = tablist.querySelector('[aria-selected="true"]');
            if (e.currentTarget !== currentTab) {
              switchTab(currentTab, e.currentTarget);
            }
          });
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

        panels.forEach((panel, i) => {
          panel.setAttribute('role', 'tabpanel');
          panel.setAttribute('tabindex', '-1');
          panel.setAttribute('aria-labelledby', tabs[i].id);
          panel.hidden = true;
        });

        tabs[0].removeAttribute('tabindex');
        tabs[0].setAttribute('aria-selected', 'true');
        panels[0].hidden = false;
      });
    }
  };
})(jQuery, Drupal);
