// Your web app's Firebase configuration
var currentPlayer = sessionStorage.getItem("player");
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
var gameInProgress = false;
console.log("Connected to DB");
//****************************************************************************** */
$(document).ready(function() {
  $("#add-player").on("click", function() {
    console.log("Clicked Add Player");
    event.preventDefault();
    currentPlayer = $("#name-input").val();
    sessionStorage.setItem("player", currentPlayer);
    database
      .ref("/onlinePlayerList")
      .push()
      .set({
        playerName: $("#name-input").val(),
        playerEmail: $("#email-input").val(),
        playerStatus: "Available",
        gamesWon: 0
      });
    $("#add-player").attr("disabled", true);
  });

  database.ref("/onlinePlayerList").on("child_added", function(snapshot) {
    var latestPlayer = snapshot.val();
    displayonlinePlayers(latestPlayer);
  });

  $("body").on("click", ".playerbutton", function() {
    // beginGame(currentPlayer , $(this).attr("buttonname"))
    console.log("Clicked Player Button")
    gameInProgress = true;

    database
      .ref("/currentGame")
      .push()
      .set({
        playerName: currentPlayer,
        opponentName: $(this).attr("buttonname"),
        gameStatus: "In Progress"
      });
  });

  database.ref("/currentGame").on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      if (
        (childSnapshot.val().opponentName === sessionStorage.getItem("player") ||
        childSnapshot.val().playerName === sessionStorage.getItem("player")) 
        // &
        // (gameInProgress)
      ) {
        console.log("Matched");
        sessionStorage.setItem("gameId", childSnapshot.key);
        $("#player-list").text(
          childSnapshot.val().playerName +
            " vs " +
            childSnapshot.val().opponentName
        );
        setPlayerStatus(
          childSnapshot.val().playerName,
          "Game In Progress",
          true
        );
        setPlayerStatus(
          childSnapshot.val().opponentName,
          "Game In Progress",
          true
        );
        var gameStarted = true;
        if (gameStarted) {
          gameStarted = false;
          console.log("About to open a new Window");
          // window.open("./../../game.html");
          window.open("./game.html", "_self")
          // window.open("https://www.google.com")
        }
      }
    });
  });
});
