import { io } from 'socket.io-client';

const BE_URL = process.env.REACT_APP_BACKEND_HOST;
console.log(' process.env',  process.env);
const WebSocketURL = BE_URL.includes('localhost') ? 'http://localhost:3002' : 'https://api.appnirvana.co';
const Options =  {
    reconnectionDelayMax: 10000,
  }

let socket = null;

const OpenSocket = () => {
    if(socket === null) {
        const socketURL = `${WebSocketURL}`;
        socket = io(socketURL, Options);
    }        
    return socket;
};

const ConnectToRoomById = (roomId, callback) => {
    if(socket === null || !socket)
        OpenSocket();
    if(!roomId) {
        alert(`Sorry we ran into an issue. Please try again later.\nError: roomId is not defined`);
        return console.error('roomId is not defined');
    }
    socket.emit('joinRoom', roomId, callback);
};

export { ConnectToRoomById, OpenSocket};