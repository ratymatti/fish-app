import React from 'react'
import { Field } from '../Log/Log'

interface TheadRowsProps {
    handleClick: (field: Field) => void;
}

export default function TheadRows(props: TheadRowsProps): JSX.Element {
    const { handleClick } = props;

    return (
        <tr>
            <th onClick={() => handleClick(Field.SPECIES)}>{Field.SPECIES}</th>
            <th onClick={() => handleClick(Field.LENGTH)}>{Field.LENGTH}</th>
            <th onClick={() => handleClick(Field.LOCATION)}>{Field.LOCATION}</th>
            <th onClick={() => handleClick(Field.DATE)}>{Field.DATE}</th>
        </tr>
    )
}
