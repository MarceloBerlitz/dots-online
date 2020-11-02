import React, { useState } from 'react';

import Main from './Main';
import Create from './Create';
import Join from './Join';

import './Options.css';

export type OptionsProps = {
    onJoin: (roomId: string, char: string) => void;
    onCreate: (rows: number, cols: number, char: string) => void;
}

export enum StepsEnum {
    MAIN,
    CREATE,
    JOIN
}

const Options = (props: OptionsProps) => {

    const [step, setStep] = useState(StepsEnum.MAIN);
    const [char, setChar] = useState('');

    const getContent = () => {
        switch (step) {
            case StepsEnum.MAIN:
                return <Main char={char} onInputChar={(char) => setChar(char)} onSelectStep={selectStepHandler} />
            case StepsEnum.CREATE:
                return <Create onCreate={(rows, cols) => props.onCreate(rows, cols, char)} />
            case StepsEnum.JOIN:
                return <Join onJoin={roomId => props.onJoin(roomId, char)} />
        }
    }

    const selectStepHandler = (step: StepsEnum) => {
        setStep(step);
    }

    return <div className="Options">
        {getContent()}
    </div>

};

export default Options;