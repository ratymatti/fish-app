import React from 'react';
import './WeatherCard.css';
import RemoveButton from '../RemoveButton/RemoveButton';

export default function WeatherCard({ data, isRemovable, removeTracking }) {

    const content = {
      header: `Current Weather in ${data?.name || ''}`,
      info: [
        { text: 'Temperature: ', value: `${data?.main?.temp >= 0 ? '+' : ''}${data?.main?.temp || 0}` },
        { text: 'Feels Like: ', value: `${data?.main?.feels_like >= 0 ? '+' : ''}${data?.main?.feels_like || 0}` },
        { text: 'Humidity: ', value: `${data?.main?.humidity || 0}%` },
        { text: 'Pressure: ', value: `${data?.main?.pressure || 0} hPa` },
        { text: 'Wind Speed: ' , value: `${data?.wind?.speed || 0} m/s` },
      ],
      id: data.id
    };  
      
  return (
    <div className='weather-card'>
        <h3>{content.header}</h3>
        {content.info.map(({text, value}, index) => (
          <h5 key={index}>{text}{value}</h5>
        ))}
        {isRemovable && <RemoveButton
                          removeTracking={removeTracking}
                          content={content} /> }
    </div>
  )
}

