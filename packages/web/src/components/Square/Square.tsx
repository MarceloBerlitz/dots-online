import React from 'react';

import { SidesEnum, SquareType } from 'dots-online-lib';

import './Square.css';

type Props = SquareType & {
    rowIndex: number;
    colIndex: number;
    rowLength: number;
    colLength: number;
    onMark: (side: SidesEnum) => void
};

const Square = (props: Props) => {

    const callOnMark = (side: SidesEnum) => {
        if (!props[side].isMarked) {
            props.onMark(side);
        }
    }

    const isTopRow = (): boolean => {
        return props.rowIndex === 0;
    }

    const isLeftCol = (): boolean => {
        return props.colIndex === 0;
    }

    const isBottomRow = (): boolean => {
        return props.rowIndex === props.rowLength - 1;
    }

    const isRightCol = (): boolean => {
        return props.colIndex === props.colLength - 1;
    }

    return <div className="Square">
        <div className="row">
            <div className={"cel-border dot top-left-dot" + (isTopRow() ? " horizontal-limit" : "") + (isLeftCol() ? " vertical-limit" : "")} />
            <div className={"cel-border horizontal top" + (props.top.isMarked ? " selected" : "") + (isTopRow() ? " horizontal-limit" : "")} onClick={() => callOnMark(SidesEnum.TOP)} />
            <div className={"cel-border dot top-right-dot" + (isTopRow() ? " horizontal-limit" : "") + (isRightCol() ? " vertical-limit" : "")} />
        </div>
        <div className="row">
            <div className={"cel-border vertical left" + (props.left.isMarked ? " selected" : "") + (isLeftCol() ? " vertical-limit" : "")} onClick={() => callOnMark(SidesEnum.LEFT)} />
            <div className="content" style={{ backgroundColor: props?.owner?.color }}>
            </div>
            <div className={"cel-border vertical right" + (props.right.isMarked ? " selected" : "") + (isRightCol() ? " vertical-limit" : "")} onClick={() => callOnMark(SidesEnum.RIGHT)} />
        </div>
        <div className="row">
            <div className={"cel-border dot bottom-left-dot" + (isBottomRow() ? " horizontal-limit" : "") + (isLeftCol() ? " vertical-limit" : "")} />
            <div className={"cel-border horizontal bottom" + (props.bottom.isMarked ? " selected" : "") + (isBottomRow() ? " horizontal-limit" : "")} onClick={() => callOnMark(SidesEnum.BOTTOM)} />
            <div className={"cel-border dot bottom-right-dot" + (isBottomRow() ? " horizontal-limit" : "") + (isRightCol() ? " vertical-limit" : "")} />
        </div>
    </div>
}

export default Square;