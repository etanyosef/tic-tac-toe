const dialog = document.getElementById('playersFormDialog');
const playersForm = document.getElementById('players-form');
playersForm.addEventListener('submit', (event) => {
    // prevent page refresh
    event.preventDefault();

    // initialize player data
    const playerData = new FormData(playersForm);
    const data = Object.fromEntries(playerData);
    // close dialog form
    dialog.close();

    initializeGame(data);
});

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

    // check win conditions

    console.log(cell, data);
}