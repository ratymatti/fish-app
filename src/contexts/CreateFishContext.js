import React, { useState, useEffect } from 'react';
import getCurrentDateString from '../modules/getCurrentDateString/getCurrentDateString';
import { v4 as uuidv4 } from 'uuid';
import { useFetchWeather } from '../hooks/useFetchWeather';

export const CreateFishContext = React.createContext();

export function CreateFishProvider({ children }) {
    const [location, setLocation] = useState(null);
    const [catchDate, setCatchDate] = useState(null);
    const [species, setSpecies] = useState(null);
    const [cm, setCm] = useState(0);
    const [water, setWater] = useState(null);
    const [comment, setComment] = useState('');
    const [weather, setWeather] = useState({ info: "not available" });

    const { fetchWeather } = useFetchWeather();

    useEffect(() => {
        if (catchDate && catchDate.getDate() === new Date().getDate()) {
            const getWeather = async () => {
                if (location) {
                    const response = await fetchWeather(location, 'weather');
                    setWeather(response);
                }
            }
            getWeather();    
        }
    }, [catchDate, location]);

    function createFish() {
        const newFish = {
            species: species,
            cm: cm,
            water: water,
            comment: comment,
            date: catchDate,
            dateString: getCurrentDateString(),
            id: uuidv4(),
            weather: weather,
            location: {
                lat: location.lat,
                lng: location.lng
            }
        }
        setStatesToDefault();
        return newFish;
    }

    function setStatesToDefault() {
        setLocation(null);
        setCatchDate(null);
        setSpecies(null);
        setCm(0);
        setWater(null);
        setComment('');
        setWeather({ info: "not available" });
    }

    return (
        <CreateFishContext.Provider value={{    location, setLocation,
                                                catchDate, setCatchDate,
                                                species, setSpecies,
                                                cm, setCm,
                                                water, setWater,
                                                setComment, createFish }}>
            {children}
        </CreateFishContext.Provider>
    );
}