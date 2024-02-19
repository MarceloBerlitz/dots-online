import { GameRoomStatesEnum, PlayerType, ServerEventsEnum, SidesEnum } from "@do/lib";
import games from "../../games";
import { play } from "../../gameUtils";
import { io } from '../..';
import { Socket } from "socket.io";

export const playHandler = (socket: Socket, playerId: string, payload: { rowIndex: number, colIndex: number, side: SidesEnum }) => {
    console.log(`[event] play (${JSON.stringify({ playerId, payload })})`);
    const game = games.find(g => g.players.some((p: PlayerType) => p.id === playerId));
    if (game && game.turn.id === playerId) {
        try {
            play(game, payload.rowIndex, payload.colIndex, payload.side);
            if (game.state === GameRoomStatesEnum.OVER) {
                game.players.forEach((p: PlayerType) => io.to(p.id).emit(ServerEventsEnum.GAME_OVER, game));
            } else {
                game.players.forEach((p: PlayerType) => io.to(p.id).emit(ServerEventsEnum.NEXT_PLAYER, game));
            }
        } catch ({ message }) {
            socket.emit(ServerEventsEnum.ERROR, { message });
        }
    } else {
        socket.emit(ServerEventsEnum.ERROR, { message: 'Can not play.' });
    }
}