import { ColorType, colors, GameRoomType } from "dots-online-lib";

export const getRandomColor = (game?: GameRoomType): ColorType => {
    const filteredColors = game ? colors.filter((color: ColorType) => game.players.every(p => p.color !== color)) : colors;
    console.log('>> filteredColors ', filteredColors)
    if (filteredColors.length === 0) throw new Error('Room is full.');
    return filteredColors[Math.round(Math.random() * filteredColors.length - 1)];
}