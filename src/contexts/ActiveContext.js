import React, { useState, createContext } from 'react';

export const ActiveContext = createContext();

export function ActiveProvider(props) {
    const [active, setActive] = useState('');

    return (
        <ActiveContext.Provider value={{ active, setActive }}>
            {props.children}
        </ActiveContext.Provider>
    )
}

