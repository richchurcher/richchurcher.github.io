// Vanilla JavaScript challenge: write Tic Tac Toe without consulting a reference 
// (other than MDN for syntax.)
var makeMove = function(e) {
    e.toElement.classList.add("o");
}

document.addEventListener("DOMContentLoaded", function(event) { 
/*    document.getElementById("tictactoe").addEventListener("click", function () {
        document.body.classList.toggle("left-active");
        document.body.classList.remove("top-active", "right-active");
    });
    document.getElementById("eda").addEventListener("click", function () {
        document.body.classList.toggle("top-active");
        document.body.classList.remove("left-active", "right-active");
    });
    document.getElementById("tech").addEventListener("click", function () {
        document.body.classList.toggle("right-active");
        document.body.classList.remove("left-active", "top-active");
    });
*/
    var squares = document.getElementsByTagName("td");
    for (var i=0;i<squares.length;i++) {
        squares[i].addEventListener("click", makeMove);
    }
});
