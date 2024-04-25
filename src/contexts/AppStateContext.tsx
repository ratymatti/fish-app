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

export enum AppError {
    Network = 'Failed to save fish data. Please try again.',
    Date = 'Please select a date',
    Species = 'Please select a species',
    Length = 'Please select a length',
    Location = 'Please select a location',
    Geolocation = 'Please select a geolocation'
}


export interface AppStateContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    active: ActiveState;
    setActive: (active: ActiveState) => void;
    error: AppError | null;
    setError: (error: AppError | null) => void;
    userLocation: Location | undefined;
    setUserLocation: (userLocation: Location | undefined) => void;
    getAndSetLocation: () => Promise<void>;
}

export const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export function AppStateProvider({ children }: AppStateProps) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [active, setActive] = useState<ActiveState>(ActiveState.Empty);
    const [error, setError] = useState<AppError | null>(null);
    const [userLocation, setUserLocation] = useState<Location | undefined>(undefined);

    const { initialIdToken } = useIdToken();

    async function getAndSetLocation(): Promise<void> {
        if (navigator.geolocation) {
            try {
                const position: Position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                const { latitude: lat, longitude: lng } = position.coords;

                setUserLocation({ lat, lng });
            } catch (error) {
                console.error(error);
            }
        } else {
            alert('Geolocation not available'); // CHANGE THIS
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
            getAndSetLocation
        }}>
            {children}
        </AppStateContext.Provider>
    )
}
