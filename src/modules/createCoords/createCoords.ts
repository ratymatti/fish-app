import { v4 as uuidv4 } from 'uuid';
import { LocationObject } from '../../types/location';

/**
 * Function createCoords
 * used in Map.tsx to create a new location object
 * @param {*} event 
 * @returns object with key location containing lat and lng properties and a unique id
 */

export default function createCoords(event: any): LocationObject {
    const newLocationObject = {
        location: {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        },
        id: uuidv4()
    }
    return newLocationObject;
}