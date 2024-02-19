import { Server, Socket } from "socket.io";

import { PlayerType, ServerEventsEnum } from "@do/lib";
import { PlayerFactory } from "../../factories/player.factory";
import games from "../../games";
import { addPlayer, getRandomColor } from "../../gameUtils";
import { io } from '../..';

export const joinRoomHandler = (socket: Socket, playerId: string, payload: { name: string, roomId: string }) => {
    console.log(`[event] join-room (${JSON.stringify({ playerId, payload })})`);
    const game = games.find(g => g.id === payload.roomId);
    if (!game) {
        socket.emit(ServerEventsEnum.ERROR, { message: 'Room does not exist.' });
    } else {
        try {
            addPlayer(game, PlayerFactory.create(playerId, payload.name, getRandomColor(game)));
            game.players.forEach((p: PlayerType) => {
                io.to(p.id).emit(ServerEventsEnum.PLAYER_JOINED, game);
            });
        } catch (err) {
            socket.emit(ServerEventsEnum.ERROR, { message: err.message });
        }
    }
}