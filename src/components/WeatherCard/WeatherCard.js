import React from 'react';
import './WeatherCard.css';
import RemoveButton from '../RemoveButton/RemoveButton';

export default function WeatherCard(props) {
    const {
        data,
        isRemovable,
        removeTracking
    } = props;

    const source = data?.currentWeather?.weather;

    const content = {
        header: `Current Weather in ${data?.name || ''}`,
        info: [
            { text: 'Temperature: ', value: `${source.temp >= 0 ? '+' : ''}${source.temp || 0}` },
            { text: 'Feels Like: ', value: `${source.feels_like >= 0 ? '+' : ''}${source.feels_like || 0}` },
            { text: 'Humidity: ', value: `${source.humidity || 0}%` },
            { text: 'Pressure: ', value: `${source.pressure || 0} hPa` },
            { text: 'Wind Speed: ', value: `${source.wind_speed || 0} m/s` },
            { text: 'updated at ', value: data.currentWeather.time }
        ],
        id: data.id,
        icon: `http://openweathermap.org/img/w/${data.currentWeather.icon}.png`
    };

    return (
        <div className='weather-card'>
            <h3>{content.header}</h3>
            <div id="icon">
                <img
                    id="wicon"
                    src={content.icon}
                    alt="Weather icon" />
            </div>
            {content.info.map(({ text, value }, index) => (
                <h5 key={index}>{text}{value}</h5>
            ))}
            {isRemovable && <RemoveButton
                removeTracking={removeTracking}
                content={content} />}
        </div>
    )
}

