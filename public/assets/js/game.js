let socket = io();

const virusEl = document.querySelector('#virus');

// let timer;
// let newListItem;


/**
 * Function
 */



const clickedFunction = () => {
    // clearInterval(timer);

    socket.emit('clicked');

    virusEl.removeEventListener('click', clickedFunction);
}
/**
 * Event listeners
 */


// Listen for when the player form is submited
document.querySelector('#player-form').addEventListener('submit', e => {
    e.preventDefault();
    
    // Get the value from the input
    const username = document.querySelector('#username').value
    
    socket.emit('newPlayer', username)
    
});

// Listen for when player clicks the ready button
document.querySelector('#player1 button').addEventListener('click', () => {
    document.querySelector('#player1 button').innerHTML = 'Ready!'
    socket.emit("ready")
})

/**
 * Sockets
 */

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


socket.on('startGame', (delay, position1, position2) => {
    //remove ready buttons
    document.querySelector('#player1 button').classList.add('hide');
    document.querySelector('#player2 button').classList.add('hide');

    // add the position to the virus
    virusEl.style.gridColumn = position1;
    virusEl.style.gridRow = position2;

    // after the delay, remove the class hide from the virus
    setTimeout(() => {
        virusEl.classList.remove('hide');

        // let startTime = new Date().getTime()

        // const ul = document.querySelector('#timer1')
        // const li = document.createElement('LI')
        // newListItem = ul.appendChild(li)

        // timer = setInterval(() => {
        //     let diff = moment(new Date().getTime()).diff(moment(startTime));
        //     socket.emit('sendingTimes', diff)
            
        //     newListItem.innerHTML = moment(diff).format('mm:ss:SSS');
        // }, 1) 

        virusEl.addEventListener('click', clickedFunction)
        
    }, delay)

})


socket.on('getPoint', id => {
    let player = null;

    id === socket.id
        ? player = 'player2'
        : player = 'player1'
    
    let oldScore = Number(document.querySelector(`#${player}Score`).innerHTML);
    let newScore = ++oldScore;
    document.querySelector(`#${player}Score`).innerHTML = newScore;

    // hide the virus
    virusEl.classList.add('hide')
})