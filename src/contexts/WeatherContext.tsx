import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
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

    const { fetchWeather, fetchWeatherFromBackend } = useFetchWeather();

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

    async function addNewTracking(coords: Location): Promise<void> {
        await fetchWeatherFromBackend(coords);
        /*
        const weatherObject = await fetchWeather(coords, WeatherType.WEATHER);
        try {
            await addDoc(weatherRef, weatherObject);
            getDocuments();
        } catch (err) {
            console.error(err);
        }*/
    }

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
    }

    async function removeFromTracking(idToRemove: string): Promise<void> {
        const weatherDoc = doc(db, WeatherRef.WEATHER, idToRemove);
        await deleteDoc(weatherDoc);
        getDocuments();
    }

    useEffect(() => {
        getDocuments();
    }, []); // Empty dependency array because this needs to run only once for now

    useEffect(() => {
        const getCurrentWeather = async (): Promise<void> => {
            try {
                const location: Location | undefined = await getLocation();

                if (!location) throw new Error('Location is undefined.');

                const currentWeather: WeatherObject | undefined = await fetchWeather(location, WeatherType.WEATHER);
                
                if (!currentWeather) throw new Error('Current weather is undefined.');

                setCurrentLocationWeather(currentWeather);
            } catch (error) {
                console.error(error);
            }
        }
        getCurrentWeather();
    }, []);
    
    useEffect(() => {
        const updateInterval = 3600000;
        let intervalID = setInterval(() => {
            updateWeatherTrackings();
        }, updateInterval);
        return (() => {
            clearInterval(intervalID);
        })
    }, []);

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