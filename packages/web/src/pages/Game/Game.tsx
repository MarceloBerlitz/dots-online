import React from 'react';

import { PlayerType, SidesEnum, SquareType } from 'dots-online-lib';
import Square from '../../components/Square';
import './Game.css';

type Props = {
    turn: PlayerType;
    matrix: SquareType[][];
    onClose: () => void;
    onSquareClick: (rowIndex: number, colIndex: number, side: SidesEnum) => void
};

const Game = (props: Props) => {
    return <div className="Game">
        <span className="title-span">
            <h1>Vez de "{props.turn.char}"</h1>
            <button className="close-game" onClick={props.onClose}>X</button>
        </span>
        <div className="matrix">
            {props.matrix.map((row: SquareType[], rowIndex: number) => <div className="row">
                {row.map((square: SquareType, colIndex: number) => <Square {...square}
                    rowIndex={rowIndex} colIndex={colIndex}
                    rowLength={props.matrix.length} colLength={row.length}
                    onMark={(side: SidesEnum) => props.onSquareClick(rowIndex, colIndex, side)} />)}
            </div>)}
        </div>
    </div>
}

export default Game;