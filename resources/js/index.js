$(function () {
  // Fetch and set the round number
  var round = parseInt(localStorage.getItem("rounds") == null ? 1 : localStorage.getItem("rounds"));
  if (round == 1) localStorage.setItem("rounds", round);
  $("#round-label").text("Round " + round);

  // Click function for X choice
  $('.choice-btn-x').click(function () {
    localStorage.setItem("human", "X");
    localStorage.setItem("computer", "O");
    window.location.href = "game.html";
  });

  // Click function for O choice
  $('.choice-btn-o').click(function () {
    localStorage.setItem("human", "O");
    localStorage.setItem("computer", "X");
    window.location.href = "game.html";
  });
});