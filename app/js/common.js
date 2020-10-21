$( function() {
   //Menu List open/hide
   $( "#menuListButton" ).click(function() {
      $('#menuList').toggleClass('menu-list__open');
   });
   //Search open/hide
   $( "#searchIcon" ).click(function() {
      $('#searchWrap').slideDown(500);
   });
   //Search hide
   $( "#searchClose" ).click(function() {
      $('#searchWrap').slideUp(500);
   });
    //Scroll Button
    $(window).scroll(function () {
       var top = $(window).scrollTop();
       if(top > 100) {
         $('#scrollButton').show(500);
       }
       else {
         $('#scrollButton').hide(500);
       }
   });
   $('#scrollButton').click(function(){
      $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
    
   });
   $('#closeForm').click(function(){
      $(this).parent().parent('#additionalCommentForm').slideUp();
   });

   $('.slider').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      autoplay: true,
      responsive: [
         {
           breakpoint: 979,
           settings: {
             slidesToShow: 3,
           }
         },
         {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          }
        }
       ]
    });

    (function() {
      if (window.pluso)if (typeof window.pluso.start == "function") return;
      if (window.ifpluso==undefined) { window.ifpluso = 1;
        var d = document, s = d.createElement('script'), g = 'getElementsByTagName';
        s.type = 'text/javascript'; s.charset='UTF-8'; s.async = true;
        s.src = ('https:' == window.location.protocol ? 'https' : 'http')  + '://share.pluso.ru/pluso-like.js';
        var h=d[g]('body')[0];
        h.appendChild(s);
      }})();
});