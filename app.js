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
let cellValues = Array.from(document.querySelectorAll(".cell"));

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
    for (let cell in cellValues) {
        gameState.gameBoard[cell] = cellValues[cell].innerHTML;
    }
    isWinner();
}

function startGame() {
    if (player1Name.value !== "") {
        gameState.players.player1 = player1Name.value;
    } else {
        player1Name.value = "Player 1";
    }
    if (player2Name.value !== "") {
        gameState.players.player2 = player2Name.value;
    } else {
        player2Name.value = "Player 2";
    }

    if (player1Marker.value !== "none") {
        gameState.markers.player1 = player1Marker.value;
    } else {
        player1Marker.value = "x";
    }
    if (player2Marker.value !== "none") {
        gameState.markers.player2 = player2Marker.value;
    } else {
        player2Marker.value = "o";
    }

    startGameBtn.removeEventListener("click", startGame);
    startGameBtn.innerHTML = "Reset Game";
    startGameBtn.addEventListener("click", resetGame);

    player1Name.disabled = true;
    player2Name.disabled = true;
    player1Marker.disabled = true;
    player2Marker.disabled = true;

    message.innerHTML = `${gameState.players.player1}'s Turn`;

    board.addEventListener("click", gamePlay);
}

function isWinner() {
    let gmBrd = gameState.gameBoard;
    let p1M = gameState.markers.player1;
    let p2M = gameState.markers.player2;

    // row win combinations
    if (gmBrd[0] === p1M && gmBrd[1] === p1M && gmBrd[2] === p1M) {
        message.innerHTML = `${gameState.players.player1} WINS!`;
        board.removeEventListener("click", gamePlay);
    } else if (gmBrd[0] === p2M && gmBrd[1] === p2M && gmBrd[2] === p2M) {
        message.innerHTML = `${gameState.players.player2} WINS!`;
        board.removeEventListener("click", gamePlay);
    }
    if (gmBrd[3] === p1M && gmBrd[4] === p1M && gmBrd[5] === p1M) {
        message.innerHTML = `${gameState.players.player1} WINS!`;
        board.removeEventListener("click", gamePlay);
    } else if (gmBrd[3] === p2M && gmBrd[4] === p2M && gmBrd[5] === p2M) {
        message.innerHTML = `${gameState.players.player2} WINS!`;
        board.removeEventListener("click", gamePlay);
    }
    if (gmBrd[6] === p1M && gmBrd[7] === p1M && gmBrd[8] === p1M) {
        message.innerHTML = `${gameState.players.player1} WINS!`;
        board.removeEventListener("click", gamePlay);
    } else if (gmBrd[6] === p2M && gmBrd[7] === p2M && gmBrd[8] === p2M) {
        message.innerHTML = `${gameState.players.player2} WINS!`;
        board.removeEventListener("click", gamePlay);
    }
    //column win combinations
    if (gmBrd[0] === p1M && gmBrd[3] === p1M && gmBrd[6] === p1M) {
        message.innerHTML = `${gameState.players.player1} WINS!`;
        board.removeEventListener("click", gamePlay);
    } else if (gmBrd[0] === p2M && gmBrd[3] === p2M && gmBrd[6] === p2M) {
        message.innerHTML = `${gameState.players.player2} WINS!`;
        board.removeEventListener("click", gamePlay);
    }
    if (gmBrd[1] === p1M && gmBrd[4] === p1M && gmBrd[7] === p1M) {
        message.innerHTML = `${gameState.players.player1} WINS!`;
        board.removeEventListener("click", gamePlay);
    } else if (gmBrd[1] === p2M && gmBrd[4] === p2M && gmBrd[7] === p2M) {
        message.innerHTML = `${gameState.players.player2} WINS!`;
        board.removeEventListener("click", gamePlay);
    }
    if (gmBrd[2] === p1M && gmBrd[5] === p1M && gmBrd[8] === p1M) {
        message.innerHTML = `${gameState.players.player1} WINS!`;
        board.removeEventListener("click", gamePlay);
    } else if (gmBrd[2] === p2M && gmBrd[5] === p2M && gmBrd[8] === p2M) {
        message.innerHTML = `${gameState.players.player2} WINS!`;
        board.removeEventListener("click", gamePlay);
    }
    // diagonal win combinations
    if (gmBrd[0] === p1M && gmBrd[4] === p1M && gmBrd[8] === p1M) {
        message.innerHTML = `${gameState.players.player1} WINS!`;
        board.removeEventListener("click", gamePlay);
    } else if (gmBrd[0] === p2M && gmBrd[4] === p2M && gmBrd[8] === p2M) {
        message.innerHTML = `${gameState.players.player2} WINS!`;
        board.removeEventListener("click", gamePlay);
    }
    if (gmBrd[2] === p1M && gmBrd[4] === p1M && gmBrd[6] === p1M) {
        message.innerHTML = `${gameState.players.player1} WINS!`;
        board.removeEventListener("click", gamePlay);
    } else if (gmBrd[2] === p2M && gmBrd[4] === p2M && gmBrd[6] === p2M) {
        message.innerHTML = `${gameState.players.player2} WINS!`;
        board.removeEventListener("click", gamePlay);
    }
    //draw game
    if (!gameState.gameBoard.includes("")) {
        message.innerHTML = "Game was a draw";
    }
}

function resetGame() {
    gameState.players.player1 = "Player 1";
    gameState.players.player2 = "Player 2";
    gameState.markers.player1 - "X";
    gameState.markers.player2 - "O";
    gameState.gameBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];
    gameState.playerUp = 1;

    player1Name.disabled = false;
    player2Name.disabled = false;
    player1Marker.disabled = false;
    player2Marker.disabled = false;

    for (let cell of cellValues) {
        cell.innerHTML = "";
        cell.disabled = true;
    }

    message.innerHTML = "";

    player1Name.value = "";
    player2Name.value = "";
    player1Marker.value = "none";
    player2Marker.value = "none";

    board.removeEventListener("click", gamePlay);

    startGameBtn.removeEventListener("click", resetGame);
    startGameBtn.innerHTML = "Start Game";
    startGameBtn.addEventListener("click", startGame);
}

function markerSelections(e) {
    if (e.target.id === "player-1-marker") {
        if (player1Marker.value === "x") {
            player2Marker.value = "o";
        }
        if (player1Marker.value === "o") {
            player2Marker.value = "x";
        }
        if (player1Marker.value === "none") {
            player2Marker.value = "none";
        }
    }
    if (e.target.id === "player-2-marker") {
        if (player2Marker.value === "x") {
            player1Marker.value = "o";
        }
        if (player2Marker.value === "o") {
            player1Marker.value = "x";
        }
        if (player2Marker.value === "none") {
            player1Marker.value = "none";
        }
    }
}

startGameBtn.addEventListener("click", startGame);
player1Marker.addEventListener("change", markerSelections);
player2Marker.addEventListener("change", markerSelections);
