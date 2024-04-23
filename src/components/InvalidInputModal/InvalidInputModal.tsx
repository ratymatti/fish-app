import React from 'react'
import './InvalidInputModal.css';

interface InvalidInputProps {
    errorMessage: string;
    onClose: () => void;
}

export default function InvalidInputModal({ errorMessage, onClose }: InvalidInputProps): JSX.Element {
    return (
        <div className='input-modal'>
            <h3>Invalid input</h3>
            <p>{errorMessage}</p>
            <button onClick={onClose}>Close</button>
        </div>
    )
}
