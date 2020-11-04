const Player = (name) => {
    let playerCount = gamePlay.currentPlayers.length
    const symbol = (playerCount === 0) ? "X" : "O";
    return {name, symbol}
};

const gamePlay = (() => {
    let currentPlayers = [];
    let winningCombos = [
        [0,1,2],[3,4,5],
        [6,7,8],[0,3,6],
        [1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ]
    return {currentPlayers, winningCombos}
})();

const handlers = (() => {
    const inputMode = () => { // add this to a button later
        document.getElementById("player-inputs").hidden = false;
        document.getElementById("endgame").hidden = true;
        document.getElementById("game-table").hidden = true;
    };
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
        };
    };
    const formHandler = () => {
        document.getElementById("submit-btn").addEventListener("click", function(e) {
                e.preventDefault();
                let validForm = validateForm();
                if (validForm) {
                    getInputs();
                } else {
                    alert("Fill out everything, and provide different names")
                }
            })
    };
    const getInputs = () => {
            gamePlay.currentPlayers = [];
            const playerForm = document.getElementById("player-data")
            const xPlayerName = document.getElementById("player1-input").value
            const oPlayerName = document.getElementById("player2-input").value
           
            gamePlay.currentPlayers.push(Player(xPlayerName))
            gamePlay.currentPlayers.push(Player(oPlayerName))
        
            playerForm.reset();
            handlers.gameMode();
            placeInput();
        };
    const inputEventListener = (e) => {
            const boxIds = Array.from(Array(9).keys())
            if ((boxIds.includes(Number(e.target.id))) && (e.target.innerHTML === "")){
                e.target.innerHTML = gamePlay.currentPlayers[0].symbol
                if (checkWin(gamePlay.currentPlayers[0].symbol)) {
                    winner(gamePlay.currentPlayers[0].name, checkWin(gamePlay.currentPlayers[0].symbol))
                } else { 
                    changePlayer();
                }
            }
    }
    const placeInput = () => {
            document.getElementById("game-table").addEventListener("click", inputEventListener) 
    };
    const changePlayer = () => {
        [gamePlay.currentPlayers[0], gamePlay.currentPlayers[1]] = [gamePlay.currentPlayers[1], gamePlay.currentPlayers[0]] 
    };    
    const checkWin = (symbol) => {
        let winningCombos = gamePlay.winningCombos
        let combos = [];
  
        for (let i = 0; i < 9; i++) {
            if (document.getElementById(i).innerHTML === symbol) {
                combos.push(Number(i))
            }
        }

        let winCombo = "";

        winningCombos.forEach((array) => {
            let possibleCombo = [];

            array.forEach((el) => {
                if (combos.indexOf(el) === -1) {
                    return false
                }
                possibleCombo.push(el);
            })

            if (possibleCombo.length === 3)
            {
                winCombo = possibleCombo
            }

        })

        if (winCombo) {
            return winCombo
        }
            return false
    };

    const winner = (player, winCombo) => {
        const endgame = document.getElementById("endgame")
        const endgameInfo = document.getElementById("endgame-info")
        endgame.hidden = false;
        endgameInfo.innerHTML = `${player} Wins!!!`
        winCombo.
        endThisGame();
    }

    const endThisGame = () => {
        document.getElementById("game-table").removeEventListener("click", inputEventListener)
    }

    return {inputMode, gameMode, validateForm, formHandler, placeInput, changePlayer, checkWin, winner}
})();

const gameBoard = (() => {
    const board = [];
    return {}
})();

handlers.inputMode();
handlers.formHandler();


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