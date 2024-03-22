import React, { useState } from 'react';

export interface UserContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    userId: string;
}

export const UserContext = React.createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }): JSX.Element {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const userId = '6a0e1ada-b041-4d80-ab8c-2c69cbdf69a9'; // REMOVE THIS AFTER TESTING

    return (
        <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, userId }}>
            {children}
        </UserContext.Provider>
    )
}