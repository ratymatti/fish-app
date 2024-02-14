import React, { useState, useEffect } from 'react';
import './Weather.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import Map from '../Map/Map';
import fetchWeather from '../../modules/fetchWeather/fetchWeather';
import { db } from '../../config/firebase';
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    updateDoc
} from 'firebase/firestore';

export default function Weather(props) {
    const {
        location,
        active
    } = props;

    const [current, setCurrent] = useState('weather');
    const [newWeatherLocation, setNewWeatherLocation] = useState([]);
    const [weatherTracking, setWeatherTracking] = useState([]);
    const [weather, setWeather] = useState(null);

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

    async function updateWeather() {
        for (let index in weatherTracking) {
            try {
                const weatherDoc = doc(db, "weather", weatherTracking[index].id);
                const newWeather = await fetchWeather(weatherTracking[index].coords, "weather");
                await updateDoc(weatherDoc, { ...newWeather });
            } catch (err) {
                console.error(err);
            }
        }
        getDocuments();
    }

    async function addToTracking() {
        if (newWeatherLocation.length) {
            const coords = {
                lat: newWeatherLocation[0].location.lat,
                lng: newWeatherLocation[0].location.lng
            }
            const newWeather = await fetchWeather(coords, "weather");

            if (newWeather) {
                await addDoc(weatherRef, newWeather);
                getDocuments();
                setNewWeatherLocation([]);
            }
        }
    }

    async function removeTracking(idToRemove) {
        const weatherDoc = doc(db, 'weather', idToRemove);
        await deleteDoc(weatherDoc);
        setWeatherTracking([...weatherTracking].filter(card => card.id !== idToRemove));
    }

    function handleSelection() {
        setCurrent('weather');
        addToTracking();
    }
    /*
    async function testForecast() {
        const coords = {"lat": 65.96667,"lng": 29.18333};
        const weatherResponse = await fetchWeather(coords, 'weather');
        const forecastResponse = await fetchWeather(coords, 'forecast');
        console.log(weatherResponse);
        console.log(forecastResponse);
    }
    */


    useEffect(() => {
        const updateInterval = 3600000;
        let intervalID = setInterval(() => {
            updateWeather();
        }, updateInterval);
        return (() => {
            clearInterval(intervalID);
        })
    }, []);

    if (current === 'weather') {
        return (
            <div className='weather'>
                {weather && <WeatherCard
                    data={weather} />}
                {weatherTracking && weatherTracking.map((card, index) => (
                    <WeatherCard
                        key={card.id}
                        data={card}
                        isRemovable={true}
                        removeTracking={removeTracking} />
                ))}
                <button onClick={() => setCurrent('map')}>Add new tracking</button>
                {/* <button onClick={() => testForecast()}>Test Forecast</button> */}
            </div>
        )
    }

    if (current === 'map') {
        return (
            <div className='map'>
                <Map
                    center={location}
                    zoom={5}
                    markerLocations={newWeatherLocation}
                    setNewWeatherLocation={setNewWeatherLocation}
                    active={active} />
                <button onClick={() => { handleSelection() }}>Set Weather Tracking</button>
            </div>
        )
    }
}

