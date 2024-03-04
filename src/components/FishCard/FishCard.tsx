import React, { useEffect, useState } from 'react'
import './FishCard.css';
import { FishObject } from '../../types/fish';


interface CardFish {
    header: string | null | undefined;
    info: { text: string; value: string }[];
    weather: { text: string; value: string | number }[];
}

interface FishCardProps {
    userFishArr: FishObject[];
    currentFishID: string;
    closeCard: () => void;
    handleRemove: (idToRemove: string) => void;
}

export default function FishCard(props: FishCardProps) {
    const {
        closeCard, currentFishID,
        userFishArr, handleRemove
    } = props;

    const [cardFish, setCardFish] = useState<CardFish | null>(null);


    useEffect(() => {
        function getFishData() {
            const fish = userFishArr.find(fish => fish.id === currentFishID);
            const source = fish?.weather?.currentWeather && 'weather' in fish?.weather?.currentWeather
                ? fish.weather.currentWeather.weather
                : undefined;
            const fishData = {
                header: fish?.species,
                info: [
                    { text: "Length: ", value: `${fish?.cm || 'not available'}${fish?.cm ? 'cm' : ''}` },
                    { text: "Catch date: ", value: fish?.dateString || 'not available' },
                    { text: "Catch location: ", value: fish?.locationName || 'not available' }
                ],
                weather: [
                    { text: "Temperature: ", value: `${((source?.temp ? source?.temp : 0) >= 0 ? '+' : '')}${source?.temp ?? "not available"}` },
                    { text: "Wind direction: ", value: source?.wind_direction || "not available" },
                    { text: 'Humidity: ', value: `${source?.humidity || "not available"}${source?.humidity ? '%' : ''}` },
                    { text: 'Pressure: ', value: `${source?.pressure || "not available"}${source?.pressure ? ' hPa' : ''}` },
                ]
            }
            if (fishData) setCardFish(fishData);
        }
        getFishData();
    }, [currentFishID, userFishArr])

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
                    <button onClick={() => handleRemove(currentFishID)}>delete</button>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

