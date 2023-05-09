import React, { useState } from 'react';
import './Weather.css';

export default function Weather(props) {

  const { location } = props;

  const [weather, setWeather] = useState(null);

  async function getWeather() {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
    const units = 'metric';

    try {
      const response =  await fetch(`${apiUrl}lat=${location.lat}&lon=${location.lng}&appid=${apiKey}&units=${units}`);

      if (response.ok) {
        const data = await response.json();
        setWeather(data);
      }

    } catch(err) {
      console.log(err.message)
    }
  };

  function handleClick(event) {
    event.preventDefault();
    getWeather();
  }

  if (weather) {
    console.log(weather);
  }
  

  return (
    <div className='weather'>
        <button onClick={(event) => {handleClick(event)}}>get weather</button>
    </div>
  )
};

