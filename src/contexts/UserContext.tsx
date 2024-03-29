import React, { useEffect, useState } from 'react';
import { useIdToken } from '../hooks/useIdToken';

export interface UserContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const UserContext = React.createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }): JSX.Element {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const { idToken } = useIdToken();

    useEffect(() => {
        if (idToken) {
            setIsLoggedIn(true);
        }
    }, [idToken]);

    return (
        <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </UserContext.Provider>
    )
}