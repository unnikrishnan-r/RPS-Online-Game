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
var currentRound = "round";

$(document).ready(function() {
  loadCurrentGame(sessionStorage.getItem("gameId"));

  $(".player-choice-image").on("click", function() {
    console.log("Clicked Player choice " + $(this).attr("imagename"));
    recordGameScore(
      "round" + currentGame,
      "player",
      sessionStorage.getItem("gameId"),
      $(this).attr("imagename")
    );

    $(this).addClass("redborder");
  });

  $(".opponent-choice-image").on("click", function() {
    console.log("Clicked Opponent choice " + $(this).attr("imagename"));
    recordGameScore(
      "round" + currentGame,
      "opponent",
      sessionStorage.getItem("gameId"),
      $(this).attr("imagename")
    );

    $(this).addClass("redborder");
  });

  database.ref("currentGame").on("child_changed", function(snapshot) {
    console.log(snapshot.val());

    if (sessionStorage.getItem("gameId") == snapshot.key) {
      console.log("Detected an update on current game");
      if (snapshot.val().hasOwnProperty(currentRound)) {
        if (snapshot.val()[currentRound].hasOwnProperty("playerChoice")) {
          $(".player-message").text("Choice Made...");
        }

        if (snapshot.val()[currentRound].hasOwnProperty("opponentChoice")) {
          $(".opponent-message").text("Choice Made...");
        }

        if (
          snapshot.val()[currentRound].hasOwnProperty("playerChoice") &
          snapshot.val()[currentRound].hasOwnProperty("opponentChoice")
        ) {
          console.log("Both choices made, going to evaluate");
          var result = evaluateChoices(
            snapshot.val()[currentRound]["playerChoice"],
            snapshot.val()[currentRound]["opponentChoice"]
          );

          switch (result) {
            case 0:
              console.log("Game is a Tie");
              break;
            case 1:
              console.log("Player 1 is Winner");
              break;
            case 2:
              console.log("Opponent is a Winner");
              break;
          }
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
