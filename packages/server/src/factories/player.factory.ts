import { PlayerType } from "dots-online-lib";
import { ColorType } from "dots-online-lib";

export class PlayerFactory {

    public static create(id: string, name: string, color: ColorType): PlayerType {
        if (name.length < 1) {
            throw new Error('Invalid name.');
        }
        return {
            id,
            name,
            color,
            isAdmin: false,
            score: 0,
            winner: false,
        };
    }

    public static createAdmin(id: string, name: string, color: ColorType): PlayerType {
        if (name.length < 1) {
            throw new Error('Invalid name.');
        }
        return {
            id,
            name,
            color,
            isAdmin: true,
            score: 0,
            winner: false,
        };
    }
}