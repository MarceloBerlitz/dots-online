import { Socket } from "socket.io";

import { ServerEventsEnum } from "@do/lib";
import { GameRoomFactory } from "../../factories/game-room.factory";
import { PlayerFactory } from "../../factories/player.factory";
import games from "../../games";
import { getRandomColor } from "../../gameUtils";

type Payload = { name: string, rows: number, cols: number };

export const createRoomHandler = (io: Socket, playerId: string, payload: Payload): void => {
    console.log(`[event] create-room (${JSON.stringify({ playerId, payload })})`);
    const admin = PlayerFactory.createAdmin(playerId, payload.name, getRandomColor());
    const newRoom = GameRoomFactory.create(payload.rows, payload.cols, admin);
    games.push(newRoom);
    io.join(newRoom.id);
    io.emit(ServerEventsEnum.ROOM_CREATED, newRoom);
}