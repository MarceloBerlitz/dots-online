import { Socket } from "socket.io";

import { PlayerType, ServerEventsEnum } from "@do/lib";

import { startGame } from "../../gameUtils";
import games from "../../games";
import { socket } from "../..";

export const startGameHandler = (io: Socket, playerId: string) => {
  console.log(`[event] start-game (${JSON.stringify({ playerId, games })})`);
  const game = games.find(
    (g) => g.players.find((p: PlayerType) => p.isAdmin)?.id === playerId
  );
  if (game) {
    try {
      startGame(game);
      socket.to(game.id).emit(ServerEventsEnum.NEXT_PLAYER, game);
    } catch (err) {
      io.emit(ServerEventsEnum.ERROR, { message: err.message });
    }
  } else {
    io.emit(ServerEventsEnum.ERROR, {
      message: "You can not start a game.",
    });
  }
};
