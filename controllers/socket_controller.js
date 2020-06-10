/**
 * Socket Controller
 */

const debug = require('debug')('kill-the-virus:socket_controller');

const players = {}

const handleNewPlayer = function(username) {
    players[this.id] = username;
    debug(players)
}


module.exports = function(socket) {
    debug(`Client ${socket.id} connected!`);

    socket.on('newPlayer', handleNewPlayer)

}