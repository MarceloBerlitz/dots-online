import express from 'express';
import cors from 'cors';
import http from 'http';
import socketio from 'socket.io';

import { listenToSocketEvents } from './socket/listenToSocketEvents';

const app = express();
const server = http.createServer(app);
listenToSocketEvents(socketio(server));
const port = process.env.PORT || 3333;

app.use(cors({
   origin: process.env.WEB_URL || 'http://localhost:3000',
   credentials: true,
}));

app.use(express.static('public'));

server.listen(port, () => {
   console.log('Listening on port ' + port);
})