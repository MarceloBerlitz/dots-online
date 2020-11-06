import { Server, Socket } from 'socket.io';

import { ClientEventsEnum, GameRoomStatesEnum, PlayerType, ServerEventsEnum } from 'dots-online-lib';

import games from '../games';
import { startGame, play } from '../gameUtils';
import { createRoomHandler } from './eventHandlers/createRoomHandler';
import { joinRoomHandler } from './eventHandlers/joinRoomHandler';

export const listenToSocketEvents = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        const playerId = socket.id;
        console.log(`>> Player connected: ${playerId}`);

        socket.on(ClientEventsEnum.CREATE_ROOM, (payload) => createRoomHandler(socket, playerId, payload));
        socket.on(ClientEventsEnum.JOIN_ROOM, (payload) => joinRoomHandler(socket, io, playerId, payload));

        socket.on(ClientEventsEnum.START_GAME, () => {
            const game = games.find(g => g.players.find((p: PlayerType) => p.isAdmin).id === playerId);
            if (game) {
                try {
                    startGame(game);
                    game.players.forEach((p: PlayerType) => io.to(p.id).emit(ServerEventsEnum.NEXT_PLAYER, game));
                } catch (err) {
                    socket.emit(ServerEventsEnum.ERROR, { message: err.message });
                }
            } else {
                socket.emit(ServerEventsEnum.ERROR, { message: 'You can not start a game.' });
            }
        });

        socket.on(ClientEventsEnum.PLAY, (payload) => {
            const game = games.find(g => g.players.some((p: PlayerType) => p.id === playerId));
            if (game && game.turn.id === playerId) {
                try {
                    play(game, payload.rowIndex, payload.colIndex, payload.side);
                    if (game.state === GameRoomStatesEnum.OVER) {
                        game.players.forEach((p: PlayerType) => io.to(p.id).emit(ServerEventsEnum.GAME_OVER, game));
                    } else {
                        game.players.forEach((p: PlayerType) => io.to(p.id).emit(ServerEventsEnum.NEXT_PLAYER, game));
                    }
                } catch (err) {
                    socket.emit(ServerEventsEnum.ERROR, { message: err.message });
                }
            } else {
                socket.emit(ServerEventsEnum.ERROR, { message: 'Can not play.' });
            }

        })

        socket.on('disconnect', () => {
            console.log(`> Player disconnected: ${playerId}`);

            const currentGameIndex = games.findIndex(game => game.players.some((plr: PlayerType) => plr.id === playerId));
            if (currentGameIndex >= 0) {
                const currentGame = games[currentGameIndex];
                if (currentGame.state === GameRoomStatesEnum.CREATED) {
                    currentGame.players = currentGame.players.filter((p: PlayerType) => p.id !== playerId);
                    currentGame.players.forEach((player: PlayerType) => {
                        io.to(player.id).emit(ServerEventsEnum.PLAYER_DISCONNECTED, currentGame);
                    });
                } else {
                    currentGame.players.forEach((player: PlayerType) => {
                        io.to(player.id).emit(ServerEventsEnum.ERROR, { message: `${currentGame.players.find((p: PlayerType) => p.id === playerId).name} se desconectou.` });
                    });
                    games.splice(currentGameIndex, 1);
                }
            }
        });

    });

}