import React, { useState, useEffect } from 'react';
import getCurrentDateString from '../modules/getCurrentDateString/getCurrentDateString';
import { v4 as uuidv4 } from 'uuid';
import { useFetchWeather } from '../hooks/useFetchWeather';

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
    weather: Weather | null | undefined;
    location: Location | null | undefined;
}

export interface Location {
    lat: number;
    lng: number;
}

export interface Weather {
    info: string | null | undefined;
    type: string | null | undefined;
    name?: string | null | undefined;
    coords?: Location | null | undefined;
    forecastArray?: [] | null | undefined;
    currentWeather?: {
        weather: {
            temp: number | null | undefined;
            wind_direction: string | null | undefined;
            humidity: number | null | undefined;
            pressure: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
}


export const CreateFishContext = React.createContext<CreateFishContextType | undefined>(undefined);

export function CreateFishProvider({ children }: { children: React.ReactNode }) {
    const [location, setLocation] = useState<Location | null>();
    const [catchDate, setCatchDate] = useState<Date | null>();
    const [species, setSpecies] = useState<string | null>();
    const [cm, setCm] = useState<number>(0);
    const [water, setWater] = useState<string | null>();
    const [comment, setComment] = useState<string>();
    const [weather, setWeather] = useState<Weather>({ info: "not available", type: "not available"});

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
        const newFish: FishType = {
            species: species,
            cm: cm,
            water: water,
            comment: comment,
            date: catchDate!,
            dateString: getCurrentDateString(),
            id: uuidv4(),
            weather: {
                info: null,
                type: weather.type || null,
                name: weather.name || null,
                coords: weather.coords || null,
                forecastArray: weather.forecastArray || null,
                currentWeather: weather.currentWeather || null,
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
        setWeather({ info: "not available", type: "not available"});
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