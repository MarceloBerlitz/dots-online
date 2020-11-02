import { PlayerType } from "lib";

export class Player implements PlayerType {
    public id: string;
    public score: number = 0;
    public char: string;
    public isAdmin: boolean;
    public winner: boolean = false;

    private constructor(id: string, char: string, isAdmin: boolean) {
        this.id = id;
        this.char = char;
        this.isAdmin = isAdmin;
    }

    public static create(id: string, char: string): Player {
        if (char.length != 1) {
            throw new Error('Invalid character.');
        }
        return new Player(id, char, false);
    }

    public static createAdmin(id: string, char: string): Player {
        if (char.length != 1) {
            throw new Error('Invalid character.');
        }
        return new Player(id, char, true);
    }
}