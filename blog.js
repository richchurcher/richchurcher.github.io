$.get( "www.richchurcher.com/post/", function (response) {
    $.each( response, function (i, v) {
        $( "#getResponse" ).append( JSON.stringify( v, null, 4 ) );
    });
}, 'json');

$.post( "www.richchurcher.com/post/create", JSON.stringify({
    title: "New Post",
    body: "This is the new post.",
    tags: ["one", "two", "three"],
}), function (response) {
    $( "#createResponse" ).text( JSON.stringify( response, null, 4 ) );
}, 'json');

$.ajax({
    method: "PUT",
    contentType: "application/json",
    dataType: "json",
    url: "www.richchurcher.com/post/update/5142291060621312",
    data: JSON.stringify({
        title: "Updated Post",
        body: "Updated body.",
        tags: ["to", "new", "ones"],
    }),
    success: function (response) {
        $( "#updateResponse" ).append( JSON.stringify( response, null, 4 ) );
    },
    complete: function (response) {
        $( "#updateResponse" ).append( JSON.stringify( response, null, 4 ) );
    },
});

