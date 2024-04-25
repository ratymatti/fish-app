import React, { useState, useEffect, createContext, ReactNode } from 'react';
import { FishObject, CardFish } from '../types/fish';
import { useFetchFish } from '../hooks/useFetchFish';
import { useIdToken } from '../hooks/useIdToken';

export interface FishContextType {
    userFishArr: FishObject[];
    setUserFishArr: (fishes: FishObject[]) => void;
    cardFish: CardFish | null;
    setCardFish: (fish: CardFish | null) => void;
    updateUserFishArr: (newFish: FishObject) => void;
}

interface FishProviderProps {
    children: ReactNode;
}

const convertISOStringToDate = (fish: FishObject): FishObject => {
    return {
        ...fish,
        date: new Date(fish.date as string)
    };
}

const createDateString = (date: Date): string => {
    const day = String((date).getDate()).padStart(2, '0');
    const month = String((date).getMonth() + 1).padStart(2, '0');
    const year = (date).getFullYear();
    return `${day}/${month}/${year}`;
}

export const FishContext = createContext<FishContextType | undefined>(undefined);

export function FishProvider({ children }: FishProviderProps): JSX.Element {
    const [userFishArr, setUserFishArr] = useState<FishObject[]>([]);
    const [cardFish, setCardFish] = useState<CardFish | null>(null);

    const { initialIdToken } = useIdToken();
    const { fetchFishData } = useFetchFish();

    function updateUserFishArr(newFish: FishObject): void {
        newFish.date = new Date(newFish.date);
        newFish.dateString = createDateString(newFish.date);
        setUserFishArr((prev) => prev ? [...prev, newFish] : [newFish]);
    }

    useEffect(() => {
        async function setFishData(): Promise<void> {
            if (initialIdToken) {
                try {
                    const fishes = await fetchFishData();
                    if (Array.isArray(fishes) && fishes.length) {
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
    }, [initialIdToken]);

    return (
        <FishContext.Provider value={{
            userFishArr,
            setUserFishArr,
            cardFish,
            setCardFish,
            updateUserFishArr
        }}>
            {children}
        </FishContext.Provider>
    )
}