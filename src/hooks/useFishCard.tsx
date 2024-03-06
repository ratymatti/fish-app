import React from 'react'
import { FishContext, FishContextType } from '../contexts/FishContext';
import { CardFish } from '../types/fish';
import { FishObject } from '../types/fish';

interface FishCardHook {
    closeCard: () => void;
    handleRemove: (idToRemove: string) => void;
    handleFishRowClick: (id: string) => void;
}

export default function useFishCard(): FishCardHook {

    const fishContext = React.useContext(FishContext) as FishContextType;

    if (!fishContext) {
        throw new Error("FishContext is undefined");
    }

    const { userFishArr, removeFishObject, setCardFish } = fishContext;

    function transformToCardFish(fish: FishObject): CardFish | null {
        if (fish) {
            const source = fish?.weather?.currentWeather && 'weather' in fish?.weather?.currentWeather
                ? fish.weather.currentWeather.weather
                : undefined;
                
            const fishData = {
                header: fish.species,
                id: fish.id as string,
                info: [
                    { text: "Length: ", value: `${fish.cm || 'not available'}${fish.cm ? 'cm' : ''}` },
                    { text: "Catch date: ", value: fish.dateString || 'not available' },
                    { text: "Catch location: ", value: fish.locationName || 'not available' }
                ],
                weather: [
                    { text: "Temperature: ", value: `${((source?.temp ? source?.temp : 0) >= 0 ? '+' : '')}${source?.temp ?? "not available"}` },
                    { text: "Wind direction: ", value: source?.wind_direction || "not available" },
                    { text: 'Humidity: ', value: `${source?.humidity || "not available"}${source?.humidity ? '%' : ''}` },
                    { text: 'Pressure: ', value: `${source?.pressure || "not available"}${source?.pressure ? ' hPa' : ''}` },
                ]
            }
            return fishData;
        }
        return null;
    }

    function handleFishRowClick(id: string): void {
        const fish = userFishArr.find(fish => fish.id === id);
        const cardFishObject = transformToCardFish(fish!);
        setCardFish(cardFishObject);
    }

    function closeCard(): void {
        setCardFish(null);
    }

    function handleRemove(idToRemove: string): void {
        removeFishObject(idToRemove);
        closeCard();
    }

    return {
        handleFishRowClick,
        closeCard,
        handleRemove
    }
}
