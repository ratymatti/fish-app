import React from 'react'
import './FishCard.css';
import { CardFish } from '../../types/fish';

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
                <div className='fish-card-header'>
                    <h3 className='close-card' onClick={() => closeCard()}>x</h3>
                </div>
                <div className='fish-data'>
                    <h3>{cardFish.header}</h3>
                    {
                        cardFish.info.map(({ text, value }, index) => (
                            <h5 key={index}>{text}{value}</h5>
                        ))
                    }
                    <br></br>
                    {
                        cardFish.weather.map(({ text, value }, index) => (
                            <h5 key={index}>{text}{value}</h5>
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

