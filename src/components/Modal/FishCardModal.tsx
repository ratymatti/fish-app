import React from 'react'
import { FishObject } from '../../types/fish';
import SectionButton from '../Main/SectionButton';
import SectionContainer from '../Main/SectionContainer';

interface FishCardModalProps {
    onClose: () => void;
    cardFish: FishObject;
}

const keyToLabelMap: { [key: string]: string } = {
    dateString: 'Date',
    temp: 'Temperature',
};

export default function FishCardModal({ onClose, cardFish }: FishCardModalProps) {

    return (
        <div className='flex flex-col border items border-neutral-800 p-4'>
            <div className='flex flex-row justify-between items-start w-full h-1/2 border-b border-neutral-900'>
                <SectionContainer half>
                    {Object.entries(cardFish).map(([key, value]) => {
                        if (key === 'id' || key === 'geolocation' || key === 'date' || key === 'comment' || key === 'weather') return null;
                        const label = keyToLabelMap[key] || key;
                        return <p key={key} className='uppercase text-xs'>{`${label}: ${value}`}</p>
                    })}
                </SectionContainer>
                <SectionContainer half>
                    {cardFish.weather && Object.entries(cardFish.weather).map(([key, value]) => {
                        if (key === 'name' || key === 'type' || key === 'id' || key === 'coords' || key === 'currentWeather') return null;
                        const label = keyToLabelMap[key] || key;
                        return <p key={key} className='uppercase text-xs'>{`${label}: ${value}`}</p>
                    })}
                    {cardFish.weather && cardFish.weather.currentWeather ? Object.entries(cardFish.weather.currentWeather.weather).map(([key, value]) => {
                        if (key === 'icon' || key === 'id' || key === 'windDirection' || key === 'windSpeed' || key === 'feelsLike') return null;
                        const label = keyToLabelMap[key] || key;
                        return <p key={key} className='uppercase text-xs'>{`${label}: ${value}`}</p>
                    }) : <p className='text-xs uppercase text-center'>weather information not available</p>}
                </SectionContainer>
            </div>
            {cardFish.comment &&
                <div className='bg-neutral-600 p-2 mt-4 mb-2 mx-4 border border-neutral-900'>
                    <p className='text-xs'>{cardFish.comment}</p>
                </div>}
            <div className='mt-4 flex justify-center'>
                <SectionButton onClick={onClose}>
                    {'Close'}
                </SectionButton>
            </div>
        </div>
    )
}
