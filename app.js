// Query selectors
const gameState = {
  players: {
    player1: "Player 1",
    player2: "Player 2",
  },
  markers: {
    player1: "X",
    player2: "O",
  },
  gameBoard: [null, null, null, null, null, null, null, null, null],
  playerUp: 1,
};

let board = document.querySelector(".board");
let message = document.querySelector("#in-game-message");
let player1Marker = document.querySelector("#player-1-marker");
let player2Marker = document.querySelector("#player-2-marker");
let player1Name = document.querySelector("#player-1-name");
let player2Name = document.querySelector("#player-2-name");
let startGameBtn = document.querySelector("#start-game-btn");
const cellValues = Array.from(document.querySelectorAll(".cell"));

function gamePlay(e) {
  if (e.target.innerHTML !== "") {
    message.innerHTML = "Pick an empty cell";
  } else {
    if (gameState.playerUp === 1) {
      e.target.innerHTML = gameState.markers.player1;
      gameState.playerUp = 2;

      message.innerHTML = `${gameState.players.player2}'s Turn`;
    } else if (gameState.playerUp === 2) {
      e.target.innerHTML = gameState.markers.player2;
      gameState.playerUp = 1;
      message.innerHTML = `${gameState.players.player1}'s Turn`;
    }
  }

  for (let i = 0; i < 3; i++) {
    if (gameState.gameBoard[i] === "X") {
    }
  }
  console.log(cellValues, gameState.gameBoard);
  // Column win combinations
  //   if (
  //     gameState.gameBoard[0] === gameState.gameBoard[3] &&
  //     gameState.gameBoard[0] === gameState.gameBoard[6]
  //   ) {
  //     console.log("Winner");
  //   }
  //   if (
  //     gameState.gameBoard[1] === gameState.gameBoard[4] &&
  //     gameState.gameBoard[1] === gameState.gameBoard[7]
  //   ) {
  //     console.log("Winner");
  //   }
  //   if (
  //     gameState.gameBoard[2] === gameState.gameBoard[5] &&
  //     gameState.gameBoard[2] === gameState.gameBoard[8]
  //   ) {
  //     console.log("Winner");
  //   }
  //   //Row win combinations
  //   if (
  //     gameState.gameBoard[0] === gameState.gameBoard[1] &&
  //     gameState.gameBoard[0] === gameState.gameBoard[2]
  //   ) {
  //     console.log("Winner");
  //   }
  //   if (
  //     gameState.gameBoard[3] === gameState.gameBoard[4] &&
  //     gameState.gameBoard[3] === gameState.gameBoard[5]
  //   ) {
  //     console.log("Winner");
  //   }
  //   if (
  //     gameState.gameBoard[6] === gameState.gameBoard[7] &&
  //     gameState.gameBoard[6] === gameState.gameBoard[8]
  //   ) {
  //     console.log("Winner");
  //   }
  //   //Diagonal win combinations
  //   if (
  //     gameState.gameBoard[0] === gameState.gameBoard[4] &&
  //     gameState.gameBoard[0] === gameState.gameBoard[8]
  //   ) {
  //     console.log("Winner");
  //   }
  //   if (
  //     gameState.gameBoard[2] === gameState.gameBoard[4] &&
  //     gameState.gameBoard[2] === gameState.gameBoard[6]
  //   ) {
  //     console.log("Winner");
  //   }
}

function startGame() {
  if (player1Name.value !== "") {
    gameState.players.player1 = player1Name.value;
  }
  if (player2Name.value !== "") {
    gameState.players.player2 = player2Name.value;
  }

  if (player1Marker.value !== "none") {
    gameState.markers.player1 = player1Marker.value;
  }
  if (player2Marker.value !== "none") {
    gameState.markers.player2 = player2Marker.value;
  }

  startGameBtn.removeEventListener("click", startGame);
  startGameBtn.innerHTML = "Reset Game";

  player1Name.disabled = true;
  player2Name.disabled = true;
  player1Marker.disabled = true;
  player2Marker.disabled = true;

  message.innerHTML = `${gameState.players.player1}'s Turn`;

  board.addEventListener("click", gamePlay);
}

startGameBtn.addEventListener("click", startGame);
