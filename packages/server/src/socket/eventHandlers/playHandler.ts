import { Socket } from "socket.io";

import {
  GameRoomStatesEnum,
  PlayerType,
  ServerEventsEnum,
  SidesEnum,
} from "@do/lib";

import games from "../../games";
import { play } from "../../gameUtils";
import { socket } from "../..";

export const playHandler = (
  io: Socket,
  playerId: string,
  payload: { rowIndex: number; colIndex: number; side: SidesEnum }
) => {
  console.log(`[event] play (${JSON.stringify({ playerId, payload })})`);
  const game = games.find((g) =>
    g.players.some((p: PlayerType) => p.id === playerId)
  );
  if (game && game.turn.id === playerId) {
    try {
      play(game, payload.rowIndex, payload.colIndex, payload.side);
      const event =
        game.state === GameRoomStatesEnum.OVER
          ? ServerEventsEnum.GAME_OVER
          : ServerEventsEnum.NEXT_PLAYER;
      socket.to(game.id).emit(event, game);
    } catch ({ message }) {
      io.emit(ServerEventsEnum.ERROR, { message });
    }
  } else {
    io.emit(ServerEventsEnum.ERROR, { message: "Can not play." });
  }
};
