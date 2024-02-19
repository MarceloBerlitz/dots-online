import React from 'react';

import { PlayerType, SidesEnum, SquareType } from '@do/lib';
import Square from '../../components/Square';
import './Game.css';

type Props = {
    turn: PlayerType;
    matrix: SquareType[][];
    onClose: () => void;
    onSquareClick: (rowIndex: number, colIndex: number, side: SidesEnum) => void
};

const Game = (props: Props) => {

    const closeHandler = () => {
        if (window.confirm('Deseja sair do jogo?')) props.onClose()
    }

    return <div className="Game">
        <button className="close-game" onClick={closeHandler}>X</button>
        <span className="title-span">
            <label>Vez de <span style={{ color: props.turn.color }}>{props.turn.name}</span></label>
        </span>
        <div className="container">
            <div className="matrix">
                {props.matrix.map((row: SquareType[], rowIndex: number) => <div className="row">
                    {row.map((square: SquareType, colIndex: number) => <Square {...square}
                        rowIndex={rowIndex} colIndex={colIndex}
                        rowLength={props.matrix.length} colLength={row.length}
                        onMark={(side: SidesEnum) => props.onSquareClick(rowIndex, colIndex, side)} />)}
                </div>)}
            </div>
        </div>
    </div>
}

export default Game;