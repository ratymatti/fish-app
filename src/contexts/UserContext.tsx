import React, { useState } from 'react';

export interface UserContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    userId: string;
    setUserId: (userId: string) => void;
}

export const UserContext = React.createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }): JSX.Element {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userId, setUserId] = useState<string>('');

    return (
        <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, userId, setUserId }}>
            {children}
        </UserContext.Provider>
    )
}