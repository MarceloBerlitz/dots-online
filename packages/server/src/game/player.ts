export class Player {
    public id: string;
    public points: number = 0;
    public char: string;

    private constructor(id: string, char: string) {
        this.id = id;
        this.char = char;
    }

    public static create(id: string, char: string): Player {
        if (char.length != 1) {
            throw new Error('Invalid character.');
        }
        return new Player(id, char);
    }
}