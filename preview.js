$(function () {
    
    $('li').on('mouseover', function() {
        $(this).children('figure').eq(0).fadeIn(100);
    });

    $('li').on('mouseout', function() {
        $(this).children('figure').eq(0).fadeOut(100);
    });

});
