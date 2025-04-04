$(document).ready(function ($) {

    $(document).on("scroll", onScroll);

    // active item
    $('#styleguide-menu a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('#styleguide-menu a[href^="#"]').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');

        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top + 2
        }, 400, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });

    function onScroll(event){
        var scrollPos = $(document).scrollTop();
        $('#styleguide-menu > ul.menu > li > ul li a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('#styleguide-menu > ul.menu > li > ul li a').removeClass("active");
                currLink.addClass("active");
            }
            else{
                currLink.removeClass("active");
            }
        });
    }

});
