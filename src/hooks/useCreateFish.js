import { useState, useEffect } from "react";
import fetchWeather from "../modules/fetchWeather/fetchWeather";
import { getCurrentDateString } from "../modules/getCurrentDateString/getCurrentDateString";
import { v4 as uuidv4 } from 'uuid';

function useCreateFish() {
    const [location, setLocation] = useState(null);
    const [catchDate, setCatchDate] = useState(null);
    const [species, setSpecies] = useState(null);
    const [cm, setCm] = useState(0);
    const [water, setWater] = useState(null);
    const [comment, setComment] = useState('');
    const [weather, setWeather] = useState({ info: "not available" });

    useEffect(() => {
        if (catchDate.getDate() === new Date().getDate()) {
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
        return {
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
    }

    return {
        location, setLocation,
        catchDate, setCatchDate,
        species, setSpecies,
        cm, setCm,
        water, setWater,
        comment, setComment,
        weather, createFish
    }
}

export default useCreateFish;