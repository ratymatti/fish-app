import React, { useState, useEffect } from 'react';

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

/*
const convertDateToInstance = (fish: FishObject): FishObject => {
    return {
        ...fish,
        date: fish.date instanceof Timestamp ? fish.date.toDate() : fish.date,
    };
};*/

export const FishContext = React.createContext<FishContextType | undefined>(undefined);

export function FishProvider({ children }: { children: React.ReactNode }): JSX.Element {
    const [userFishArr, setUserFishArr] = useState<FishObject[]>([]);
    const [cardFish, setCardFish] = useState<CardFish | null>(null);

    const { idToken } = useIdToken();
    const { fetchFishData } = useFetchFish();

    function updateUserFishArr(newFish: FishObject): void {
        setUserFishArr((prev) => [...prev, newFish]);
    }

    useEffect(() => {
        async function setFishData() {
            if (idToken) {
                try {
                    const fishes = await fetchFishData({ idToken });
                    setUserFishArr(fishes);
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
            setUserFishArr,
            cardFish,
            setCardFish,
            updateUserFishArr
        }}>
            {children}
        </FishContext.Provider>
    )
}