import React from 'react'
import { FaSpinner } from 'react-icons/fa';
import './SpinningIcon.css';

export default function SpinningIcon(props) {
  return (
    <div className='spinning-icon'>
        {props.disabled && <FaSpinner size='3rem' />}                                        
      </div>  
  )
}

