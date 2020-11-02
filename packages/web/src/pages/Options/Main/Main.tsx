import React from 'react';
import { StepsEnum } from '../Options';

type Props = {
    char: string,
    onInputChar: (char: string) => void,
    onSelectStep: (step: StepsEnum) => void
};

const Main = (props: Props) => {

    return (<div>
        <label> Inicial
            <input type="text" value={props.char} onChange={(val) => props.onInputChar(val.currentTarget.value)} />
        </label>
        <button disabled={!props.char} onClick={() => props.onSelectStep(StepsEnum.CREATE)}>Criar sala</button>
        <button disabled={!props.char} onClick={() => props.onSelectStep(StepsEnum.JOIN)}>Digitar código</button>
    </div>);
}

export default Main;