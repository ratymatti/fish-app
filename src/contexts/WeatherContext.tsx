import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, /*addDoc,*/ deleteDoc, doc } from 'firebase/firestore';
import { useFetchWeather } from '../hooks/useFetchWeather';
import { WeatherObject, WeatherType } from '../types/weather';
import { LocationContext, LocationContextType } from './LocationContext';
import { Location } from '../types/location';

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

    const { fetchCurrent } = useFetchWeather();

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
        const currentLocationWeather = await fetchCurrent(location);
        if (currentLocationWeather) setWeatherTrackings([currentLocationWeather]);
    }
    /*
    async function updateWeatherTrackings(): Promise<void> {
        const updatePromises = weatherTrackings.map(async (tracking) => {
            try {
                const weatherDoc = doc(db, WeatherRef.WEATHER, tracking.id);
                const newWeather = await fetchWeather(tracking.coords, WeatherType.WEATHER);
                await updateDoc(weatherDoc, { ...newWeather });
            } catch (err) {
                console.error(err);
            }
        });

        await Promise.all(updatePromises);

        getDocuments();
    }*/

    async function removeFromTracking(idToRemove: string): Promise<void> {
        const weatherDoc = doc(db, WeatherRef.WEATHER, idToRemove);
        await deleteDoc(weatherDoc);
        getDocuments();
    }
    

    return (
        <WeatherContext.Provider value={{
            currentLocationWeather,
            weatherTrackings,
            addNewTracking,
            removeFromTracking
        }}>
            {children}
        </WeatherContext.Provider>
    )
}