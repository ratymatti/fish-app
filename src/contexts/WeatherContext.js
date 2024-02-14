import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const WeatherContext = React.createContext();

export function WeatherProvider({ children }) {
    const [currentLocationWeather, setCurrentLocationWeather] = useState(null);
    const [weatherTrackings, setWeatherTrackings] = useState([]);

    const weatherRef = collection(db, "weather");

    async function getDocuments() {
        try {
            const data = await getDocs(weatherRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));
            setWeatherTrackings(filteredData);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <WeatherContext.Provider value={{   currentLocationWeather,
                                            setCurrentLocationWeather,
                                            weatherTrackings,
                                            setWeatherTrackings,
                                            getDocuments}}>
            {children}
        </WeatherContext.Provider>
    );
}