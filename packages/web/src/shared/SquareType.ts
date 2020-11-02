import { Player } from "./Player"

export type Side = {
    isMarked: boolean;
}

export type SquareType = {
    top: Side;
    right: Side;
    bottom: Side;
    left: Side;
    owner?: Player;
}