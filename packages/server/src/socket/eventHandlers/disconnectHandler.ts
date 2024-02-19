import { GameRoomStatesEnum, PlayerType, ServerEventsEnum } from "@do/lib";
import games from "../../games";
import { io } from '../..';

export const disconnectHandler = (playerId: string) => {
    console.log(`[event] disconnect (${JSON.stringify({ playerId })})`);
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
}