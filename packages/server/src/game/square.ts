import { Player } from "./player";

export class Square {
    public top: boolean = false;
    public right: boolean = false;
    public bottom: boolean = false;
    public left: boolean = false;
    public owner?: Player = null;
}