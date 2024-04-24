import React, { useEffect, useState } from 'react';
import RemoveButton from '../RemoveButton/RemoveButton';
import { WeatherObject } from '../../types/weather';
//import CardHeader from '../CardHeader/CardHeader';
//import CardInfoRow from '../CardInfoRow/CardInfoRow';
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

        function getWindDirectionInCardinal(windDirection: number): string {
            const directions = ["North", "North-East", "East", "South-East", "South", "South-West", "West", "North-West", "North"];
            return directions[Math.round(((windDirection % 360) / 45))];
        }

        return {
            header: `${data.name}`,
            info: [
                { text: 'Temperature: ', value: `${source.temp >= 0 ? '+' : ''}${source.temp}` },
                { text: 'Feels Like: ', value: `${source.feelsLike >= 0 ? '+' : ''}${source.feelsLike}` },
                { text: 'Humidity: ', value: `${source.humidity}%` },
                { text: 'Pressure: ', value: `${source.pressure} hPa` },
                { text: 'Wind Direction: ', value: getWindDirectionInCardinal(source.windDirection) },
                { text: 'Wind Speed: ', value: `${source.windSpeed} m/s` },
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
        <div className='border border-neutral-900 text-neutral-400 bg-neutral-800 mb-4'>
            <div className='flex flex-col justify-between border-b border-neutral-900'>
                <h3 className='text-center mt-2 uppercase text-xs'>{cardInfo.header}</h3>
                <img
                    className="mx-auto h-12"
                    id="wicon"
                    src={cardInfo.icon}
                    alt="Weather icon" />
            </div>
            <div className='my-2 mx-4'>
                {cardInfo.info.map(({ text, value }, index) => (
                    <div key={index} className='uppercase text-xs flex flex-row justify-between'>
                        <p>{text}</p>
                        <p>{value}</p>
                    </div>


                ))}
            </div>
            <div className='h-6 flex justify-end'>
                {isRemovable && <RemoveButton
                    removeFromTracking={removeFromTracking}
                    content={cardInfo} />}
            </div>
        </div>
    )
}

