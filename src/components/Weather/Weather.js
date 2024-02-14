import React, { useState } from 'react';
import './Weather.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import Map from '../Map/Map';

import { WeatherContext } from '../../contexts/WeatherContext';

export default function Weather(props) {
    const {
        location,
        active
    } = props;

    const {
        currentLocationWeather,
        weatherTrackings,
        addNewTracking,
        removeFromTracking
    } = React.useContext(WeatherContext);

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

