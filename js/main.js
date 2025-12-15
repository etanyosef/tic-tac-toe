const playersFormDialog = document.getElementById('players-form-dialog');
playersFormDialog.showModal();

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

const newGameButton = document.getElementById('new-game-button');
const resetGameButton = document.getElementById('reset-game-button');

newGameButton.addEventListener('click', () => {
    location.reload();
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
    // +variable converts it to int
    data.gameMode = +data.gameMode;
    data.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    data.playerOneToken = 'X';
    data.playerTwoToken = 'O';
    data.round = 0;
    data.currentPlayer = 'X';
    data.gameOver = false;
};

const resetBoardDom = () => {
    document.querySelectorAll('.cell').forEach((cell) => {
        cell.className = 'cell';
        cell.textContent = '';
    });
};

const addEventListenerToGameBoard = (data) => {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', (event) => {
            playMove(event.target, data);
        });
    });

    resetGameButton.addEventListener('click', () => {
        initializeVariables(data);
        resetBoardDom();
        adjustDom('turn', `${data.player1}'s turn`);
    });
};

const initializeGame = (data) => {
    // initialize game variables
    initializeVariables(data);
    // show whos turn in UI
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
        easyAiMove(data);
    } else if (data.gameMode === 2) {
        hardAiMove(data);
    }
    
};

const endConditions = (data) => {
    // 3 potential options
    // winner, tie, game not over
    if (checkWinner(data, data.currentPlayer)) {
        // display winner to UI
        const winnerName = data.currentPlayer === 'X' ? data.player1 : data.player2;
        adjustDom('turn', winnerName + " has won the game.");
        data.gameOver = true;
        return true;
    } else if (data.round === 9) {
        // display tie to UI
        adjustDom('turn', "It's a tie!");
        data.gameOver = true;
        return true;
    }
    return false;
};

const checkWinner = (data, player) => {
    let result = false;
    winConditions.forEach(condition => {
        if (
            data.board[condition[0]] === player &&
            data.board[condition[1]] === player &&
            data.board[condition[2]] === player
        ) {
            // data.gameOver = true;
            result = true;
        }
    });
    return result;
};

const adjustDom = (className, textContent) => {
    const elem = document.querySelector(`.${className}`);
    elem.textContent = textContent;
};

const switchPlayer = (data) => {
    data.currentPlayer = data.currentPlayer === 'X' ? 'O' : 'X';
    // adjust DOM
    const displayTurnText = data.currentPlayer === 'X' ? data.player1 : data.player2;
    adjustDom('turn', displayTurnText + "'s turn");
};

const easyAiMove = (data) => {
    switchPlayer(data);

    data.round++;

    const availableCells = data.board.filter(cell => cell !== 'X' && cell !== 'O');
    const move = availableCells[Math.floor(Math.random() * availableCells.length)];
    data.board[move] = data.playerTwoToken;

    setTimeout( () => {
        const cell = document.querySelector(`[data-index='${move}']`);
        cell.textContent = data.playerTwoToken;
        cell.classList.add('player2');        
    }, 300);

    if (endConditions(data)) {
        return;
    }

    switchPlayer(data); 
};

const hardAiMove = (data) => {
    switchPlayer(data);
    data.round++;
    // get possible move from minimax algorithm
    const move = minimax(data, 'O').index;
    data.board[move] = data.playerTwoToken;
    setTimeout( () => {
        const cell = document.querySelector(`[data-index='${move}']`);
        cell.textContent = data.playerTwoToken;
        cell.classList.add('player2');        
    }, 300);
    
    if (endConditions(data)) {
        return;
    }

    switchPlayer(data);
}

const minimax = (data, player) => {
    const availableCells = data.board.filter(cell => cell !== 'X' && cell !== 'O');
    // check if winner, if player1 wins set score to -100
    // if tie, set score to 0, if win, set score to 100
    if (checkWinner(data, data.playerOneToken)) {
        return {
            score: -100,
        }
    } else if (checkWinner(data, data.playerTwoToken)) {
        return {
            score: 100,
        }
    } else if (availableCells.length === 0) {
        return {
            score: 0,
        }
    }
    
    const potentialMoves = [];
    // loop over available cells to get list of all potential moves and check if wins
    for (let i = 0; i < availableCells.length; i++) {
        let move = {};
        move.index = data.board[availableCells[i]];
        data.board[availableCells[i]] = player;
        if (player === data.playerTwoToken) {
            move.score = minimax(data, data.playerOneToken).score;
        } else {
            move.score = minimax(data, data.playerTwoToken).score;
        }
        // reset the move on the board
        data.board[availableCells[i]] = move.index;
        // push the potential move to the array
        potentialMoves.push(move);
    }

    let bestMove = 0;
    if (player === data.playerTwoToken) {
        let bestScore = -10000;
        for (let i = 0; i < potentialMoves.length; i++) {
            if (potentialMoves[i].score > bestScore) {
                bestScore = potentialMoves[i].score;
                bestMove = i;
            }
        }
    } else if (player === data.playerOneToken) {
        let bestScore = 10000;
        for (let i = 0; i < potentialMoves.length; i++) {
            if (potentialMoves[i].score < bestScore) {
                bestScore = potentialMoves[i].score;
                bestMove = i;
            }
        }
    }
    return potentialMoves[bestMove];
}