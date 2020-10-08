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
});