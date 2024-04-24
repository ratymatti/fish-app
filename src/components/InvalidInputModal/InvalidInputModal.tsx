import React from 'react'
import SectionButton from '../SectionButton/SectionButton';
import { Error } from '../../contexts/AppStateContext';

interface InvalidInputProps {
    errorMessage: Error;
    onClose: () => void;
}

export default function InvalidInputModal({ errorMessage, onClose }: InvalidInputProps): JSX.Element {
    return (
        <div className='flex flex-col justify-between p-6 items-center w-80 h-48 border border-neutral-800'>
            <h3 className='text-neutral-300 text-lg uppercase'>Invalid input</h3>
            <p className='text-neutral-300 text-sm'>{errorMessage}</p>
            <SectionButton onClick={onClose}>Close</SectionButton>
        </div>
    )
}
