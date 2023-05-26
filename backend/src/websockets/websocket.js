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
    const moodsurveyRooms = new Map();
    let retroRoomsData = {};
    let moodsurveyRoomsData = {};

    const manageRoomsSize = (roomsDataIn) => {
        const maxRoomSize = 100;
        const roomKeys = Object.keys(roomsDataIn);
        if (roomKeys.size > maxRoomSize) {
            const numberOfRoomsToRemove = roomKeys.size - maxRoomSize;
            for (let i = 0; i < numberOfRoomsToRemove; i++) {
                const roomToRemove = roomKeys[i];
                console.log('Removing room:', roomKeys[i]);
                delete roomsDataIn[roomToRemove];
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
                manageRoomsSize(retroRoomsData);
            }

            // Join the room
            socket.join(roomId);
            room.clients.add(socket.id);

            // Emit a custom event to acknowledge successful room connection
            socket.emit('roomConnected', roomId);

            // Trigger the callback function if provided
            if (callback && typeof callback === 'function') {
                callback(retroRoomsData[roomId]);
            }
        });

        socket.on('join-moodsuervey-room', (roomId, callback) => {
            console.log('join-moodsuervey-room', roomId);
            let room = rooms.get(roomId);
            if (!room) {
                // Create a new room if it doesn't exist
                room = { id: roomId, clients: new Set() };
                rooms.set(roomId, room);
                manageRoomsSize(moodsurveyRoomsData);
            }

            // Join the room
            socket.join(roomId);
            room.clients.add(socket.id);

            // Emit a custom event to acknowledge successful room connection
            socket.emit('moodsuervey-room-connected', roomId);

            // Trigger the callback function if provided
            if (callback && typeof callback === 'function') {
                callback(moodsurveyRoomsData[roomId]);
            }
        });


        socket.on('board-update', (roomDetails) => {
            console.log('board-update', roomDetails.roomId);
            // Handle the vote details here
            // Forward the details to other clients in the same room
            socket.to(roomDetails.roomId).emit('board-update', roomDetails);
            retroRoomsData[roomDetails.roomId] = roomDetails;
        });

        socket.on('moodsurvey-update', (roomDetails) => {
            console.log('moodsurvey-update', roomDetails.roomId);
            console.log('\n newData' + JSON.stringify(roomDetails) + '\n');
            // Handle the vote details here
            // Forward the details to other clients in the same room
            socket.to(roomDetails.roomId).emit('moodsurvey-update', roomDetails);
            moodsurveyRoomsData[roomDetails.roomId] = roomDetails;
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