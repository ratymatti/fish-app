import React from 'react'
import useSorting, { Field } from '../../hooks/useSorting';


export default function TheadRows(): JSX.Element {
    const { handleClick } = useSorting();

    return (
        <tr>
            <th onClick={() => handleClick(Field.SPECIES)}>{Field.SPECIES}</th>
            <th onClick={() => handleClick(Field.LENGTH)}>{Field.LENGTH}</th>
            <th onClick={() => handleClick(Field.LOCATION)}>{Field.LOCATION}</th>
            <th onClick={() => handleClick(Field.DATE)}>{Field.DATE}</th>
        </tr>
    )
}
