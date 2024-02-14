import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
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

    async function addNewTracking(coords) {
        const weatherObject = await fetchWeather(coords, 'weather');
        try {
            await addDoc(weatherRef, weatherObject);
            getDocuments();
        } catch (err) {
            console.error(err);
        }
    }

    async function removeFromTracking(idToRemove) {
        const weatherDoc = doc(db, 'weather', idToRemove);
        await deleteDoc(weatherDoc);
        getDocuments();
    
    }

    useEffect(() => {
        getDocuments();
    }, []); // Empty dependency array because this needs to run only once for now

    useEffect(() => {
        const getCurrentWeather = async () => {
            const location = await getLocation();
            const currentWeather = await fetchWeather(location, 'weather');
            setCurrentLocationWeather(currentWeather);
        }
        getCurrentWeather();
    }, []);

    return (
        <WeatherContext.Provider value={{   currentLocationWeather,
                                            setCurrentLocationWeather,
                                            weatherTrackings,
                                            setWeatherTrackings,
                                            getDocuments,
                                            addNewTracking,
                                            removeFromTracking }}>
            {children}
        </WeatherContext.Provider>
    );
}