import React, { useEffect, useState } from 'react';

import io from 'socket.io-client';

import Square from '../../components/Square';

import './App.css';

const socket = io('http://localhost:3333');

socket.on('connect', () => {
  const playerId = socket.id
  console.log(`Player connected on Client with id: ${playerId}`)
});

function App() {
  const [gameRoom, setGameRoom] = useState<any>(null);
  const [char, setChar] = useState('');
  const [roomId, setRoomId] = useState('');
  const [text, setText] = useState('Aguardando líder...');

  useEffect(() => {
    socket.on('room-created', (payload: any) => {
      console.log('Room created', { payload });
      setGameRoom(payload);
    });

    socket.on('player-joined', (payload: any) => {
      setGameRoom(payload);
    });

    socket.on('custom-error', (payload: { message: string }) => {
      alert(payload.message);
    });

    socket.on('next-player', (payload: any) => {
      setGameRoom(payload);
      if (payload.turn.char === char) {
        setText('Sua vez...');
      } else {
        setText(`Vez de ${payload.turn.char}`)
      }
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

  const squareClickHandler = (rowIndex: number, colIndex: number, side: 'top' | 'right' | 'bottom' | 'left') => {
    if (gameRoom.turn.char === char) {
      socket.emit('play', { rowIndex, colIndex, side })
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
      {gameRoom?.matrix && <p>{text}</p>}
      {(gameRoom?.matrix && gameRoom.state === 0) && <div className="lobby">
        <p>{gameRoom.id}</p>
        <ul>{gameRoom.players.map((player: { char: string, id: string }) => <li>{player.char}</li>)}</ul>
        < button onClick={startGameHandler}>Iniciar jogo</button>
      </div>}
      {
        (gameRoom?.matrix && gameRoom.state === 1) && <div className="game">
          {gameRoom.matrix.map((row: any, rowIndex: number) => <div className="row">
            {row.map((square: any, colIndex: number) => <Square {...square} onMark={(side) => squareClickHandler(rowIndex, colIndex, side)} />)}
          </div>)}
        </div>
      }

    </div >
  );
}

export default App;
