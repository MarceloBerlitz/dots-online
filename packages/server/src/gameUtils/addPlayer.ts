import { GameRoomStatesEnum, GameRoomType, PlayerType } from "dots-online-lib";

export const addPlayer = (game: GameRoomType, player: PlayerType): void => {
    if (game.state !== GameRoomStatesEnum.CREATED) {
        throw new Error('Can not add players after the game already started.');
    }
    if (game.players.some(plr => plr.name === player.name)) {
        throw new Error('Name is already in use.');
    }
    game.players.push(player);
}