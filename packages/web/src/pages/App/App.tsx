import React, { useEffect, useState } from 'react';

import io from 'socket.io-client';

import { GameRoomType, PlayerType, SidesEnum } from 'lib';
import Square from '../../components/Square';

import './App.css';

const socket = io('http://localhost:3333');

socket.on('connect', () => {
  const playerId = socket.id
  console.log(`Player connected on Client with id: ${playerId}`)
});

function App() {
  const [gameRoom, setGameRoom] = useState<GameRoomType>();
  const [char, setChar] = useState('');
  const [roomId, setRoomId] = useState('');
  const [finalScore, setFinalScore] = useState<PlayerType[]>()
  const [text, setText] = useState('Aguardando líder...');

  useEffect(() => {
    socket.on('room-created', (payload: GameRoomType) => {
      console.log('Room created', { payload });
      setGameRoom(payload);
    });

    socket.on('player-joined', (payload: GameRoomType) => {
      setGameRoom(payload);
    });

    socket.on('custom-error', (payload: { message: string }) => {
      alert(payload.message);
    });

    socket.on('next-player', (payload: GameRoomType) => {
      setGameRoom(payload);
      setText(`Vez de ${payload.turn.char}.`)
    });

    socket.on('game-over', (payload: GameRoomType) => {
      setGameRoom(payload);
      setFinalScore(payload.players.sort((p1, p2) => p2.score - p1.score));
    });
  }, [])

  const newGameClickHandler = () => {
    if (char.length === 1) {
      socket.emit('create-room', { rows: 2, cols: 2, char })
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

  const squareClickHandler = (rowIndex: number, colIndex: number, side: SidesEnum) => {
    if (gameRoom?.turn.char === char) {
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
            {row.map((square: any, colIndex: number) => <Square {...square} onMark={(side: SidesEnum) => squareClickHandler(rowIndex, colIndex, side)} />)}
          </div>)}
        </div>
      }
      {(gameRoom?.state === 2 && finalScore) && <div>
        <h1>Fim de jogo</h1>
        <h2>Resultado: </h2>
        <ol>
          {finalScore.map((player: PlayerType) => <li>{player.char}: {player.score}</li>)}
        </ol>
      </div>}

    </div >
  );
}

export default App;
