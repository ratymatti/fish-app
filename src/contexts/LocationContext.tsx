import React, { useState, useEffect } from "react";

export interface LocationContextType {
    userLocation: UserLocation | null | undefined;
    setUserLocation: (userLocation: UserLocation | null | undefined) => void;
    getLocation: () => Promise<{ lat: number; lng: number } | undefined>;
}

export interface UserLocation {
    lat: number;
    lng: number;
}

interface Position {
    coords: {
        latitude: number;
        longitude: number;
    };
}

export const LocationContext = React.createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
    const [userLocation, setUserLocation] = useState<UserLocation | null | undefined>();

    /**
    * Function getLocation
    * @description Returns the users geolocation information, if available
    * @returns object that contains users geolocation information, key lat for latitude and lng for longitude
    */

    async function getLocation(): Promise<UserLocation | undefined>{
        if (navigator.geolocation) {
            try {
                const position: Position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                const { latitude: lat, longitude: lng } = position.coords;

                return { lat, lng };

            } catch (error) {
                console.error(error);
            }
        } else {
            alert('Geolocation not available');
        }
    }

    useEffect(() => {
        async function getCoords() {
            const coords = await getLocation();
            setUserLocation(coords);
        }

        getCoords();
    }, []);

    return (
        <LocationContext.Provider value={{
            userLocation,
            setUserLocation,
            getLocation
        }}>
            {children}
        </LocationContext.Provider>
    )
}