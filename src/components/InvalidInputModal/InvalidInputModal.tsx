import React from 'react'
import SectionButton from '../SectionButton/SectionButton';
import { AppError } from '../../contexts/AppStateContext';

interface InvalidInputProps {
    errorMessage: AppError;
    onClose: () => void;
}

export default function InvalidInputModal({ errorMessage, onClose }: InvalidInputProps): JSX.Element {
    let header: string;

    if (errorMessage === AppError.Network) {
        header = 'Network error';
    } else {
        header = 'Invalid input';
    }
    
    return (
        <div className='flex flex-col justify-between p-6 items-center w-80 h-48 border border-neutral-800'>
            <h3 className='text-neutral-300 text-lg uppercase'>{header}</h3>
            <p className='text-neutral-300 text-sm text-center'>{errorMessage}</p>
            <SectionButton onClick={onClose}>Close</SectionButton>
        </div>
    )
}
