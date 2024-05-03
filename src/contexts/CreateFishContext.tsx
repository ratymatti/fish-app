import React, {
    MutableRefObject,
    ReactNode,
    createContext,
    useContext,
    useRef } from 'react';

import { FishObject, NewFishObject, RequestFishObject } from '../types/fish';
import copyFishObject from '../utils/copyFishObject';
import { useSaveFish } from '../hooks/useSaveFish';
import { FishContext, FishContextType } from './FishContext';

export const initialNewFishData: NewFishObject = {
    species: null,
    date: null,
    length: null,
    location: null,
    comment: null,
    geolocation: {
        lat: 0,
        lng: 0
    }
}

export interface CreateFishContextType {
    saveNewFish: () => Promise<boolean>;
    resetNewFishData: () => void;
    newFishDataRef: MutableRefObject<NewFishObject>;
}

interface CreateFishProviderProps {
    children: ReactNode;
}

export const CreateFishContext = createContext<CreateFishContextType | undefined>(undefined);

export function CreateFishProvider({ children }: CreateFishProviderProps) {
    const newFishDataRef = useRef<NewFishObject>(JSON.parse(JSON.stringify(initialNewFishData)));

    const { updateUserFishArr } = useContext(FishContext) as FishContextType;

    const { saveFishData } = useSaveFish();

    async function saveNewFish(): Promise<boolean> {
        try {
            const requestFishData: RequestFishObject = copyFishObject(newFishDataRef.current as NewFishObject);
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
        newFishDataRef.current = JSON.parse(JSON.stringify(initialNewFishData));
    }

    return (
        <CreateFishContext.Provider value={{
            saveNewFish,
            resetNewFishData,
            newFishDataRef
        }}>
            {children}
        </CreateFishContext.Provider>
    )
}