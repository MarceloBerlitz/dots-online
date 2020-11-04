import React, { useState } from 'react';

import './Join.css';

type Props = {
    onJoin: (roomId: string) => void;
    onBack: () => void;
}

const Join = (props: Props) => {

    const [roomId, setRoomId] = useState('');

    return <div className="Join">
        <label className="label">Código</label>
        <input className="input" type="text" value={roomId} onChange={change => setRoomId(change.currentTarget.value)} />
        <button className="primary" disabled={roomId.length === 0} onClick={() => props.onJoin(roomId)}>Entrar</button>
        <button  className="accent" onClick={() => props.onBack()}>Voltar</button>
    </div>
};

export default Join;