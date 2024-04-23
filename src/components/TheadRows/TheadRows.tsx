import React from 'react'
import useSorting, { Field } from '../../hooks/useSorting';


export default function TheadRows(): JSX.Element {
    const { handleClick } = useSorting();

    const style = 'border border-neutral-700 bg-neutral-600 hover:cursor-pointer';

    return (
        <tr>
            <th className={style} onClick={() => handleClick(Field.SPECIES)}>{Field.SPECIES}</th>
            <th className={style} onClick={() => handleClick(Field.LENGTH)}>{Field.LENGTH}</th>
            <th className={style} onClick={() => handleClick(Field.LOCATION)}>{Field.LOCATION}</th>
            <th className={style} onClick={() => handleClick(Field.DATE)}>{Field.DATE}</th>
        </tr>
    )
}
