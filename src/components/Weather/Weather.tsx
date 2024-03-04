import React, { useState } from 'react';
import './Weather.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import Map from '../Map/Map';

import { WeatherContext, WeatherContextType } from '../../contexts/WeatherContext';
import { LocationContext, LocationContextType } from '../../contexts/LocationContext';
import { LocationObject } from '../../types/location';


enum Current {
    WEATHER = 'weather',
    MAP = 'map'
}

export default function Weather(): JSX.Element | null {
    const {
        currentLocationWeather,
        weatherTrackings,
        addNewTracking,
        removeFromTracking } = React.useContext(WeatherContext) as WeatherContextType;

    const { userLocation } = React.useContext(LocationContext) as LocationContextType;

    const [current, setCurrent] = useState<Current>(Current.WEATHER);
    const [newWeatherLocation, setNewWeatherLocation] = useState<LocationObject[]>([]);


    function addToTracking() {
        if (newWeatherLocation.length) {
            const coords = {
                lat: newWeatherLocation[0].geolocation.lat,
                lng: newWeatherLocation[0].geolocation.lng
            }
            addNewTracking(coords);
            setNewWeatherLocation([]);
        }
    }

    function removeTracking(idToRemove: string) {
        removeFromTracking(idToRemove);
    }

    function handleSelection() {
        setCurrent(Current.WEATHER);
        addToTracking();
    }


    if (current === Current.WEATHER) {
        return (
            <div className='weather'>
                {currentLocationWeather &&
                    <WeatherCard
                        data={currentLocationWeather}
                        isRemovable={false} />}
                {weatherTrackings && weatherTrackings.map((weatherObj) => (
                    <WeatherCard
                        key={weatherObj.id}
                        data={weatherObj}
                        isRemovable={true}
                        removeTracking={removeTracking} />
                ))}
                <button onClick={() => setCurrent(Current.MAP)}>Add new tracking</button>
            </div>
        )
    }

    if (current === Current.MAP) {
        return (
            <div className='map'>
                <Map
                    center={userLocation}
                    zoom={5}
                    markerLocations={newWeatherLocation}
                    setNewWeatherLocation={setNewWeatherLocation} />
                <button onClick={() => { handleSelection() }}>Set Weather Tracking</button>
            </div>
        )
    }

    else return null;
}

