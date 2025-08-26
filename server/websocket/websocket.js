import { Server } from "socket.io";

const setupWebSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: [
                "http://localhost:5173",
                "http://192.168.12.250:3008",
                "http://192.168.12.250:3009",
                "http://192.168.12.250:3333",
                "http://192.168.12.250:9030",
            ],
            methods: ["GET", "POST"],
            allowedHeaders: ["Auth-Type", "Content-Type", "Authorization", "token-authorization"],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        socket.on('statusChange', async (data) => {
            try {
                // Broadcast the update to all connected clients
                io.emit('noticeUpdate', {
                    NoticeHeaderID: data.noticeId,
                    // Include any other relevant notice data
                    ESTADO: data.ESTADO,
                    updatedAt: new Date().toISOString()
                });
            } catch (error) {
                console.error('Error handling status change:', error);
            }
        });

        socket.on('disconnect', () => {
            // console.log('Client disconnected');
        });
    });

    return io;
};

export default setupWebSocket;