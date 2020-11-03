const gamePlay = (() => {
    let currentPlayers = [];
    return {currentPlayers}
})();

const Player = (name) => {
    let playerCount = gamePlay.currentPlayers.length
    const symbol = (playerCount === 0) ? "X" : "O";
    return {name, symbol}
};

const getInputs = () => {
    gamePlay.currentPlayers = [];
    const playerForm = document.getElementById("player-data")
    const xPlayerName = document.getElementById("player1-input").value
    const oPlayerName = document.getElementById("player2-input").value
    const newPlayers = [Player(xPlayerName), Player(oPlayerName)]
    gamePlay.currentPlayers.push(...newPlayers)
    playerForm.reset();
    handlers.gameMode();
}


const gameTable = document.getElementById("game-table")
gameTable.hidden = true;
const playerInputs = document.getElementById("player-inputs")
const btn = document.getElementById("submit-btn")
btn.addEventListener("click", function(e) {
    e.preventDefault();
    let validForm = handlers.validateForm();
    if (validForm) {
        getInputs();
    } else {
        alert("Fill out everything, and provide different names")
    }
})


const handlers = (() => {
    const inputMode = () => {};
    const gameMode = () => {
        document.getElementById("player-inputs").hidden = true;
        document.getElementById("game-table").hidden = false;
    }
    const validateForm = () => {
        const playerOne = document.getElementById("player1-input").value
        const playerTwo = document.getElementById("player2-input").value
        if ((playerOne.length !== 0 && playerTwo.length !== 0) && (playerOne !== playerTwo) && (playerOne.trim().length !== 0 && playerTwo.trim().length !== 0)) {
            return true;
        } else {
            return false;
        }
    } 
    return {inputMode, gameMode, validateForm}
})();

const gameBoard = (() => {
    const board = [];
    const addListeners = () => {
        for(let i = 0; i < 9; i++) {
            document.getElementById(i).addEventListener("click", function() {
                let crntPlayer = gamePlay.currentPlayers[0]

                this.innerHTML = crntPlayer.symbol
                //etc....
            })
        }
    }
    return {}
})();

//Here is the whole game:
//Add eventlisteners to every tile
//Create the players using the inputs from the DOM
//The eventlistener will look at the current player
//player1 will be X, player2 will be O (use count = 0, and let sym = count == 0 ? "X" : "O" )
//currentplayer.getInput will get the current players symbol
//the symbol will then be placed into the innerHTML of the element
//then the game will do some checks like win? tie?
//if none, then swap the players in the array and repeat process
//if win or tie, end game and highlight the backgrounds for tiles
//eventually add an AI


// ("click", function() {
//     let symbol = gamePlay.currentPlayer[0]
//     this.innerHTML = symbol
//     currentPlayer.checkwin();
//     let val = gamePlay.currentPlayer.pop
//     gamePlay.currentPlayer.unshift(val);
// })