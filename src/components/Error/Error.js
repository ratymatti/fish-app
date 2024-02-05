import React from 'react'
import './Error.css';

export default function Error(props) {
    const {
        errorMessage,
        setError
    } = props;
  return (
    <div className='error'>
        <p>{errorMessage}</p>
        <button onClick={() => setError('')}>Close</button>
    </div>
  )
}
