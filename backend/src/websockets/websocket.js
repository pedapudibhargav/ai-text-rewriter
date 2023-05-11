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

    io.on("connection", (socket) => {
        console.log("New client connected");
        socket.on('joinRoom', (roomId) => {
            console.log('joinRoom', roomId);
            let room = rooms.get(roomId);

            if (!room) {
                // Create a new room if it doesn't exist
                room = { id: roomId, clients: new Set() };
                rooms.set(roomId, room);
            }

            // Join the room
            socket.join(roomId);
            room.clients.add(socket.id);

            // Emit a custom event to acknowledge successful room connection
            socket.emit('roomConnected', roomId);
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