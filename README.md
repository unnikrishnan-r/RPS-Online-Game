**


# RPS-Online-Game

Rock Paper Scissors game played online built using basic jQuery, HTML, CSS and Firebase as backend database.

  

Demo of the game is available in youtube by clicking this [link](https://youtu.be/xSMPJvRYdgc)

[![](http://img.youtube.com/vi/Kg3KoGJAYlc/0.jpg)](http://www.youtube.com/watch?v=Kg3KoGJAYlc  "Rock Paper Scissors online game!!!")

  

## Game Rules


1. [Fundamental rules of the game is same as traditional Rock Paper Scissors game](https://www.wrpsa.com/the-official-rules-of-rock-paper-scissors/)

2. A user can join the game using his name and email (optional). Once atleast 2 players are available, user can choose an opponent. This action initiates the game.
3. One game consists of multiple rounds, till one of the players is able to secure 3 wins. In other words a game could have 6 rounds with below results

| Round # | Winner |Score|
|--|--|--
|  1|  Player 1| 1-0
|2|Player 1| 2-0
|3|Tie|2-0
|4|Player 2|2-1
5|Player 2|2-2
6|Player 2|2-3

At end of round 6, player 2 wins the game. Very clearly the game can go on for ever if a player does not manage to win 3 rounds.

4. One player is not able to see the other player's choice.
5. There is no time restriction currently, this would be revised in further versions

## Pending Enhancements / Known Issues
1. Ability for a user to leave or re-join the game. Essentially if a use chooses to leave, the status would change to *OFFLINE* and when he joins back it turns to *AVAILABLE*
2. Show *Last seen at* while displaying the user list. This allows a player to choose an opponent who is currently active.
3. Update Player Status/Games Won for all users. Currently if there are 3 players online, and 2 off them are engaged in a game the 3rd players window does not get refreshed automatically with status of the game that was in progress.
4. Chat Option 
