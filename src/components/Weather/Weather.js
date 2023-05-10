import React, { useState } from 'react';
import './Weather.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import SpinningIcon from '../SpinningIcon/SpinningIcon';
import Map from '../Map/Map';

export default function Weather(props) {
  const [active, setActive] = useState('weather');

  const { weather, location } = props;

  if (active === 'weather') {
    return (
      <div className='weather'>
          {!weather && <SpinningIcon />}
          {weather && <WeatherCard
                          data={weather} />}
          <button onClick={() => setActive('map')}>Add new</button>                
      </div>
    )
  }

  if (active === 'map') {
    return (
      <div className='map'>
        <Map
          center={location}
          zoom={10}
          markerLocations={[]} />
        <button onClick={() => setActive('weather')}>Set Weather Tracking</button>  
      </div>
    )
  }


  
};

