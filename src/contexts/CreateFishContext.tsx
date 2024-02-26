import React, { useState, useEffect } from 'react';
import getCurrentDateString from '../modules/getCurrentDateString/getCurrentDateString';
import { v4 as uuidv4 } from 'uuid';
import { useFetchWeather } from '../hooks/useFetchWeather';


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
    species: string | null | undefined;
    cm: number | null | undefined;
    water: string | null | undefined;
    comment?: string | null | undefined;
    date: Date | null | undefined;
    dateString: string | null | undefined;
    id: string | null | undefined;
    weather: { info: string; }; location: Location; // Look into this
}

interface Location {
    lat: number;
    lng: number;
}

export const CreateFishContext = React.createContext<CreateFishContextType | undefined>(undefined);

export function CreateFishProvider({ children }: { children: React.ReactNode }) {
    const [location, setLocation] = useState<Location | null>();
    const [catchDate, setCatchDate] = useState<Date | null>();
    const [species, setSpecies] = useState<string | null>();
    const [cm, setCm] = useState<number>(0);
    const [water, setWater] = useState<string | null>();
    const [comment, setComment] = useState<string>();
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
            date: catchDate!,
            dateString: getCurrentDateString(),
            id: uuidv4(),
            weather: weather,
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