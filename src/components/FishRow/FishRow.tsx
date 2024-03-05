import React from 'react'
import { FishObject } from '../../types/fish'

interface FishRowProps {
    fish: FishObject;
    setCurrentFishID: (id: string) => void;
}

export default function FishRow(props: FishRowProps): JSX.Element {
    const { fish, setCurrentFishID } = props;
    
    return (
        <tr onClick={() => setCurrentFishID(fish.id!)} className='row' key={fish.id}>
            <td>{fish.species}</td>
            <td>{fish.cm}cm</td>
            <td>{fish.locationName}</td>
            <td>{fish.dateString}</td>
        </tr>
    )
}
