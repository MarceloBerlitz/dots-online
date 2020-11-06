import { SquareType } from "dots-online-lib";

export const verifySquareOwned = (square: SquareType): boolean => {
    return !square.owner && square.top.isMarked && square.right.isMarked && square.bottom.isMarked && square.left.isMarked;
}