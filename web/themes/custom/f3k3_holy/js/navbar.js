/**
 * @file
 * Suport for menu collapse with navbar icon.
 */

 jQuery(document).ready(function ($) {
  $(".icon-menu").click(function () {
    if ($('body').hasClass('menu-open')) {
      $("body").removeClass("menu-open");
    }
    else {
      $("body").addClass("menu-open");
    }
  });
});
