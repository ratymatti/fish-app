import React, { useState, useEffect } from 'react';

import { FishObject, CardFish } from '../types/fish';

import { useFetchFish } from '../hooks/useFetchFish';
import { useIdToken } from '../hooks/useIdToken';


export interface FishContextType {
    userFishArr: FishObject[];
    cardFish: CardFish | null;
    setCardFish: (fish: CardFish | null) => void;
    updateUserFishArr: (newFish: FishObject) => void;
}


const convertISOStringToDate = (fish: FishObject): FishObject => {
    return {
        ...fish,
        date: new Date(fish.date)
    };
}

const createDateString = (date: Date): string => {
    const day = String((date).getDate()).padStart(2, '0');
    const month = String((date).getMonth() + 1).padStart(2, '0');
    const year = (date).getFullYear();
    return `${day}/${month}/${year}`;
}

export const FishContext = React.createContext<FishContextType | undefined>(undefined);

export function FishProvider({ children }: { children: React.ReactNode }): JSX.Element {
    const [userFishArr, setUserFishArr] = useState<FishObject[]>([]);
    const [cardFish, setCardFish] = useState<CardFish | null>(null);

    const { idToken } = useIdToken();
    const { fetchFishData } = useFetchFish();

    function updateUserFishArr(newFish: FishObject): void {
        newFish.date = new Date(newFish.date);
        newFish.dateString = createDateString(newFish.date);
        setUserFishArr((prev) => prev ? [...prev, newFish] : [newFish]);
    }

    useEffect(() => {
        async function setFishData(): Promise<void> {
            if (idToken) {
                try {
                    const fishes = await fetchFishData({ idToken });
                    if (fishes.length) {
                        const updatedFishes = fishes
                            .map((fish: FishObject) => convertISOStringToDate(fish))
                            .map((fish: FishObject) => ({ ...fish, dateString: createDateString(fish.date as Date) }));
                        setUserFishArr(updatedFishes);
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        }
        setFishData();
    }, [idToken]);

    return (
        <FishContext.Provider value={{
            userFishArr,
            cardFish,
            setCardFish,
            updateUserFishArr
        }}>
            {children}
        </FishContext.Provider>
    )
}