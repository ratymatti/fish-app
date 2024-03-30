import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, /*addDoc,*/ deleteDoc, doc } from 'firebase/firestore';
import { useFetchWeather } from '../hooks/useFetchWeather';
import { WeatherObject } from '../types/weather';
import { LocationContext, LocationContextType } from './LocationContext';
import { Location } from '../types/location';
import { useIdToken } from '../hooks/useIdToken';
import { useFetchDelete } from '../hooks/useFetchDelete';

export const WeatherContext = React.createContext<WeatherContextType | undefined>(undefined);

enum WeatherRef {
    WEATHER = 'weather'
}

export interface WeatherContextType {
    currentLocationWeather: any;
    weatherTrackings: WeatherObject[];
    addNewTracking: (coords: Location) => void;
    removeFromTracking: (idToRemove: string) => void;
}


export function WeatherProvider({ children }: { children: React.ReactNode }): JSX.Element {
    const [currentLocationWeather, setCurrentLocationWeather] = useState<WeatherObject | null>(null);
    const [weatherTrackings, setWeatherTrackings] = useState<WeatherObject[]>([]);

    const weatherRef = collection(db, WeatherRef.WEATHER);

    const { getLocation } = React.useContext(LocationContext) as LocationContextType;

    const { fetchCurrentWeather } = useFetchWeather();
    const { fetchRemoveWeather } = useFetchDelete();

    const { idToken } = useIdToken();

    async function getDocuments(): Promise<void> {
        try {
            const data = await getDocs(weatherRef);
            const filteredData = data.docs.map((doc) => {
                const docData = doc.data() as WeatherObject;
                if (!docData.type || !docData.name || !docData.coords || !docData.id) {
                    throw new Error('Invalid data from database');
                }
                return {
                    ...docData,
                    id: doc.id
                };
            });
            setWeatherTrackings(filteredData);
        } catch (err) {
            console.error(err);
        }
    }

    async function addNewTracking(location: Location): Promise<void> {
        const currentLocationWeather = await fetchCurrentWeather(location);
        if (currentLocationWeather) {
            weatherTrackings.length ?
                setWeatherTrackings((prev) => [...prev, currentLocationWeather])
                : setWeatherTrackings([currentLocationWeather]);
        } 
    }

    useEffect(() => {
        async function getCurrentLocationWeather(): Promise<void> {
            const location = await getLocation();
            if (location) {
                const currentWeather = await fetchCurrentWeather(location);
                if (currentWeather) setCurrentLocationWeather(currentWeather);
            }
        }
        getCurrentLocationWeather();
    }, [idToken]);

    async function removeFromTracking(idToRemove: string): Promise<void> {
        const deletedFromDB = await fetchRemoveWeather(idToRemove);
        if (!deletedFromDB) return;
        const filteredWeatherTrackings = weatherTrackings.filter((tracking) => tracking.id !== idToRemove);
        setWeatherTrackings(filteredWeatherTrackings);
    }
    

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