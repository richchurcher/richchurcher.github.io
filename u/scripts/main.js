$(document).ready(function () {

  // Section scrolling
  $('#register-link a, #down a').click(function(){
      var href = $.attr(this, 'href');
      $('html, body').animate({
          scrollTop: $(href).offset().top
      }, 500, function () {
        window.location.hash = href;
      });
      return false;
  });

});
