import React from 'react';

import { PlayerType } from 'lib';

type Props = {
    finalScore: PlayerType[];
    onOk: () => void;
}

const Over = (props: Props) => {
    return <div>
        <h1>Fim de jogo</h1>
        <h2>Resultado: </h2>
        <ol>
            {props.finalScore.map((player: PlayerType) => <li>{player.char}: {player.score}</li>)}
        </ol>
    </div>
}

export default Over;