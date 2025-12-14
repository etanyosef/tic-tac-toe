const startButton = document.getElementById('start-button');
startButton.addEventListener('click', () => {
    gameController.start();
});

function gameBoard() {
    // create board array
    let board = ['', '', '', '', '', '', '', '', ''];

    // create render function that create and display buttons in the board ui
    const render = () => {
        const boardContainer = document.querySelector('.board-container');
        boardContainer.textContent = '';
        // loop through the board array and create button each
        board.forEach( (cell, index) => {
            const cellButton = document.createElement('button');
            cellButton.classList.add('cell');
            cellButton.dataset.index = index;
            cellButton.textContent = cell;
            boardContainer.append(cellButton);
        });
    };

    return { render, board }

};

// createPlayer function factory
const createPlayer = (function (name, token) {
    return { name, token }
});

const gameController = (function () {
    let gameOver;
    let players = [];

    const board = gameBoard();

    // function that start the game
    const start = (function () {
        // create players inside array
        const playerOne = createPlayer(document.getElementById('player1').value, 'X');
        const playerTwo = createPlayer(document.getElementById('player2').value, 'O');

        players.push(playerOne);
        players.push(playerTwo);

        console.log(`Player one: ${players[0].name} Player two: ${players[1].name} `);

        // display buttons in the ui
        board.render();

        // get player turn
        let activePlayer = players[0];
        const switchPlayerTurn = function () {
            activePlayer = activePlayer === players[0]? players[1] : players[0];
        }
        const getActivePlayer = () => activePlayer;

        gameOver = false;

        const addToken = (function () {
            let index = this.dataset.index;
            index = index.toString();
            this.textContent = getActivePlayer().token;
            
            board.board[index] = getActivePlayer().token;
            
            console.log(board.board);

            switchPlayerTurn();
        });

        //  add click listener on each button cell
        const cells = document.querySelectorAll('.cell');
        cells.forEach( (cell) => {
            cell.addEventListener('click', addToken);
        });

    });

    return { start }
})();

function displayController() {

}
