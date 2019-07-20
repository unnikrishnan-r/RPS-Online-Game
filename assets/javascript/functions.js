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

function recordGameScore(currentRound, role, gameId, choice) {
  if (role == "player") {
    database
      .ref("/currentGame")
      .child(gameId)
      .child(currentRound)
      .update({ playerChoice: choice });
  } else {
    database
      .ref("/currentGame")
      .child(gameId)
      .child(currentRound)
      .update({ opponentChoice: choice });
  }
}

function loadCurrentGame(gameId) {
  database
    .ref("/currentGame")
    .child(gameId)
    .once("value", function(snapshot) {
      console.log("Going to load the game");
      console.log(snapshot.val());
      console.log("Display Game Area");
      displayPlayersArea(
        snapshot.val().playerName,
        snapshot.val().opponentName
      );
      currentGame++;
      currentRound = "round" + currentGame;
    });
}

function evaluateChoices(playerChoice, opponentChoice) {
  var rock = "rock";
  var paper = "paper";
  var scissors = "scissors";

  if (playerChoice === opponentChoice) {
    return 0;
    console.log("Game is a Tie");
  } else {
    if (playerChoice === rock) {
      if (opponentChoice === scissors) {
        return 1;
      } else {
        return 2;
      }
    } else {
      if (playerChoice === scissors) {
        if (opponentChoice === paper) {
          return 1;
        } else {
          return 2;
        }
      } else {
        if (playerChoice === paper) {
          if (opponentChoice === rock) {
            return 1;
          } else {
            return 2;
          }
        }
      }
    }
  }
}

function updateRoundWinner(result, gameId, currentRound) {
  database
    .ref("/currentGame")
    .child(gameId)
    .child(currentRound)
    .update({ result: result });

  switch (result) {
    case 1:
      $(".player-star-1").addClass("winning-star");
      $(".player-message").text("You Won this round!!");
      $(".opponent-message").text("Sorry, you lost..");

      break;

    case 2:
      $(".opponent-star-1").addClass("winning-star");
      $(".opponent-message").text("You Won this round!!");
      $(".player-message").text("Sorry, you lost..");
      break;
  }
}
