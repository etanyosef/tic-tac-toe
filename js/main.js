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
    

};