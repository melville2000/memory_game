var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPatterns = [];
var level = 0;
var toggle = false;

$(document).keypress(function () {
  if (!toggle) {
    nextSequence();
    toggle = true;
  }
});

$(".btn").click(function () {
  var userChoosenColor = this.id;
  userClickedPatterns.push(userChoosenColor);
  playSound(this.id);
  animateButton(this.id);
  simonSays(userClickedPatterns[userClickedPatterns.length - 1]);
});

function nextSequence() {
  userClickedPatterns = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}

function simonSays(curLvl) {
  if (curLvl === gamePattern[gamePattern.length - 1]) {
    // console.log("suceee")
    var counter = 0;
    for (var i = 0; i <= gamePattern.length - 1; i++) {
      if (userClickedPatterns[i] == gamePattern[i]) {
        counter++;
      }
    }
    if (counter === gamePattern.length) {
      console.log("suceee");
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else if (counter !== gamePattern.length) {
    $("#level-title").text("Game Over, Try Again");
  }
}

function animateButton(button) {
  $("#" + button).addClass("pressed");
  setTimeout(function () {
    $("#" + button).removeClass("pressed");
  }, 100);
}
function playSound(name) {
  var media = new Audio("./sounds/" + name + ".mp3");
  media.play();
}
