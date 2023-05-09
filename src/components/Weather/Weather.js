import React, { useState, useEffect } from 'react';
import './Weather.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import SpinningIcon from '../SpinningIcon/SpinningIcon';

export default function Weather(props) {

  const { location } = props;

  const [weather, setWeather] = useState(null);

  async function getWeather() {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
    const units = 'metric';

    try {
      const response =  await fetch(`${apiUrl}lat=${location.lat}&lon=${location.lng}&appid=${apiKey}&units=${units}`);
      console.log('fetched from api');
      if (response.ok) {
        const data = await response.json();
        setWeather(data);
      }

    } catch(err) {
      console.log(err.message)
    }
  };

  useEffect(() => {
    getWeather();
  }, [])

  return (
    <div className='weather'>
        {!weather && <SpinningIcon />}
        {weather && <WeatherCard
          data={weather} />}
    </div>
  )
};

