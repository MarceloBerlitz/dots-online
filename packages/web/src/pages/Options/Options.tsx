import React, { useState } from 'react';

import Main from './Main';
import Create from './Create';
import Join from './Join';

import './Options.css';

export type OptionsProps = {
    name: string;
    onNameChange: (name: string) => void;
    onJoin: (roomId: string) => void;
    onCreate: (rows: number, cols: number) => void;
}

export enum StepsEnum {
    MAIN,
    CREATE,
    JOIN
}

const Options = (props: OptionsProps) => {

    const [step, setStep] = useState(StepsEnum.MAIN);

    const getContent = () => {
        switch (step) {
            case StepsEnum.MAIN:
                return <Main name={props.name} onInputName={(name) => props.onNameChange(name)} onSelectStep={selectStepHandler} />
            case StepsEnum.CREATE:
                return <Create onCreate={(rows, cols) => props.onCreate(rows, cols)} onBack={() => setStep(StepsEnum.MAIN)} />
            case StepsEnum.JOIN:
                return <Join onJoin={roomId => props.onJoin(roomId)} onBack={() => setStep(StepsEnum.MAIN)} />
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