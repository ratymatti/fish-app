import React from 'react';
import './WeatherCard.css';

export default function WeatherCard(props) {
    const { data } = props;
  return (
    <div className='weather-card'>
        <h3>Current Weather</h3>
        <h5>Temperature: </h5>
        <h5>Feels Like: </h5>
        <h5>Humidity: </h5>
        <h5>Pressure: </h5>
        <h5>Wind speed: </h5>
    </div>
  )
}

