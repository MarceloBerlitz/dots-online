import React, { useState } from 'react';

import './Create.css';

type Props = {
    onCreate: (rows: number, cols: number) => void
}

const Create = (props: Props) => {

    const [rows, setRows] = useState('');
    const [cols, setCols] = useState('')

    return <div className="Create">
        <span className="rows-cols-span">
            <label className="label">Linhas</label>
            <input className="input" type="text" maxLength={2} value={rows} onChange={change => setRows(change.currentTarget.value)} />
        </span>

        <span className="rows-cols-span">
            <label className="label">Colunas</label>
            <input className="input" type="text" maxLength={2} value={cols} onChange={change => setCols(change.currentTarget.value)} />
        </span>


        <button disabled={rows.length === 0 || cols.length === 0} onClick={() => props.onCreate(+rows, +cols)}>Criar sala</button>
    </div>
};

export default Create;