import React from 'react';

import { PlayerType } from 'dots-online-lib';
import './Over.css';

type Props = {
    finalScore: PlayerType[];
    onOk: () => void;
}

const Over = (props: Props) => {
    return <div className="Over">
        <h1>Fim de jogo</h1>
        <div className="result-box">
            <h2 className="result">Resultado: </h2>
            <ol className="list">
                {props.finalScore.map((player: PlayerType) => <li>{player.char} - {player.score} ponto(s)</li>)}
            </ol>
        </div>
        <button onClick={props.onOk}>Início</button>
    </div>
}

export default Over;