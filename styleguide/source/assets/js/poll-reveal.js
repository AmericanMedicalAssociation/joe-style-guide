/**
 * @file
 * Poll Reveal interactions.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {
  Drupal.behaviors.pollReveal = {
    attach: function (context, settings) {
      // Opens and closes results. 
      $(document).ready(function () {
        $('.joe__poll__reveal').unbind('click').bind('click', (function (event) {
        console.log('test');
        // Prevents the default event behavior (ie: click).
        event.preventDefault();
        // Prevents the event from propagating (ie: "bubbling").
        event.stopPropagation();
        // Unfocus on the dropdown
        $(this).blur();
        // add a class to the sibling dropdown  
        $(this).parents('.joe__poll__answers').toggleClass('is-open');
        $(this).toggleClass('is-active');
      }));
    });
   }
  }
})(jQuery, Drupal);

// (function ($, Drupal) {
//   Drupal.behaviors.pollReveal = {
//     attach: function (context, settings) {
//  
//       $('.joe__poll__reveal', context).once('pollReveal').unbind('click').bind('click', (function (event) {
//           console.log('test');
//           // Prevents the default event behavior (ie: click).
//           event.preventDefault();
//           // Prevents the event from propagating (ie: "bubbling").
//           event.stopPropagation();
//           // Unfocus on the dropdown
//           $(this).blur();
//           // add a class to the sibling dropdown  
//           $(this).parents('.joe__poll__answers').toggleClass('is-open');
//           $(this).toggleClass('is-active');
//         }));
//     }
//   }
// })(jQuery, Drupal);