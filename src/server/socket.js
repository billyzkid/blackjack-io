import { Server } from 'socket.io';

function createServer(httpServer, options) {
  const server = new Server(httpServer, options);

  server.on('connect', (socket) => {
    console.log('socket connect', socket.id);

    socket.on('disconnect', () => {
      console.log('socket disconnect', socket.id);
    });
  });

  return server;
}

export { createServer };
