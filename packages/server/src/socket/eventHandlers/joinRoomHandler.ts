import { Socket } from "socket.io";

import { ServerEventsEnum } from "@do/lib";
import { PlayerFactory } from "../../factories/player.factory";
import games from "../../games";
import { addPlayer, getRandomColor } from "../../gameUtils";
import { socket } from "../..";

export const joinRoomHandler = (
  io: Socket,
  playerId: string,
  payload: { name: string; roomId: string }
) => {
  console.log(`[event] join-room (${JSON.stringify({ playerId, payload })})`);
  const game = games.find((g) => g.id === payload.roomId);
  if (!game) {
    io.emit(ServerEventsEnum.ERROR, { message: "Room does not exist." });
  } else {
    try {
      addPlayer(
        game,
        PlayerFactory.create(playerId, payload.name, getRandomColor(game))
      );
      io.join(game.id);
      socket.to(game.id).emit(ServerEventsEnum.PLAYER_JOINED, game);
    } catch (err) {
      io.emit(ServerEventsEnum.ERROR, { message: err.message });
    }
  }
};
