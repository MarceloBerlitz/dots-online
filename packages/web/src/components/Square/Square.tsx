import React from 'react';

import { SidesEnum, SquareType } from 'lib';

import './Square.css';

type Props = SquareType & {
    onMark: (side: SidesEnum) => void
};

const Square = (props: Props) => {

    const callOnMark = (side: SidesEnum) => {
        if (!props[side].isMarked) {
            props.onMark(side);
        }
    }

    return <div className="Square">
        <div className="row">
            <div className="cel-border dot top-left-dot" />
            <div className={"cel-border horizontal top " + (props.top.isMarked ? "selected" : "")} onClick={() => callOnMark(SidesEnum.TOP)} />
            <div className="cel-border dot top-right-dot" />
        </div>
        <div className="row">
            <div className={"cel-border vertical left " + (props.left.isMarked ? "selected" : "")} onClick={() => callOnMark(SidesEnum.LEFT)} />
            <div className="content">
                {props?.owner?.char}
            </div>
            <div className={"cel-border vertical right " + (props.right.isMarked ? "selected" : "")} onClick={() => callOnMark(SidesEnum.RIGHT)} />
        </div>
        <div className="row">
            <div className="cel-border dot bottom-left-dot" />
            <div className={"cel-border horizontal bottom " + (props.bottom.isMarked ? "selected" : "")} onClick={() => callOnMark(SidesEnum.BOTTOM)} />
            <div className="cel-border dot bottom-right-dot" />
        </div>
    </div>
}

export default Square;