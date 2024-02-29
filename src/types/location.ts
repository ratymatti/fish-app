/**
 * Interface Location
 * @description Interface for the location object
 * Used in:
 *      LocationContext.tsx,
 *      Map.tsx,
 *      MapContainer.tsx,
 *      AddContainer.tsx,
 *      CreateFishContext.tsx,
 *      WeatherContext.tsx
 * 
 * !!! DON'T CHANGE THIS !!!
 */

export interface Location {
    lat: number;
    lng: number;   
}

/**
 * Interface Position
 * @description Interface for the position object returned by the geolocation API
 * @property coords - object that contains the latitude and longitude of the user
 * Used only in LocationContext.tsx getLocation function
 * 
 * !!! DON'T CHANGE THIS !!!
 */

export interface Position {
    coords: {
        latitude: number;
        longitude: number;
    };
}

/**
 * Interface LocationObject
 * @description Interface for the location object
 * @property location - object that contains the latitude and longitude of the location
 * @property id - string that contains the id of the location
 * Used in:
 *      AddContainer.tsx,
 *      Map.tsx,
 *      WeatherContext.tsx,
 *      createCoords.ts,
 *      MapContainer.tsx
 *  
 * !!! DON'T CHANGE THIS !!!
 */

export interface LocationObject {
    location: Location,
    id: string;
}
