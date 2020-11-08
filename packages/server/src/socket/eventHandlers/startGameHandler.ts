import { Socket } from "socket.io";

import { PlayerType, ServerEventsEnum } from "dots-online-lib";
import { startGame } from "../../gameUtils";
import { io } from '../..'
import games from "../../games";

export const startGameHandler = (socket: Socket, playerId: string) => {
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
}
