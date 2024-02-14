import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const WeatherContext = React.createContext();

export function WeatherProvider({ children }) {
    const [weather, setWeather] = useState([]);

    const weatherRef = collection(db, "weather");

    async function getDocuments() {
        try {
            const data = await getDocs(weatherRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));
            setWeatherTracking(filteredData);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <WeatherContext.Provider value={{ weather, setWeather, getDocuments }}>
            {children}
        </WeatherContext.Provider>
    );
}