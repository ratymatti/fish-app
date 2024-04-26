import React, { useState, useEffect, createContext, ReactNode } from 'react';
import { FishObject } from '../types/fish';
import { useFetchFish } from '../hooks/useFetchFish';
import { useIdToken } from '../hooks/useIdToken';

export interface FishContextType {
    userFishArr: FishObject[];
    setUserFishArr: (fishes: FishObject[]) => void;
    selectedFish: FishObject | null;
    setSelectedFish: (fish: FishObject | null) => void;
    updateUserFishArr: (newFish: FishObject) => void;
    selectFishById: (fishID: string) => void;
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
    const [selectedFish, setSelectedFish] = useState<FishObject | null>(null);

    const { initialIdToken } = useIdToken();
    const { fetchFishData } = useFetchFish();

    function updateUserFishArr(newFish: FishObject): void {
        newFish.date = new Date(newFish.date);
        newFish.dateString = createDateString(newFish.date);
        setUserFishArr((prev) => prev ? [...prev, newFish] : [newFish]);
    }

    function selectFishById(fishID: string): void {
        const selectedFish: FishObject = userFishArr.find(fish => fish.id === fishID)!;
        setSelectedFish(selectedFish);
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
            selectedFish,
            setSelectedFish,
            updateUserFishArr,
            selectFishById }}>
            {children}
        </FishContext.Provider>
    )
}