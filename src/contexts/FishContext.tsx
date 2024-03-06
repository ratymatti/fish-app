import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { DocumentSnapshot, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { sortFishes } from '../modules/sortFishes/sortFishes';
import { FishObject, CardFish } from '../types/fish';
import { Field, SortDirection } from '../hooks/useSorting';

import { Timestamp } from 'firebase/firestore';


export interface FishContextType {
    userFishArr: FishObject[]; 
    setUserFishArr: (fishes: FishObject[]) => void;
    getDocuments: () => void;
    removeFishObject: (idToRemove: string) => void;
    cardFish: CardFish | null;
    setCardFish: (fish: CardFish | null) => void;
}

enum FishRef {
    FISHES = 'fishes'
}

const transformDocToFish = (doc: DocumentSnapshot): FishObject => {
    const data = doc.data() as FishObject;
    return {
        ...data,
        id: doc.id,
    };
};

const convertDateToInstance = (fish: FishObject): FishObject => {
    return {
        ...fish,
        date: fish.date instanceof Timestamp ? fish.date.toDate() : fish.date,
    };
};
// UserFishContext?
export const FishContext = React.createContext<FishContextType | undefined>(undefined);

export function FishProvider({ children }: { children: React.ReactNode }): JSX.Element {
    const [userFishArr, setUserFishArr] = useState<FishObject[]>([]);
    const [cardFish, setCardFish] = useState<CardFish | null>(null);

    const fishesRef = collection(db, FishRef.FISHES);


    async function getDocuments(): Promise<void> {
        try {
            const data = await getDocs(fishesRef);
            const filteredData: FishObject[] = data.docs
                .map(transformDocToFish)
                .map(convertDateToInstance);
            setUserFishArr(sortFishes(Field.DATE, filteredData, SortDirection.DESC));
        } catch (err) {
            console.error(err);
        }
    }

    async function removeFishObject(idToRemove: string): Promise<void> {
        const fishDoc = doc(db, FishRef.FISHES, idToRemove);
        await deleteDoc(fishDoc);
        getDocuments();
    }

    useEffect(() => {
        getDocuments();
    }, []); // Empty dependency array because this needs to run only once for now

    return (
        <FishContext.Provider value={{
            userFishArr,
            setUserFishArr,
            getDocuments,
            removeFishObject,
            cardFish,
            setCardFish
        }}>
            {children}
        </FishContext.Provider>
    )
}