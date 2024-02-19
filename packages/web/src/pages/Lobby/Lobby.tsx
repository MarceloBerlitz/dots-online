import React, { useEffect, useState } from 'react';

import { PlayerType } from '@do/lib';
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
            <span>Código da sala</span>
            <div className="row">
                <input readOnly ref={roomNumberRef} value={props.roomId} />
                <button className="primary" disabled={copied} onClick={copyClickHandler}>{copied ? 'Copiado' : 'Copiar'}</button>
            </div>
        </div>
        <div className="players">
            <span>Jogadores</span>
            <div className="players-list">
                {props.players.map((player: PlayerType) => <span className="player" style={{ color: player.color }}>{player.name}</span>)}
            </div>
        </div>
        {props.isAdmin && <button className="primary" onClick={props.onStartGame}>Iniciar jogo</button>}
        <button className="accent" onClick={props.onCancel}>Sair</button>
    </div>
}

export default Lobby;