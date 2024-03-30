import React, { useEffect, useState } from 'react';
import './WeatherCard.css';
import RemoveButton from '../RemoveButton/RemoveButton';
import { WeatherObject } from '../../types/weather';
import CardHeader from '../CardHeader/CardHeader';
import CardInfoRow from '../CardInfoRow/CardInfoRow';
import { WeatherContext, WeatherContextType } from '../../contexts/WeatherContext';

interface WeatherCardProps {
    data: WeatherObject;
    isRemovable: boolean;
}

interface CardInfo {
    header: string;
    info: { text: string; value: string }[];
    id: string;
    icon: string;
}

function createCardData(data: WeatherObject): CardInfo | null {
    if (data && data.currentWeather && 'weather' in data.currentWeather) {

        const source = data.currentWeather.weather;

        return {
            header: `Current Weather in ${data.name}`,
            info: [
                { text: 'Temperature: ', value: `${source.temp >= 0 ? '+' : ''}${source.temp || 0}` },
                { text: 'Feels Like: ', value: `${source.feelsLike >= 0 ? '+' : ''}${source.feelsLike || 0}` },
                { text: 'Humidity: ', value: `${source.humidity || 0}%` },
                { text: 'Pressure: ', value: `${source.pressure || 0} hPa` },
                { text: 'Wind Speed: ', value: `${source.wind_speed || 0} m/s` },
                { text: 'updated at ', value: data.currentWeather.time }
            ],
            id: data.id,
            icon: `http://openweathermap.org/img/w/${data.currentWeather.icon}.png`
        }
    }
    return null;
}

export default function WeatherCard(props: WeatherCardProps): JSX.Element {
    const { data, isRemovable } = props;

    const { removeFromTracking } = React.useContext(WeatherContext) as WeatherContextType;

    const [cardInfo, setCardInfo] = useState<CardInfo>();

    
    useEffect(() => {
        const newCardInfo = createCardData(data);
        if (newCardInfo) setCardInfo(newCardInfo);
    }, [data]);


    if (!cardInfo) return <div>loading...</div>
    
    return (
        <div className='weather-card'>
            <CardHeader text={cardInfo.header} />
            <div id="icon">
                <img
                    id="wicon"
                    src={cardInfo.icon}
                    alt="Weather icon" />
            </div>
            {cardInfo.info.map(({ text, value }, index) => (
                <CardInfoRow
                    key={index}
                    text={text}
                    value={value} />
            ))}
            {isRemovable && <RemoveButton
                removeFromTracking={removeFromTracking}
                content={cardInfo} />}
        </div>
    )
}

