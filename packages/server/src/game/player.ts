import { PlayerType } from "dots-online-lib";
import { Color } from "dots-online-lib/src/colors";

export class Player implements PlayerType {
    public id: string;
    public score: number = 0;
    public name: string;
    public color: Color;
    public isAdmin: boolean;
    public winner: boolean = false;

    private constructor(id: string, name: string, color: Color, isAdmin: boolean) {
        this.id = id;
        this.name = name;
        this.isAdmin = isAdmin;
        this.color = color;
    }

    public static create(id: string, name: string, color: Color): Player {
        if (name.length < 1) {
            throw new Error('Invalid name.');
        }
        return new Player(id, name, color, false);
    }

    public static createAdmin(id: string, name: string, color: Color): Player {
        if (name.length < 1) {
            throw new Error('Invalid name.');
        }
        return new Player(id, name, color, true);
    }
}