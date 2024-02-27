import React from 'react'
import './Error.css';

interface ErrorProps {
    error: string;
    setError: (error: string) => void;
}

export default function Error(props: ErrorProps) {
    const { error, setError } = props;

    return (
        <div className='error'>
            <p>{error}</p>
            <button onClick={() => setError('')}>Close</button>
        </div>
    )
}
