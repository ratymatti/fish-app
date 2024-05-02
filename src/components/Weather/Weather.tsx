import React, { useContext, useState } from 'react';
import WeatherCard from './WeatherCard';
import Map from '../Map/Map';
import { WeatherContext, WeatherContextType } from '../../contexts/WeatherContext';
import { LocationObject } from '../../types/location';
import ContainerHeader from '../Main/ContainerHeader';
import SectionContainer from '../Main/SectionContainer';
import SectionButton from '../Main/SectionButton';
import MapContainer from '../Map/MapContainer';

enum Current {
    WEATHER = 'weather',
    MAP = 'map'
}

export default function Weather(): JSX.Element | null {
    const {
        currentLocationWeather,
        weatherTrackings,
        addNewTracking } = useContext(WeatherContext) as WeatherContextType;

    const [current, setCurrent] = useState<Current>(Current.WEATHER);
    const [newWeatherLocation, setNewWeatherLocation] = useState<LocationObject[]>([]);


    function addToTracking() {
        if (newWeatherLocation.length) {
            const coords = {
                lat: newWeatherLocation[0].geolocation.lat,
                lng: newWeatherLocation[0].geolocation.lng
            }
            addNewTracking(coords);
            setNewWeatherLocation([]);
        }
    }

    function handleSelection() {
        setCurrent(Current.WEATHER);
        addToTracking();
    }


    if (current === Current.WEATHER) {
        return (
            <div className='w-full h-full flex flex-col'>
                <div className='flex flex-row mx-4 border-b border-neutral-800'>
                    {weatherTrackings.length < 5 ?
                        (
                            <div className='flex justify-end items-center w-full pb-4'>
                                <SectionButton onClick={() => setCurrent(Current.MAP)}>
                                    Add new tracking
                                </SectionButton>
                            </div>
                        ) : (
                            <div className='flex justify-center w-full uppercase'>
                                <p className='text-xs text-orange-400 mb-2'>You have reached the maximum limit of 5 weather trackings. Please remove existing tracking to add a new one.</p>
                            </div>
                        )
                    }
                </div>
                <div className='flex flex-row w-full'>
                    {currentLocationWeather &&
                        <SectionContainer half>
                            <ContainerHeader>
                                Current weather
                            </ContainerHeader>
                            <WeatherCard
                                data={currentLocationWeather}
                                isRemovable={false} />
                        </SectionContainer>}
                    {weatherTrackings.length > 0 &&
                        <SectionContainer half>
                            <ContainerHeader>
                                Your weather trackings
                            </ContainerHeader>
                            {weatherTrackings.map((weatherObj) => (
                                <WeatherCard
                                    key={weatherObj.id}
                                    data={weatherObj}
                                    isRemovable={true} />
                            ))}
                        </SectionContainer>}
                </div>
            </div>
        )
    }

    if (current === Current.MAP) {
        return (
            <MapContainer>
                <>
                    <Map
                        zoom={6}
                        markerLocations={newWeatherLocation}
                        setNewWeatherLocation={setNewWeatherLocation} />
                    <div className='mt-2 h-6 text-center uppercase'>
                        {!newWeatherLocation.length && <p className='text-md text-orange-400'>Select location from the map to continue</p>}
                    </div>
                    <div className='border-b border-neutral-800 pb-2 h-10 flex justify-center items-center'>
                        <SectionButton onClick={() => handleSelection()} disabled={!newWeatherLocation.length}>
                            Set Weather Tracking
                        </SectionButton>
                    </div>
                </>
            </MapContainer>
        )
    }
    else return null;
}

