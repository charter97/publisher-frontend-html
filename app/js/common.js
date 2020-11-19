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

})();
