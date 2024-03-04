import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { DocumentSnapshot, collection, getDocs } from 'firebase/firestore';
import { sortFishes } from '../modules/sortFishes/sortFishes';
import { FishType } from './CreateFishContext';
import { Field, SortDirection } from '../components/Log/Log';

import { Timestamp } from 'firebase/firestore';


export interface FishContextType {
    userFishArr: FishType[]; // RENAME THIS TO FishObject
    setUserFishArr: (fishes: FishType[]) => void;
    getDocuments: () => void;
}

enum FishRef {
    FISHES = 'fishes'
}

const transformDocToFish = (doc: DocumentSnapshot): FishType => {
    const data = doc.data() as FishType;
    return {
        ...data,
        id: doc.id,
    };
};

const convertDateToInstance = (fish: FishType): FishType => {
    return {
        ...fish,
        date: fish.date instanceof Timestamp ? fish.date.toDate() : fish.date,
    };
};
// UserFishContext?
export const FishContext = React.createContext<FishContextType | undefined>(undefined);

export function FishProvider({ children }: { children: React.ReactNode }): JSX.Element {
    const [userFishArr, setUserFishArr] = useState<FishType[]>([]);  

    const fishesRef = collection(db, FishRef.FISHES);


    async function getDocuments(): Promise<void> {
        try {
            const data = await getDocs(fishesRef);
            const filteredData: FishType[] = data.docs
                .map(transformDocToFish)
                .map(convertDateToInstance);
            setUserFishArr(sortFishes(Field.DATE, filteredData, SortDirection.DESC));
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getDocuments();
    }, []); // Empty dependency array because this needs to run only once for now

    return (
        <FishContext.Provider value={{ userFishArr, setUserFishArr, getDocuments }}>
            {children}
        </FishContext.Provider>
    )
}