/**
 * Socket Controller
 */

const debug = require('debug')('kill-the-virus:socket_controller');

let players = {}
let availableRoom = 1
let games = [
    {
        room: 'something',
        players: ['test', 'test'],
        ready: 0
    }
]

let io = null;


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
            ready: 0
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
}