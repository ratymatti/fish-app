import getCurrentDate from "../getCurrentDateString/getCurrentDateString";
import getCurrentTime from "../getCurrentTime/getCurrentTime";


const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
const units = 'metric';

const currentTime = getCurrentTime();
const currentDate = getCurrentDate();

async function fetchForecast(location) {
    const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?";
    
    if (location) {
        try {
            const response = await fetch(`${apiUrl}lat=${location.lat}&lon=${location.lng}&appid=${apiKey}&units=${units}`);
            console.log(`fetched from api ${currentTime} ${currentDate}`); // REMOVE THIS LATER

            if (response.ok) {
                const data = await response.json();

                const forecastArray = [];

                for (const index in data.list) {
                    const time = data.list[index].dt_txt.split(' ')[1]
                    if (time === "12:00:00") {

                        const weatherObj = createWeatherObject(data, index);
                        forecastArray.push(weatherObj);
                    }
                }
                
                const weather = {
                    name: data.city.name,
                    id: data.city.id,
                    coords: location,
                    forecastArray: forecastArray
                }
                console.log(weather)
                return weather;   
            }

        } catch(err) {
            console.log(err.message);
        }
    }
}

function createWeatherObject(data, index) {
    const newObject = {
        time: data.list[index].dt_txt,
        weather: {
            temp: data.list[index].main.temp,
            feelsLike: data.list[index].main.feels_like,
            windSpeed: data.list[index].wind.speed,
            pressure: data.list[index].main.pressure,
            pressure: data.list[index].main.humidity,
            wind_direction: data.list[index].wind.deg,
        },
        icon: data.list[index].weather[0].icon,
    }
    return newObject;    
}

export default fetchForecast;