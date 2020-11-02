import React from 'react';
import { SquareType } from '../../shared/SquareType';
import './Square.css';

type Props = SquareType & {
    onMark: (side: 'top' | 'right' | 'bottom' | 'left') => void
};

const Square = (props: Props) => {

    const callOnMark = (side: 'top' | 'right' | 'bottom' | 'left') => {
        if (!props[side].isMarked) {
            props.onMark(side);
        }
    }

    return <div className="Square">
        <div className="row">
            <div className="cel-border dot top-left-dot" />
            <div className={"cel-border horizontal top " + (props.top.isMarked ? "selected" : "")} onClick={() => callOnMark('top')} />
            <div className="cel-border dot top-right-dot" />
        </div>
        <div className="row">
            <div className={"cel-border vertical left " + (props.left.isMarked ? "selected" : "")} onClick={() => callOnMark('left')} />
            <div className="content">
                {props?.owner?.char}
            </div>
            <div className={"cel-border vertical right " + (props.right.isMarked ? "selected" : "")} onClick={() => callOnMark('right')} />
        </div>
        <div className="row">
            <div className="cel-border dot bottom-left-dot" />
            <div className={"cel-border horizontal bottom " + (props.bottom.isMarked ? "selected" : "")} onClick={() => callOnMark('bottom')} />
            <div className="cel-border dot bottom-right-dot" />
        </div>
    </div>
}

export default Square;