import React from 'react';

import { PlayerType } from '@do/lib';
import './Over.css';

type Props = {
    finalScore: PlayerType[];
    onOk: () => void;
}

const Over = (props: Props) => {
    return <div className="Over">
        <span className="title">Fim de jogo</span>
        <div className="result-box">
            <span className="result">Resultado: </span>
            <table className="table">
                <thead>
                    <tr>
                        <th>Jogador</th><th>Pontos</th>
                    </tr>
                </thead>
                <tbody>
                    {props.finalScore.map((player: PlayerType) => <tr><td style={{ color: player.color }}>{player.name}</td><td>{player.score}</td></tr>)}
                </tbody>

            </table>
        </div>
        <button className="primary" onClick={props.onOk}>Início</button>
    </div>
}

export default Over;