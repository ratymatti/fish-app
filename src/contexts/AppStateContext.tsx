import React, { ReactNode, createContext, useEffect, useState } from 'react'
import { useIdToken } from '../hooks/useIdToken';

export enum ActiveState {
    AddFish = 'add fish',
    Fishes = 'fishes',
    Map = 'map',
    Weather = 'weather',
    Empty = ''
}

interface AppStateProps {
    children: ReactNode;
}

export interface AppStateContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    active: ActiveState;
    setActive: (active: ActiveState) => void;
    error: string;
    setError: (error: string) => void;
}

export const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export function AppStateProvider({ children }: AppStateProps) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [active, setActive] = useState<ActiveState>(ActiveState.Empty);
    const [error, setError] = useState<string>('');

    const { initialIdToken } = useIdToken();

    useEffect(() => {
        if (initialIdToken) {
            setIsLoggedIn(true);
        }
    }, [initialIdToken]);

    return (
        <AppStateContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            active,
            setActive,
            error,
            setError
        }}>
            {children}
        </AppStateContext.Provider>
    )
}
