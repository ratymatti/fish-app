import React, { useState, useEffect } from "react";

export const LocationContext = React.createContext();

export function LocationProvider({ children }) {
    const [location, setLocation] = useState(null);

    
    /**
    * Function getLocation
    * @description Returns the users geolocation information, if available
    * @returns object that contains users geolocation information, key lat for latitude and lng for longitude
    */

    async function getLocation() {
        if (navigator.geolocation) {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                const { latitude: lat, longitude: lng } = position.coords;

                return { lat, lng };

            } catch (error) {
                console.error(error);
                alert(error.message);
            }
        } else {
            alert('Geolocation not available');
        }
    }

    useEffect(() => {
        async function getCoords() {
            const coords = await getLocation();
            setLocation(coords);
        }

        getCoords();    
    }, []);

    return (
        <LocationContext.Provider value={{  location,
                                            setLocation }}>
            {children}
        </LocationContext.Provider>
    )
}