import React, { ReactNode } from 'react'

interface MapContainerProps {
    children: ReactNode;
}

export default function MapContainer({ children }: MapContainerProps) {
    return (
        <div className='relative h-1/2 w-full mx-8'>
            {children}
        </div>
    )
}
