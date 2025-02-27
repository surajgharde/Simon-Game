

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickPattern = [];

var started = false;

var level = 0;

$(document).keypress(function () {
    if (!started) {

        $("#level-title").text("Level " +level);
        nextSequence();
        started = true;
    }
});



$(".btn").click(function (){
    var userChosenColour = $(this).attr("id");
    userClickPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickPattern.length-1);
});




function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]){

        console.log("success");

        if (userClickPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            },1000);
        }
    } else {
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game over, Press Any Key to Restart");

        startOver();
    }
}



function nextSequence () {

    userClickPattern = [];

    level++;

    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * 4);
    
    var randomChosenColor = buttonColors[randomNumber];
    
    gamePattern.push(randomChosenColor);
    
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
   playSound(randomChosenColor);
    
}



function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    },100);
}


function playSound(name){
    var audio = new Audio ("sounds/"+ name +".mp3");
    audio.play();
  
}

function startOver() {
level = 0;
gamePattern = [];
started = false;

}