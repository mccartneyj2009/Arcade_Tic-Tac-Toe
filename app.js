const gameState = {
    players: {
        player1: "Player 1",
        player2: "Player 2",
    },
    markers: {
        player1: "X",
        player2: "O",
    },
    gameBoard: ["", "", "", "", "", "", "", "", ""],
    gameWinningCombinations: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ],
    playerUp: 1,
    computerOpponent: "yes",
};

// Query selectors
let board = document.querySelector(".board");
let message = document.querySelector("#in-game-message");
let player1Marker = document.querySelector("#player-1-marker");
let player2Marker = document.querySelector("#player-2-marker");
let player1Name = document.querySelector("#player-1-name");
let player2Name = document.querySelector("#player-2-name");
let startGameBtn = document.querySelector("#start-game-btn");
let cellValues = Array.from(document.querySelectorAll(".cell"));
let compOpponent = document.querySelector("#comp-opp-selection");

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

function playAgainstComputer(e) {
    let playComputer = e.target.value;
    if (playComputer === "yes") {
        gameState.computerOpponent = playComputer;
        player2Name.disabled = true;
        player2Marker.disabled = true;
        player2Name.value = "Computer";
    } else if (playComputer === "no") {
        gameState.computerOpponent = playComputer;
        player2Name.disabled = false;
        player2Marker.disabled = false;
        player2Name.value = "";
    }
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

    compOpponent.removeEventListener("change", playAgainstComputer);
    compOpponent.disabled = true;

    player1Name.disabled = true;
    player2Name.disabled = true;
    player1Marker.disabled = true;
    player2Marker.disabled = true;

    message.innerHTML = `${gameState.players.player1}'s Turn`;

    board.addEventListener("click", gamePlay);
}

function gamePlay(e) {
    let playerWon = false;

    //playing against computer
    if (gameState.computerOpponent === "yes") {
        if (gameState.playerUp === 1) {
            if (e.target.innerHTML !== "") {
                message.innerHTML = "Pick an empty cell";
            } else {
                e.target.innerHTML = gameState.markers.player1;
                gameState.playerUp = 2;
                message.innerHTML = `${gameState.players.player2}'s Turn`;
                for (let cell in cellValues) {
                    gameState.gameBoard[cell] = cellValues[cell].innerHTML;
                }
                playerWon = isWinner();
                if (playerWon) {
                    return;
                }
                computerPlay();
                // Update board
                for (let cell in cellValues) {
                    gameState.gameBoard[cell] = cellValues[cell].innerHTML;
                }
                isWinner();
            }
        }
    }

    //playing against human
    if (gameState.computerOpponent === "no") {
        if (e.target.innerHTML !== "") {
            message.innerHTML = "Pick an empty cell";
        } else {
            if (gameState.playerUp === 1) {
                e.target.innerHTML = gameState.markers.player1;
                gameState.playerUp = 2;
                message.innerHTML = `${gameState.players.player2}'s Turn`;
                for (let cell in cellValues) {
                    gameState.gameBoard[cell] = cellValues[cell].innerHTML;
                }
                isWinner();
            } else if (gameState.playerUp === 2) {
                e.target.innerHTML = gameState.markers.player2;
                gameState.playerUp = 1;
                message.innerHTML = `${gameState.players.player1}'s Turn`;
                for (let cell in cellValues) {
                    gameState.gameBoard[cell] = cellValues[cell].innerHTML;
                }
                isWinner();
            }
        }
    }
}

function computerPlay() {
    board.removeEventListener("click", gamePlay);
    cellChosen = Math.floor(Math.random() * 9);

    if (gameState.gameBoard[cellChosen] === null) {
        cellValues[cellChosen].innerHTML = gameState.markers.player2;
    } else if (gameState.gameBoard[cellChosen] === "") {
        cellValues[cellChosen].innerHTML = gameState.markers.player2;
    } else {
        computerPlay();
    }
    gameState.playerUp = 1;
    message.innerHTML = `${gameState.players.player1}'s Turn`;
    board.addEventListener("click", gamePlay);
}

function isWinner() {
    let gmBrd = gameState.gameBoard;
    const gameWinners = gameState.gameWinningCombinations;
    let p1M = gameState.markers.player1;
    let p2M = gameState.markers.player2;
    let xCount = 0;
    let oCount = 0;

    //testing for new winning logic
    for (let combo of gameWinners) {
        for (let cell of combo) {
            if (gmBrd[cell] === p1M) {
                xCount += 1;
            }
            if (xCount === 3) {
                message.innerHTML = `${gameState.players.player1} WINS!`;
                board.removeEventListener("click", gamePlay);
                return true;
            }
            if (gmBrd[cell] === p2M) {
                oCount += 1;
            }
            if (oCount === 3) {
                message.innerHTML = `${gameState.players.player2} WINS!`;
                board.removeEventListener("click", gamePlay);
            }
        }
        xCount = 0;
        oCount = 0;
    }
}

function resetGame() {
    gameState.players.player1 = "Player 1";
    gameState.players.player2 = "Player 2";
    gameState.markers.player1 = "X";
    gameState.markers.player2 = "O";
    gameState.gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameState.playerUp = 1;
    gameState.computerOpponent = "yes";

    player1Name.disabled = false;
    player2Name.disabled = true;
    player1Marker.disabled = false;
    player2Marker.disabled = true;

    for (let cell of cellValues) {
        cell.innerHTML = "";
        cell.disabled = true;
    }

    message.innerHTML = "";

    player1Name.value = "";
    player2Name.value = "Computer";
    player1Marker.value = "none";
    player2Marker.value = "none";
    compOpponent.value = "yes";

    board.removeEventListener("click", gamePlay);

    startGameBtn.removeEventListener("click", resetGame);
    startGameBtn.innerHTML = "Start Game";
    startGameBtn.addEventListener("click", startGame);

    compOpponent.addEventListener("change", playAgainstComputer);
    compOpponent.disabled = false;
}

// Initializations
player2Name.disabled = true;
player2Name.value = "Computer";
player2Marker.disabled = true;

//Event Listeners
startGameBtn.addEventListener("click", startGame);
player1Marker.addEventListener("change", markerSelections);
player2Marker.addEventListener("change", markerSelections);
compOpponent.addEventListener("change", playAgainstComputer);
