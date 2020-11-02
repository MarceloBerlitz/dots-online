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
    public players: Player[] = [];
    public turn: Player;
    public state: GameRoomStatesEnum = GameRoomStatesEnum.CREATED;

    private constructor(
        rows: number, cols: number, creator: Player
    ) {
        const rowList = [];
        for (let row = 0; row < rows; row++) {
            const colList = [];
            for (let col = 0; col < cols; col++) {
                const newSquare = Square.create(
                    row === 0 ? { isMarked: false } : rowList[row - 1][col].bottom,
                    { isMarked: false },
                    { isMarked: false },
                    col === 0 ? { isMarked: false } : colList[col - 1].right,
                )
                colList.push(newSquare);
            }
            rowList.push(colList);
        }
        this.id = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        this.players = [creator];
        this.matrix = rowList;
    }

    public static create(rows: number, cols: number, creator: Player) {
        return new GameRoom(rows, cols, creator);
    }

    private verifySquareOwned(square: Square): boolean {
        return !square.owner && square.top.isMarked && square.right.isMarked && square.bottom.isMarked && square.left.isMarked;
    }

    private markOwnedSquares(rowIndex: number, colIndex: number, side: 'top' | 'right' | 'bottom' | 'left'): boolean {
        const square = this.matrix[rowIndex][colIndex];

        const initialScore = this.turn.score;

        switch (side) {
            case 'top':
                if (this.matrix[rowIndex - 1]) {
                    const above = this.matrix[rowIndex - 1][colIndex];
                    if (this.verifySquareOwned(above)) {
                        above.owner = this.turn;
                        this.turn.score++;
                    }
                }
                break;
            case 'right':
                const next = this.matrix[rowIndex][colIndex + 1];
                if (next && this.verifySquareOwned(next)) {
                    next.owner = this.turn;
                    this.turn.score++;
                }
                break;
            case 'bottom':
                if (this.matrix[rowIndex + 1]) {
                    const bellow = this.matrix[rowIndex + 1][colIndex];
                    if (this.verifySquareOwned(bellow)) {
                        bellow.owner = this.turn;
                        this.turn.score++;
                    }
                }
                break;
            case 'left':
                const prev = this.matrix[rowIndex][colIndex - 1];
                if (prev && this.verifySquareOwned(prev)) {
                    prev.owner = this.turn;
                    this.turn.score++;
                }
                break;
        }

        if (this.verifySquareOwned(square)) {
            square.owner = this.turn;
            this.turn.score++;
        }

        if (this.turn.score > initialScore) {
            if (this.players.map(p => p.score).reduce((acc, cur) => acc + cur, 0) < (this.matrix.length + 1) * (this.matrix[0].length + 1)) {
                this.turn.winner = true;
            };
            return true;
        } else {
            return false;
        }
    }

    public addPlayer(player: Player): void {
        if (this.state !== GameRoomStatesEnum.CREATED) {
            throw new Error('Can not add players after the game already started.');
        }
        if (this.players.some(plr => plr.char === player.char)) {
            throw new Error('Character is already in use.');
        }
        this.players.push(player);
    }

    public startGame(): void {
        if (this.players.length < 2) {
            throw new Error('At least 1 more player is required to start the game.');
        }
        this.state = GameRoomStatesEnum.RUNNING;
        const firstIndex = Math.round(Math.random() * (this.players.length - 1));
        console.log({ firstIndex });
        this.turn = this.players[firstIndex];
    }

    public play(rowIndex: number, colIndex: number, side: 'top' | 'right' | 'bottom' | 'left'): void {
        const square = this.matrix[rowIndex][colIndex];
        if (square[side].isMarked) {
            throw new Error('Already taken.');
        }
        square[side].isMarked = true;

        if (this.markOwnedSquares(rowIndex, colIndex, side)) {
            return;
        };

        const currentTurnIndex = this.players.indexOf(this.turn);
        if (currentTurnIndex < (this.players.length - 1)) {
            this.turn = this.players[currentTurnIndex + 1];
            return;
        }
        this.turn = this.players[0];
    }
}