import React, { useEffect, useState } from 'react';

import io from 'socket.io-client';

import Square from '../../components/Square';
import { SquareType } from '../../shared/SquareType';

import './App.css';

const socket = io('http://localhost:3333');

socket.on('connect', () => {
  const playerId = socket.id
  console.log(`Player connected on Client with id: ${playerId}`)
});

socket.on('error', (payload: { message: string }) => {
  alert(payload.message);
})

function App() {
  const [gameRoom, setGameRoom] = useState<any>(null);
  const [char, setChar] = useState('');
  const [roomId, setRoomId] = useState('');

  useEffect(() => {
    socket.on('room-created', (payload: any) => {
      console.log('Room created', { payload });
      setGameRoom(payload);
    });

    socket.on('player-joined', (payload: any) => {
      setGameRoom(payload);
    });
  }, [])

  const newGameClickHandler = () => {
    if (char.length === 1) {
      socket.emit('create-room', { rows: 10, cols: 10, char })
    }
  }

  const startGameHandler = () => {
    socket.emit('start-game');
  }

  const joinRoomHandler = () => {
    if (char.length === 1 && roomId.length > 0) {
      socket.emit('join-room', { roomId, char });
    }
  }

  return (
    <div className="App">
      {!gameRoom?.matrix && <div className="config">
        <input type="text" placeholder="Letra" maxLength={1} value={char} onChange={(changes) => setChar(changes.currentTarget.value)} />
        <input type="text" placeholder="ID da Sala" value={roomId} onChange={(changes) => setRoomId(changes.currentTarget.value)} />
        <button onClick={newGameClickHandler}>Criar sala</button>
        <button onClick={joinRoomHandler}>Entrar</button>
      </div>}
      {(gameRoom?.matrix && gameRoom.state === 0) && <div className="lobby">
        <p>{gameRoom.id}</p>
        <ul><li>{gameRoom.admin.char}</li>{gameRoom.players.map((player: { char: string, id: string }) => <li>{player.char}</li>)}</ul>
        < button onClick={startGameHandler}>Iniciar jogo</button>
      </div>}
      {
        (gameRoom?.matrix && gameRoom.state === 1) && <div className="game">
          {gameRoom.matrix.map((row: any) => <div className="row">
            {row.map((square: any) => <Square {...square} />)}
          </div>)}
        </div>
      }

    </div >
  );
}

export default App;
