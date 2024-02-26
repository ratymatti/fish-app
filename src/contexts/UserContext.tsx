import React, { useState } from 'react';

export interface UserContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const UserContext = React.createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    return (
        <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </UserContext.Provider>
    )
}