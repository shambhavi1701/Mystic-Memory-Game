var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

// Unified start function
function beginGame() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    $("#start-btn").fadeOut();
  }
}

// Start on key, touch, or button click
$(document).on("keydown touchstart", function () {
  beginGame();
});

$("#start-btn").click(function () {
  beginGame();
});

// Button click
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// Next sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

// Play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play().catch((err) => console.log("Audio blocked:", err));
}

// Animate press
function animatePress(currentColour) {
  const btn = $("#" + currentColour);
  btn.addClass("pressed");
  setTimeout(() => btn.removeClass("pressed"), 100);
}

// Check answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 100);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"), 400);
    $("#level-title").text("Game Over — Tap or Press Any Key to Restart");
    startOver();
  }
}

// Reset game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  $("#start-btn").fadeIn();
}
