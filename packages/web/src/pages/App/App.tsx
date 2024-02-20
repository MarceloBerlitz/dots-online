import { useEffect, useState } from 'react';

import io from 'socket.io-client';

import { GameRoomStatesEnum, GameRoomType, PlayerType, SidesEnum } from '@do/lib';

import './App.css';
import Options from '../Options';
import Lobby from '../Lobby';
import Game from '../Game';
import Over from '../Over';

const socket = io(process.env.NODE_ENV === 'development' ? 'http://localhost:3333' : '');

let playerId: string;
socket.on('connect', () => {
  playerId = socket.id
  console.log(`Player connected on Client with id: ${playerId}`)
});

socket.on('disconnect', () => {
  socket.connect();
})

function App() {
  const [gameRoom, setGameRoom] = useState<GameRoomType | null>();
  const [nameState, setNameState] = useState<string>(localStorage.getItem('name') ?? '');
  const [finalScore, setFinalScore] = useState<PlayerType[]>()

  useEffect(() => {
    localStorage.setItem('name', nameState ?? '');
  }, [nameState])

  useEffect(() => {
    socket.on('room-created', (payload: GameRoomType) => {
      setGameRoom(payload);
    });

    socket.on('player-joined', (payload: GameRoomType) => {
      setGameRoom(payload);
    });

    socket.on('player-disconnected', (payload: GameRoomType) => {
      setGameRoom(payload);
    });

    socket.on('custom-error', (payload: { message: string }) => {
      if (gameRoom?.state === GameRoomStatesEnum.RUNNING) {
        setGameRoom(null);
      }
      alert(payload.message);
    });

    socket.on('next-player', (payload: GameRoomType) => {
      setGameRoom(payload);
    });

    socket.on('game-over', (payload: GameRoomType) => {
      setGameRoom(payload);
      setFinalScore(payload.players.sort((p1, p2) => p2.score - p1.score));
    });
  }, [])

  const isAdmin = () => {
    return gameRoom?.players.find(p => p.isAdmin)?.id === playerId;
  }

  const createHandler = (rows: number, cols: number) => {
    if (nameState.length > 0) {
      socket.emit('create-room', { rows, cols, name: nameState })
    }
  }

  const startGameHandler = () => {
    socket.emit('start-game');
  }

  const joinHandler = (roomId: string) => {
    if (nameState.length > 0 && roomId.length > 0) {
      socket.emit('join-room', { roomId, name: nameState });
    }
  }

  const nameChangeHandler = (name: string) => {
    setNameState(name);
  }

  const squareClickHandler = (rowIndex: number, colIndex: number, side: SidesEnum) => {
    if (gameRoom?.turn?.name === nameState) {
      socket.emit('play', { rowIndex, colIndex, side })
    }
  }

  const gameOverHandler = () => {
    socket.disconnect();
    setGameRoom(null);
    setFinalScore([]);
  }

  return (
    <div className="App">
      {!gameRoom?.matrix && <Options name={nameState} onNameChange={nameChangeHandler} onCreate={createHandler} onJoin={joinHandler} />}

      {(gameRoom?.matrix && gameRoom.state === GameRoomStatesEnum.CREATED) &&
        <Lobby roomId={gameRoom.id} players={gameRoom.players} onStartGame={startGameHandler} isAdmin={isAdmin()} onCancel={gameOverHandler} />}

      {(gameRoom?.matrix && gameRoom.state === GameRoomStatesEnum.RUNNING) &&
        <Game turn={gameRoom.turn!} matrix={gameRoom.matrix} onSquareClick={squareClickHandler} onClose={gameOverHandler} />}

      {(gameRoom?.state === GameRoomStatesEnum.OVER && finalScore) && <Over finalScore={finalScore} onOk={gameOverHandler} />}
    </div >
  );
}

export default App;
