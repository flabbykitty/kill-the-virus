var socket = io();

const virusEl = document.querySelector('#virus');


// Listen for when the player form is submited
document.querySelector('#player-form').addEventListener('submit', e => {
    e.preventDefault();

    // Get the value from the input
    const username = document.querySelector('#username').value

    socket.emit('newPlayer', username)

});



socket.on('newGame', (players) => {
    const player1 = players[socket.id]
    delete players[socket.id]
    const player2 = Object.values(players)

    // Fill the players sidebars with relevant info
    document.querySelector('#player1 h1').innerHTML = player1
    document.querySelector('#player2 h1').innerHTML = player2

    // Remove the register player overlay and show the game display
    document.querySelector('#register-player').classList.add('hide')
    document.querySelector('#game').classList.remove('hide')
})

document.querySelector('#player1 button').addEventListener('click', () => {
    document.querySelector('#player1 button').innerHTML = 'Ready!'
    socket.emit("ready")
})

socket.on('startGame', (delay, position1, position2) => {
    //remove ready buttons
    document.querySelector('#player1 button').classList.add('hide');
    document.querySelector('#player2 button').classList.add('hide');

    // add the position to the virus
    virusEl.style.gridColumn = position1;
    virusEl.style.gridRow = position2;

    // after the delay, remove the class hide from the virus, and start the timer
    setTimeout(() => {
        virusEl.classList.remove('hide');

        // add timer

    }, delay)
})