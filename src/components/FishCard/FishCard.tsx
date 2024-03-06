import React from 'react'
import './FishCard.css';
import { CardFish } from '../../types/fish';
import FishCardHeader from '../FishCardHeader/FishCardHeader';
import FishCardInfoRow from '../FishCardInfoRow/FishCardInfoRow';

interface FishCardProps {
    cardFish: CardFish | null;
    closeCard: () => void;
    handleRemove: (idToRemove: string) => void;
}

export default function FishCard(props: FishCardProps): JSX.Element | null {
    const { cardFish, closeCard, handleRemove } = props;

    if (cardFish) {

        return (
            <div className='fish-card'>
                <FishCardHeader closeCard={closeCard} />
                <div className='fish-data'>
                    <h3>{cardFish.header}</h3>
                    {
                        cardFish.info.map(({ text, value }, index) => (
                            <FishCardInfoRow
                                key={index}
                                text={text}
                                value={value} />
                        ))
                    }
                    <br></br>
                    {
                        cardFish.weather.map(({ text, value }, index) => (
                            <FishCardInfoRow 
                                key={index}
                                text={text}
                                value={value} />
                        ))
                    }
                    <br></br>
                    <button onClick={() => handleRemove(cardFish.id!)}>delete</button>
                </div>
            </div>
        )
    } 
    return null;
}

