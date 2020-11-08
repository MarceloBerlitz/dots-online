import { GameRoomStatesEnum, GameRoomType, SidesEnum } from "dots-online-lib";

import { verifySquareOwned } from "./verifySquareOwned";

const markOwnedSquares = (game: GameRoomType, rowIndex: number, colIndex: number, side: SidesEnum): boolean => {
    const square = game.matrix[rowIndex][colIndex];

    const initialScore = game.turn.score;

    switch (side) {
        case 'top':
            if (game.matrix[rowIndex - 1]) {
                const above = game.matrix[rowIndex - 1][colIndex];
                if (above && verifySquareOwned(above)) {
                    above.owner = game.turn;
                    game.turn.score++;
                }
            }
            break;
        case 'right':
            const next = game.matrix[rowIndex][colIndex + 1];
            if (next && verifySquareOwned(next)) {
                next.owner = game.turn;
                game.turn.score++;
            }
            break;
        case 'bottom':
            if (game.matrix[rowIndex + 1]) {
                const bellow = game.matrix[rowIndex + 1][colIndex];
                if (bellow && verifySquareOwned(bellow)) {
                    bellow.owner = game.turn;
                    game.turn.score++;
                }
            }
            break;
        case 'left':
            const prev = game.matrix[rowIndex][colIndex - 1];
            if (prev && verifySquareOwned(prev)) {
                prev.owner = game.turn;
                game.turn.score++;
            }
            break;
    }

    if (verifySquareOwned(square)) {
        square.owner = game.turn;
        game.turn.score++;
    }

    if (game.turn.score > initialScore) {
        if (game.players.map(p => p.score).reduce((acc, cur) => acc + cur, 0) === (game.matrix.length) * (game.matrix[0].length)) {
            game.state = GameRoomStatesEnum.OVER;
        };
        return true;
    } else {
        return false;
    }
};

export const play = (game: GameRoomType, rowIndex: number, colIndex: number, side: SidesEnum): void => {
    const square = game.matrix[rowIndex][colIndex];
    if (square[side].isMarked) {
        throw new Error('Already taken.');
    }
    square[side].isMarked = true;

    if (markOwnedSquares(game, rowIndex, colIndex, side)) {
        return;
    };

    const currentTurnIndex = game.players.indexOf(game.turn);
    if (currentTurnIndex < (game.players.length - 1)) {
        game.turn = game.players[currentTurnIndex + 1];
        return;
    }
    game.turn = game.players[0];
}