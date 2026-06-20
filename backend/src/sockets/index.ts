import { Server, Socket } from 'socket.io';

export default function setupSockets(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log('Client connected:', socket.id);
    
    socket.on('join-room', (room) => {
      socket.join(room);
      console.log(`Socket ${socket.id} joined room: ${room}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}
