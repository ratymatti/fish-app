import getCurrentDate from "../getCurrentDateString/getCurrentDateString";
import getCurrentTime from "../getCurrentTime/getCurrentTime";
import { v4 as uuidv4 } from 'uuid';

/**
 * Function name fetchWeather
 * @description This function fetches weather data from OpenWeatherMap API
 * @param {*} location object {lat: number, lng: number}
 * @param {*} type string 'weather' or 'forecast'
 * @returns object with weather data
 */


async function fetchWeather(location, type) {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const units = 'metric';
    const apiUrl = `https://api.openweathermap.org/data/2.5/${type}?`; // type is either 'weather' or 'forecast'

    const currentTimeDate = `${getCurrentDate()} ${getCurrentTime()}`; // REMOVE THIS LATER;

    if (location) {
        try {
            const response =  await fetch(`${apiUrl}lat=${location.lat}&lon=${location.lng}&appid=${apiKey}&units=${units}`);
            console.log(`fetched from api ${currentTimeDate}`); // REMOVE THIS LATER

            if (response.ok) {
                const data = await response.json();
    
                const weather = createWeatherObject(data, location, type);
                return weather;
            }
      
        } catch(err) {
            console.log(err.message);
        }
    }
}

function createWeatherObject(data, location, type) {
    const source = type === 'weather' ? data : data.city;

    const newWeatherObj = {
        type: type,
        name: source.name,
        id: uuidv4(),
        coords: {
            lat: location.lat,
            lng: location.lng
        },
        forecastArray: type === 'forecast' ? createForecastArray(data) : [],
        currentWeather: type === 'weather' ? getWeatherInfo(data, 'weather') : {}
    }
    return newWeatherObj;
}

function getWeatherInfo(data, type) {
    return {
        icon: data.weather[0].icon,
        time: type === 'weather' ? currentTimeDate : data.dt_txt,
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

function createForecastArray(data) {
    const forecastArray = [];
    for (const index in data.list) {
        const time = data.list[index].dt_txt.split(' ')[1]
        if (time === "12:00:00") {
            const weatherObj = getWeatherInfo(data.list[index], 'forecast');
            forecastArray.push(weatherObj);
        }
    }
    return forecastArray;
}

export default fetchWeather;
