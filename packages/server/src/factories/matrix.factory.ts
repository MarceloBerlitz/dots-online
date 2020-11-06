import { SquareType } from "dots-online-lib";
import { SquareFactory } from "./square.factory";

export class MatrixFactory {
    public static create(rows: number, cols: number): SquareType[][] {
        const rowList = [];
        for (let row = 0; row < rows; row++) {
            const colList = [];
            for (let col = 0; col < cols; col++) {
                const newSquare = SquareFactory.create(
                    row === 0 ? { isMarked: false } : rowList[row - 1][col].bottom,
                    { isMarked: false },
                    { isMarked: false },
                    col === 0 ? { isMarked: false } : colList[col - 1].right,
                )
                colList.push(newSquare);
            }
            rowList.push(colList);
        }
        return rowList;
    }
}