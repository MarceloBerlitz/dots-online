import { PlayerType } from "./playerType";
import { SquareType } from "./squareType";

export enum GameRoomStatesEnum {
    CREATED,
    RUNNING,
    OVER
}

export type GameRoomType = {
    id: string;
    matrix: SquareType[][];
    players: PlayerType[];
    turn: PlayerType;
    state: GameRoomStatesEnum;
}