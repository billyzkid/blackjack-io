import path from 'path';
import express from 'express';
import { createServer as createHttpServer } from 'http';
import { createServer as createSocketServer } from './socket.js';

export default async function startServer(dev) {
  if (dev) {
    const { default: snowpack } = await import('snowpack');
    const snowpackConfig = await snowpack.loadConfiguration('snowpack.config.js');
    const snowpackDevServer = await snowpack.startServer({ config: snowpackConfig });
    const socketServer = createSocketServer(snowpackDevServer.rawServer);
  } else {
    const app = express();
    const httpServer = createHttpServer(app);
    const socketServer = createSocketServer(httpServer);
    const port = process.env.PORT || 4000;
    const url = port === 4000 ? `http://localhost:${port}` : "https://blackjack-io-app.herokuapp.com";

    app.use(express.static(path.join(process.cwd(), 'build')));

    app.get('/:tableId',  (req, res) => {
      res.sendFile(path.join(process.cwd(), 'build', 'index.html'));
    });

    httpServer.listen(port, () => {
      console.info(`Open app at ${url}`);
    });
  }
}
