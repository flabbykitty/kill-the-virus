/**
 * Socket Controller
 */

const debug = require('debug')('kill-the-virus:socket_controller');

let players = {}

const handleNewPlayer = function(username) {
    players[this.id] = username;
    
    // if players === 2, start the game
    if(Object.keys(players).length === 2) {
            // start the game
            this.server.emit('newGame', players)
        
            // empty players
            players = {}
        }
    };
    

const handleDisconnect = function() {
    debug(players[this.id], 'disconnected')
    delete players[this.id]
};


module.exports = function(socket) {
    debug(`Client ${socket.id} connected!`);

    socket.on('newPlayer', handleNewPlayer)
    
    socket.on('disconnect', handleDisconnect)
}