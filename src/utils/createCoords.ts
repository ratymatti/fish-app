import { v4 as uuidv4 } from 'uuid';
import { LocationObject } from '../types/location';

/**
 * Function createCoords
 * used in Map.tsx to create a new location object
 * @param {*} event 
 * @returns object with key location containing lat and lng properties and a unique id
 */

export default function createCoords(event: google.maps.MapMouseEvent): LocationObject {
    if (event.latLng) {
        const newLocationObject = {
            geolocation: {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            },
            id: uuidv4()
        }
        return newLocationObject;
    } else {
        throw new Error('No event.latLng property found');
    }
}