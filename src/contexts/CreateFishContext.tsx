import React, { useState } from 'react';

import { Location } from '../types/location';
import { NewFishObject } from '../types/fish';


export interface CreateFishContextType {
    geolocation: Location | null;
    setGeolocation: (geolocation: Location | null) => void;
    catchDate: Date | null;
    setCatchDate: (date: Date | null) => void;
    species: string | null;
    setSpecies: (species: string | null) => void;
    length: number | null;
    setLength: (cm: number) => void;
    locationName: string | null;
    setLocationName: (locationName: string | null) => void;
    comment?: string;
    setComment: (comment: string) => void;
    createNewFish: () => NewFishObject;  
}



export const CreateFishContext = React.createContext<CreateFishContextType | undefined>(undefined);

export function CreateFishProvider({ children }: { children: React.ReactNode }): JSX.Element {

    const [geolocation, setGeolocation] = useState<Location | null>(null);
    const [catchDate, setCatchDate] = useState<Date | null>(null);
    const [species, setSpecies] = useState<string | null>(null);
    const [length, setLength] = useState<number | null>(null);
    const [locationName, setLocationName] = useState<string | null>(null);
    const [comment, setComment] = useState<string | null>(null);

    // It's safe to assert these values non-null because createNewFish
    // is only called when all values are set

    function createNewFish(): NewFishObject {
        const newFish: NewFishObject = {
            species: species!,
            length: length!,
            locationName: locationName!,
            comment: comment!,
            date: catchDate!.toISOString(),
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
        setLength(null);
        setLocationName(null);
        setComment(null);
    }


    return (
        <CreateFishContext.Provider value={{    geolocation, setGeolocation,
                                                catchDate, setCatchDate,
                                                species, setSpecies,
                                                length, setLength,
                                                locationName, setLocationName,
                                                setComment, createNewFish }}>
            {children}
        </CreateFishContext.Provider>
    )
}