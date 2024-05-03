import React from 'react'
import { FishObject } from '../../types/fish'


interface FishRowProps {
    fish: FishObject;
    handleFishRowClick: (id: string) => void;
}

export default function FishRow({ fish, handleFishRowClick }: FishRowProps): JSX.Element {
    const style = 'border border-neutral-700 pl-2';

    return (
        <tr
            key={fish.id}
            onClick={() => handleFishRowClick(fish.id)}
            className='hover:cursor-pointer hover:bg-neutral-500 transition-colors duration-800 ease-in-out'
        >
            <td className={style}>{fish.species}</td>
            <td className={style}>{fish.length} cm</td>
            <td className={style}>{fish.location}</td>
            <td className={style}>{fish.dateString}</td>
        </tr>
    )
}
