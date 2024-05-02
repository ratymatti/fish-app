import React, { useState, useEffect, useContext, ReactNode, createContext } from 'react';
import { useFetchWeather } from '../hooks/useFetchWeather';
import { WeatherObject } from '../types/weather';
import { Location } from '../types/location';
import { useIdToken } from '../hooks/useIdToken';
import { useFetchDelete } from '../hooks/useFetchDelete';
import { useFetchTrackings } from '../hooks/useFetchTrackings';
import { useUpdateTracking } from '../hooks/useUpdateTracking';
import { AppStateContext, AppStateContextType } from './AppStateContext';

export enum WeatherEndpoint {
    CURRENT = '/fetch/current',
    TRACKING = '/fetch/tracking',
}

interface WeatherProviderProps {
    children: ReactNode;
}

export interface WeatherContextType {
    currentLocationWeather: WeatherObject | null;
    weatherTrackings: WeatherObject[];
    addNewTracking: (coords: Location) => void;
    removeFromTracking: (idToRemove: string) => void;
}

export const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: WeatherProviderProps): JSX.Element {
    const [currentLocationWeather, setCurrentLocationWeather] = useState<WeatherObject | null>(null);
    const [weatherTrackings, setWeatherTrackings] = useState<WeatherObject[]>([]);

    const { fetchCurrentWeather } = useFetchWeather();
    const { fetchUserTrackings } = useFetchTrackings();
    const { fetchDeleteWeatherObject } = useFetchDelete();
    const { fetchUpdateTrackingWeather } = useUpdateTracking();

    const { initialIdToken } = useIdToken();

    const { userLocation } = useContext(AppStateContext) as AppStateContextType;

    async function addNewTracking(location: Location): Promise<void> {
        const currentLocationWeather = await fetchCurrentWeather(location, WeatherEndpoint.TRACKING);
        if (currentLocationWeather) {
            weatherTrackings.length ?
                setWeatherTrackings((prev) => [...prev, currentLocationWeather])
                : setWeatherTrackings([currentLocationWeather]);
        }
    }

    async function removeFromTracking(idToRemove: string): Promise<void> {
        const deletedFromDB = await fetchDeleteWeatherObject(idToRemove);
        if (!deletedFromDB) return;
        const filteredWeatherTrackings = weatherTrackings.filter((tracking) => tracking.id !== idToRemove);
        setWeatherTrackings(filteredWeatherTrackings);
    }

    async function getUserTrackings(): Promise<WeatherObject[]> {
        if (weatherTrackings.length) {
            return weatherTrackings;
        } else {
            return await fetchUserTrackings();
        }
    }

    useEffect(() => {
        async function updateCurrentLocationWeather(): Promise<void> {
            if (userLocation) {
                const currentWeather = await fetchCurrentWeather(userLocation, WeatherEndpoint.CURRENT);
                if (currentWeather) setCurrentLocationWeather(currentWeather);
            }
        }
        if (initialIdToken) {
            updateCurrentLocationWeather();

            const updateInterval = setInterval(() => {
                updateCurrentLocationWeather();
            }, 60 * 60 * 1000); // update every 60 minutes

            return () => clearInterval(updateInterval);
        }
    }, [initialIdToken, userLocation]);

    useEffect(() => {
        async function updateWeatherTrackings(): Promise<void> {
            let userTrackings: WeatherObject[];
            if (weatherTrackings.length > 0) {
                userTrackings = [...weatherTrackings];
            } else {
                userTrackings = await getUserTrackings();
            }
            if (!userTrackings.length) return;

            const updatedTrackings: WeatherObject[] = [];
            for (const tracking of userTrackings) {
                const updatedWeather = await fetchUpdateTrackingWeather(tracking.id);
                updatedTrackings.push(updatedWeather || tracking); // if fetch fails, keep the old data
            }
            setWeatherTrackings([...updatedTrackings]);
        }
        if (initialIdToken) {
            updateWeatherTrackings();

            const updateInterval = setInterval(() => {
                updateWeatherTrackings();
            }, 60 * 60 * 1000); // update every 60 minutes

            return () => clearInterval(updateInterval);
        }
    }, [initialIdToken]);

    return (
        <WeatherContext.Provider value={{
            currentLocationWeather,
            weatherTrackings,
            addNewTracking,
            removeFromTracking }}>
            {children}
        </WeatherContext.Provider>
    )
}