var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    if (!started){
        $('#level-title').text("Level " + level);
        nextSequence();
        started = true;
    }
});

// store the color of the button the user clicks and add it to an array
$('.btn').click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    // play the corresponding sound for the color pressed
    playSound(userChosenColor);

    // play an animation on the button pressed
    animatePress(userChosenColor);

    //confirm answer is correct
    checkAnswer(userClickedPattern.length -1)
});

// check if the users input is correct and either start the next level
// or a game over
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(() => {nextSequence()}, 1000);
        }
    }
    else {
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(() => {$('body').removeClass("game-over");}, 200);
        $('#level-title').text('Game Over, Press Any Key to Restart');
        startOver();
    }
}

function nextSequence(){
    // clear user selection
    userClickedPattern = [];

    //update level on each new game/sequence
    level++;
    $('#level-title').text('Level ' + level);

    // generate random number
    randomNumber = Math.floor(Math.random() * 4);

    // use random number to pick a random color
    var randomChosenColor = buttonColors[randomNumber];

    // push the color to the game pattern array
    gamePattern.push(randomChosenColor);

    // play sound for random color
    playSound(randomChosenColor);

    // jQuery code to make an animation
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
};

function playSound(name){
    // generate a different sound that corresponds with the 
    // random color
    var gameSound = new Audio('sounds/' + name + '.mp3');
    gameSound.play();
};

// make an animation when user clicks a color
function animatePress(currentColor){
    $('#' + currentColor).addClass('pressed');
    setTimeout(() => {$('#' + currentColor).removeClass("pressed");}, 100);
}

// start from scratch
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}