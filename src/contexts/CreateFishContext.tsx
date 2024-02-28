import React, { useState, useEffect } from 'react';
import getCurrentDateString from '../modules/getCurrentDateString/getCurrentDateString';
import { v4 as uuidv4 } from 'uuid';
import { WeatherObject, WeatherType, useFetchWeather } from '../hooks/useFetchWeather';

import { Timestamp } from 'firebase/firestore';


export interface CreateFishContextType {
    location: Location | null | undefined;
    setLocation: (location: Location | null) => void;
    catchDate: Date | null | undefined;
    setCatchDate: (date: Date | null) => void;
    species: string | null | undefined;
    setSpecies: (species: string | null) => void;
    cm: number;
    setCm: (cm: number) => void;
    water: string | null | undefined;
    setWater: (water: string | null) => void;
    comment?: string;
    setComment: (comment: string) => void;
    createFish: () => FishType;  
}

export interface FishType {
    id: string | undefined | null;
    species: string | null | undefined;
    cm: number | null | undefined;
    date: Date | Timestamp | null | undefined;
    dateString: string | null | undefined;
    water: string | null | undefined;
    comment: string | null | undefined;
    weather: WeatherObject | null | undefined;
    location: Location | null | undefined;
}

export interface Location {
    lat: number;
    lng: number;
}

export const CreateFishContext = React.createContext<CreateFishContextType | undefined>(undefined);

export function CreateFishProvider({ children }: { children: React.ReactNode }) {

    const defaultWeather: WeatherObject = {
        info: "not available",
        type: WeatherType.NOT_SET,
        coords: { lat: 0, lng: 0 },
        currentWeather: {},
        forecastArray: [],
        name: 'not set',
        id: 'not set'};

    const [location, setLocation] = useState<Location | null>();
    const [catchDate, setCatchDate] = useState<Date | null>();
    const [species, setSpecies] = useState<string | null>();
    const [cm, setCm] = useState<number>(0);
    const [water, setWater] = useState<string | null>();
    const [comment, setComment] = useState<string>();
    const [weather, setWeather] = useState<WeatherObject>(defaultWeather);

    const { fetchWeather } = useFetchWeather();


    useEffect(() => {
        if (catchDate && catchDate.getDate() === new Date().getDate()) {
            const getWeather = async () => {
                if (location) {
                    const response = await fetchWeather(location, WeatherType.WEATHER);
                    if (response) setWeather(response);
                }
            }
            getWeather();    
        }
    }, [catchDate, location]);

    function createFish() {
        const newID = uuidv4();
        const newFish: FishType = {
            species: species,
            cm: cm,
            water: water,
            comment: comment,
            date: catchDate!,
            dateString: getCurrentDateString(),
            id: newID,
            weather: {
                info: 'all good',
                id: newID,
                type: weather.type,
                name: weather.name,
                coords: weather.coords || null,
                forecastArray: weather.forecastArray || [],
                currentWeather: weather.currentWeather || {},
            },
            location: {
                lat: location!.lat,
                lng: location!.lng
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
        setWeather(defaultWeather);
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
    )
}