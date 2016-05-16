/**
 * Created by talbm on 15/05/2016.
 */

const EventEmitter = require('events');
const util = require('util');

function ParticleEventEmitter() {
    EventEmitter.call(this);
}
util.inherits(ParticleEventEmitter, EventEmitter);

const particleEventEmitter = new ParticleEventEmitter();
// ParticleEventEmitter.on('event', function() {
//     console.log('an event occurred!');
// });
// ParticleEventEmitter.emit('event');


particleEventEmitter.ReceiveData = function (data) {
  this.emit('dataReceived', data);
};


module.exports = particleEventEmitter;