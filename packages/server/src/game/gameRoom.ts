import { Player } from "./player";
import { Square } from "./square";

enum GameRoomStatesEnum {
    CREATED,
    RUNNING,
    OVER
}

export class GameRoom {

    public id: string;
    public matrix: Square[][];
    public admin: Player;
    public players: Player[] = [];
    public state: GameRoomStatesEnum = GameRoomStatesEnum.CREATED;

    private constructor(
        rows: number, cols: number, creator: Player
    ) {
        const rowList = [];
        for (let i = 0; i < rows; i++) {
            const colList = [];
            for (let h = 0; h < cols; h++) {
                colList.push(new Square());
            }
            rowList.push(colList);
        }
        this.id = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        this.admin = creator;
        this.matrix = rowList;
    }

    public static create(rows: number, cols: number, creator: Player) {
        return new GameRoom(rows, cols, creator);
    }


    public addPlayer(player: Player): void {
        if (this.state !== GameRoomStatesEnum.CREATED) {
            throw new Error('Can not add players after the game already started.');
        }
        if (this.players.some(plr => plr.char === player.char) || this.admin.char === player.char) {
            throw new Error('Character is already in use.');
        }
        this.players.push(player);
    }

    public startGame(): void {
        if (this.players.length === 0) {
            throw new Error('At least 1 more player is required to start the game.');
        }
        this.state = GameRoomStatesEnum.RUNNING;
    }
}