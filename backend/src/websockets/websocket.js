const http = require("http");
const socketIo = require("socket.io");

const webSocketServer = (app, allowedOrigins) => {
    const server = http.createServer(app);
    const io = socketIo(server, {
        cors: {
            origin: allowedOrigins
        }
    });
    const rooms = new Map();
    let roomsData = {};

    const manageRoomsSize = () => {
        const maxRoomSize = 100;
        const roomKeys = Object.keys(roomsData);
        if (roomKeys.size > maxRoomSize) {
            const numberOfRoomsToRemove = roomKeys.size - maxRoomSize;
            for (let i = 0; i < numberOfRoomsToRemove; i++) {
                const roomToRemove = roomKeys[i];
                console.log('Removing room:', roomKeys[i]);
                delete roomsData[roomToRemove];
            }
        }
    };

    io.on("connection", (socket) => {
        console.log("New client connected");
        socket.on('joinRoom', (roomId, callback) => {
            console.log('joinRoom', roomId);
            let room = rooms.get(roomId);

            if (!room) {
                // Create a new room if it doesn't exist
                room = { id: roomId, clients: new Set() };
                rooms.set(roomId, room);
                manageRoomsSize();
            }

            // Join the room
            socket.join(roomId);
            room.clients.add(socket.id);

            // Emit a custom event to acknowledge successful room connection
            socket.emit('roomConnected', roomId);

            // Trigger the callback function if provided
            if (callback && typeof callback === 'function') {
                callback(roomsData[roomId]);
            }
        });


        socket.on('board-update', (roomDetails) => {
            console.log('board-update', roomDetails.roomId);
            // Handle the vote details here
            // Forward the details to other clients in the same room
            socket.to(roomDetails.roomId).emit('board-update', roomDetails);
            roomsData[roomDetails.roomId] = roomDetails;
        });


        socket.on('disconnect', () => {
            // Remove the client from the room when disconnected
            rooms.forEach((room) => {
                if (room.clients.has(socket.id)) {
                    room.clients.delete(socket.id);
                    if (room.clients.size === 0) {
                        // If all clients left the room, remove the room
                        rooms.delete(room.id);
                    }
                }
            });
        });
    });
    return server;
};

module.exports = webSocketServer;