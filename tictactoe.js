// Vanilla JavaScript challenge: write Tic Tac Toe without consulting a reference 
// (other than MDN for syntax.)

// Helper: compare two boards for presence of win condition.
// Assumes both are single-dimension.
//
// win: represents a win condition
// current: represents the current board
//
// (In other words, all of win must be present in current,
// but win != current.)
var checkBoards = function(win, current) {
    if (win.length != current.length) {
        return false;
    }
    for (var i=0;i<win.length;i++) {
        // For every 1...
        if (win[i]) {
            // ...check for a corresponding 1.
            if (current[i]) {
                continue;
            } else {
                return false;
            }
        } 
    }
    return true;
}

// Build an array representing the board for one player
var boardMap = function(squares, player) {
    var board = [];
    for (var i=0;i<squares.length;i++) {
        if (squares[i].classList.contains(player)) {
            board[i] = 1;
        } else {
            board[i] = 0;
        }
    }
    return board;
}

// Look for row, column, or diagonal win.
var checkWinCondition = function(player) {
    var squares = document.getElementsByClassName("square");
    var board = boardMap(squares, player);
    var r1 = [   
        1,1,1,
        0,0,0,
        0,0,0     
    ];
    var r2 = [
        0,0,0,
        1,1,1,
        0,0,0
    ];
    var r3 = [
        0,0,0,
        0,0,0,
        1,1,1
    ];
    var c1 = [
        1,0,0,
        1,0,0,
        1,0,0
    ];
    var c2 = [
        0,1,0,
        0,1,0,
        0,1,0
    ];
    var c3 = [
        0,0,1,
        0,0,1,
        0,0,1
    ];
    var d1 = [
        1,0,0,
        0,1,0,
        0,0,1
    ];
    var d2 = [
        0,0,1,
        0,1,0,
        1,0,0
    ];
    var winConditions = [r1, r2, r3, c1, c2, c3, d1, d2];
    for (var i=0;i<winConditions.length;i++) {
        if (checkBoards(winConditions[i], board)) {
            document.getElementById("gameMessages").innerHTML =  
                "<img src='img/" + player + ".png' class='win'> wins!";
            endGame();
        }
    }
}

var browserMove = function() {
    var squares = document.getElementsByClassName("square");
    var emptySquares = [];

    // Build an array of empty squares
    for (var i=0;i<squares.length;i++) {
        if (squares[i].classList.contains("x") ||
            squares[i].classList.contains("o")) {
            continue;
        } else {
            emptySquares.push(i);
        }
    }
    if (emptySquares.length === 0) {
        // No more moves
        return false;
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    var move = Math.floor(Math.random() * emptySquares.length);
    var i = emptySquares[move];
    squares[i].classList.add("x");

    checkWinCondition("x");
    return true;
}

// Remove event listeners to prevent moves being made after a win condition
var endGame = function() {
    var squares = document.getElementsByClassName("square");
    for (var i=0;i<squares.length;i++) {
        squares[i].removeEventListener("click", makeMove);
    }
}

// Player moves. Player is always "o".
var makeMove = function(e) {
    // Only add class if empty square
    if (e.toElement.classList.contains("x") ||
        e.toElement.classList.contains("o")) {
        return;
    }
    e.toElement.classList.add("o");
    checkWinCondition("o");
    if (!browserMove()) {
        document.getElementById("gameMessages").innerHTML = "No more moves!";
        endGame();
    }
}

document.addEventListener("DOMContentLoaded", function(event) { 
    var squares = document.getElementsByClassName("square");
    for (var i=0;i<squares.length;i++) {
        squares[i].addEventListener("click", makeMove);
    }
});
