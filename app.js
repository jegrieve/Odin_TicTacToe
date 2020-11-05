const Player = (name) => {
    let playerCount = gameData.currentPlayers.length;
    const symbol = (playerCount === 0) ? "X" : "O";
    return {name, symbol};
};

const gameData = (() => {
    let currentPlayers = [];
    let winningCombos = [
        [0,1,2],[3,4,5],
        [6,7,8],[0,3,6],
        [1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    const clearInputs = () => {
        const boxIds = Array.from(Array(9).keys());
        boxIds.forEach((id) => {
            let box = document.getElementById(id);
            box.innerHTML = "";
            box.style.background = "none";
        })
        gameData.currentPlayers = [];
    };
    let aiPlayer = "";
    return {currentPlayers, winningCombos, clearInputs, aiPlayer};
})();

const gameState = (() => {
    const inputMode = () => { 
        document.getElementById("player-inputs").hidden = false;
        document.getElementById("endgame").hidden = true;
        document.getElementById("game-table").hidden = true;
    };
    const gameMode = () => {
        document.getElementById("player-inputs").hidden = true;
        document.getElementById("game-table").hidden = false;
    };
    return {inputMode, gameMode};
})();

const gamePlay = (() => {
    const changePlayer = () => {
        [gameData.currentPlayers[0], gameData.currentPlayers[1]] = [gameData.currentPlayers[1], gameData.currentPlayers[0]] 
    };  
    const getInputs = () => {
        const playerForm = document.getElementById("player-data")
        const xPlayerName = document.getElementById("player1-input").value
        const oPlayerName = document.getElementById("player2-input").value
        const replayBtn = document.getElementById("replay-btn")
        replayBtn.addEventListener("click", function(e) {
            gameData.clearInputs();
            gameState.inputMode();
        })
        gameData.currentPlayers.push(Player(xPlayerName))
        gameData.currentPlayers.push(Player(oPlayerName))
    
        playerForm.reset();
        gameState.gameMode();
        placeInput();
    };
    const placeInput = () => {
        document.getElementById("game-table").addEventListener("click", inputEventListener) 
    };
    const inputEventListener = (e) => {
        const boxIds = Array.from(Array(9).keys());
        let currentPlayer = gameData.currentPlayers[0];
        if ((boxIds.includes(Number(e.target.id))) && (e.target.innerHTML === "")){
            e.target.innerHTML = currentPlayer.symbol
            if (checkWin(currentPlayer.symbol)) {
                winner(currentPlayer.name, checkWin(currentPlayer.symbol))
            } else if (tieGame()) {
                endGameTie();
            } else { 
                if (gameData.aiPlayer === true) {
                    aiMoveInput();
                } else changePlayer();
            };
        };
    };
    const aiMoveInput = () => {
        const boxIds = Array.from(Array(9).keys());
        let validBoxes = [];
        let currentPlayer = gameData.currentPlayers[1];
        boxIds.forEach((boxId) => {
            if (document.getElementById(boxId).innerHTML === "") validBoxes.push(boxId)
        })
        document.getElementById(validBoxes[Math.floor(Math.random()*validBoxes.length)]).innerHTML = gameData.currentPlayers[1].symbol
                    if (checkWin(currentPlayer.symbol)) winner(currentPlayer.name, checkWin(currentPlayer.symbol))
    };
    const checkWin = (symbol) => {
        let winningCombos = gameData.winningCombos
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
        if (winCombo) return winCombo
        return false
    };

    const winner = (player, winCombo) => {
        const endgame = document.getElementById("endgame")
        const endgameInfo = document.getElementById("endgame-info")
        endgame.hidden = false;
        endgameInfo.innerHTML = `${player} Wins!!!`
        winCombo.forEach((boxId) => {
            document.getElementById(boxId).style.background = "green"
        })
        endThisGame();
    }

    const tieGame = () => {
        let boxIds = Array.from(Array(9).keys());
        let boxArr = [];
        boxIds.forEach((boxId) => {
           if (document.getElementById(boxId).innerHTML !== "") boxArr.push(boxId);
        })
        if (boxArr.length === 9) return true;
        return false;
    };

    const endGameTie = () => {
        const endgame = document.getElementById("endgame")
        const endgameInfo = document.getElementById("endgame-info")
        endgame.hidden = false;
        endgameInfo.innerHTML = `Tie Game!`
        let boxIds = Array.from(Array(9).keys());
        boxIds.forEach((boxId) => {
            document.getElementById(boxId).style.background = "red"
        })
        endThisGame();
    }
    const endThisGame = () => {
        document.getElementById("game-table").removeEventListener("click", inputEventListener)
    }
    return {getInputs}
})();

const eventHandlers = (() => {
    const validateForm = () => {
        const playerOne = document.getElementById("player1-input").value
        const playerTwo = document.getElementById("player2-input").value
        if ((playerOne.length !== 0 && playerTwo.length !== 0) && (playerOne !== playerTwo) && (playerOne.trim().length !== 0 && playerTwo.trim().length !== 0)) {
            return true;
        } else return false;

    };
    const formHandler = () => {
        document.getElementById("submit-btn").addEventListener("click", function(e) {
                e.preventDefault();
                let validForm = validateForm();
                gameData.aiPlayer = document.getElementById("ai-input").checked;
                if (validForm) {
                    gamePlay.getInputs();
                } else {
                    alert("Fill out everything, and provide different names");
                };
            });
    };
    return {formHandler};
})();

gameState.inputMode();
eventHandlers.formHandler();

//Add Ai
//Add Css