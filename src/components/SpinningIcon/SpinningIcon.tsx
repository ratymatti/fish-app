import React from 'react'
import { FaSpinner } from 'react-icons/fa';
import './SpinningIcon.css';

export default function SpinningIcon() {
  
  return (
    <div className='h-full w-full border flex justify-center items-center'>
        <FaSpinner size='4rem' />                                        
      </div>  
  )
};

