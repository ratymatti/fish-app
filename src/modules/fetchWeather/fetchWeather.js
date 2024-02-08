import getCurrentDate from "../getCurrentDateString/getCurrentDateString";
import getCurrentTime from "../getCurrentTime/getCurrentTime";

/**
 * Function fetchWeather, used for fetching current weather data from 
 * OpenWeatherMap current weather api, used to track current weather situation 
 * in users current location and locations that user are tracking.
 * @param {*} location - object with values { lat, lng }
 * @returns object that contains current weather data 
 */

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
const units = 'metric';

const currentTime = getCurrentTime();
const currentDate = getCurrentDate();


async function fetchWeather(location) {
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

    if (location) {
        try {
            const response =  await fetch(`${apiUrl}lat=${location.lat}&lon=${location.lng}&appid=${apiKey}&units=${units}`);
            console.log(`fetched from api ${currentTime} ${currentDate}`); // REMOVE THIS LATER

            if (response.ok) {
                const data = await response.json();
    
                const weather = createWeatherObject(data, location);
                return weather;
            }
      
        } catch(err) {
            console.log(err.message);
        }
    }
}

function createWeatherObject(data, location) {
    const newObject = {
        name: data.name,
        id: data.id,
        icon: data.weather[0].icon,
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        wind_speed: data.wind.speed,
        wind_direction: data.wind.deg,
        coords: {
            lat: location.lat,
            lng: location.lng
        },
        time: `${currentTime} ${currentDate}`
    }
    return newObject;
}

export default fetchWeather;
