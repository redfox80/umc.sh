import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';

const socket = io('https://umc.sh:3131', {
	transports: ['websocket'],
});
const client = feathers();
client.configure(socketio(socket));
client.configure(auth({
	storageKey: 'auth'
}));

export default client;