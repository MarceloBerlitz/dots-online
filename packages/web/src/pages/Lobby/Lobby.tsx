import React from 'react';

import { PlayerType } from 'lib';
import './Lobby.css';

type Props = {
    roomId: string;
    players: PlayerType[];
    isAdmin: boolean;
    onStartGame: () => void;
}

const Lobby = (props: Props) => {
    return <div className="Lobby">
        <h1>{props.roomId}</h1>
        <div className="players">
            <h2>Jogadores conectados:</h2>
            <div className="players-list">
                {props.players.map((player: { char: string, id: string }) => <span className="player-char">{player.char}</span>)}
            </div>
        </div>
        {props.isAdmin && <button onClick={props.onStartGame}>Iniciar jogo</button>}
    </div>
}

export default Lobby;