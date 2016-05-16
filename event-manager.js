/**
 * Created by talbm on 15/05/2016.
 */
// var socketio = require('socket.io');
// var PrticleEventEmitter = require('./ParticleEventEmitter');

function Manager(server) {
    // var io = socketio(server);
    // var savedClient;
    //
    // PrticleEventEmitter.on('dataReceived', function (data) {
    //     if (savedClient) {
    //         savedClient.emit('message', data);
    //     }
    // });
    //
    // io.on('connect', function (client) {
    //     if (client) {
    //         savedClient = client;
    //
    //         savedClient.on('join', function (data) {
    //             //console.log(data);
    //         });
    //
    //         savedClient.on('disconnect', function () {
    //             savedClient = null;
    //
    //         });
    //
    //     }
    // });
}

module.exports = Manager;