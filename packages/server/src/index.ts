import express from 'express';
import cors from 'cors';
import http from 'http';
import socket, { Socket } from 'socket.io';

import { GameRoom } from './game/gameRoom';
import { Player } from './game/player';

const app = express();
const server = http.createServer(app);
const io = socket(server);

const games: GameRoom[] = [];

app.use(cors({
   origin: 'http://localhost:3000',
   credentials: true,
}));

io.on('connection', (socket: Socket) => {
   const playerId = socket.id;
   console.log(`> Player connected: ${playerId}`);

   socket.on('create-room', (payload) => {
      console.log('> Create Room', { payload })
      const admin = Player.create(playerId, payload.char);
      const newRoom = GameRoom.create(payload.rows, payload.cols, admin);
      games.push(newRoom);
      socket.emit('room-created', newRoom);
   });

   socket.on('join-room', (payload) => {
      const game = games.find(g => g.id === payload.roomId);
      if (!game) {
         socket.emit('custom-error', { message: 'Room does not exist.' });
      } else {
         game.addPlayer(Player.create(playerId, payload.char));
         [game.admin, ...game.players].forEach(p => {
            io.to(p.id).emit('player-joined', game);
         });
      }
   });

   socket.on('start-game', () => {
      const game = games.find(g => g.admin.id === playerId);
      if (game) {
         try {
            game.startGame();
            game.players.forEach(p => io.to(p.id).emit('game-started'));
         } catch (err) {
            socket.emit('custom-error', { message: err });
         }

      } else {
         socket.emit('custom-error', { message: 'You can not start a game.' });
      }
   });

   socket.on('disconnect', () => {
      console.log(`> Player disconnected: ${playerId}`);

      const currentGameIndex = games.findIndex(game => game.admin.id === playerId || game.players.some(plr => plr.id === playerId));
      if (currentGameIndex >= 0) {
         const currentGame = games[currentGameIndex];
         [currentGame.admin, ...currentGame.players].forEach((player: Player) => {
            io.to(player.id).emit('custom-error', { message: 'Player disconnected.' });
         });
         games.splice(currentGameIndex, 1);
      }
   });

});

server.listen(3333, () => {
   console.log('Listening');
})