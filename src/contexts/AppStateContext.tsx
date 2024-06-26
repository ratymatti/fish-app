import React, { ReactNode, createContext, useEffect, useRef, useState } from 'react'
import { Position, Location } from '../types/location';
import { useAuth } from '../hooks/useAuth';
import { useIdTokenContext } from './IdTokenContext';

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
    Geolocation = 'Please select a geolocation',
    GeolocationNotAvailable = 'Location information not available. Check your browser settings.'
}

interface MapState {
    center: {
        lat: number;
        lng: number;
    };
    zoom: number;
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
    mapRef: React.MutableRefObject<MapState>;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    handleSignIn: () => void;
    handleSignOut: () => void;
}

export const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export function AppStateProvider({ children }: AppStateProps) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [active, setActive] = useState<ActiveState>(ActiveState.Empty);
    const [error, setError] = useState<AppError | null>(null);
    const [userLocation, setUserLocation] = useState<Location | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    const mapRef = useRef<MapState>({
        center: {
            lat: 66.215381, // If user location is not available, center the map to 
            lng: 29.635635 // 'Hevonperse' ('Horses ass' in English) in Kuusamo, Finland
        },
        zoom: 12
    });

    const { resetIdTokens } = useIdTokenContext();

    const { signInWithGoogle, signOutWithGoogle } = useAuth();

    async function getAndSetLocation(): Promise<void> {
        if (navigator.geolocation) {
            try {
                const position: Position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                const { latitude: lat, longitude: lng } = position.coords;

                setUserLocation({ lat, lng });
                mapRef.current.center = { lat, lng };
            } catch (error) {
                setError(AppError.GeolocationNotAvailable);
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    }

    async function handleSignIn() {
        const response = await signInWithGoogle();
        if (response) {
            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true');
        }
    }

    async function handleSignOut() {
        const response = await signOutWithGoogle();
        if (response) {
            setIsLoggedIn(false);
            localStorage.removeItem('isLoggedIn');
            setActive(ActiveState.Empty);
            resetIdTokens();
        }
    }

    useEffect(() => {
        const savedLoginStatus = localStorage.getItem('isLoggedIn');
        if (savedLoginStatus === 'true') setIsLoggedIn(true);
    }, []);

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
            getAndSetLocation,
            mapRef,
            loading,
            setLoading,
            handleSignIn,
            handleSignOut
        }}>
            {children}
        </AppStateContext.Provider>
    )
}
