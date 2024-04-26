import React from 'react'
import SectionButton from '../Main/SectionButton'

interface LocationModalProps {
    onAllow: () => void;
    onDeny: () => void;
}

export default function LocationModal({ onAllow, onDeny }: LocationModalProps) {
    return (
        
            <div className='border border-neutral-800 h-full w-full flex flex-col justify-between items-center py-8 bg-neutral-700'>
                <h3 className='uppercase text-sm mt-2 text-neutral-300'>App want's to use your location</h3>
                <p className='mx-4 my-6 text-center text-xs text-neutral-400'>Location information is used only for providing weather data.</p>
                <div className='flex w-1/2 justify-around my-6 px-2'>
                    <SectionButton modal onClick={onAllow}>Allow</SectionButton>
                    <SectionButton modal onClick={onDeny}>Deny</SectionButton>
                </div>
            </div>
        
    )
}
