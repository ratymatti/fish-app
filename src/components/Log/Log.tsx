import React, { useState, useEffect } from 'react'
import './Log.css';
import FishCard from '../FishCard/FishCard';
import { FishContext } from '../../contexts/FishContext';

import FishRow from '../FishRow/FishRow';
import TheadRows from '../TheadRows/TheadRows';
import useSorting, { Field, SortDirection } from '../../hooks/useSorting';

interface LogProps {
    setFreeze: (freeze: boolean) => void;
}

export default function Log(props: LogProps) {
    const { setFreeze } = props;

    const [currentFishID, setCurrentFishID] = useState<string | null>(null);

    const fishContext = React.useContext(FishContext);

    if (!fishContext) {
        throw new Error("FishContext is undefined");
    }
    const { userFishArr, removeFishObject } = fishContext;

    const { sortByField } = useSorting();

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
                        <TheadRows />
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

