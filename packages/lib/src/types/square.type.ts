import { PlayerType } from "./player.type"

export type SideType = {
    isMarked: boolean;
}

export type SquareType = {
    top: SideType;
    right: SideType;
    bottom: SideType;
    left: SideType;
    owner?: PlayerType;
}