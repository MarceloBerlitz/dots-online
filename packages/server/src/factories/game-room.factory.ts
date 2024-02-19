import { GameRoomStatesEnum, GameRoomType, PlayerType } from '@do/lib';
import { MatrixFactory } from './matrix.factory';

export class GameRoomFactory {

    public static create(rows: number, cols: number, creator: PlayerType): GameRoomType {
        return {
            id: Date.now().toString().substring(6, 12),
            players: [creator],
            matrix: MatrixFactory.create(rows, cols),
            state: GameRoomStatesEnum.CREATED
        }
    }
}