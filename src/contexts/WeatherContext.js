import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useFetchWeather } from '../hooks/useFetchWeather';
import { LocationContext } from './LocationContext';

export const WeatherContext = React.createContext();

export function WeatherProvider({ children }) {
    const [currentLocationWeather, setCurrentLocationWeather] = useState(null);
    const [weatherTrackings, setWeatherTrackings] = useState([]);

    const weatherRef = collection(db, "weather");

    const { getLocation } = React.useContext(LocationContext);

    const { fetchWeather } = useFetchWeather();

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

    async function updateWeatherTrackings() {
        const updatePromises = weatherTrackings.map(async (tracking) => {
            try {
                const weatherDoc = doc(db, "weather", tracking.id);
                const newWeather = await fetchWeather(tracking.coords, "weather");
                await updateDoc(weatherDoc, { ...newWeather });
            } catch (err) {
                console.error(err);
            }
        });

        await Promise.all(updatePromises);

        getDocuments();
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
        <WeatherContext.Provider value={{   currentLocationWeather,
                                            weatherTrackings,
                                            addNewTracking,
                                            removeFromTracking }}>
            {children}
        </WeatherContext.Provider>
    )
}