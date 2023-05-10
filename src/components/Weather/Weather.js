import React, { useState } from 'react';
import './Weather.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import SpinningIcon from '../SpinningIcon/SpinningIcon';
import Map from '../Map/Map';

export default function Weather(props) {
  const [current, setCurrent] = useState('weather');
  const [newWeatherLocation, setNewWeatherLocation] = useState([]);

  const { weather, location, active } = props;

  if (current === 'weather') {
    return (
      <div className='weather'>
          {!weather && <SpinningIcon />}
          {weather && <WeatherCard
                          data={weather} />}
          <button onClick={() => setCurrent('map')}>Add new</button>                
      </div>
    )
  }

  if (current === 'map') {
    return (
      <div className='map'>
        <Map
          center={location}
          zoom={10}
          markerLocations={newWeatherLocation}
          setNewWeatherLocation={setNewWeatherLocation}
          active={active} />
        <button onClick={() => setCurrent('weather')}>Set Weather Tracking</button>  
      </div>
    )
  }


  
};

