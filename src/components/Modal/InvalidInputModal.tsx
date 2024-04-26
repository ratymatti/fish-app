import React, { MutableRefObject } from 'react'
import SectionButton from '../Main/SectionButton';
import { AppError } from '../../contexts/AppStateContext';

interface InvalidInputProps {
    errorMessage: AppError;
    onClose: () => void;
    submitCount: MutableRefObject<number>;
}

export default function InvalidInputModal({ errorMessage, onClose, submitCount }: InvalidInputProps): JSX.Element {
    let header: string;
    let content: string;

    if (errorMessage === AppError.Network) {
        header = 'Network error';
        if (submitCount.current >= 3) {
            content = 'Failed to save fish data. Please try again later.'
        } else {
            content = errorMessage;
        }
    } else {
        header = 'Invalid input';
        content = errorMessage;
    }
    
    return (
        <div className='flex flex-col justify-between p-6 items-center w-80 h-48 border border-neutral-800'>
            <h3 className='text-neutral-300 text-lg uppercase'>{header}</h3>
            <p className='text-neutral-300 text-sm text-center'>{content}</p>
            <SectionButton onClick={onClose}>Close</SectionButton>
        </div>
    )
}
