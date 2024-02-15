import { useState, useEffect } from "react";
import fetchWeather from "../modules/fetchWeather/fetchWeather";

function useCreateFish() {
    const [location, setLocation] = useState(null);
    const [catchDate, setCatchDate] = useState();
    const [species, setSpecies] = useState(null);
    const [cm, setCm] = useState(0);
    const [water, setWater] = useState(null);
    const [comment, setComment] = useState('');
    const [weather, setWeather] = useState(null);

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

    return {
        species, setSpecies,
        cm, setCm,
        water, setWater,
        catchDate, setCatchDate,
        comment, setComment,
        location, setLocation,
        weather
    }
}

export default useCreateFish;