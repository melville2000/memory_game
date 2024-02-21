var btnColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var toggle = false;
var level = 0;

$(document).keypress(function () {
    if (toggle === false) {
        nextSequence();
        toggle = true;
        
    }
});

$(".btn").click(function () {
    var clickedColor = this.id;
    userClickedPattern.push(clickedColor);
    playSound(clickedColor);
    animateClick(clickedColor);
    checkAns(userClickedPattern.length-1)
});

// var gamePattern = ["red", "blue", "green", "yellow"];
// var userClickedPattern = ["red"];

function checkAns(clicked){
    if(userClickedPattern[clicked]===gamePattern[clicked]){
        checkSeq();
    }else{
        gameFailed()
    }
    // checkSeq();
}

function checkSeq(){
    var counter=0;
    for(var i = 0; i<gamePattern.length;i++){
        if(userClickedPattern[i]===gamePattern[i]){
            counter++
            // console.log(counter)
        }
    }
    if(counter === level){
        setTimeout(function(){
            nextSequence();
        },1000)
    }
    // console.log(gamePattern)
    // console.log(userClickedPattern)
}
function gameFailed() {
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    toggle = false;
    level = 0;
    gamePattern=[];
  }
function nextSequence() {
    userClickedPattern=[];
    level++;
    $("h1").text("Level " + level);
    var randomColor = Math.floor(Math.random() * 4);
    randomColor = btnColors[randomColor];
    gamePattern.push(randomColor);
    $("#" + randomColor)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);
        
    playSound(randomColor);
}

function animateClick(btn) {
    $("#" + btn).addClass("pressed");
    setTimeout(function () {
        $("#" + btn).removeClass("pressed");
    }, 100);
}
function playSound(btn) {
    var media = new Audio("./sounds/" + btn + ".mp3");
    media.play();
}

// clickFinder();
// nextSequence();
