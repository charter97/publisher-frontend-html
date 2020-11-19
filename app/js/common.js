(function () {
    'use strict';

    $("#btn-category").click(function () {
        $(this)
            .toggleClass('icon-down-open icon-up-open')
            .parent()
            .find('ul')
            .toggleClass('category-open');
    });

    $("#btn-search-hide").click(function(){
        $("#frm-search").hide();
    });

    $("#btn-search-show").click(function(){
        $("#frm-search").show();
    });

    $('.partners').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        autoplay: true,
        draggable: false,
        responsive: [
            {
                breakpoint: 979,
                settings: { slidesToShow: 4 }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 3 }
            }
        ]
    });

    $(window).scroll(function () {
        let top = $(window).scrollTop();
        if (top > 100) {
            $('#btn-scroll').show();
        } else {
            $('#btn-scroll').hide();
        }
    });

    $('#btn-scroll').click(function () {
        $("html, body").animate({scrollTop: 0}, 600);
        return false;
    });
})();
