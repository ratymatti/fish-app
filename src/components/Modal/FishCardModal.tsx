import React from 'react'
import { FishObject } from '../../types/fish';
import SectionButton from '../Main/SectionButton';

interface FishCardModalProps {
    onClose: () => void;
    cardFish: FishObject;
}

const keyToLabelMap: { [key: string]: string } = {
    locationName: 'Location',
    species: 'Species',
    dateString: 'Date'
};

export default function FishCardModal({ onClose, cardFish }: FishCardModalProps) {

    return (
        <div className='flex flex-col justify-between p-4 items-center w-80 h-48 border border-neutral-800'>
            {Object.entries(cardFish).map(([key, value]) => {
                if (key === 'id' || key === 'geolocation' || key === 'date' || key === 'comment' && value === null) return null;
                const label = keyToLabelMap[key] || key;
                return <p key={key} className='uppercase text-xs'>{`${label}: ${value}`}</p>
            })}
            {cardFish.weather && Object.entries(cardFish.weather).map(([key, value]) => {
                if (key === 'id' || key === 'geolocation' || key === 'date' || key === 'comment' && value === null) return null;
                const label = keyToLabelMap[key] || key;
                return <p key={key} className='uppercase text-xs'>{`${label}: ${value}`}</p>
            })}
            <SectionButton onClick={onClose}>
                {'Close'}
            </SectionButton>
        </div>
    )
}
