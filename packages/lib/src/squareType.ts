import { PlayerType } from "./playerType"

export type Side = {
    isMarked: boolean;
}

export type SquareType = {
    top: Side;
    right: Side;
    bottom: Side;
    left: Side;
    owner?: PlayerType;
}