var socket = io();

console.log('hello from game js');

// Listen for when the player form is submited
document.querySelector('#player-form').addEventListener('submit', e => {
    e.preventDefault();

    console.log('I am being clicked!')

    // Get the value from the input
    const username = document.querySelector('#username').value

    socket.emit('newPlayer', username)

});