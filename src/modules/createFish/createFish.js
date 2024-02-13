import { v4 as uuidv4 } from 'uuid';
import getCurrentDateString from '../getCurrentDateString/getCurrentDateString';
import fetchWeather from '../fetchWeather/fetchWeather';

/**
 * Function name createFish
 * @description This function creates a fish object
 * @param {*} species 
 * @param {*} cm 
 * @param {*} water 
 * @param {*} catchDate 
 * @param {*} comment 
 * @param {*} fishGeolocation 
 * @returns object
 */

async function createFish(species, cm, water, catchDate, comment, fishGeolocation) {
    let weather;
    
    if (new Date().getDate() === catchDate.getDate()) {
        weather = await fetchWeather({
            lat: fishGeolocation[0].location.lat,
            lng: fishGeolocation[0].location.lng 
        }, 'weather')
    } else {
        weather = { info: "not available" }
    }
    
    return {
        species: species,
        cm: cm,
        water: water,
        comment: comment,
        date: catchDate,
        dateString: getCurrentDateString(),
        id: uuidv4(),
        location: {
            lat: fishGeolocation[0].location.lat,
            lng: fishGeolocation[0].location.lng
           },
        weather: weather       
    }    
}

export default createFish;




