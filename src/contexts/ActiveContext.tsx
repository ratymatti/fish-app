import React, { useState, createContext } from 'react';

export interface ActiveContextType {
    active: string;
    setActive: (active: string) => void;
}

export const ActiveContext = createContext<ActiveContextType | undefined>(undefined); 

export function ActiveProvider({children}) {
    const [active, setActive] = useState<string>('');

    return (
        <ActiveContext.Provider value={{ active, setActive }}>
            {children}
        </ActiveContext.Provider>
    )
}

