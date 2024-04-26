import React from 'react'
import { FishObject } from '../../types/fish'


interface FishRowProps {
    fish: FishObject;
    handleFishRowClick: (id: string) => void;
}

export default function FishRow(props: FishRowProps): JSX.Element {
    const { fish, handleFishRowClick } = props;

    const style = 'border border-neutral-700 pl-2';

    return (
        <tr className='hover:cursor-pointer hover:bg-neutral-500 transition-colors duration-800 ease-in-out' onClick={() => handleFishRowClick(fish.id)} key={fish.id}>
            <td className={style}>{fish.species}</td>
            <td className={style}>{fish.length} cm</td>
            <td className={style}>{fish.locationName}</td>
            <td className={style}>{fish.dateString}</td>
        </tr>
    )
}
