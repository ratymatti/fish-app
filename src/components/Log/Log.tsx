import React, { useEffect } from 'react'

import FishCard from '../FishCard/FishCard';
import { FishContext } from '../../contexts/FishContext';
import FishRow from '../FishRow/FishRow';
import TheadRows from '../TheadRows/TheadRows';
import useSorting, { Field, SortDirection } from '../../hooks/useSorting';
import useFishCard from '../../hooks/useFishCard';

interface LogProps {
    setFreeze: (freeze: boolean) => void;
}

export default function Log(props: LogProps): JSX.Element {
    const { setFreeze } = props;

    const fishContext = React.useContext(FishContext);

    if (!fishContext) {
        throw new Error("FishContext is undefined");
    }
    const { userFishArr, cardFish } = fishContext;

    const { sortByField } = useSorting();

    const { handleFishRowClick, closeCard, handleRemove } = useFishCard();

    useEffect(() => {
        sortByField(Field.DATE, SortDirection.DESC);
    }, [])

    useEffect(() => {
        cardFish ? setFreeze(true) : setFreeze(false);
    }, [cardFish]);

    return (
        <div className='bg-neutral-800 border border-neutral-700 w-5/6 h-1/2 flex items-start justify-center'>
            {cardFish && <FishCard
                cardFish={cardFish}
                closeCard={closeCard}
                handleRemove={handleRemove} />}       
                <table className='bg-neutral-800 text-neutral-200 text-s w-screen overflow-scroll border-separate border-spacing-2 border border-neutral-700'>
                    <thead>
                        <TheadRows />
                    </thead>
                    <tbody>
                        {userFishArr.slice(0).reverse().map(fish => (
                            <FishRow
                                key={fish.id}
                                fish={fish}
                                handleFishRowClick={handleFishRowClick} />
                        ))}
                    </tbody>
                </table>
        </div>
    )
}

