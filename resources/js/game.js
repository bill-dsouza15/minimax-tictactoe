$(function () {
  var human, computer;
  var clickEnabled = true;

  var round;
  var humanScore = 0;
  var computerScore = 0;
  var tieScore = 0;

  var board = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"]
  ];

  $(document).ready(function () {
    // Set round number
    round = parseInt(localStorage.getItem("rounds"));
    $("#round-label").text("Round " + round);

    // Fetch and display the scores
    humanScore = parseInt(localStorage.getItem("hScore") == null ? 0 : localStorage.getItem("hScore"));
    $("#human-score-lbl").text(humanScore);
    tieScore = parseInt(localStorage.getItem("tScore") == null ? 0 : localStorage.getItem("tScore"));
    $("#tie-score-lbl").text(tieScore);
    computerScore = parseInt(localStorage.getItem("cScore") == null ? 0 : localStorage.getItem("cScore"));
    $("#bot-score-lbl").text(computerScore);

    // Set human and computer symbols
    human = localStorage.getItem("human");
    computer = localStorage.getItem("computer");

    // If human is null then let computer take over
    if (human == null || human == "") {
      human = "O";
      computer = "X";
    }

    // If computer is X then let it take over
    if (computer === "X") {
      // Next is computer's turn
      $("#player-turn").text("Computer's turn!");

      // Disable user click
      clickEnabled = false;

      // Computer makes a move after 1 second for a more realistic feel
      setTimeout(function () {
        computerMove();
      }, 1000);
    }
  });

  // Function to add X or O to board array based on id of clicked td
  function addToBoard(player, id) {
    if (id == 1) board[0][0] = player;
    else if (id == 2) board[0][1] = player;
    else if (id == 3) board[0][2] = player;
    else if (id == 4) board[1][0] = player;
    else if (id == 5) board[1][1] = player;
    else if (id == 6) board[1][2] = player;
    else if (id == 7) board[2][0] = player;
    else if (id == 8) board[2][1] = player;
    else if (id == 9) board[2][2] = player;
  }

  // Function to get id of tf based on row and column of board array
  function getId(x, y) {
    if (x == 0 && y == 0) return 1;
    else if (x == 0 && y == 1) return 2;
    else if (x == 0 && y == 2) return 3;
    else if (x == 1 && y == 0) return 4;
    else if (x == 1 && y == 1) return 5;
    else if (x == 1 && y == 2) return 6;
    else if (x == 2 && y == 0) return 7;
    else if (x == 2 && y == 1) return 8;
    else if (x == 2 && y == 2) return 9;
  }

  // Function to check if moves are left
  function isMovesLeft() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "-") {
          return true;
        }
      }
    }
    return false;
  }

  // Function to evaluate board score
  function evaluateBoard() {
    // Check the rows for X or O victory
    for (let i = 0; i < 3; i++) {
      if (board[i][0] == board[i][1] && board[i][1] == board[i][2]) {
        if (board[i][0] == computer)
          return 10;
        else if (board[i][0] == human)
          return -10;
      }
    }

    // Checking for columns for X or O victory
    for (let j = 0; j < 3; j++) {
      if (board[0][j] == board[1][j] && board[1][j] == board[2][j]) {
        if (board[0][j] == computer)
          return 10;
        else if (board[0][j] == human)
          return -10;
      }
    }

    // Checking the diagonals for X or O victory
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
      if (board[0][0] == computer)
        return 10;
      else if (board[0][0] == human)
        return -10;
    }

    if (board[0][2] == board[1][1] && board[1][1] == board[2][0]) {
      if (board[0][2] == computer)
        return 10;
      else if (board[0][2] == human)
        return -10;
    }

    // Else if none of them have won then return 0
    return 0;
  }

  // Function to check the status of the board
  function checkBoardStatus() {
    var value = evaluateBoard();
    var settings = {
      title: "Match Over!",
      confirmButtonText: "Next match",
      confirmButtonColor: "green",
      showDenyButton: true,
      denyButtonText: "Restart game",
      denyButtonColor: "blue",
      allowOutsideClick: false
    }

    if (value == -10) {
      // Increment score
      humanScore += 1;

      // Set local storage
      localStorage.setItem("hScore", humanScore);

      // Change score on screen
      $("#human-score-lbl").text(humanScore);

      // Change the round number
      localStorage.setItem("rounds", round + 1);

      // Alert box
      settings['text'] = "You have won!";
      Swal.fire(settings).then((result) => {
        if (result["isConfirmed"] == true) {
          window.location.href = "index.html";
        }
        else if (result.isConfirmed == false) {
          localStorage.clear();
          window.location.href = "index.html";
        }
      }).catch(swal.noop);
    }
    else if (value == 10) {
      // Increment score
      computerScore += 1;

      // Set local storage
      localStorage.setItem("cScore", computerScore);

      // Change score on screen
      $("#bot-score-lbl").text(computerScore);

      // Change the round number
      localStorage.setItem("rounds", round + 1);

      // Alert box
      settings['text'] = "Computer has won!";
      Swal.fire(settings).then((result) => {
        if (result["isConfirmed"] == true) {
          window.location.href = "index.html";
        }
        else if (result.isConfirmed == false) {
          localStorage.clear();
          window.location.href = "index.html";
        }
      }).catch(swal.noop);
    }
    else if (!isMovesLeft()) {
      // Increment score
      tieScore += 1;

      // Set local storage
      localStorage.setItem("tScore", tieScore);

      // Change score on screen
      $("#tie-score-lbl").text(tieScore);

      // Change the round number
      localStorage.setItem("rounds", round + 1);

      // Alert box
      settings['text'] = "It is a tie!";
      Swal.fire(settings).then((result) => {
        console.log("CONSOLE" + result);
        if (result["isConfirmed"] == true) {
          window.location.href = "index.html";
        }
        else if (result.isConfirmed == false) {
          localStorage.clear();
          window.location.href = "index.html";
        }
      }).catch(swal.noop);
    }
  }

  // Function for minimax evaluation and returning board score
  function minimax(depth, max) {
    var score = evaluateBoard();

    if (score == 10) {
      return score;
    }

    if (score == -10) {
      return score;
    }

    if (isMovesLeft() == false) {
      return 0;
    }

    if (max) {
      // Maximizer's move
      var best = -1000;

      // Traverse all cells
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Check if cell is empty
          if (board[i][j] == '-') {
            // Make the move
            board[i][j] = computer;

            // Call minimax recursively and choose the maximum value
            best = Math.max(best, minimax(depth + 1, !max));

            // Undo the move
            board[i][j] = '-';
          }
        }
      }
      return best;
    }
    else {
      // Minimizer's move
      var best = 1000;

      // Traverse all cells
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Check if cell is empty
          if (board[i][j] == '-') {
            // Make the move
            board[i][j] = human;

            // Call minimax recursively and choose the minimum value
            best = Math.min(best, minimax(depth + 1, !max));

            // Undo the move
            board[i][j] = '-';
          }
        }
      }
      return best;
    }
  }


  // Function for making computer's turn
  function computerMove() {
    var bestScore = -100;
    var bestX = -1, bestY = -1;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "-") {
          //Make the move
          board[i][j] = computer;

          //Evaluate the score for the move
          var moveScore = minimax(0, false);

          //Undo te move
          board[i][j] = "-";

          // If moveScore > bestScore, make bestX and bestY as i and j respectively
          if (moveScore > bestScore) {
            bestX = i;
            bestY = j;
            bestScore = moveScore;
          }
        }
      }
    }
    // Add computer's move to the board array
    board[bestX][bestY] = computer;

    // Fetch id of td of computer's move
    var id = "#" + getId(bestX, bestY);

    // If computer is X, display X symbol
    if (computer == "X") {
      $(id).append('<img src="resources/img/cross.png"/>');
    }
    // If computer is O, display O symbol
    else if (computer == "O") {
      $(id).append('<img src="resources/img/noughts.png"/>');
    }

    // Unbind click to prevent overwrite
    $(id).unbind('click');

    // Check status of the game - human winning, computer winning, tie or continue
    checkBoardStatus();

    // Next is human's turn
    $("#player-turn").text("Your turn!");

    // Enable click
    clickEnabled = true;
  }


  // Function for click of td elements of table
  $('.tic-tac-toe-board td').click(function () {
    if (clickEnabled) {
      // If human is X, display X symbol
      if (human == "X") {
        $(this).append('<img src="resources/img/cross.png"/>');
      }
      // If human is O, display O symbol
      else if (human == "O") {
        $(this).append('<img src="resources/img/noughts.png"/>');
      }

      // Unbind click to prevent overwrite
      $(this).unbind('click');

      // Add entry to board array
      addToBoard(human, $(this).attr('id'));

      // Check status of the game - human winning, computer winning, tie or continue
      checkBoardStatus();

      // Next is computer's turn
      $("#player-turn").text("Computer's turn!");

      // Disable user click
      clickEnabled = false;

      // Computer makes a move after 1 second for a more realistic feel
      if (isMovesLeft()) {
        setTimeout(function () {
          computerMove();
        }, 1000);
      }
    }
  });

});