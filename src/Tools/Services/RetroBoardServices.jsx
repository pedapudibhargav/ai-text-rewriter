import { io } from 'socket.io-client';

const BE_URL = process.env.REACT_APP_BACKEND_HOST;
console.log(' process.env',  process.env);
const WebSocketURL = BE_URL.includes('localhost') ? 'http://localhost:3002' : 'https://api.appnirvana.co';
const Options =  {
    reconnectionDelayMax: 10000,
  }

let socket = null;

const OpenSocket = () => {
    console.log('socket:', socket);
    const socketURL = `${WebSocketURL}`;
    console.log('socketURL', socketURL);
    if(socket === null)
        socket = io(socketURL, Options);
    console.log('--- opened socket:', socket);
};

const ConnectToRoomById = (roomId) => {
    OpenSocket();
    if(!roomId) {
        alert(`Sorry we ran into an issue. Please try again later.\nError: roomId is not defined`);
        return console.error('roomId is not defined');
    }
    console.log('--- roomId:', roomId);
    socket.emit('joinRoom', roomId);
};

export { ConnectToRoomById};