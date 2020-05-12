var buttonColours = ["red","blue","green","yellow"];

var gamePattern= [];
userClickedPattern = [];

var started = false;

var level = 0;

$(document).keydown(function(){
  if (!started){
    $("#level-title").text("Level "+ level);
    nextSequence();
    started = true;  
  }
});


$(".mobile-button").click(function(){
  if (!started){
    $("#level-title").text("Level "+ level);
    nextSequence();
    started = true;  
  }
})


$(".btn").click(function(){

  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  // console.log(userClickedPattern);

  playSound(userChosenColour);

  animatePress(userChosenColour);
  // var audio = new Audio("sounds/"+userChosenColour+".mp3");
  // audio.play();
  
  checkAnswer(userClickedPattern.length-1);
})



function checkAnswer(currentLevel){
  
  
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log ("success");

    if (userClickedPattern.length === gamePattern.length){

      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else  {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");

    $("#level-title").text("Game Over,Please Press Any Key To Restart!")
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    startOver();


  }
}







function nextSequence(){

  userClickedPattern = [];

  level= level +1 ;

  $("#level-title").text("Level "+ level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  // animatePress(randomChosenColour);
  
}


function playSound(name){
  var audio = new Audio("sounds/"+name+ ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  }, 100);
  
}


function startOver(){
  level = 0;
  gamePattern = [];
  started = false;

}

