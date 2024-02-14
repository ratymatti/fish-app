import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import getLocation from '../modules/getLocation/getLocation';
import fetchWeather from '../modules/fetchWeather/fetchWeather';

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

    useEffect(() => {
        getDocuments();
    }, []); // Empty dependency array because this needs to run only once for now

    useEffect(() => {
        const location = getLocation();
        const getCurrentWeather = async () => {
            const currentWeather = await fetchWeather(location, 'weather');
            setCurrentLocationWeather(currentWeather);
        }
        getCurrentWeather();
        //getDocuments();
    }, []);

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