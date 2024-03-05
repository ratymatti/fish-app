import React, { useState, useEffect } from 'react'
import './Log.css';
import FishCard from '../FishCard/FishCard';
import { FishContext } from '../../contexts/FishContext';
import { sortFishes } from '../../modules/sortFishes/sortFishes';
import FishRow from '../FishRow/FishRow';
import TheadRows from '../TheadRows/TheadRows';

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
    const [currentFishID, setCurrentFishID] = useState<string | null>(null);

    const fishContext = React.useContext(FishContext);

    if (!fishContext) {
        throw new Error("FishContext is undefined");
    }
    const { userFishArr, setUserFishArr, removeFishObject } = fishContext;

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
        const sortedFishes = sortFishes(field, userFishArr, direction);
        setUserFishArr(sortedFishes);
    }

    function closeCard() {
        setCurrentFishID(null);
    }

    function handleRemove(idToRemove: string) {
        removeFishObject(idToRemove);
        closeCard();
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
                userFishArr={userFishArr}
                handleRemove={handleRemove} />}
            <div className='table'>
                <table>
                    <thead>
                        <TheadRows handleClick={handleClick} />
                    </thead>
                    <tbody>
                        {userFishArr.slice(0).reverse().map(fish => (
                            <FishRow
                                key={fish.id}
                                fish={fish}
                                setCurrentFishID={setCurrentFishID} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

