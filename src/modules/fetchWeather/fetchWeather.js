/**
 * Function fetchWeather, used for fetching current weather data from api
 * @param {*} location 
 * @returns object that contains current weather data 
 */

async function fetchWeather(location) {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
    const units = 'metric';

    if (location) {
        try {
            const response =  await fetch(`${apiUrl}lat=${location.lat}&lon=${location.lng}&appid=${apiKey}&units=${units}`);
            console.log('fetched from api');
            if (response.ok) {
              const data = await response.json();
              return data;
            }
      
          } catch(err) {
            console.log(err.message)
          }
    }
};

  export default fetchWeather;