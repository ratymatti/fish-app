import React, { ReactNode, createContext, useEffect, useState } from 'react'
import { useIdToken } from '../hooks/useIdToken';
import { Position, Location } from '../types/location';

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
    userLocation: Location | undefined;
    setUserLocation: (userLocation: Location | undefined) => void;
    getLocation: () => Promise<{ lat: number; lng: number } | undefined>;
}

export const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export function AppStateProvider({ children }: AppStateProps) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [active, setActive] = useState<ActiveState>(ActiveState.Empty);
    const [error, setError] = useState<string>('');
    const [userLocation, setUserLocation] = useState<Location | undefined>(undefined);

    const { initialIdToken } = useIdToken();

    async function getLocation(): Promise<Location | undefined>{
        if (navigator.geolocation) {
            try {
                const position: Position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                const { latitude: lat, longitude: lng } = position.coords;

                return { lat, lng };

            } catch (error) {
                console.error(error);
            }
        } else {
            alert('Geolocation not available');
        }
    }

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
            setError,
            userLocation,
            setUserLocation,
            getLocation
        }}>
            {children}
        </AppStateContext.Provider>
    )
}
