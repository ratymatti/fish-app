import React, { useState, useEffect } from 'react';
import getCurrentDateString from '../modules/getCurrentDateString/getCurrentDateString';
import { v4 as uuidv4 } from 'uuid';
import { WeatherObject, WeatherType, useFetchWeather } from '../hooks/useFetchWeather';

import { Timestamp } from 'firebase/firestore';
import { Location } from '../types/location';


export interface CreateFishContextType {
    geolocation: Location | null;
    setGeolocation: (geolocation: Location | null) => void;
    catchDate: Date | null;
    setCatchDate: (date: Date | null) => void;
    species: string | null;
    setSpecies: (species: string | null) => void;
    cm: number | null;
    setCm: (cm: number) => void;
    water: string | null;
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
    geolocation: Location | null | undefined;
}

const defaultWeather: WeatherObject = {
    info: "not available",
    type: WeatherType.NOT_SET,
    coords: { lat: 0, lng: 0 },
    currentWeather: {},
    forecastArray: [],
    name: 'not set',
    id: 'not set'};


export const CreateFishContext = React.createContext<CreateFishContextType | undefined>(undefined);

export function CreateFishProvider({ children }: { children: React.ReactNode }): JSX.Element {

    const [geolocation, setGeolocation] = useState<Location | null>(null);
    const [catchDate, setCatchDate] = useState<Date | null>(null);
    const [species, setSpecies] = useState<string | null>(null);
    const [cm, setCm] = useState<number | null>(null);
    const [water, setWater] = useState<string | null>(null);
    const [comment, setComment] = useState<string | null>(null);
    const [weather, setWeather] = useState<WeatherObject>(defaultWeather);

    const { fetchWeather } = useFetchWeather();

    
    function createFish(): FishType {
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
            geolocation: {
                lat: geolocation!.lat,
                lng: geolocation!.lng
            }
        }
        setStatesToDefault();
        return newFish;
    }

    function setStatesToDefault(): void {
        setGeolocation(null);
        setCatchDate(null);
        setSpecies(null);
        setCm(null);
        setWater(null);
        setComment(null);
        setWeather(defaultWeather);
    }

    useEffect(() => {
        if (catchDate && catchDate.getDate() === new Date().getDate()) {
            const getWeather = async () => {
                if (geolocation) {
                    const response = await fetchWeather(geolocation, WeatherType.WEATHER);
                    if (response) setWeather(response);
                }
            }
            getWeather();    
        }
    }, [catchDate, geolocation]);

    return (
        <CreateFishContext.Provider value={{    geolocation, setGeolocation,
                                                catchDate, setCatchDate,
                                                species, setSpecies,
                                                cm, setCm,
                                                water, setWater,
                                                setComment, createFish }}>
            {children}
        </CreateFishContext.Provider>
    )
}