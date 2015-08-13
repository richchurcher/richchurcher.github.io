$(document).ready(function () {

  // Section scrolling
  $('#register-link a, #down a').click(function () {
    var href = $.attr(this, 'href');
    $('html, body').animate({
      scrollTop: $(href).offset().top
    }, 500, function () {
      window.location.hash = href;
    });
    return false;
  });

  $('select[name="country"]').change(function () {
    var display = 'none';
    if ($(this).val() === 'nz') {
      display = 'inline';
    }
    $('#city').css('display', display);
  });

  $('select[name="tickets"]').change(function () {
    var tickets = +($(this).val());
    $('#total-price').html('$' + tickets * 50);
  });
});
