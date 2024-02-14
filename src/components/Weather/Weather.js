import React, { useState, useEffect } from 'react';
import './Weather.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import Map from '../Map/Map';
import fetchWeather from '../../modules/fetchWeather/fetchWeather';
import { db } from '../../config/firebase';
import {
    doc,
    updateDoc
} from 'firebase/firestore';
import { WeatherContext } from '../../contexts/WeatherContext';

export default function Weather(props) {
    const {
        location,
        active
    } = props;

    const [current, setCurrent] = useState('weather');
    const [newWeatherLocation, setNewWeatherLocation] = useState([]);

    const { currentLocationWeather } = React.useContext(WeatherContext);
    const { weatherTrackings } = React.useContext(WeatherContext);
    const { getDocuments, addNewTracking, removeFromTracking } = React.useContext(WeatherContext);


    async function updateWeather() {
        for (let index in weatherTrackings) {
            try {
                const weatherDoc = doc(db, "weather", weatherTrackings[index].id);
                const newWeather = await fetchWeather(weatherTrackings[index].coords, "weather");
                await updateDoc(weatherDoc, { ...newWeather });
            } catch (err) {
                console.error(err);
            }
        }
        getDocuments();
    }

    function addToTracking() {
        if (newWeatherLocation.length) {
            const coords = {
                lat: newWeatherLocation[0].location.lat,
                lng: newWeatherLocation[0].location.lng
            }
            addNewTracking(coords);
            setNewWeatherLocation([]);
        }
    }

    function removeTracking(idToRemove) {
        removeFromTracking(idToRemove);
    }

    function handleSelection() {
        setCurrent('weather');
        addToTracking();
    }
    
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
                {currentLocationWeather &&
                    <WeatherCard
                        data={currentLocationWeather} />}
                {weatherTrackings && weatherTrackings.map((card) => (
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

