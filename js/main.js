const dialog = document.getElementById('playersFormDialog');
const playersForm = document.getElementById('players-form');
playersForm.addEventListener('submit', (event) => {
    // prevent page refresh
    event.preventDefault();

    // initialize player data
    const playerData = new FormData(playersForm);
    const data = Object.fromEntries(playerData);
    dialog.close();
    console.log(data);
})