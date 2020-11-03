import React from 'react';
import { StepsEnum } from '../Options';

import './Main.css';

type Props = {
    char: string,
    onInputChar: (char: string) => void,
    onSelectStep: (step: StepsEnum) => void
};

const Main = (props: Props) => {

    return (<div className="Main">
        <span className="char-span">
            <label className="initial">Caractere</label>
            <input className="input" type="text" value={props.char} onChange={(val) => props.onInputChar(val.currentTarget.value)} />
        </span>
        <button disabled={!props.char} onClick={() => props.onSelectStep(StepsEnum.CREATE)}>Criar sala</button>
        <button disabled={!props.char} onClick={() => props.onSelectStep(StepsEnum.JOIN)}>Entrar</button>
    </div>);
}

export default Main;