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
  if (playerStatus == "Available") {
    $('[status="' + playerStatus + '"]').addClass("btn-success");
  } else {
    console.log("Player status is not available" + playerStatus);
    $('[buttonname="' + playerName + '"]')
      .attr("status", playerStatus)
      .attr("disabled", true)
      .text(playerStatus)
      .addClass("btn-warning");
  }

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
}

function displayPlayersArea(playerName, opponentName) {
  if (sessionStorage.getItem("player") == playerName) {
    $(".player-name").text(playerName);
    $(".player-message").text("Take your Pick...");

    $(".opponent-name").text(opponentName);
    $(".opponent-choices").css("visibility", "hidden");
    $(".opponent-message").text("Waiting for " + playerName + "'s pick...");
  } else {
    $(".player-name").text(playerName);
    $(".player-message").text("Waiting for " + opponentName + "'s pick...");
    $(".player-choices").css("visibility", "hidden");

    $(".opponent-name").text(opponentName);
    $(".opponent-message").text("Take your Pick...");
  }

  // var timer = 15;

  // var interval = setInterval(function() {
  //     timer--;
  //     $('.player-timer').text(timer);
  //     if (timer === 0) clearInterval(interval);
  // }, 1000);
}
