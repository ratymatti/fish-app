import React, { useState } from 'react';

import { NewFishObject } from '../types/fish';

export interface CreateFishContextType {
    newFishData: NewFishObject;
    setNewFishData: (newFishData: NewFishObject) => void;
}

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


export const CreateFishContext = React.createContext<CreateFishContextType | undefined>(undefined);

export function CreateFishProvider({ children }: { children: React.ReactNode }): JSX.Element {
    const [newFishData, setNewFishData] = useState<NewFishObject>(JSON.parse(JSON.stringify(initialFishData)));

    return (
        <CreateFishContext.Provider value={{
            newFishData, setNewFishData
        }}>
            {children}
        </CreateFishContext.Provider>
    )
}