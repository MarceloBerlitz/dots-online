import React, { useState } from 'react';

type Props = {
    onCreate: (rows: number, cols: number) => void
}

const Create = (props: Props) => {

    const [rows, setRows] = useState('');
    const [cols, setCols] = useState('')

    return <div>
        <label>Num. de Linhas
            <input type="number" value={rows} onChange={change => setRows(change.currentTarget.value)} />
        </label>
        <label>Num. de Colunas
            <input type="number" value={cols} onChange={change => setCols(change.currentTarget.value)} />
        </label>
        <button disabled={rows.length === 0 || cols.length === 0} onClick={() => props.onCreate(+rows, +cols)}>Criar sala</button>
    </div>
};

export default Create;