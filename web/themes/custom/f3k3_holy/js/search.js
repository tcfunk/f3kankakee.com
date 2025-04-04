/**
 * @file
 * Suport for collapse search block.
 */

 jQuery(document).ready(function ($) {
  $("#header .block-search .form-submit").click(function (e) {
    if (window.innerWidth > 768) {
      if ($('#header').hasClass('search-open')) {
        $("#header").removeClass("search-open");
      } else {
        $("#header").addClass("search-open");
        e.preventDefault();
      }
    }
  });

  $("#header .block-search .close-search").click(function () {
      $("#header").removeClass("search-open");
  });
});
