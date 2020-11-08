import { Server, Socket } from 'socket.io';

import { ClientEventsEnum } from 'dots-online-lib';

import { createRoomHandler } from './eventHandlers/createRoomHandler';
import { joinRoomHandler } from './eventHandlers/joinRoomHandler';
import { startGameHandler } from './eventHandlers/startGameHandler';
import { playHandler } from './eventHandlers/playHandler';
import { disconnectHandler } from './eventHandlers/disconnectHandler';

export const listenToSocketEvents = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        const playerId = socket.id;
        console.log(`>> Player connected: ${playerId}`);

        socket.on(ClientEventsEnum.CREATE_ROOM, (payload) => createRoomHandler(socket, playerId, payload));
        socket.on(ClientEventsEnum.JOIN_ROOM, (payload) => joinRoomHandler(socket, playerId, payload));
        socket.on(ClientEventsEnum.START_GAME, () => startGameHandler(socket, playerId));
        socket.on(ClientEventsEnum.PLAY, (payload) => playHandler(socket, playerId, payload))
        socket.on('disconnect', () => disconnectHandler(playerId));

    });

}