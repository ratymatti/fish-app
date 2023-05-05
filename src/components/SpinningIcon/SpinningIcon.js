import React from 'react'
import { FaSpinner } from 'react-icons/fa';
import './SpinningIcon.css';

export default function SpinningIcon(props) {
  const { disabled } = props;
  return (
    <div className='spinning-icon'>
        {disabled && <FaSpinner size='3rem' />}                                        
      </div>  
  )
};

