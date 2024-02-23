import React, { useState } from "react";

export const LocationContext = React.createContext();

export function LocationProvider({ children }) {
    const [location, setLocation] = useState(null);

    return (
        <LocationContext.Provider value={{ location, setLocation }}>
            {children}
        </LocationContext.Provider>
    )
}