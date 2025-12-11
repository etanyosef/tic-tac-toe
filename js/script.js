function gameBoard() {
    const board = [];

}

function displayController() {

}

const createPlayer = () => {
    const players = [];

    function player(playerName, playerToken) {
        this.name = playerName,
        this.token = playerToken
    }

    const playerOne = new player('Sagi', 'X');
    const playerTwo = new player('Mimoy', 'O');
    players.push(playerOne, playerTwo);

    console.table(players);

    return { players, player }
}

