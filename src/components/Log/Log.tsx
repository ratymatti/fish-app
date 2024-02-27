import React, { useState, useEffect } from 'react'
import './Log.css';
import FishCard from '../FishCard/FishCard';
import { FishContext } from '../../contexts/FishContext';
import { sortFishes } from '../../modules/sortFishes/sortFishes';

interface LogProps {
    setFreeze: (freeze: boolean) => void;
}

export enum SortDirection {
    ASC = 'asc',
    DESC = 'desc'
}

export enum Field {
    SPECIES = 'SPECIES',
    LENGTH = 'LENGTH',
    LOCATION = 'LOCATION',
    DATE = 'DATE'
}


export default function Log(props: LogProps) {
    const { setFreeze } = props;

    const [direction, setDirection] = useState<SortDirection>(SortDirection.DESC);
    const [currentField, setCurrentField] = useState<Field>(Field.DATE);
    const [currentFishID, setCurrentFishID] = useState<string | null | undefined>(null);

    const fishContext = React.useContext(FishContext);

    if (!fishContext) {
        throw new Error("FishContext is undefined");
    }
    const { fishes, setFishes } = fishContext;

    function handleClick(field: Field) {
        if (field === currentField) {
            const newDirection = direction === SortDirection.DESC ? SortDirection.ASC : SortDirection.DESC;
            setDirection(newDirection);
            sortByField(field, newDirection);
        } else {
            setDirection(SortDirection.DESC);
            setCurrentField(field);
            sortByField(field, SortDirection.DESC);
        }
    }

    function sortByField(field: Field, direction: SortDirection) {
        const sortedFishes = sortFishes(field, fishes, direction);
        setFishes(sortedFishes);
    }

    function closeCard() {
        setCurrentFishID(null);
    }

    useEffect(() => {
        sortByField(Field.DATE, SortDirection.DESC);
    }, [])

    useEffect(() => {
        currentFishID ? setFreeze(true) : setFreeze(false);
    }, [currentFishID]);


    return (
        <div className='log'>
            {currentFishID && <FishCard
                closeCard={closeCard}
                currentFishID={currentFishID}
                fishes={fishes} />}
            <div className='table'>
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => handleClick(Field.SPECIES)}>{Field.SPECIES}</th>
                            <th onClick={() => handleClick(Field.LENGTH)}>{Field.LENGTH}</th>
                            <th onClick={() => handleClick(Field.LOCATION)}>{Field.LOCATION}</th>
                            <th onClick={() => handleClick(Field.DATE)}>{Field.DATE}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fishes.slice(0).reverse().map(fish => (

                            <tr onClick={() => setCurrentFishID(fish.id)} className='row' key={fish.id}>
                                <td>{fish.species}</td>
                                <td>{fish.cm}cm</td>
                                <td>{fish.water}</td>
                                <td>{fish.dateString}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

