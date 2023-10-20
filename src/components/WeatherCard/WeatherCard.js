import React from 'react';
import './WeatherCard.css';
import RemoveButton from '../RemoveButton/RemoveButton';

export default function WeatherCard(props) {
  const {
    data,
    isRemovable,
    removeTracking
  } = props;

  const content = {
    header: `Current Weather in ${data?.name || ''}`,
    info: [
      { text: 'Temperature: ', value: `${data?.temp >= 0 ? '+' : ''}${data?.temp || 0}` },
      { text: 'Feels Like: ', value: `${data?.feels_like >= 0 ? '+' : ''}${data?.feels_like || 0}` },
      { text: 'Humidity: ', value: `${data?.humidity || 0}%` },
      { text: 'Pressure: ', value: `${data?.pressure || 0} hPa` },
      { text: 'Wind Speed: ' , value: `${data?.wind_speed || 0} m/s` },
    ],
    id: data.id,
    icon: `http://openweathermap.org/img/w/${data.icon}.png` 
  };  
      
  return (
    <div className='weather-card'>
        <h3>{content.header}</h3>
        <div id="icon">
          <img
            id="wicon"
            src={content.icon}
            alt="Weather icon"/>
        </div>
        {content.info.map(({text, value}, index) => (
          <h5 key={index}>{text}{value}</h5>
        ))}
        {isRemovable && <RemoveButton
                          removeTracking={removeTracking}
                          content={content} /> }
    </div>
  )
}

