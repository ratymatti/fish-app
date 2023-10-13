import React, { useState } from 'react';
import './Weather.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import SpinningIcon from '../SpinningIcon/SpinningIcon';
import Map from '../Map/Map';
import fetchWeather from '../../modules/fetchWeather/fetchWeather';

export default function Weather(props) {
  const [current, setCurrent] = useState('weather');
  const [newWeatherLocation, setNewWeatherLocation] = useState([]);

  const {
    weather,
    location,
    active,
    weatherTracking,
    setWeatherTracking
  } = props;

  async function addToTracking() {
    if (newWeatherLocation.length) {
      const coords = {
         lat: newWeatherLocation[0].location.lat,
         lng: newWeatherLocation[0].location.lng
      }
      const newWeather = await fetchWeather(coords);
      
      if (newWeather) {
        setWeatherTracking([...weatherTracking, newWeather]);
        setNewWeatherLocation([]); 
      }
    }
      
  };   

  function handleSelection() {
    setCurrent('weather');
    addToTracking();
  };

  function removeTracking(idToRemove) {
    setWeatherTracking([...weatherTracking].filter(card => card.id !== idToRemove));
  };

  if (current === 'weather') {
    return (
      <div className='weather'>
          {!weather && <SpinningIcon />}
          {weather && <WeatherCard
                          data={weather} />}
          {weatherTracking && weatherTracking.map((card, index) => (
            <WeatherCard 
              key={index}
              data={card}
              isRemovable={true}
              removeTracking={removeTracking} />  
          ))}                                              
          <button onClick={() => setCurrent('map')}>Add new</button>                
      </div>
    )
  };

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
  };  
};

