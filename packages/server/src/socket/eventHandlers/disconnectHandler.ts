import { GameRoomStatesEnum, PlayerType, ServerEventsEnum } from "@do/lib";

import games from "../../games";
import { socket } from "../..";

export const disconnectHandler = (playerId: string) => {
    console.log(`[event] disconnect (${JSON.stringify({ playerId })})`);
    const currentGameIndex = games.findIndex(game => game.players.some((plr: PlayerType) => plr.id === playerId));
    if (currentGameIndex >= 0) {
        const currentGame = games[currentGameIndex];
        if (currentGame.state === GameRoomStatesEnum.CREATED) {
            socket.to(currentGame.id).emit(ServerEventsEnum.PLAYER_DISCONNECTED, currentGame);
        } else {
            games.splice(currentGameIndex, 1);
            socket.to(currentGame.id).emit(ServerEventsEnum.ERROR, { message: `${currentGame.players.find((p: PlayerType) => p.id === playerId).name} se desconectou.` })  
        }
    }
}