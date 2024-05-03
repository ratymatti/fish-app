import React, { createContext, useContext } from "react";
import { useIdToken, IdTokenHook } from "../hooks/useIdToken";

const IdTokenContext = createContext<IdTokenHook | null>(null);

export const IdTokenProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const idTokenHook = useIdToken();
    return (
        <IdTokenContext.Provider value={idTokenHook}>
            {children}
        </IdTokenContext.Provider>
    );
}

export const useIdTokenContext = () => {
    const context = useContext(IdTokenContext);
    if (!context) {
        throw new Error('useIdTokenContext must be used within a IdTokenProvider');
    }
    return context;
}