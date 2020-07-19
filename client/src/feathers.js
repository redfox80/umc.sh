import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';

let server;

if(process.env.NODE_ENV == 'production') {
	server = 'https://umc.sh:3030';
} else {
	server = 'http://localhost:3030';
}

const socket = io(server, {
	transports: ['websocket'],
	upgrade: false
});

const client = feathers();
client.configure(socketio(socket));
client.configure(auth({
	storageKey: 'auth'
}));

export default client;