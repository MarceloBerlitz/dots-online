import { GameRoomStatesEnum } from "../enums/game-room-states.enum";
import { PlayerType } from "./player.type";
import { SquareType } from "./square.type";

export type GameRoomType = {
    id: string;
    matrix: SquareType[][];
    players: PlayerType[];
    state: GameRoomStatesEnum;
    turn?: PlayerType;
}