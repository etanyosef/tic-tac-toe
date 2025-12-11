const startButton = document.getElementById('start-button');
startButton.addEventListener('click', () => {
    gameController.start();
});

const gameBoard = (function () {
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
    }

    return { render }

})();

// createPlayer function factory
const createPlayer = (function (name, token) {
    return { name, token }
});

const gameController = (function () {
    let gameOver;

    // function that start the game
    const start = (function () {
        // create players inside array
        const playerOne = createPlayer(document.getElementById('player1').value, 'X');
        const playerTwo = createPlayer(document.getElementById('player2').value, 'O');
        console.log(playerOne);

        // get player turn
        let activePlayer = players[0];
        const switchPlayerTurn = function () {
            activePlayer = activePlayer === players[0]? players[1] : players[0];
        }
        const getActivePlayer = () => activePlayer;

        gameOver = false;

        // display buttons in the ui
        gameBoard.render();

        //  add click listener on each button cell
        const cells = document.querySelectorAll('.cell');
        cells.forEach( (cell) => {
            cell.addEventListener('click', addToken);
        });
    });

    const addToken = (function () {
        let index = this.dataset.index;
        // this.textContent = getActivePlayer[1];
        console.log(index);
    });

    return { start, addToken }
})();

function displayController() {

}
