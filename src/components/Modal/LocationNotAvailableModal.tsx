import React from 'react'
import { AppError } from '../../contexts/AppStateContext';
import SectionButton from '../Main/SectionButton';

interface LocationNotAvailableProps {
    onClose: () => void;
    error: AppError;
}

export default function LocationModal({ onClose, error }: LocationNotAvailableProps) {
    return (
        
            <div className='border border-neutral-800 h-1/2 w-full flex flex-col justify-between items-center py-2 bg-neutral-700'>
                <h3 className='uppercase text-sm mt-2 text-neutral-300'>Location not available</h3>
                <p className='mx-4 my-6 text-center text-xs text-neutral-400'>{error}</p>
                <div className='flex w-1/2 justify-around my-2'>
                    <SectionButton modal onClick={onClose}>Close</SectionButton>
                </div>
            </div>
    )
}