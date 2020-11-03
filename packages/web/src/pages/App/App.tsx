import React, { useEffect, useState } from 'react';

import io from 'socket.io-client';

import { GameRoomStatesEnum, GameRoomType, PlayerType, SidesEnum } from 'dots-online-lib';

import './App.css';
import Options from '../Options';
import Lobby from '../Lobby';
import Game from '../Game';
import Over from '../Over';

const socket = io();

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
  const [charState, setCharState] = useState('');
  const [finalScore, setFinalScore] = useState<PlayerType[]>()

  useEffect(() => {
    socket.on('room-created', (payload: GameRoomType) => {
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
    });

    socket.on('game-over', (payload: GameRoomType) => {
      setGameRoom(payload);
      setFinalScore(payload.players.sort((p1, p2) => p2.score - p1.score));
    });
  }, [])

  const isAdmin = () => {
    return gameRoom?.players.find(p => p.isAdmin)?.id === playerId;
  }

  const createHandler = (rows: number, cols: number, char: string) => {
    setCharState(char);
    if (char.length === 1) {
      socket.emit('create-room', { rows, cols, char })
    }
  }

  const startGameHandler = () => {
    socket.emit('start-game');
  }

  const joinHandler = (roomId: string, char: string) => {
    setCharState(char);
    if (char.length === 1 && roomId.length > 0) {
      socket.emit('join-room', { roomId, char });
    }
  }

  const squareClickHandler = (rowIndex: number, colIndex: number, side: SidesEnum) => {
    if (gameRoom?.turn.char === charState) {
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
      {!gameRoom?.matrix && <Options onCreate={createHandler} onJoin={joinHandler} />}

      {(gameRoom?.matrix && gameRoom.state === GameRoomStatesEnum.CREATED) &&
        <Lobby roomId={gameRoom.id} players={gameRoom.players} onStartGame={startGameHandler} isAdmin={isAdmin()} />}

      {(gameRoom?.matrix && gameRoom.state === GameRoomStatesEnum.RUNNING) &&
        <Game turn={gameRoom.turn} matrix={gameRoom.matrix} onSquareClick={squareClickHandler} onClose={gameOverHandler} />}

      {(gameRoom?.state === GameRoomStatesEnum.OVER && finalScore) && <Over finalScore={finalScore} onOk={gameOverHandler} />}
    </div >
  );
}

export default App;
