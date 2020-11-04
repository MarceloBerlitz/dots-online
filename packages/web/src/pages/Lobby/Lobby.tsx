import React, { useEffect, useState } from 'react';

import { PlayerType } from 'dots-online-lib';
import './Lobby.css';

type Props = {
    roomId: string;
    players: PlayerType[];
    isAdmin: boolean;
    onStartGame: () => void;
    onCancel: () => void;
}

const Lobby = (props: Props) => {
    const [copied, setCopied] = useState(false);
    const roomNumberRef = React.createRef<HTMLInputElement>();

    useEffect(() => {
        if (copied === true) {
            setTimeout(() => {
                setCopied(false);
            }, 1000)
        }
    }, [copied])

    const copyClickHandler = () => {
        roomNumberRef.current?.select();
        document.execCommand('copy');
        setCopied(true);
    }

    return <div className="Lobby">
        <div className="room">
            <h3>Número da sala:</h3>
            <div className="row"><input ref={roomNumberRef} value={props.roomId} /> <button disabled={copied} onClick={copyClickHandler}>{copied ? 'Copiado' : 'Copiar'}</button></div>
        </div>
        <div className="players">
            <h3>Jogadores conectados:</h3>
            <div className="players-list">
                {props.players.map((player: PlayerType) => <span className="player-char" style={{ color: player.color }}>{player.name}</span>)}
            </div>
        </div>
        {props.isAdmin && <button onClick={props.onStartGame}>Iniciar jogo</button>}
        <button onClick={props.onCancel}>Sair</button>
    </div>
}

export default Lobby;