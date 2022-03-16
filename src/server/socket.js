import { Server } from 'socket.io';

const TABLE_ID_LENGTH = 6;
const TABLE_ID_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function createServer(httpServer, options) {
  const server = new Server(httpServer, options);

  server.on('connect', (socket) => {
    console.log('socket connect', socket.id);

    socket.on('disconnect', () => {
      console.log('socket disconnect', socket.id);
    });

    socket.on('join table', message => {
      console.log('join table', socket.id, message.tableId);
      socket.emit('join table', {});
    });

    socket.on('create table', () => {
      const tableId = generateTableId();

      console.log('create table', socket.id, tableId);
      socket.emit('create table', { tableId });
    });
  });

  return server;
}

function generateTableId() {
  let result = '';

  for (let i = 0; i < TABLE_ID_LENGTH; i++) {
    result += TABLE_ID_CHARACTERS.charAt(Math.floor(Math.random() * TABLE_ID_CHARACTERS.length));
  }

  return result;
}

export { createServer };
