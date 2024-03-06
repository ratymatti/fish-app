import React, { useEffect } from 'react'
import './Log.css';
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
        <div className='log'>
            {cardFish && <FishCard
                cardFish={cardFish}
                closeCard={closeCard}
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
                                handleFishRowClick={handleFishRowClick} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

