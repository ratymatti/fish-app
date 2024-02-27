import React, { useState, createContext } from 'react';

export interface ActiveContextType {
    active: string;
    setActive: (active: ActiveState) => void;
}

export enum ActiveState {
    AddFish = 'add fish',
    Fishes = 'fishes',
    Map = 'map',
    Weather = 'weather',
    Empty = ''
}

export const ActiveContext = createContext<ActiveContextType | undefined>(undefined); 

export function ActiveProvider({children}: {children: React.ReactNode}) {
    const [active, setActive] = useState<ActiveState>(ActiveState.Empty);

    return (
        <ActiveContext.Provider value={{ active, setActive }}>
            {children}
        </ActiveContext.Provider>
    )
}

