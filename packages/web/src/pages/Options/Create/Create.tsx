import React, { useState } from 'react';

import './Create.css';

type Props = {
    onCreate: (rows: number, cols: number) => void;
    onBack: () => void;
}

const Create = (props: Props) => {

    return <div className="Create">
        <label className="label">Tamanho</label>
        {/* <span className="rows-cols-span">
            <label className="label">Linhas</label>
            <input className="input" type="text" maxLength={2} value={rows} onChange={change => setRows(change.currentTarget.value)} />
        </span>

        <span className="rows-cols-span">
            <label className="label">Colunas</label>
            <input className="input" type="text" maxLength={2} value={cols} onChange={change => setCols(change.currentTarget.value)} />
        </span> */}

        <button className="primary" onClick={() => props.onCreate(4, 4)}>4x4</button>
        <button className="primary" onClick={() => props.onCreate(8, 8)}>8x8</button>
        <button className="primary" onClick={() => props.onCreate(16, 16)}>16x16</button>

        <button className="accent" onClick={() => props.onBack()}>Voltar</button>
    </div>
};

export default Create;