import React from 'react';
import { StepsEnum } from '../Options';

import './Main.css';

type Props = {
    name: string,
    onInputName: (name: string) => void,
    onSelectStep: (step: StepsEnum) => void
};

const Main = (props: Props) => {

    return (<div className="Main">
        <label className="label">Nome</label>
        <input className="input" maxLength={16} type="text" value={props.name} onChange={(val) => props.onInputName(val.currentTarget.value)} />
        <button className='primary' disabled={!props.name} onClick={() => props.onSelectStep(StepsEnum.CREATE)}>Criar sala</button>
        <button className='primary' disabled={!props.name} onClick={() => props.onSelectStep(StepsEnum.JOIN)}>Entrar</button>
    </div>);
}

export default Main;