import express from 'express';
import cors from 'cors';
import http from 'http';
import socket, { Socket } from 'socket.io';

import { GameRoom } from './game/gameRoom';
import { Player } from './game/player';
import { GameRoomStatesEnum } from 'dots-online-lib';

const app = express();
const server = http.createServer(app);
const io = socket(server);
const port = process.env.PORT || 3333;

const games: GameRoom[] = [];

app.use(cors({
   origin: process.env.WEB_URL || 'http://localhost:3000',
   credentials: true,
}));

io.on('connection', (socket: Socket) => {
   const playerId = socket.id;
   console.log(`> Player connected: ${playerId}`);

   socket.on('create-room', (payload) => {
      console.log('> Create Room', { payload })
      const admin = Player.createAdmin(playerId, payload.char);
      const newRoom = GameRoom.create(payload.rows, payload.cols, admin);
      games.push(newRoom);
      socket.emit('room-created', newRoom);
   });

   socket.on('join-room', (payload) => {
      const game = games.find(g => g.id === payload.roomId);
      if (!game) {
         socket.emit('custom-error', { message: 'Room does not exist.' });
      } else {
         try {
            game.addPlayer(Player.create(playerId, payload.char));
            game.players.forEach(p => {
               io.to(p.id).emit('player-joined', game);
            });
         } catch (err) {
            socket.emit('custom-error', { message: err });
         }
      }
   });

   socket.on('start-game', () => {
      const game = games.find(g => g.players.find(p => p.isAdmin).id === playerId);
      if (game) {
         try {
            game.startGame();
            game.players.forEach(p => io.to(p.id).emit('next-player', game));
         } catch (err) {
            socket.emit('custom-error', { message: err });
         }
      } else {
         socket.emit('custom-error', { message: 'You can not start a game.' });
      }
   });

   socket.on('play', (payload) => {
      const game = games.find(g => g.players.some(p => p.id === playerId));
      if (game && game.turn.id === playerId) {
         try {
            game.play(payload.rowIndex, payload.colIndex, payload.side);
            if (game.state === GameRoomStatesEnum.OVER) {
               game.players.forEach(p => io.to(p.id).emit('game-over', game));
            } else {
               game.players.forEach(p => io.to(p.id).emit('next-player', game));
            }
         } catch (err) {
            socket.emit('custom-error', { message: err });
         }
      } else {
         socket.emit('custom-error', { message: 'Can not play.' });
      }

   })

   socket.on('disconnect', () => {
      console.log(`> Player disconnected: ${playerId}`);

      const currentGameIndex = games.findIndex(game => game.players.some(plr => plr.id === playerId));
      if (currentGameIndex >= 0) {
         const currentGame = games[currentGameIndex];
         currentGame.players.forEach((player: Player) => {
            io.to(player.id).emit('custom-error', { message: 'Player disconnected.' });
         });
         games.splice(currentGameIndex, 1);
      }
   });

});

app.use(express.static('public'));

server.listen(port, () => {
   console.log('Listening on port ' + port);
})