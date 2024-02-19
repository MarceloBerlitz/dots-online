import { GameRoomStatesEnum, GameRoomType } from "@do/lib";

export const startGame = (game: GameRoomType): void => {
    if (game.players.length < 2) {
        throw new Error('At least 1 more player is required to start the game.');
    }
    game.state = GameRoomStatesEnum.RUNNING;
    const firstIndex = Math.round(Math.random() * (game.players.length - 1));
    console.log({ firstIndex });
    game.turn = game.players[firstIndex];
}