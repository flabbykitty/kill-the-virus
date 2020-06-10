var socket = io();


// Listen for when the player form is submited
document.querySelector('#player-form').addEventListener('submit', e => {
    e.preventDefault();

    // Get the value from the input
    const username = document.querySelector('#username').value

    socket.emit('newPlayer', username)

});



socket.on('newGame', (players) => {
    console.log(players)

    // Remove the register player overlay and show the game display
    document.querySelector('#register-player').classList.add('hide')
    document.querySelector('#game').classList.remove('hide')
})