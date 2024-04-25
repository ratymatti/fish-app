import React, { ReactNode, createContext, useContext, useState } from 'react';

import { FishObject, NewFishObject, RequestFishObject } from '../types/fish';
import copyFishObject from '../modules/copyFishObject/copyFishObject';
import { useSaveFish } from '../hooks/useSaveFish';
import { FishContext, FishContextType } from './FishContext';

export const initialFishData: NewFishObject = {
    species: null,
    date: null,
    length: null,
    locationName: null,
    comment: null,
    geolocation: {
        lat: 0,
        lng: 0
    }
}

export interface CreateFishContextType {
    newFishData: NewFishObject;
    setNewFishData: (newFishData: NewFishObject) => void;
    saveNewFish: () => Promise<boolean>;
    resetNewFishData: () => void;
}

interface CreateFishProviderProps {
    children: ReactNode;
}

export const CreateFishContext = createContext<CreateFishContextType | undefined>(undefined);

export function CreateFishProvider({ children }: CreateFishProviderProps) {
    const [newFishData, setNewFishData] = useState<NewFishObject>(JSON.parse(JSON.stringify(initialFishData)));

    const { updateUserFishArr } = useContext(FishContext) as FishContextType;

    const { saveFishData } = useSaveFish();

    async function saveNewFish(): Promise<boolean> {
        try {
            const requestFishData: RequestFishObject = copyFishObject(newFishData as NewFishObject);
            const savedFish = await saveFishData(requestFishData as RequestFishObject);
            if (savedFish !== null) {
                updateUserFishArr(savedFish as FishObject);
                resetNewFishData();
                return true;
            }
        } catch (err) {
            console.error(err);
        }
        return false;
    }

    function resetNewFishData(): void {
        setNewFishData(JSON.parse(JSON.stringify(initialFishData)));
    }

    return (
        <CreateFishContext.Provider value={{
            newFishData,
            setNewFishData,
            saveNewFish,
            resetNewFishData
        }}>
            {children}
        </CreateFishContext.Provider>
    )
}