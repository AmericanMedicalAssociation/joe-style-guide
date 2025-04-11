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
  Drupal.behaviors.resourceToolips = {
    attach: function () {
      // Separates the sup tags that have multiple numbers into individual sup tags
      $('article sup, aside sup').each(function ()  {
        var $sup = $(this);
        // Get the text inside the <sup> tag
        var supText = $sup.text().trim();
        if (supText.indexOf(',') > -1) {
          $sup.replaceWith($sup.text().split(',').map(function (el, i) {
            // If the sup number is the last one it should not have a comma after it
            return $sup.text().split(',').length - 1 !== i ? '<sup>' + el + ', </sup>' : '<sup>' + el + '</sup>'
          }));
        }
      });

      // Create and add tooltips to the sup tags
      $('article sup, aside sup').each(function () {
        var $sup = $(this);
        // Get the text inside the <sup> tag
        var supText = $sup.text().trim();

        // Check if supText is not empty or null
        if (!supText) {
          return;
        }

        // Find the <sup> tag number and convert it into an integer
        var $supNumber = parseInt(supText) - 1;

        // Add tabindex and aria attributes to the <sup> tag for navigation and screen readers
        $sup.attr({
          'tabindex': '0',
          'aria-label': 'Footnote Link ' + supText,
          'aria-describedby': 'reference-' + $supNumber
        });

        // Take <sup> number and use it to get the reference
        var $lists = $('.joe__references__list');
        var $reference = $lists.length > 1 ? $lists.eq(1).find('li').eq($supNumber) : $lists.eq(0).find('li').eq($supNumber);

        // Create a unique id for each reference
        var $referenceId = 'reference-' + $supNumber;

        // Prevent the function from cloning the reference more than once
        if (!$sup.find('.ama__tooltip').length) {
          // Append the reference to the <sup> tag
          var tooltipContent = $reference.html() || 'Reference not found.';
          $sup.append('<div id="' + $referenceId + '" class="ama__tooltip">' + tooltipContent + '</div>');
        }
      });
    }
  };
})(jQuery, Drupal);
