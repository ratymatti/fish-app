import React, { useState, useEffect } from 'react';
import { useFetchWeather } from '../hooks/useFetchWeather';
import { WeatherObject } from '../types/weather';
import { LocationContext, LocationContextType } from './LocationContext';
import { Location } from '../types/location';
import { useIdToken } from '../hooks/useIdToken';
import { useFetchDelete } from '../hooks/useFetchDelete';

export const WeatherContext = React.createContext<WeatherContextType | undefined>(undefined);

export interface WeatherContextType {
    currentLocationWeather: any;
    weatherTrackings: WeatherObject[];
    addNewTracking: (coords: Location) => void;
    removeFromTracking: (idToRemove: string) => void;
}

export enum WeatherEndpoint {
    CURRENT = '/fetch/current',
    TRACKING = '/fetch/tracking',
}


export function WeatherProvider({ children }: { children: React.ReactNode }): JSX.Element {
    const [currentLocationWeather, setCurrentLocationWeather] = useState<WeatherObject | null>(null);
    const [weatherTrackings, setWeatherTrackings] = useState<WeatherObject[]>([]);

    const { getLocation } = React.useContext(LocationContext) as LocationContextType;

    const { fetchCurrentWeather } = useFetchWeather();
    const { fetchRemoveWeather } = useFetchDelete();

    const { initialIdToken } = useIdToken();


    async function addNewTracking(location: Location): Promise<void> {
        const currentLocationWeather = await fetchCurrentWeather(location, WeatherEndpoint.TRACKING);
        if (currentLocationWeather) {
            weatherTrackings.length ?
                setWeatherTrackings((prev) => [...prev, currentLocationWeather])
                : setWeatherTrackings([currentLocationWeather]);
        } 
    }

    async function removeFromTracking(idToRemove: string): Promise<void> {
        const deletedFromDB = await fetchRemoveWeather(idToRemove);
        if (!deletedFromDB) return;
        const filteredWeatherTrackings = weatherTrackings.filter((tracking) => tracking.id !== idToRemove);
        setWeatherTrackings(filteredWeatherTrackings);
    }

    useEffect(() => {
        async function updateCurrentLocationWeather(): Promise<void> {
            const location = await getLocation();
            if (location) {
                const currentWeather = await fetchCurrentWeather(location, WeatherEndpoint.CURRENT);
                if (currentWeather) setCurrentLocationWeather(currentWeather);
            }
        }
        if (initialIdToken) {
            updateCurrentLocationWeather();

            const updateInterval = setInterval(() => {
                updateCurrentLocationWeather();
            }, 15 * 60 * 1000); // update every 15 minutes
    
            return () => clearInterval(updateInterval); // cleanup on unmount
        }
    }, [initialIdToken]);

    useEffect(() => {
        async function updateWeatherTrackings(): Promise<void> {
            if (!weatherTrackings.length) return;
            const updatedTrackings = await Promise.all(weatherTrackings.map(async (tracking) => {
                const updatedWeather = await fetchCurrentWeather(tracking.coords, WeatherEndpoint.TRACKING);
                return updatedWeather || tracking; // if fetch fails, keep the old data
            }));
            setWeatherTrackings(updatedTrackings);
        }
        if (initialIdToken) {
            updateWeatherTrackings();

            const updateInterval = setInterval(() => {
                updateWeatherTrackings();
            }, 15 * 60 * 1000); // update every 15 minutes

            return () => clearInterval(updateInterval); // cleanup on unmount
        }
    }, [initialIdToken]); 
    

    return (
        <WeatherContext.Provider value={{
            currentLocationWeather,
            weatherTrackings,
            addNewTracking,
            removeFromTracking,
        }}>
            {children}
        </WeatherContext.Provider>
    )
}