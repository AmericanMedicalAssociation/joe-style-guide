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
      $('article sup, aside sup').each(function(){
        var $sup = $(this);
        var supText = $sup.text().trim();
        if (supText.indexOf(',') > -1) {
          $sup.replaceWith($sup.text().split(',').map(function(el, i) {
            // If the sup number is the last one it should not have a comma after it
            return $sup.text().split(',').length - 1 !== i ? '<sup>' + el + ', </sup>' : '<sup>' + el + '</sup>'
          }));
        }
      });
      // Sup on hover connect it to the references
      $('article sup, aside sup').hover(function() {
          // Find the <sup> tag number and convert it into an integer
          var $supNumber = parseInt($(this).text()) - 1;
          // Take <sup> number and use it to get the reference
          var $reference = $('.joe__references__list li').eq($supNumber);
          // Prevent the hover function from cloning the reference more than once
          if(!$(this).find('.ama__tooltip').length){
            // Append a div with the reference to the <sup>
            if($reference.html() === undefined) {
              $(this).append('<div class="ama__tooltip">Reference not found.</div>');
              // Show the reference tooltip
              $(this).children('.ama__tooltip').fadeIn()
            } else {
              $(this).append('<div class="ama__tooltip">' + $reference.html() + '</div>');
              // Show the reference tooltip
              $(this).children('.ama__tooltip').fadeIn()
            }
          } else {
            $(this).find('.ama__tooltip').fadeIn();
          }
        }, function() {
          // Hide reference tooltip
          $(this).find('.ama__tooltip').fadeOut();
        }
      );
    }
  };
})(jQuery, Drupal);


