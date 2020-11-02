import { truncate } from 'fs';
import { PlayerType, SidesEnum, SquareType } from 'lib';
import React from 'react';
import Square from '../../components/Square';

type Props = {
    turn: PlayerType;
    matrix: SquareType[][];
    onSquareClick: (rowIndex: number, colIndex: number, side: SidesEnum) => void
};

const Game = (props: Props) => {
    return <div className="game">
        <h1>Vez de {props.turn.char}</h1>
        {props.matrix.map((row: any, rowIndex: number) => <div className="row">
            {row.map((square: any, colIndex: number) => <Square {...square} onMark={(side: SidesEnum) => props.onSquareClick(rowIndex, colIndex, side)} />)}
        </div>)}
    </div>
}

export default Game;