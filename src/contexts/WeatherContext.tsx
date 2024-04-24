import React, { useState, useEffect, useContext, ReactNode } from 'react';
import { useFetchWeather } from '../hooks/useFetchWeather';
import { WeatherObject } from '../types/weather';
import { LocationContext, LocationContextType } from './LocationContext';
import { Location } from '../types/location';
import { useIdToken } from '../hooks/useIdToken';
import { useFetchDelete } from '../hooks/useFetchDelete';
import { useFetchTrackings } from '../hooks/useFetchTrackings';
import { useUpdateTracking } from '../hooks/useUpdateTracking';

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

interface WeatherProviderProps {
    children: ReactNode;
}


export function WeatherProvider({ children }: WeatherProviderProps): JSX.Element {
    const [currentLocationWeather, setCurrentLocationWeather] = useState<WeatherObject | null>(null);
    const [weatherTrackings, setWeatherTrackings] = useState<WeatherObject[]>([]);

    const { getLocation } = useContext(LocationContext) as LocationContextType;

    const { fetchCurrentWeather } = useFetchWeather();
    const { fetchUserTrackings } = useFetchTrackings();
    const { fetchRemoveWeather } = useFetchDelete();
    const { fetchUpdateTrackingWeather } = useUpdateTracking();

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

    async function getUserTrackings(): Promise<WeatherObject[]> {
        if (weatherTrackings.length) {
            return weatherTrackings;
        } else {
            return await fetchUserTrackings();
        }
    }

    useEffect(() => {
        async function updateCurrentLocationWeather(): Promise<void> {
            const location = await getLocation();
            console.log(location)
            if (location) {
                const currentWeather = await fetchCurrentWeather(location, WeatherEndpoint.CURRENT);
                console.log(currentWeather)
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
            const userTrackings = await getUserTrackings();
            if (!userTrackings.length) return;
            const updatedTrackings: WeatherObject[] = [];
            for (const tracking of userTrackings) {
                const updatedWeather = await fetchUpdateTrackingWeather(tracking.id);
                updatedTrackings.push(updatedWeather || tracking); // if fetch fails, keep the old data
            }
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