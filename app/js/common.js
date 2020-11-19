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
})();
