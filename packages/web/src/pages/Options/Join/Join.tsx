import React, { useState } from 'react';

type Props = {
    onJoin: (roomId: string) => void
}

const Join = (props: Props) => {

    const [roomId, setRoomId] = useState('');

    return <div>
        <label>
            <input type="text" value={roomId} onChange={change => setRoomId(change.currentTarget.value)} />
        </label>
        <button disabled={roomId.length === 0} onClick={() => props.onJoin(roomId)}>Entrar</button>
    </div>
};

export default Join;