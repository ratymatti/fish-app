import React, { useState } from 'react';
import './Weather.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import Map from '../Map/Map';

import { WeatherContext } from '../../contexts/WeatherContext';
import { LocationContext } from '../../contexts/LocationContext';

export default function Weather() {
    const {
        currentLocationWeather,
        weatherTrackings,
        addNewTracking,
        removeFromTracking
    } = React.useContext(WeatherContext);
    const { location } = React.useContext(LocationContext);

    const [current, setCurrent] = useState('weather');
    const [newWeatherLocation, setNewWeatherLocation] = useState([]);


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


    if (current === 'weather') {
        return (
            <div className='weather'>
                {currentLocationWeather &&
                    <WeatherCard
                        data={currentLocationWeather} />}
                {weatherTrackings && weatherTrackings.map((weatherObj) => (
                    <WeatherCard
                        key={weatherObj.id}
                        data={weatherObj}
                        isRemovable={true}
                        removeTracking={removeTracking} />
                ))}
                <button onClick={() => setCurrent('map')}>Add new tracking</button>
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
                    setNewWeatherLocation={setNewWeatherLocation} />
                <button onClick={() => { handleSelection() }}>Set Weather Tracking</button>
            </div>
        )
    }
}

