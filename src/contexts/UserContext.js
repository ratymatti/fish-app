import React, { useState } from 'react';

export const UserContext = React.createContext();

export function UserProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    return (
        <UserContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn
        }}>
            {children}
        </UserContext.Provider>
    )
}