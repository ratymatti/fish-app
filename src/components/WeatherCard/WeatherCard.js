import React from 'react';
import './WeatherCard.css';

export default function WeatherCard({ data }) {

    const temperature = data?.main?.temp || 0;
    const feelsLike = data?.main?.feels_like || 0;
    const humidity = data?.main?.humidity || 0;
    const pressure = data?.main?.pressure || 0;
    const windSpeed = data?.wind?.speed || 0;
    const location = data?.name || '';

    const plusMinus = temperature >= 0 ? '+' : '-';
    
  return (
    <div className='weather-card'>
        <h3>Current Weather in {location} </h3>
        <h5>Temperature: {plusMinus}{temperature} </h5>
        <h5>Feels Like: {plusMinus}{feelsLike} </h5>
        <h5>Humidity: {humidity}%</h5>
        <h5>Pressure: {pressure} hPa </h5>
        <h5>Wind speed: {windSpeed} m/s </h5>
    </div>
  )
}

