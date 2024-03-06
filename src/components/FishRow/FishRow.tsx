import React from 'react'
import { FishObject } from '../../types/fish'


interface FishRowProps {
    fish: FishObject;
    handleFishRowClick: (id: string) => void;
}

export default function FishRow(props: FishRowProps): JSX.Element {
    const { fish, handleFishRowClick } = props;

    return (
        <tr onClick={() => handleFishRowClick(fish.id!)} className='row' key={fish.id}>
            <td>{fish.species}</td>
            <td>{fish.cm}cm</td>
            <td>{fish.locationName}</td>
            <td>{fish.dateString}</td>
        </tr>
    )
}
