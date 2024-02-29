/**
 * Interface Location
 * @description Interface for the location object
 * Used in LocationContext.tsx, Map.tsx, MapContainer.tsx
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
 * !!! DON'T CHANGE THIS !!!
 */

export interface Position {
    coords: {
        latitude: number;
        longitude: number;
    };
}

export interface LocationObject {
    location: Location,
    id: string;
}
