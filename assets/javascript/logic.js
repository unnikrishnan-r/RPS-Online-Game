var firebaseConfig = {
  apiKey: "AIzaSyD9yMLeEgizfj8K-VGWxEhL917i1a6NZHw",
  authDomain: "rps-online-game-5c875.firebaseapp.com",
  databaseURL: "https://rps-online-game-5c875.firebaseio.com",
  projectId: "rps-online-game-5c875",
  storageBucket: "rps-online-game-5c875.appspot.com",
  messagingSenderId: "385426380061",
  appId: "1:385426380061:web:630be7a60d653644"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var currentGame = 0;
var playerWinCount = 0;
var opponentWinCount = 0;
var tieCount = 0;
var currentRound = "round";
var roundEvaluated = false;

$(document).ready(function() {
  loadCurrentGame(sessionStorage.getItem("gameId"));

  //When player clicks a image to make his choice
  $(".player-choice-image").on("click", function() {
    console.log("Clicked Player choice " + $(this).attr("imagename"));
    //Highlights the choice using a redborder
    $(this).addClass("redborder");
    $(".player-message").text("Choice Made...");
    //Record the choice in database
    recordGameScore(
      "round" + currentGame,
      "player",
      sessionStorage.getItem("gameId"),
      $(this).attr("imagename")
    );
  });

  //Works exactly same way as previous block of code for click event on player-choice-image
  $(".opponent-choice-image").on("click", function() {
    console.log("Clicked Opponent choice " + $(this).attr("imagename"));
    $(this).addClass("redborder");
    $(".opponent-message").text("Choice Made...");
    recordGameScore(
      "round" + currentGame,
      "opponent",
      sessionStorage.getItem("gameId"),
      $(this).attr("imagename")
    );
  });

  //When a record on the currentGame table changes
  database.ref("currentGame").on("child_changed", function(snapshot) {
    //Check if the game that changed matches the game that in progress.
    //Also check if the update is because of the winner for the round is being recorded.

    if ((sessionStorage.getItem("gameId") == snapshot.key) & !roundEvaluated) {
      console.log("Detected an update on current game");
      //If both users have made their choice
      if (snapshot.val().hasOwnProperty(currentRound)) {
        if (
          snapshot.val()[currentRound].hasOwnProperty("playerChoice") &
          snapshot.val()[currentRound].hasOwnProperty("opponentChoice")
        ) {
          console.log("Both choices made, going to evaluate");
          //Evaluate the choices to determine the winner
          var result = evaluateChoices(
            snapshot.val()[currentRound]["playerChoice"],
            snapshot.val()[currentRound]["opponentChoice"]
          );

          //Mark that round has been evaluated so that below update does not cause infinite looping
          roundEvaluated = true;

          //Store the winner of the current round
          updateRoundWinner(
            result,
            sessionStorage.getItem("gameId"),
            currentRound
          );
        }
      }
    }
  });
});
