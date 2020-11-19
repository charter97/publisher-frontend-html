(function () {
    'use strict';

    $("#btn-category").click(function () {
        $(this)
            .toggleClass('icon-down-open icon-up-open')
            .parent()
            .find('ul')
            .toggleClass('category-open');
    });
})();
