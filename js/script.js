
function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(cell());
        }
    }

    const getBoard = () => board;

    const placeToken = (column, player) => {
        const availableCells = board.filter( (row) => row[column].getValue() === 0 ).map(row => row[column]);

        if ( !(availableCells === 0) ) return;

        board[column].addToken(player);
    }

    placeToken(2, 'aw');
    console.log(placeToken());

    const printBoard = () => {
        const boardWithCellValues = board.map( (row) => row.map( (cell)  => cell.getValue() ) );
        console.log(boardWithCellValues);
    }


    return {
        getBoard, placeToken, printBoard
    }
}

function cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    }

    const getValue = () => value;

    return { addToken, getValue };
}

function gameController(playerOne = 'p1', playerTwo = 'p2') {
    const board = gameBoard();

    const players = [
        {
            name: playerOne,
            token: 1
        },
        {
            name: playerTwo,
            token: 2
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0]? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn...`);
    }

    const playRound = (cell) => {
        console.log(`Placing ${getActivePlayer().name}'s token into cell ${cell}`);

        board.placeToken(cell, getActivePlayer().token);

        switchPlayerTurn();
        printNewRound();
    }

    printNewRound();

    return { playRound, getActivePlayer, getBoard: board.getBoard }
}

gameController();