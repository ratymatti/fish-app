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

    if (!fishContext) throw new Error("FishContext is undefined");
    
    const { userFishArr, setCardFish } = fishContext;

    function transformToCardFish(fish: FishObject): CardFish | null {
        if (fish) {
            const fishData = {
                header: fish.species,
                id: fish.id,
                info: [
                    { text: "Length: ", value: `${fish.length} cm` },
                    { text: "Catch date: ", value: fish.dateString! },
                    { text: "Catch location: ", value: fish.locationName }
                ], 
                weather: [
                    { text: "Temperature: ", value: "coming soon" },
                    { text: "Wind direction: ", value: "coming soon" },
                    { text: 'Humidity: ', value: "coming soon" },
                    { text: 'Pressure: ', value: "coming soon" },
                ]
            }
            return fishData;
        }
        return null;
    }

    const closeCard = (): void => setCardFish(null);

    function handleFishRowClick(id: string): void {
        const fish = userFishArr.find(fish => fish.id === id);
        const cardFishObject = transformToCardFish(fish!);
        setCardFish(cardFishObject);
    }

    function handleRemove(idToRemove: string): void {
        // removeFishObject(idToRemove);
        closeCard();
    }

    return { handleFishRowClick, closeCard, handleRemove }
}
