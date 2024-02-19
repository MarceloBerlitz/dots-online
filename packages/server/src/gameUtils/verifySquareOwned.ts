import { SquareType } from "@do/lib";

export const verifySquareOwned = (square: SquareType): boolean => {
    return !square.owner && square.top.isMarked && square.right.isMarked && square.bottom.isMarked && square.left.isMarked;
}