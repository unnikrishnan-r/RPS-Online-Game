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

$(document).ready(function() {
  database.ref("/currentGame").on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      console.log(childSnapshot.val());
      console.log(childSnapshot.key);
      if (sessionStorage.getItem("gameId") == childSnapshot.key) {
        displayPlayersArea(
          childSnapshot.val().playerName,
          childSnapshot.val().opponentName
        );
      }
    });
  });
});
