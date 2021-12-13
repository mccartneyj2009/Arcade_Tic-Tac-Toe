// Query selectors
board = document.querySelector(".board")
player1Marker = document.querySelector(".player-markers-selection").value
player2Marker = document.querySelector(".pl")
console.log(player1Marker);

function gameSetup(){
    message = document.querySelector("#in-game-message");
    message.innerHTML = 'Click "Start Game" below';
}

board.addEventListener("click", function(e){
    console.log(e.target);
})

gameSetup()