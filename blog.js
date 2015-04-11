$.ajax({
    type: "GET",
    url: "http://www.richchurcher.com/post/",
    contentType: "application/json",
    //data: JSON.stringify({
        //name: "Tricia",
        //age: 37
    //}),
    //dataType: "text",
    success: function( response ){
        $( "#putResponse" ).text( response );
    },
    error: function( error ){
        // Log any error.
        console.log( "ERROR:", error );
    },
    complete: function(){
        //makeDELETERequest();
    }
});
