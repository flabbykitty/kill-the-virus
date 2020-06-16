/**
 * Socket Controller
 */

const debug = require('debug')('kill-the-virus:socket_controller');

let players = {}
let availableRoom = 1
let games = []

// [
//     {
//         room: 'game-1',
//         players: { 
//             k_TbtAwC6mVUJPWPAAAD: 'Jasmine', 
//             jt53kJF62zgb1CU7AAAC: 'Johan' 
//         },
//         ready: 0,
//         rounds: 0,
//         time: null
//     }
// ]

let io = null;

const getRandomPosition = () => {
    return Math.floor(Math.random() * 20) + 1
}

const getRandomDelay = () => {
    return Math.floor(Math.random() * (5000 - 1000)) + 1000
}


const handleNewPlayer = function(username) {
    players[this.id] = username;

    // join the current available room
    this.join('game-' + availableRoom);
    
    // if players === 2, start the game
    if(Object.keys(players).length === 2) {
        const room = 'game-' + availableRoom

        // add the room and players to the games array
        let game = {
            room,
            players,
            ready: 0,
            rounds: 0,
            time: []
        }

        games.push(game)

        io.to(room).emit('newGame', players);
        
        // empty players
        players = {}
        
        // increase the availableRoom number
        availableRoom++
    }
};

const handleReady = function() {
    const game = games.find(id => id.players[this.id]);
    game.ready++

    if(game.ready === 2) {
        // start the game
        delay = getRandomDelay()
        io.to(game.room).emit('startGame', delay, getRandomPosition(), getRandomPosition())
    }
}

const handleClicked = function() {
    const game = games.find(id => id.players[this.id]);

    game.time.push(this.id)

    if(game.time.length === 2) {

        io.to(game.room).emit('getPoint', this.id)

        game.time = []

        game.rounds++

        if(game.rounds < 10) {
            delay = getRandomDelay()
            io.to(game.room).emit('startGame', delay, getRandomPosition(), getRandomPosition())
        }
    }
}

const handleDisconnect = function() {
    delete players[this.id]
};


module.exports = function(socket) {
    io = this;
    debug(`Client ${socket.id} connected!`);

    socket.on('newPlayer', handleNewPlayer);
    
    socket.on('disconnect', handleDisconnect);

    socket.on('ready', handleReady);

    socket.on('clicked', handleClicked)
}