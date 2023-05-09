import React, { useState, useEffect } from 'react';
import './Weather.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import SpinningIcon from '../SpinningIcon/SpinningIcon';

export default function Weather(props) {

  const { weather } = props;

  return (
    <div className='weather'>
        {!weather && <SpinningIcon />}
        {weather && <WeatherCard
                        data={weather} />}
    </div>
  )
};

