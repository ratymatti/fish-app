import getCurrentTime from '../modules/getCurrentTime/getCurrentTime';
import getCurrentDateString from '../modules/getCurrentDateString/getCurrentDateString';
import { v4 as uuidv4 } from 'uuid';
import { Location } from '../types/location';
import { Time, WeatherType } from '../types/weather';
import { WeatherInfo, WeatherObject } from '../types/weather';

interface FetchWeather {
    fetchWeather: (location: Location, type: WeatherType) => Promise<WeatherObject | undefined>;
    //fetchWeatherFromBackend: (location: Location) => Promise<WeatherObject | null>;
}

export function useFetchWeather(): FetchWeather {

    /**
    * Function name fetchWeather
    * @description This function fetches weather data from OpenWeatherMap API
    * @param {Location} location object {lat: number, lng: number} <-- must be an object with lat and lng properties
    * @param {WeatherType} type string 'weather' or 'forecast'
    * @returns {WeatherObject} - object with weather data
    */

    /*
    async function fetchWeatherFromBackend(location: Location): Promise<WeatherObject | null>{

        const apiUrl = `http://localhost:8080/weather/${userId}/${location.lat}/${location.lng}`;

        if (!location) throw new Error('Location is required');

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(location)
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
            }
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
            } else {
                console.log(err);
            }
        }

        return null;
    }
*/

    async function fetchWeather(location: Location, type: WeatherType): Promise<WeatherObject | undefined>{
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
        const units = 'metric';
        const apiUrl = `https://api.openweathermap.org/data/2.5/${type}?`;

        const currentTimeDate = `${getCurrentDateString()} ${getCurrentTime()}`; // REMOVE THIS LATER;

        if (location) {
            try {
                const response = await fetch(`${apiUrl}lat=${location.lat}&lon=${location.lng}&appid=${apiKey}&units=${units}`);
                console.log(`fetched from api ${currentTimeDate}`); // REMOVE THIS LATER

                if (response.ok) {
                    const data = await response.json();

                    const weather = createWeatherObject(data, location, type);
                    return weather;
                }

            } catch (err) {
                if (err instanceof Error) {
                    console.log(err.message);
                } else {
                    console.log(err);
                }
            }
        }
    }

    function createWeatherObject(data: any, location: Location, type: WeatherType) {
        const source = type === WeatherType.WEATHER ? data : data.city;

        const newWeatherObj = {
            type: type,
            name: source.name,
            id: uuidv4(),
            info: 'all good!',
            coords: {
                lat: location.lat,
                lng: location.lng
            },
            forecastArray: type === WeatherType.FORECAST ? createForecastArray(data) : [],
            currentWeather: type === WeatherType.WEATHER ? getWeatherInfo(data, WeatherType.WEATHER) : {}
        }
        return newWeatherObj;
    }

    function getWeatherInfo(data: any, type: WeatherType): WeatherInfo {
        const currentTimeDate = `${getCurrentDateString()} ${getCurrentTime()}`
        return {
            icon: data.weather[0].icon,
            time: type === WeatherType.WEATHER ? currentTimeDate : data.dt_txt,
            weather: {
                temp: data.main.temp,
                feels_like: data.main.feels_like,
                humidity: data.main.humidity,
                pressure: data.main.pressure,
                wind_speed: data.wind.speed,
                wind_direction: data.wind.deg,
            }
        }
    }

    function createForecastArray(data: any): WeatherInfo[] {
        const forecastArray: WeatherInfo[] = [];
        for (const index in data.list) {
            const time = data.list[index].dt_txt.split(' ')[1]
            if (time === Time.TIME) {
                const weatherObj = getWeatherInfo(data.list[index], WeatherType.FORECAST);
                forecastArray.push(weatherObj);
            }
        }
        return forecastArray;
    }

    return { fetchWeather };
}