import React from 'react';
import { SquareType } from '../../shared/SquareType';
import './Square.css';

type Props = SquareType;

const Square = (props: Props) => {
    return <span className="Square">
        Quadrado
    </span>
}

export default Square;