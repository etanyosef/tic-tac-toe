const startButton = document.getElementById('start-button');
startButton.addEventListener('click', () => {
    gameController.start();
});

const gameBoard = (function () {
    // create board array
    let board = ['', '', '', '', '', '', '', '', ''];

    const render = () => {
        const boardContainer = document.querySelector('.board-container');
        // loop through the board array and create button each
        board.forEach( (cell, index) => {
            const cellButton = document.createElement('button');
            cellButton.classList.add('cell');
            cellButton.dataset.index = index;
            cellButton.textContent = cell;
            boardContainer.append(cellButton);
        });
        //
        const cells = document.querySelectorAll('.cell');
        cells.forEach( (cell) => {
            cell.addEventListener('click', gameController.addToken);
        });
    }

    return { render }

})();

// createPlayer function factory
const createPlayer = (function (name, token) {
    return { name, token }
});

const gameController = (function () {
    let players = [];
    let activePlayer;
    let gameOver;

    // start game
    const start = (function () {
        // create players inside array
        players = [
            createPlayer(document.getElementById('player1').value, 'X'),
            createPlayer(document.getElementById('player2').value, 'O')
        ];

        activePlayer = 0;
        gameOver = false;
        // display buttons
        gameBoard.render();
    });

    const addToken = (function (event) {
        let index = event.target.dataset.index;
        console.log(index);
    });

    return { start, addToken }
})();

function displayController() {

}


