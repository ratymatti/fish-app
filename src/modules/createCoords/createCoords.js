import { v4 as uuidv4 } from 'uuid';

/**
 * Function createCoords
 * used in Map.js to create a new location object
 * @param {*} event 
 * @returns object with key location containing lat and lng properties and a unique id
 */

function createCoords(event) {
    const newLocationObject = {
        location: {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        },
        id: uuidv4()
    }
    return newLocationObject;
}

export default createCoords;