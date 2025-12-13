const playersFormDialog = document.getElementById('players-form-dialog');
const playersForm = document.getElementById('players-form');
playersForm.addEventListener('submit', (event) => {
    // prevent page refresh
    event.preventDefault();

    // initialize player data
    const playerData = new FormData(playersForm);
    const data = Object.fromEntries(playerData);
    // close dialog form
    playersFormDialog.close();

    initializeGame(data);
});

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const initializeVariables = (data) => {
    data.gameMode = +data.gameMode;
    data.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    data.playerOneToken = 'X';
    data.playerTwoToken = 'O';
    data.round = 0;
    data.currentPlayer = 'X';
    data.gameOver = false;
}

const addEventListenerToGameBoard = (data) => {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', (event) => {
            playMove(event.target, data);
        })
    })
}

const initializeGame = (data) => {
    // initialize game variables
    initializeVariables(data);

    adjustDom('turn', `${data.player1}'s turn`);

    console.log(data);
    // add eventlisteners to the gameboard
    addEventListenerToGameBoard(data);
};

const playMove = (cell, data) => {
    // is game over?
    if (data.gameOver || data.round > 8) {
        return;
    }
    
    // check if cell has a letter in it, if it has, do nothing
    const index = cell.dataset.index;
    if (data.board[index] === "X" || data.board[index] === "O") {
        return;
    }

    // adjust the DOM for player move, then check win conditions
    data.board[index] = data.currentPlayer;
    cell.textContent = data.currentPlayer;
    cell.classList.add(data.currentPlayer === 'X' ? 'player1' : 'player2');

    // increase the round
    data.round++;

    // check end conditions
    if (endConditions(data)) {
        return;
    }

    // switch player, dom, and change data.currentPlayer
    if (data.gameMode === 0) {
        switchPlayer(data);
    } else if (data.gameMode === 1) {
        // easy ai turn
        easyAiMove(data);
        data.currentPlayer = 'X';
        // change back to player1
    }
    
};

const endConditions = (data) => {
    // 3 potential options
    // winner, tie, game not over
    if (checkWinner(data)) {
        // display winner to UI
        const winnerName = data.currentPlayer === 'X' ? data.player1 : data.player2;
        adjustDom('turn', winnerName + " has won the game.");
        return true;
    } else if (data.round === 9) {
        // display tie to UI
        adjustDom('turn', "It's a tie!");
        data.gameOver = true;
        return true;
    }
    return false;
};

const checkWinner = (data) => {
    let result = false;
    winConditions.forEach(condition => {
        if (
            data.board[condition[0]] === data.board[condition[1]] &&
            data.board[condition[1]] === data.board[condition[2]]
        ) {
            data.gameOver = true;
            result = true;
        }
    });
    return result;
};

const adjustDom = (className, textContent) => {
    const elem = document.querySelector(`.${className}`);
    elem.textContent = textContent;
}

const switchPlayer = (data) => {
    data.currentPlayer = data.currentPlayer === 'X' ? 'O' : 'X';
    // adjust DOM
    const displayTurnText = data.currentPlayer === 'X' ? data.player1 : data.player2;
    adjustDom('turn', displayTurnText + "'s turn");
}

const easyAiMove = (data) => {
    switchPlayer(data);
    const availableCells = data.board.filter(cell => cell !== 'X' && cell !== 'O');
    const move = availableCells[Math.floor(Math.random() * availableCells.length)];

    data.board[move] = data.playerTwoToken;
    const cell = document.querySelector(`[data-index='${move}']`);
    cell.textContent = data.playerTwoToken;
    cell.classList.add('player2');

    if (endConditions(data)) {
        console.log(data);
        console.log('end game');
    }

    switchPlayer(data);
}


// 1:19:20