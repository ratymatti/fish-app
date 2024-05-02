import React, { ReactElement, useContext, useState } from 'react'
import SectionButton from '../Main/SectionButton';
import { AppStateContext, AppStateContextType } from '../../contexts/AppStateContext';

interface MapContainerProps {
    children: ReactElement;
}

export default function MapContainer({ children }: MapContainerProps) {
    const { mapRef, userLocation } = useContext(AppStateContext) as AppStateContextType;
    const [key, setKey] = useState<number>(Math.random()); // Used for forcing update of the map

    function handleCenter() {
        if (userLocation) {
            mapRef.current.center = userLocation;
        }
        setKey(Math.random()); // Force update of the map
    }

    return (
        <div className='relative h-1/2 w-full mx-8'>
            <div className='flex justify-end mb-2'>
                <SectionButton onClick={handleCenter}>center to current location</SectionButton>
            </div>
            {React.cloneElement(children, { key })}
        </div>
    )
}
