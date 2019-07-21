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
  // When a new player is added, make an entry in onlinePlayerList database
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
    //Since a player has beed added using current window, disable join option till the current player leaves
    $("#add-player").attr("disabled", true);
  });

  // When a new player joins, refresh all windows to reflect the new user in the "Online Players" list
  database.ref("/onlinePlayerList").on("child_added", function(snapshot) {
    var latestPlayer = snapshot.val();
    displayonlinePlayers(latestPlayer);
  });

  //This is for choosing the opponent. This will initiate a new game by making an entry in currentGame table
  $("body").on("click", ".playerbutton", function() {
    console.log("Clicked Player Button");
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

  //When current game gets an update, update player status, initiate a new game and launch game.html
  database.ref("/currentGame").on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      //Perform the below actions only in the windows for the player and opponent of that particular game
      if (
        childSnapshot.val().opponentName === sessionStorage.getItem("player") ||
        childSnapshot.val().playerName === sessionStorage.getItem("player")
      ) {
        console.log("Matched");
        //Store the gameId in session storage
        sessionStorage.setItem("gameId", childSnapshot.key);

        //Show names of player and opponent
        $("#player-list").text(
          childSnapshot.val().playerName +
            " vs " +
            childSnapshot.val().opponentName
        );
        //Change player status from "Available" to "Game in Progress"
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
        console.log("About to open a new Window");
        window.open("./game.html", "_self");
      }
    });
  });
});
