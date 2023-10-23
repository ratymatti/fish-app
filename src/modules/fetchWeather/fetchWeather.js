/**
 * Function fetchWeather, used for fetching current weather data from 
 * OpenWeatherMap current weather api, used to track current weather situation 
 * in users current location and locations that user are tracking.
 * @param {*} location - object with values { lat, lng }
 * @returns object that contains current weather data 
 */

async function fetchWeather(location) {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
    const units = 'metric';

    if (location) {
        try {
          function getCurrentTime() {
            const now = new Date();
            const minutes = now.getMinutes();
            const hours = now.getHours();
          
            // Ensure that the minutes and hours are displayed with leading zeros if needed
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            const formattedHours = hours < 10 ? `0${hours}` : hours;
          
            const currentTimeString = `${formattedHours}/${formattedMinutes}`;
            return currentTimeString;
          }
          
          const currentTime = getCurrentTime();
          
          
            const response =  await fetch(`${apiUrl}lat=${location.lat}&lon=${location.lng}&appid=${apiKey}&units=${units}`);
            console.log('fetched from api' +  currentTime);
            if (response.ok) {
              const data = await response.json();
              const weather = {
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
                }
              }
              return weather;
             
            }
      
          } catch(err) {
            console.log(err.message)
          }
    }
};

export default fetchWeather;