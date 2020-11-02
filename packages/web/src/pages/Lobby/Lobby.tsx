import { PlayerType } from 'lib';
import React from 'react';

type Props = {
    roomId: string;
    players: PlayerType[];
    isAdmin: boolean;
    onStartGame: () => void;
}

const Lobby = (props: Props) => {
    return <div className="lobby">
        <h1>Aguardando líder...</h1>
        <p>{props.roomId}</p>
        <ul>{props.players.map((player: { char: string, id: string }) => <li>{player.char}</li>)}</ul>
        {props.isAdmin && <button onClick={props.onStartGame}>Iniciar jogo</button>}
    </div>
}

export default Lobby;