import { Side, SquareType } from "lib";

import { Player } from "./player";

export class Square implements SquareType {
    public top: Side;
    public right: Side;
    public bottom: Side;
    public left: Side;
    public owner?: Player = null;

    private constructor(top: Side, right: Side, bottom: Side, left: Side) {
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
    }
    public static create(top: Side, right: Side, bottom: Side, left: Side) {
        return new Square(top, right, bottom, left);
    }
}