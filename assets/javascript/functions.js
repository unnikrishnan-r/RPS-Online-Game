function displayonlinePlayers(latestPlayer) {
  currentPlayer = sessionStorage.getItem("player");
  addPlayerToList(latestPlayer);
  setPlayerStatus(latestPlayer.playerName, latestPlayer.playerStatus, false);
}

function addPlayerToList(latestPlayer) {
  $("tbody").append(
    $("<tr>")
      .append(
        $("<td>", {
          text: latestPlayer.playerName
        })
      )
      .append(
        $("<td>").append(
          $("<button>", {
            class: "btn btn-block playerbutton",
            text: latestPlayer.playerStatus,
            status: latestPlayer.playerStatus,
            buttonname: latestPlayer.playerName
          })
        )
      )
      .append(
        $("<td>", {
          text: latestPlayer.gamesWon
        })
      )
  );
}


function setPlayerStatus(playerName, playerStatus, updateDatabase) {
  if (updateDatabase) {
    database
      .ref("/onlinePlayerList")
      .orderByChild("playerName")
      .equalTo(playerName)
      .once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          childSnapshot.ref.update({ playerStatus: playerStatus });
        });
      });
  }
  if (playerStatus == "Available") {
    $('[status="' + playerStatus + '"]').addClass("btn-success");
  } else {
      console.log("Player status is not available" + playerStatus)
      $('[buttonname="' + playerName + '"]')
      .attr("status", playerStatus)
      .attr("disabled", true)
      .text(playerStatus)
      .addClass("btn-warning")
  }
}
