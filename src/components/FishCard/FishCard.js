import React, { useEffect, useState } from 'react'
import './FishCard.css';

export default function FishCard(props) {
    const {
        closeCard,
        currentFishID,
        fishes    
    } = props;

    const [cardFish, setCardFish] = useState(null);

    useEffect(() => {
        async function getFishData() {
            const fish = await fishes.find(fish => fish.id === currentFishID);
            const fishData = {
                header: fish.species,
                info: [
                    { text: "Length: ", value: `${fish.cm}cm` },
                    { text: "Catch date: ", value: fish.dateString },
                    { text: "Catch location: ", value: fish.water }
                ],
                weather: [
                    { text: "Temperature: ", value: `${fish.weather?.temp >= 0 ? '+' : ''}${fish.weather?.temp || "not available"}`  },
                    { text: "Wind direction: ", value: fish.weather?.wind_direction || "not available" },
                    { text: 'Humidity: ', value: `${fish.weather?.humidity || "not available"}${fish.weather.humidity ? '%' : ''}` },
                    { text: 'Pressure: ', value: `${fish.weather?.pressure || "not available"}${fish.weather.pressure ? ' hPa' : ''}` },
                ]
            }
            setCardFish(fishData);
        }
        getFishData();
    },[])
    
    if (cardFish) {

        return (
            <div className='fish-card'>
                <div className='fish-card-header'>
                    <h3 className='close-card' onClick={() => closeCard()}>x</h3>
                </div>
                <div className='fish-data'>
                    <h3>{cardFish.header}</h3>
                {
                    cardFish.info.map(({text, value}, index) => (
                        <h5 key={index}>{text}{value}</h5>
                    ))
                }
                <br></br>
                {
                    cardFish.weather.map(({text, value}, index) => (
                        <h5 key={index}>{text}{value}</h5>
                    ))
                }   
                </div>
            </div>
          )

    }
  
}

